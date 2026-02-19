const teamIds = {
            "Oklahoma City Thunder": "1610612760", "San Antonio Spurs": "1610612759", "Denver Nuggets": "1610612743", "Houston Rockets": "1610612745", "Los Angeles Lakers": "1610612747", "Minnesota Timberwolves": "1610612750", "Phoenix Suns": "1610612756", "Golden State Warriors": "1610612744", "Detroit Pistons": "1610612765", "Boston Celtics": "1610612738", "New York Knicks": "1610612752", "Cleveland Cavaliers": "1610612739", "Toronto Raptors": "1610612761", "Philadelphia 76ers": "1610612755", "Orlando Magic": "1610612753", "Miami Heat": "1610612748", "Atlanta Hawks": "1610612737", "Brooklyn Nets": "1610612751", "Charlotte Hornets": "1610612766", "Chicago Bulls": "1610612741", "Dallas Mavericks": "1610612742", "Indiana Pacers": "1610612754", "LA Clippers": "1610612746", "Memphis Grizzlies": "1610612763", "Milwaukee Bucks": "1610612749", "New Orleans Pelicans": "1610612740", "Portland Trail Blazers": "1610612757", "Sacramento Kings": "1610612758", "Utah Jazz": "1610612762", "Washington Wizards": "1610612764"
        };

        function getTeamLogo(teamName) {
            const id = teamIds[teamName];
            return id ? `https://cdn.nba.com/logos/nba/${id}/primary/L/logo.svg` : "https://cdn.nba.com/logos/leagues/logo-nba.svg"; 
        }

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
                            </li>`;
                    });
                    westContainer.innerHTML = westHTML;
                }

                // East
                const eastContainer = document.getElementById('east-list');
                let eastHTML = "";
                if (data.predictions?.Eastern_Conference) {
                    data.predictions.Eastern_Conference.forEach(team => {
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
                            </li>`;
                    });
                    eastContainer.innerHTML = eastHTML;
                }
                
                if (data.model_metadata) {
                    document.getElementById('model-stats').innerHTML = 
                        `Accuracy: ${(data.model_metadata.accuracy * 100)}%`;
                }

            } catch (error) {
                console.error(error);
            }
        }

        function hideAllViews() {
            document.getElementById('home-content').style.display = 'none';
            document.getElementById('prediction-content').style.display = 'none';
            document.getElementById('games-content').style.display = 'none';
            document.getElementById('stats-content').style.display = 'none';
            document.getElementById('teams-content').style.display = 'none';
            
            // Remove active classes from nav links
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => link.classList.remove('active'));
        }

        function showHome() {
            hideAllViews();
            document.getElementById('home-content').style.display = 'block';
        }

        function showPredictions() {
            hideAllViews();
            document.getElementById('prediction-content').style.display = 'block';
            event.target.classList.add('active');
        }

        function showGames() {
            hideAllViews();
            document.getElementById('games-content').style.display = 'block';
            event.target.classList.add('active');
        }

        function showStats() {
            hideAllViews();
            document.getElementById('stats-content').style.display = 'block';
            event.target.classList.add('active');
        }
        
        function showTeams() {
            hideAllViews();
            document.getElementById('teams-content').style.display = 'block';
            event.target.classList.add('active');
        }

        document.addEventListener('DOMContentLoaded', updateNBAOracle);