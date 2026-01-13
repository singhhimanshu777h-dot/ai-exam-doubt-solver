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
    .split("\n");

  answerBox.innerHTML = "";
  showLineByLine(answerBox, formatted, 350);
}

/* ✅ LINE BY LINE EFFECT */
function showLineByLine(element, lines, delay) {
  let index = 0;

  function showLineByLine(element, lines, delay) {
  let index = 0;

  function showNextLine() {
    if (index < lines.length) {
      element.innerHTML += lines[index] + "<br>";
      index++;

      // ✅ AUTO SCROLL (IMPORTANT)
      element.scrollIntoView({ behavior: "smooth", block: "end" });
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
      });

      setTimeout(showNextLine, delay);
    }
  }

  showNextLine();
  }

/* Loader hide */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => loader.style.display = "none", 500);
  }
});
