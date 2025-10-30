import React, { useState, useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import "./ChatComponent.css";

function ChatComponent({ onReturnHome }) {
    const [prompt, setPrompt] = useState("");
    const [chatResponse, setChatResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const askAI = async () => {
        if (!prompt.trim()) return;
        setLoading(true);
        setChatResponse("");

        try {
            const response = await fetch(`http://localhost:8080/ask-ai?prompt=${encodeURIComponent(prompt)}`);
            const data = await response.text();
            setChatResponse(data);
        } catch (error) {
            console.error("Error generating response:", error);
            setChatResponse("⚠️ Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <div className="chat-bg-dark position-fixed top-0 start-0 w-100 h-100 overflow-hidden">
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={{
                    background: { color: { value: "#000" } },
                    fpsLimit: 60,
                    particles: {
                        number: { value: 60 },
                        color: { value: ["#00FFFF", "#FF00FF", "#00FFAA"] },
                        shape: { type: "circle" },
                        opacity: {
                            value: 0.4,
                            random: true,
                            anim: { enable: true, speed: 0.6, opacity_min: 0.1 },
                        },
                        size: {
                            value: 4,
                            random: true,
                            anim: { enable: true, speed: 2, size_min: 0.3 },
                        },
                        move: {
                            enable: true,
                            speed: 1,
                            direction: "none",
                            outModes: { default: "bounce" },
                        },
                    },
                    interactivity: {
                        events: { onHover: { enable: true, mode: "repulse" } },
                        modes: { repulse: { distance: 100 } },
                    },
                }}
            />

            <div
                className="card glass-card text-light shadow-lg p-4 position-absolute top-50 start-50 translate-middle"
                style={{
                    width: "460px",
                    borderRadius: "20px",
                    zIndex: 10,
                }}
            >
                <h3 className="text-center neon-text mb-4">💬 Talk to AI</h3>

                <input
                    type="text"
                    className="form-control mb-3 bg-transparent text-light border-glow"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your message..."
                />

                <button
                    onClick={askAI}
                    className="btn btn-neon w-100 fw-bold mb-3"
                    disabled={loading}
                >
                    {loading ? "Thinking..." : "Ask AI"}
                </button>

                <div className="output mt-3">
                    <pre className="chat-text">{chatResponse || "💭 Waiting for your input..."}</pre>
                </div>

                <button onClick={onReturnHome} className="btn btn-outline-warning w-100 fw-bold mt-3">
                    ⬅ Return to Dashboard
                </button>
            </div>
        </div>
    );
}

export default ChatComponent;
