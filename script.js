async function ask() {
  const q = document.getElementById("question").value;

  const res = await fetch("https://YOUR_BACKEND_LINK/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question: q })
  });

  const data = await res.json();
  document.getElementById("answer").innerText = data.answer;
}