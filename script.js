async function updateNBAOracle() {
    try {
        const response = await fetch('predictions.json');
        if (!response.ok) throw new Error("Could not fetch data"); // Check if file exists
        
        const data = await response.json();
        const { predictions, model_metadata } = data;

        // 1. Dynamic Find: Locates the team regardless of its position in the array
        const okc = predictions.find(p => p.team.includes("Thunder"));
        const kings = predictions.find(p => p.team.includes("Kings"));

        // 2. Safe Update for OKC
        const okcBox = document.getElementById('prediction-output');
        if (okc && okcBox) {
            okcBox.innerHTML = `
                <h3>${okc.team}</h3>
                <p>Playoff Prediction: <strong>${okc.playoff_prediction}</strong></p>
                <p>Model Confidence: ${Math.round(okc.probability * 100)}%</p>
            `;
        }

        // 3. Safe Update for Kings + Metadata
        const accuracyBox = document.getElementById('accuracy-stat');
        if (kings && accuracyBox) {
            accuracyBox.innerHTML = `
                <h3>${kings.team}</h3>
                <p>Playoff Prediction: <strong>${kings.playoff_prediction}</strong></p>
                <p>Overall Model Accuracy: ${Math.round(model_metadata.accuracy * 100)}%</p>
            `;
        }

    } catch (error) {
        console.error("NBA Oracle Error:", error);
        // Optional: Show a "Service Unavailable" message to the user
    }
}