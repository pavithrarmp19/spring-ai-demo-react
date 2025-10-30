import React, { useState } from "react";
import "./ImageGenerator.css";

function ImageGenerator({ onBack }) {
    const [prompt, setPrompt] = useState("");
    const [imageUrls, setImageUrls] = useState([]);
    const [loading, setLoading] = useState(false);

    const generateImage = async () => {
        if (!prompt.trim()) return;
        setLoading(true);
        setImageUrls([]);

        try {
            const response = await fetch(`http://localhost:8080/generate-image?prompt=${encodeURIComponent(prompt)}`);
            const data = await response.json();

            // ✅ ensure always an array
            const urls = Array.isArray(data) ? data : [data];
            setImageUrls(urls.filter(Boolean)); // remove null/undefined
        } catch (error) {
            console.error("Error generating image:", error);
            setImageUrls([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="image-gen-container">
            <div className="image-gen-box">
                <h2>🖼️ AI Image Generator</h2>
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter image description..."
                />
                <button onClick={generateImage}>Generate</button>

                {loading ? (
                    <p>⏳ Generating image...</p>
                ) : imageUrls.length > 0 ? (
                    <div className="image-grid">
                        {imageUrls.map((url, index) => (
                            <img key={index} src={url} alt={`Generated ${index}`} />
                        ))}
                    </div>
                ) : (
                    <p>No Image</p>
                )}

                <button className="back-btn" onClick={onBack}>🏠 Return to Home</button>
            </div>
        </div>
    );
}

export default ImageGenerator;
