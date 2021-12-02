import React from 'react';
import './Login.css';

const AUTH_URL =
    'https://accounts.spotify.com/authorize?client_id=fdd0c0a7bbff41e1b1b6d508135a1a19&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';

export default function Login() {
    return (
        <div className="btn-container">
            <h1>MusiCards</h1>
            <a className="login-btn" href={AUTH_URL}>
                Login with Spotify
            </a>
        </div>
    );
}
