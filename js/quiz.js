// js/quiz.js
const API_URL = "/api";
const quizContainer = document.getElementById("quizContainer");

async function loadQuiz() {
  try {
    const res = await fetch(`${API_URL}/quiz`); // this will call GET /api/quiz
    const questions = await res.json();
    quizContainer.innerHTML = "";

    questions.forEach((q, i) => {
      const div = document.createElement("div");
      div.className = "mb-4 p-3 bg-white rounded shadow";
      div.innerHTML = `
        <p class="font-semibold">${i + 1}. ${q.question}</p>
        <div id="opts-${q._id}">${q.options.map(opt => `<button class="m-1 px-3 py-1 rounded border" onclick="submitAnswer('${q._id}', '${opt.replace(/'/g, "\\'")}')">${opt}</button>`).join("")}</div>
      `;
      quizContainer.appendChild(div);
    });
  } catch (err) {
    console.error(err);
    quizContainer.innerHTML = "<p>Failed to load quiz</p>";
  }
}

async function submitAnswer(questionId, answer) {
  try {
    const participantId = localStorage.getItem("participantId");
    if (!participantId) return alert("You must register first");

    const res = await fetch(`${API_URL}/quiz/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId, answer, participantId })
    });

    const result = await res.json();
    alert(result.message || (result.correct ? "Correct" : "Incorrect"));
  } catch (err) {
    console.error(err);
    alert("Failed to submit answer");
  }
}

loadQuiz();
