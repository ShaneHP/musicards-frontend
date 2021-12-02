import { useState, useEffect } from 'react';
import './GameScreen.css';
import SingleCard from '../SingleCard/SingleCard';
import Player from '../Player';

function GameScreen({ selectedSongs, accessToken }) {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [playingTrack, setPlayingTrack] = useState();
    const [disabled, setDisabled] = useState(false);
    const [newGame, setNewGame] = useState(true);
    const [matchedCount, setMatchedCount] = useState(0);

    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
        setPlayingTrack(card.songUri);
    };

    useEffect(() => {
        if (selectedSongs.length > 0) {
            console.log(selectedSongs);
            const shuffleCards = () => {
                const songs = selectedSongs.map((song) => {
                    return {
                        src: song.track.album.images[0].url,
                        songId: song.track.id,
                        songUri: song.track.uri,
                        matched: false,
                    };
                });
                const shuffledSongs = [...songs, ...songs]
                    .sort(() => Math.random() - 0.5)
                    .map((card) => ({ ...card, id: Math.random() }));

                console.log(shuffledSongs);
                setCards(shuffledSongs);
                setTurns(0);
                setPlayingTrack();
                setMatchedCount(0);
                setNewGame(false);
                setChoiceOne(null);
                setChoiceTwo(null);
            };

            shuffleCards();
        }
    }, [selectedSongs]);

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.songId === choiceTwo.songId) {
                setCards((prevCards) => {
                    return prevCards.map((card) => {
                        if (card.songId === choiceOne.songId) {
                            return { ...card, matched: true };
                        } else {
                            return card;
                        }
                    });
                });
                setMatchedCount((prev) => prev + 1);
                resetTurn();
            } else {
                setTimeout(() => {
                    resetTurn();
                }, 1000);
            }
        }
    }, [choiceOne, choiceTwo]);

    const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns((prevTurns) => prevTurns + 1);
        setDisabled(false);
    };

    console.log('access token', accessToken);

    return (
        <div className="App">
            <h1>MusiCards</h1>
            {newGame ? (
                <p>Select a playlist to begin a new game</p>
            ) : matchedCount >= 6 ? (
                <p>
                    <span className="winText">YOU WON!</span> with {turns} turns
                </p>
            ) : (
                <p>Match all of the card pairs to win!</p>
            )}
            <div className="card-grid">
                {cards.map((card) => (
                    <SingleCard
                        key={card.id}
                        card={card}
                        handleChoice={handleChoice}
                        flipped={
                            card === choiceOne ||
                            card === choiceTwo ||
                            card.matched
                        }
                        disabled={disabled}
                    />
                ))}
            </div>
            {cards.length > 0 && <p>Turns: {turns}</p>}
            <div style={{ display: 'none' }}>
                <Player accessToken={accessToken} trackUri={playingTrack} />
            </div>
            {!newGame && <p>Try with a different playlist</p>}
        </div>
    );
}

export default GameScreen;
