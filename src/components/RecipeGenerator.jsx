import React, { useState, useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import "./RecipeGenerator.css";

function RecipeGenerator({ onReturnHome }) {
    const [ingredients, setIngredients] = useState("");
    const [cuisine, setCuisine] = useState("any");
    const [dietaryRestrictions, setDietaryRestrictions] = useState("");
    const [recipe, setRecipe] = useState("");

    const createRecipe = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/recipe-creator?ingredients=${ingredients}&dietaryRestrictions=${dietaryRestrictions}&cuisine=${cuisine}`
            );
            const data = await response.text();
            setRecipe(data);
        } catch (error) {
            console.error("Error generating recipe:", error);
        }
    };

    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <div className="recipe-bg-light bubbles-light position-fixed top-0 start-0 w-100 h-100 overflow-hidden">
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={{
                    background: { color: { value: "transparent" } },
                    fpsLimit: 60,
                    interactivity: {
                        events: { onHover: { enable: true, mode: "repulse" } },
                        modes: { repulse: { distance: 100 } },
                    },
                    particles: {
                        color: { value: "#9bbcff" },
                        move: { enable: true, speed: 0.8 },
                        number: { value: 50 },
                        opacity: { value: 0.4 },
                        size: { value: 3 },
                    },
                }}
            />

            <div
                className="glass-card-light text-dark shadow-lg p-4 position-absolute top-50 start-50 translate-middle"
                style={{
                    width: "480px",
                    borderRadius: "20px",
                    zIndex: 10,
                }}
            >
                <h3 className="text-center mb-4 fw-bold text-gradient">🍝 Recipe Generator</h3>

                <input
                    type="text"
                    className="form-control mb-3"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    placeholder="Enter ingredients (comma separated)"
                />

                <input
                    type="text"
                    className="form-control mb-3"
                    value={cuisine}
                    onChange={(e) => setCuisine(e.target.value)}
                    placeholder="Enter cuisine type (any for all)"
                />

                <input
                    type="text"
                    className="form-control mb-3"
                    value={dietaryRestrictions}
                    onChange={(e) => setDietaryRestrictions(e.target.value)}
                    placeholder="Enter dietary restrictions (optional)"
                />

                <button onClick={createRecipe} className="btn btn-gradient w-100 fw-bold mb-3">
                    🍽️ Generate Recipe
                </button>

                <div className="output mt-3 mb-3">
                    <pre className="recipe-text-light">{recipe}</pre>
                </div>

                <button onClick={onReturnHome} className="btn btn-outline-gradient w-100 fw-bold">
                    ⬅ Return to Dashboard
                </button>
            </div>
        </div>
    );
}

export default RecipeGenerator;
