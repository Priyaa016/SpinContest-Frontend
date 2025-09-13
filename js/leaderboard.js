const backendURL = "https://spin-contest-backend.vercel.app/api";

async function loadLeaderboard() {
  const res = await fetch(`${backendURL}/leaderboard`);
  const data = await res.json();

  const table = document.getElementById("leaderboardTable");
  table.innerHTML = "";

  data.forEach((p, i) => {
    const row = `<tr>
      <td class="border px-4 py-2">${i + 1}</td>
      <td class="border px-4 py-2">${p.name}</td>
      <td class="border px-4 py-2">${p.score}</td>
    </tr>`;
    table.innerHTML += row;
  });
}

loadLeaderboard();
