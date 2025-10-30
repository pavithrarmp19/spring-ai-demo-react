import React, { useState } from "react";
import "./App.css";
import ImageGenerator from "./components/ImageGenerator";
import ChatComponent from "./components/ChatComponent";
import RecipeGenerator from "./components/RecipeGenerator";
import LoginPage from "./components/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./components/Dashboard"; // ✅ Import the new dashboard

function App() {
    const [activeTab, setActiveTab] = useState("home");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleTabChange = (tab) => setActiveTab(tab);
    const handleLogin = () => setIsLoggedIn(true);

    if (!isLoggedIn) {
        return <LoginPage onLogin={handleLogin} />;
    }

    return (
        <div className="App text-center p-4">
            {/* ✅ Navbar Buttons */}
            <div className="mb-3">
                <button
                    className={`btn btn-outline-primary mx-2 ${activeTab === "home" ? "active" : ""}`}
                    onClick={() => handleTabChange("home")}
                >
                    🏠 Home
                </button>
                <button
                    className={`btn btn-outline-primary mx-2 ${activeTab === "image-generator" ? "active" : ""}`}
                    onClick={() => handleTabChange("image-generator")}
                >
                    🖼️ Image Generator
                </button>
                <button
                    className={`btn btn-outline-primary mx-2 ${activeTab === "chat" ? "active" : ""}`}
                    onClick={() => handleTabChange("chat")}
                >
                    💬 Ask AI
                </button>
                <button
                    className={`btn btn-outline-primary mx-2 ${activeTab === "recipe-generator" ? "active" : ""}`}
                    onClick={() => handleTabChange("recipe-generator")}
                >
                    🍽️ Recipe Generator
                </button>
            </div>

            {/* ✅ Tab Content */}
            <div className="mt-4">
                {activeTab === "home" && (
                    // 🔹 Replace text with your new dashboard
                    <Dashboard onSelectTab={handleTabChange} />
                )}
                {activeTab === "image-generator" && (
                    <ImageGenerator onReturnHome={() => handleTabChange("home")} />
                )}
                {activeTab === "chat" && (
                    <ChatComponent onReturnHome={() => handleTabChange("home")} />
                )}
                {activeTab === "recipe-generator" && (
                    <RecipeGenerator onReturnHome={() => handleTabChange("home")} />
                )}
            </div>
        </div>
    );
}

export default App;
