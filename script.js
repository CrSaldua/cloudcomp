async function updateNBAOracle() {
    try {
        const response = await fetch('predictions.json');
        if (!response.ok) throw new Error("JSON file not found.");

        const data = await response.json();

        // West
        const westContainer = document.getElementById('west-list');
        let westHTML = "";

        if (data.predictions?.Western_Conference) {
            data.predictions.Western_Conference.forEach(team => {

                // Skip any "nan" or null entries
                if (!team.team || team.team.includes("nan")) return;

                westHTML += `
                    <li class="team-item">
                        <div class="team-info">
                            <img src="${getTeamLogo(team.team)}" style="width:30px;">
                            <span class="team-name">${team.team}</span>
                        </div>
                        <div class="team-stats">
                            <span>Win PCT: ${team.win_pct} Conf: ${Math.round(team.probability * 100)}%</span>
                        </div>
                        <div class="status-badge">${team.playoff_prediction}</div>
                    </li>
                `;
            });

            westContainer.innerHTML = westHTML;
        }

        // East
        const eastContainer = document.getElementById('east-list');
        let eastHTML = "";

        if (data.predictions?.Eastern_Conference) {
            data.predictions.Eastern_Conference.forEach(team => {

                // Skip any "nan" or null entries
                if (!team.team || team.team.includes("nan")) return;

                eastHTML += `
                    <li class="team-item">
                        <div class="team-info">
                            <img src="${getTeamLogo(team.team)}" style="width:30px;">
                            <span class="team-name">${team.team}</span>
                        </div>
                        <div class="team-stats">
                            <span>Win PCT: ${team.win_pct} Conf: ${Math.round(team.probability * 100)}%</span>
                        </div>
                        <div class="status-badge">${team.playoff_prediction}</div>
                    </li>
                `;
            });

            eastContainer.innerHTML = eastHTML;
        }

        // FIXED: Changed target_variable to target to match your JSON
        if (data.model_metadata) {
            document.getElementById('model-stats').innerHTML = 
                `Accuracy: ${(data.model_metadata.accuracy * 100)}%`;
        }

    } catch (error) {
        console.error(error);
    }
}
