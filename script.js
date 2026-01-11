async function askAI() {
  const question = document.getElementById("question").value;

  // Loading message
  document.getElementById("answer").innerHTML = "🤖 Thinking...";

  try {
    const response = await fetch("/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question: question })
    });

    const data = await response.json();

    document.getElementById("answer").innerHTML =
      data.answer.replace(/\n/g, "<br>");

  } catch (error) {
    document.getElementById("answer").innerHTML =
      "❌ Error: Server not responding";
  }
}
