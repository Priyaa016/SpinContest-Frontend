const API_BASE = "https://spin-contest-backend-pale1mbhp-priyaas-projects-a6f9b310.vercel.app/api";

async function loadLeaderboard() {
  try {
    const res = await fetch(`${API_BASE}/leaderboard`);
    const data = await res.json();

    const leaderboard = document.getElementById("leaderboard");
    leaderboard.innerHTML = `
      <tr><th>Rank</th><th>Name</th><th>Score</th></tr>
    `;

    data.forEach((p, i) => {
      leaderboard.innerHTML += `
        <tr>
          <td>${i + 1}</td>
          <td>${p.name}</td>
          <td>${p.score}</td>
        </tr>
      `;
    });
  } catch (err) {
    console.error("❌ Failed to load leaderboard:", err);
  }
}

loadLeaderboard();
