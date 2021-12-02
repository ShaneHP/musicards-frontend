import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

export default function Player({ accessToken, trackUri }) {
    const [play, setPlay] = useState(false);

    useEffect(() => {
        if (trackUri) {
            setPlay(true);
        } else {
            setPlay(false);
        }
    }, [trackUri]);

    if (!accessToken) return null;
    return (
        <SpotifyPlayer
            token={accessToken}
            showSaveIcon
            callback={(state) => {
                if (!state.isPlaying) setPlay(false);
            }}
            play={play}
            uris={trackUri ? [trackUri] : []}
        />
    );
}
