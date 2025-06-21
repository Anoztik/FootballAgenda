const apiKey = "28574115b75ee06b3fc3a5c1e73aebf1"; // Replace with your actual API key
const matchesContainer = document.getElementById("match-list");

// Get today's date in YYYY-MM-DD format
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
const day = String(today.getDate()).padStart(2, "0");
const formattedDate = `${year}-${month}-${day}`;

fetch(`https://v3.football.api-sports.io/fixtures?date=${formattedDate}`, {
  headers: {
    "x-apisports-key": apiKey,
  },
})
  .then((res) => res.json())
  .then((data) => {
    console.log("API Response:", data); // Debug log

    if (!data.response || data.response.length === 0) {
      matchesContainer.innerHTML =
        '<div class="no-matches">No matches scheduled for today.</div>';
      return;
    }

    let allMatchesHtml = "";
    data.response.forEach((match) => {
      const teams = match.teams;
      const league = match.league;
      const venue = match.fixture.venue;
      const referee = match.fixture.referee || "N/A";
      const matchTime = new Date(match.fixture.date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }); // Format time only

      const html = `
              <div class="match-box">
                <div class="league-info">${league.country.toUpperCase()}: ${league.name.toUpperCase()}</div>
                <div class="match-time">Kick-off: ${matchTime}</div>
                <div class="teams">
                  <div class="team">
                    <img src="${teams.home.logo}" alt="${teams.home.name}"><br>
                    <strong>${teams.home.name}</strong>
                  </div>
                  <div class="score">
                    ${match.goals.home !== null ? match.goals.home : "-"} -
                    ${match.goals.away !== null ? match.goals.away : "-"}
                  </div>
                  <div class="team">
                    <img src="${teams.away.logo}" alt="${teams.away.name}"><br>
                    <strong>${teams.away.name}</strong>
                  </div>
                </div>
                <div class="status">${match.fixture.status.long}</div>
                <div class="subtitle">${venue.name}, <strong>${
        venue.city
      }</strong></div>
                <div class="subtitle">Referee: 🧍‍♂️ ${referee}</div>
              </div>
            `;
      allMatchesHtml += html;
    });
    matchesContainer.innerHTML = allMatchesHtml;
  })
  .catch((err) => {
    console.error("Error fetching matches:", err);
    matchesContainer.innerHTML =
      '<div class="no-matches">Error loading match data. Please try again later.</div>';
  });
