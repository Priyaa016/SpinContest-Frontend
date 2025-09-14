const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spinBtn");

const segments = ["Round 1", "Round 2", "Try Again"];
const colors = ["#FF5733", "#33FF57", "#3357FF"];

// backend base URL
const API_URL = "https://spin-contest-backend-kmvqw6oqz-priyaas-projects-a6f9b310.vercel.app/";

function drawWheel() {
  const arc = (2 * Math.PI) / segments.length;
  for (let i = 0; i < segments.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = colors[i];
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, 150, i * arc, (i + 1) * arc);
    ctx.fill();
    ctx.save();
    ctx.translate(150, 150);
    ctx.rotate(i * arc + arc / 2);
    ctx.fillStyle = "white";
    ctx.fillText(segments[i], 50, 10);
    ctx.restore();
  }
}
drawWheel();

spinBtn.addEventListener("click", () => {
  const choice = segments[Math.floor(Math.random() * segments.length)];

  // save spin result to backend
  fetch(`${API_URL}/api/participants/spin-result`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ result: choice })
  });

  setTimeout(() => {
    if (choice === "Round 1") window.location.href = "round1.html";
    else if (choice === "Round 2") window.location.href = "round2.html";
    else alert("Try again!");
  }, 1000);
});
