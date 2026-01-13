async function askAI() {
  const questionInput = document.getElementById("question");
  const chatBox = document.getElementById("answer");

  const question = questionInput.value.trim();
  if (!question) return;

  // USER MESSAGE (Right side)
  addMessage(question, "user");

  questionInput.value = "";

  // AI typing bubble
  const typingBubble = addMessage("Typing...", "ai", true);

  try {
    const response = await fetch("/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question: "Write a proper exam-ready answer in points and paragraphs:\n" + question
      })
    });

    const data = await response.json();

    // Remove typing bubble
    typingBubble.remove();

    // AI RESPONSE (line by line)
    typeLineByLine(chatBox, data.answer);

  } catch (err) {
    typingBubble.innerText = "Error getting response ❌";
  }
}

/* ✅ ADD MESSAGE BUBBLE */
function addMessage(text, sender, isTemp = false) {
  const chatBox = document.getElementById("answer");

  const bubble = document.createElement("div");
  bubble.className = sender === "user" ? "chat user" : "chat ai";

  bubble.innerText = text;

  if (isTemp) bubble.id = "typing";

  chatBox.appendChild(bubble);
  autoScroll();

  return bubble;
}

/* ✅ LINE BY LINE TYPING */
function typeLineByLine(container, text) {
  const lines = text.split("\n");
  let index = 0;

  const bubble = document.createElement("div");
  bubble.className = "chat ai";
  container.appendChild(bubble);

  function showNextLine() {
    if (index < lines.length) {
      bubble.innerHTML += lines[index] + "<br>";
      index++;
      autoScroll();
      setTimeout(showNextLine, 300);
    }
  }

  showNextLine();
}

/* ✅ AUTO SCROLL */
function autoScroll() {
  const chatBox = document.getElementById("answer");
  chatBox.scrollTop = chatBox.scrollHeight;
}
