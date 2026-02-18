async function updateNBAOracle() {
    try {
        const response = await fetch('predictions.json');
        const data = await response.json();

        // Target your HTML elements (OKC Thunder)
        const okc = data.predictions[0];
        document.getElementById('prediction-output').innerHTML = `
            <h3>${okc.team}</h3>
            <p>Playoff Prediction: <strong>${okc.playoff_prediction}</strong></p>
            <p>Model Confidence: ${(okc.probability * 100)}%</p>
        `;

        // Target your second box (Sacramento Kings)
        const kings = data.predictions[1];
        const accuracyBox = document.getElementById('accuracy-stat');
        if (accuracyBox) {
            accuracyBox.innerHTML = `
                <h3>${kings.team}</h3>
                <p>Playoff Prediction: <strong>${kings.playoff_prediction}</strong></p>
                <p>Model Accuracy: ${(data.model_metadata.accuracy * 100)}%</p>
            `;
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
}
updateNBAOracle();