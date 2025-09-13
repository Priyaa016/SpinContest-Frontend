const backendURL = "https://spin-contest-backend.vercel.app/api";

async function loadQuiz(round) {
  const res = await fetch(`${backendURL}/quiz/${round}`);
  const questions = await res.json();

  const quizContainer = document.getElementById("quizContainer");
  quizContainer.innerHTML = "";

  questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.classList.add("mb-4", "p-3", "border", "rounded", "bg-white");
    div.innerHTML = `
      <p class="font-bold">${index + 1}. ${q.question}</p>
      ${q.options.map(opt => `
        <label class="block">
          <input type="radio" name="q${index}" value="${opt}"> ${opt}
        </label>
      `).join("")}
    `;
    quizContainer.appendChild(div);
  });

  document.getElementById("submitQuiz").onclick = () => {
    window.location.href = "thankyou.html";
  };
}

// Detect round from filename
if (window.location.pathname.includes("round1.html")) loadQuiz(1);
if (window.location.pathname.includes("round2.html")) loadQuiz(2);
