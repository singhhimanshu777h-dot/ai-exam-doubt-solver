async function askAI() {
  const question = document.getElementById("question").value;
  const answerBox = document.getElementById("answer");

  answerBox.innerHTML = "🤖 Thinking...";

  const response = await fetch("/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      question: "Write a proper exam-ready answer in simple points and paragraphs:\n" + question
    })
  });

  const data = await response.json();

  let formatted = data.answer
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
    .replace(/\n/g, "<br>");

  typeWriter(answerBox, formatted, 18);
}

/* 🔥 Typing Effect */
function typeWriter(element, text, speed) {
  element.innerHTML = "";
  let i = 0;

  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }

  typing();
}

/* Loader hide */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => loader.style.display = "none", 500);
  }
});
