// js/leaderboard.js
const API_URL = "/api";

async function loadLeaderboard() {
  try {
    const res = await fetch(`${API_URL}/leaderboard`); // route: /api/leaderboard
    const leaderboard = await res.json();

    const tbody = document.getElementById("leaderboardTable");
    tbody.innerHTML = "";

    // backend returns Participant docs { name, score, ... }
    leaderboard.forEach((entry, index) => {
      const tr = document.createElement("tr");
      tr.classList.add(index % 2 === 0 ? "bg-white" : "bg-gray-50");
      tr.innerHTML = `
        <td class="px-4 py-2">${index + 1}</td>
        <td class="px-4 py-2">${entry.name}</td>
        <td class="px-4 py-2">${entry.score || 0}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error(err);
    alert("Failed to load leaderboard");
  }
}

loadLeaderboard();
