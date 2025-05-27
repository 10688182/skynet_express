const faqAnswers = {
  quote:
    "We usually respond to quote requests within 24 hours. Call us for urgent needs.",
  documents:
    "Typically required: commercial invoice, packing list, waybill, and any applicable licenses.",
  insurance:
    "Yes, we offer cargo insurance covering loss, damage, theft, and more.",
  track: "Use our online tracking portal. You’ll need your tracking number.",
  payment:
    "We accept credit cards, bank transfers, and offer net 30 terms for approved accounts.",
  thank: "You are most welcome, thank you for choosing SkyNet Express Ltd.",
  hello: "Welcome to SkyNet Express Ltd, my name is Kofi. What is your name?",
  hi: "Welcome to SkyNet Express Ltd, my name is Kofi. What is your name?",
  howareyou: "I'm doing great, thank you! How can I assist you today?",
  whereismypackage:
    "Use our online tracking portal. You’ll need your tracking number.",
};

function toggleChatbot() {
  const chat = document.getElementById("chatbot-container");
  chat.classList.toggle("hidden");
}

document.getElementById("start-chat").addEventListener("click", () => {
  toggleChatbot();
});

function sendMessage() {
  const input = document.getElementById("chat-input");
  const chatWindow = document.getElementById("chat-window");
  const userMsg = input.value.trim();
  if (!userMsg) return;

  // Show user's message
  chatWindow.innerHTML += `<div class="text-right text-gray-800"><strong>You:</strong> ${userMsg}</div>`;

  // Simple keyword-based reply
  const lowerMsg = userMsg.toLowerCase();
  let botReply =
    "I'm sorry, I didn’t understand that. Could you please rephrase?";

  if (lowerMsg.includes("quote")) botReply = faqAnswers.quote;
  else if (lowerMsg.includes("document")) botReply = faqAnswers.documents;
  else if (lowerMsg.includes("insurance")) botReply = faqAnswers.insurance;
  else if (lowerMsg.includes("track")) botReply = faqAnswers.track;
  else if (lowerMsg.includes("payment")) botReply = faqAnswers.payment;
  else if (lowerMsg.includes("thank")) botReply = faqAnswers.thank;
  else if (lowerMsg.includes("hello")) botReply = faqAnswers.hello;
  else if (lowerMsg.includes("hi")) botReply = faqAnswers.hi;
  else if (lowerMsg.startsWith("my name is ")) {
    const name = userMsg.substring(11).trim();
    botReply = `Nice to meet you ${
      name.charAt(0).toUpperCase() + name.slice(1)
    }. How may I help you today?`;
  } else if (
    lowerMsg.includes("how are you") ||
    lowerMsg.includes("how are you doing")
  )
    botReply = faqAnswers.howareyou;
  else if (
    lowerMsg.includes("where is my parcel") ||
    lowerMsg.includes("where is my shipment") ||
    lowerMsg.includes("where is my package")
  )
    botReply = faqAnswers.whereismypackage;

  setTimeout(() => {
    chatWindow.innerHTML += `<div class="text-left text-primary"><strong>Kofi:</strong> ${botReply}</div>`;
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, 600);

  input.value = "";
}

function toggleChatbot() {
  const chat = document.getElementById("chatbot-container");
  const toggleBtn = document.getElementById("chatbot-toggle");

  chat.classList.toggle("hidden");

  if (!chat.classList.contains("hidden")) {
    toggleBtn.classList.remove("bottom-4");
    toggleBtn.classList.add("bottom-28"); // Moves it up
  } else {
    toggleBtn.classList.remove("bottom-28");
    toggleBtn.classList.add("bottom-4"); // Moves it back down
  }
}

// Listen for Enter key on input field
document
  .getElementById("chat-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage(); // Call the same function as the send button
    }
  });
