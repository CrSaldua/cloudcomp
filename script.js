async function updateNBAOracle() {
    try {
        const response = await fetch('predictions.json');
        if (!response.ok) throw new Error("JSON file not found");
        
        const data = await response.json();

        // 1. Navigate to Western_Conference to find OKC
        // data.predictions.Western_Conference[0] is Oklahoma City Thunder
        const okc = data.predictions.Western_Conference[0]; 
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

        // 2. Navigate to Western_Conference to find a second team (e.g., Spurs)
        // Since Sacramento Kings are missing from your new JSON, we use the second team in the list
        const spurs = data.predictions.Western_Conference[1];
        const accuracyBox = document.getElementById('accuracy-stat');
        
        if (accuracyBox && spurs) {
            accuracyBox.innerHTML = `
                <h2 style="margin-bottom: 10px;">${spurs.team}</h2>
                <p>Playoff Prediction: <strong style="color: #0f0;">${spurs.playoff_prediction}</strong></p>
                <p>Overall Model Accuracy: <strong>${(data.model_metadata.accuracy * 100)}%</strong></p>
            `;
        }

    } catch (error) {
        console.error("Oracle Error:", error);
        document.getElementById('prediction-output').innerHTML = "<p>Error loading predictions. Check console for details.</p>";
    }
}

document.addEventListener('DOMContentLoaded', updateNBAOracle);