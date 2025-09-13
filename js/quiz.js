// Detect which round we are in (from HTML file name)
const round = window.location.pathname.includes("round1") ? "round1" : "round2";

const API_BASE = "https://spin-contest-backend-pale1mbhp-priyaas-projects-a6f9b310.vercel.app/api";

async function loadQuiz() {
  try {
    const res = await fetch(`${API_BASE}/quiz/${round}`);
    const data = await res.json();

    const quizContainer = document.getElementById("quiz");
    quizContainer.innerHTML = "";

    data.questions.forEach((q, i) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <p>${i + 1}. ${q.question}</p>
        ${q.options.map(opt => `<label><input type="radio" name="q${i}" value="${opt}"> ${opt}</label><br>`).join("")}
      `;
      quizContainer.appendChild(div);
    });

    const btn = document.createElement("button");
    btn.innerText = "Submit";
    btn.onclick = submitQuiz;
    quizContainer.appendChild(btn);
  } catch (err) {
    console.error("❌ Failed to load quiz:", err);
  }
}

async function submitQuiz() {
  const answers = {};
  document.querySelectorAll("input[type=radio]:checked").forEach(input => {
    answers[input.name] = input.value;
  });

  try {
    const res = await fetch(`${API_BASE}/quiz/${round}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers })
    });
    const data = await res.json();
    alert(`✅ Score: ${data.score}`);
    window.location.href = "leaderboard.html";
  } catch (err) {
    console.error("❌ Error submitting quiz:", err);
  }
}

loadQuiz();
