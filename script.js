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
  document.getElementById("answer").innerHTML =
    data.answer.replace(/\n/g, "<br><br>");
}
