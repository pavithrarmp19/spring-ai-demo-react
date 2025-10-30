import React, { useState } from "react";
import "./LoginPage.css";

function LoginPage({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        if (username && password) {
            onLogin();
        } else {
            alert("Please enter both username and password!");
        }
    };

    return (
        <div className="login-bg">
            <div className="floating-bubbles"></div>

            <div className="login-box fade-in">
                <h2 className="login-title">🌟 Welcome Back!</h2>
                <p className="login-subtitle">Sign in to your AI Dashboard</p>

                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>

                <p className="login-footer">✨ Powered by RMP ✨</p>
            </div>
        </div>
    );
}

export default LoginPage;
