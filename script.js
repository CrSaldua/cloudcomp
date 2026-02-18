async function updateNBAOracle() {
    try {
        // 1. Fetch the local JSON file
        const response = await fetch('predictions.json');
        if (!response.ok) throw new Error("JSON file not found");
        
        const data = await response.json();

        // 2. Target OKC (Index 0 in your JSON)
        const okc = data.predictions[0]; 
        const predictionBox = document.getElementById('prediction-output');
        
        if (predictionBox && okc) {
            predictionBox.innerHTML = `
                <h1 style="font-size: 2.5rem; margin-bottom: 15px;">${okc.team}</h1>
                <p style="font-size: 1.2rem;">Playoff Prediction: <span style="color: #0f0;">${okc.playoff_prediction}</span></p>
                <p style="font-size: 1.2rem;">Model Confidence: <strong>${(okc.probability * 100)}%</strong></p>
                <hr style="margin: 20px 0; border-color: #333;">
                <p>Current Win PCT: ${okc.win_pct}</p>
            `;
        }

        // 3. Target Kings (Index 1 in your JSON)
        const kings = data.predictions[1];
        const accuracyBox = document.getElementById('accuracy-stat');
        
        if (accuracyBox && kings) {
            accuracyBox.innerHTML = `
                <h2 style="margin-bottom: 10px;">${kings.team}</h2>
                <p>Playoff Prediction: <strong style="color: #f00;">${kings.playoff_prediction}</strong></p>
                <p>Model Accuracy: <strong>${(data.model_metadata.accuracy * 100)}%</strong></p>
            `;
        }

    } catch (error) {
        console.error("Oracle Error:", error);
        document.getElementById('prediction-output').innerHTML = "<p>Error loading predictions.</p>";
    }
}

// 4. Ensure the script runs after the HTML is ready
document.addEventListener('DOMContentLoaded', updateNBAOracle);