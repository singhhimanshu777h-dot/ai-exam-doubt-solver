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
