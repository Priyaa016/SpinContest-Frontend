const API_URL = "https://spin-contest-backend-kmvqw6oqz-priyaas-projects-a6f9b310.vercel.app/";

async function loadLeaderboard() {
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

  leaderboard.forEach((p, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${p.name}</td>
      <td>${p.score}</td>
    `;
    table.appendChild(row);
  });
}

loadLeaderboard();
