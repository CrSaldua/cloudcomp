async function updateNBAOracle() {
    try {
        const response = await fetch('predictions.json');
        if (!response.ok) throw new Error("JSON file not found");
        
        const data = await response.json();

        // 1. Update Western Conference
        const westContainer = document.getElementById('west-predictions');
        let westHTML = "";
        data.predictions.Western_Conference.forEach(team => {
            westHTML += `
                <div style="background: #1a1a1a; padding: 15px; margin-bottom: 10px; border-radius: 4px; border-left: 4px solid #c00;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <strong>${team.team}</strong>
                        <span style="color: #0f0;">${team.playoff_prediction}</span>
                    </div>
                    <div style="font-size: 12px; color: #aaa; margin-top: 5px;">
                        Win PCT: ${team.win_pct} | Confidence: ${(team.probability * 100)}%
                    </div>
                </div>
            `;
        });
        westContainer.innerHTML = westHTML;

        // 2. Update Eastern Conference
        const eastContainer = document.getElementById('east-predictions');
        let eastHTML = "";
        data.predictions.Eastern_Conference.forEach(team => {
            eastHTML += `
                <div style="background: #1a1a1a; padding: 15px; margin-bottom: 10px; border-radius: 4px; border-left: 4px solid #0066cc;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <strong>${team.team}</strong>
                        <span style="color: #0f0;">${team.playoff_prediction}</span>
                    </div>
                    <div style="font-size: 12px; color: #aaa; margin-top: 5px;">
                        Win PCT: ${team.win_pct} | Confidence: ${(team.probability * 100)}%
                    </div>
                </div>
            `;
        });
        eastContainer.innerHTML = eastHTML;

        // 3. Update Model Metadata
        const statsBox = document.getElementById('model-stats');
        statsBox.innerHTML = `
            <p style="color: #aaa;">Model Accuracy: <strong style="color: white;">${(data.model_metadata.accuracy * 100)}%</strong></p>
            <p style="color: #aaa;">Target: ${data.model_metadata.target_variable}</p>
        `;

    } catch (error) {
        console.error("Oracle Error:", error);
        document.getElementById('west-predictions').innerHTML = "<p>Error loading predictions.</p>";
    }
}

document.addEventListener('DOMContentLoaded', updateNBAOracle);