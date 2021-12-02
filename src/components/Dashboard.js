import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import GameScreen from './GameScreen/GameScreen';
import SpotifyWebApi from 'spotify-web-api-node';
import './Dashboard.css';

const spotifyApi = new SpotifyWebApi({
    clientId: 'fdd0c0a7bbff41e1b1b6d508135a1a19',
});

export default function Dashboard({ code }) {
    const accessToken = useAuth(code);
    const [playlists, setPlayists] = useState([]);
    const [selectedSongs, setSelectedSongs] = useState([]);

    const getUserPlaylists = (userId) => {
        spotifyApi.getUserPlaylists(userId).then(
            (data) => {
                setPlayists(data.body.items);
            },
            (err) => {
                console.log('error ' + err);
            }
        );
    };

    const getRandomSongs = (playlistId) => {
        spotifyApi.getPlaylist(playlistId).then((data) => {
            const shuffledSongs = data.body.tracks.items.sort(
                () => 0.5 - Math.random()
            );
            const randomSongs = shuffledSongs.slice(0, 6);
            setSelectedSongs(randomSongs);
        });
    };

    //set the access token
    useEffect(() => {
        if (!accessToken) return;
        spotifyApi.setAccessToken(accessToken);

        const getUser = () => {
            spotifyApi.getMe().then(
                (data) => {
                    getUserPlaylists(data.body.id);
                },
                (err) => {
                    console.log('error ' + err);
                }
            );
        };

        getUser();
    }, [accessToken]);

    return (
        <>
            <GameScreen
                selectedSongs={selectedSongs}
                accessToken={accessToken}
            />
            {playlists.length >= 1 &&
                playlists.map((playlist) => {
                    if (playlist.tracks.total >= 6) {
                        return (
                            <div
                                className="playlist"
                                onClick={() => getRandomSongs(playlist.id)}
                                key={playlist.id}
                            >
                                <img
                                    src={playlist.images[0].url}
                                    alt="playlist cover"
                                    style={{ height: '64px', width: '64px' }}
                                />
                                <div>{playlist.name}</div>
                            </div>
                        );
                    } else {
                        return null;
                    }
                })}
        </>
    );
}
