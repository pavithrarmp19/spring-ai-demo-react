import React from "react";
import "./Dashboard.css";

function Dashboard({ onSelectTab }) {
    return (
        <div className="dashboard-container">
            <div className="floating-bubbles"></div>

            <div className="dashboard-content fade-in">
                <h1 className="dashboard-title">Welcome to the AI Dashboard</h1>
                <p className="dashboard-subtitle">
                    Explore AI tools that inspire creativity and innovation ✨
                </p>

                <div className="dashboard-buttons">
                    <button onClick={() => onSelectTab("chat")}>💬 Ask AI</button>
                    <button onClick={() => onSelectTab("image-generator")}>🖼️ Image Generator</button>
                    <button onClick={() => onSelectTab("recipe-generator")}>🍽️ Recipe Generator</button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
