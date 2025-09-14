const API_URL = "https://spin-contest-backend-bw3aywx4h-priyaas-projects-a6f9b310.vercel.app";

// load quiz questions
async function loadQuiz() {
  const res = await fetch(`${API_URL}/api/quiz`);
  const questions = await res.json();

  const quizContainer = document.getElementById("quiz");
  quizContainer.innerHTML = "";

  questions.forEach((q, i) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${i + 1}. ${q.question}</p>
      ${q.options.map(opt => `<button onclick="submitAnswer('${q._id}', '${opt}')">${opt}</button>`).join("")}
    `;
    quizContainer.appendChild(div);
  });
}

// submit answer
async function submitAnswer(questionId, answer) {
  const res = await fetch(`${API_URL}/api/quiz/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ questionId, answer, participantId: "12345" }) // replace with actual logged-in participant
  });

  const result = await res.json();
  alert(result.message);
}

loadQuiz();
