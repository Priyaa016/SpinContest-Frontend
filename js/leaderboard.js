const API_URL = "https://spin-contest-backend-bw3aywx4h-priyaas-projects-a6f9b310.vercel.app";

async function loadLeaderboard() {
  try {
    const res = await fetch(`${API_URL}/api/leaderboard`);
    const leaderboard = await res.json();

    const table = document.getElementById("leaderboard");
    table.innerHTML = `
      <tr>
        <th>Rank</th>
        <th>Name</th>
        <th>Score</th>
      </tr>
    `;

    leaderboard.forEach((entry, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${entry.participant.name}</td>
        <td>${entry.round1 + entry.round2}</td>
      `;
      table.appendChild(row);
    });
  } catch (err) {
    console.error(err);
    alert("Failed to load leaderboard");
  }
}

loadLeaderboard();
