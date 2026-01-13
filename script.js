async function askAI() {
  const question = document.getElementById("question").value;

  document.getElementById("answer").innerHTML = "🤖 Thinking...";

  const response = await fetch("/ask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    
    body: JSON.stringify({question: "Write a proper exam-ready answer in simple points and paragraphs:\n" + question })});

  const data = await response.json();
  let formatted = data.answer
  .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
  .replace(/\n/g, "<br>");
document.getElementById("answer").innerHTML = formatted;
}
// Hide loader when page fully loads
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => loader.style.display = "none", 500);
  }
});
