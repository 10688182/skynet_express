const faqAnswers = {
  quote:
    "We usually respond to quote requests within 24 hours. Call us for urgent needs.",
  documents:
    "Typically required: commercial invoice, packing list, waybill, and any applicable licenses.",
  insurance:
    "Yes, we offer cargo insurance covering loss, damage, theft, and more.",
  track: "Use our online tracking portal. You'll need your tracking number.",
  payment:
    "We accept credit cards, bank transfers, and offer net 30 terms for approved accounts.",
  thank: "You are most welcome, thank you for choosing SkyNet Express Ltd.",
  hello: "Welcome to SkyNet Express Ltd, my name is Aseye. What is your name?",
  hi: "Welcome to SkyNet Express Ltd, my name is Aseye. What is your name?",
  hey: "Welcome to SkyNet Express Ltd, my name is Aseye. What is your name?",
  howareyou: "I'm doing great, thank you! How can I assist you today?",
  whereismypackage:
    "Use our online tracking portal. You'll need your tracking number.",
  cost: "",
};

// Office locations and contacts data
const officeContacts = {
  "head office": {
    address: "Adabla Plaza No.5 Asafoatse Oman Street, Kokomlemle, Accra",
    phone: "+233 24 205 0501 <br/> +233 30 223 0516",
    displayName: "Head Office (Accra)",
  },
  accra: {
    address: "Adabla Plaza No.5 Asafoatse Oman Street, Kokomlemle, Accra",
    phone: "+233 24 205 0501 <br/> +233 30 223 0516",
    displayName: "Accra",
  },
  kumasi: {
    address: "Ground floor Millenium Plaza Lake road, Asokwa, Kumasi",
    phone: "+233 59 167 1990 <br/> +233 24 228 6046 <br/> +233 26 455 5257",
    displayName: "Kumasi",
  },
  tema: {
    address: "Adjacent the Vodafone Office, Tema Comm. 1, Tema",
    phone: "+233 59 232 3661 <br/> +233 36 219 5280",
    displayName: "Tema",
  },
  takoradi: {
    address:
      "Office No.57 GPRTU Building, Opposite Takoradi Airport, 1st Takoradi Top 10",
    phone: "+233 55 815 1515 <br/> +233 30 394 4038",
    displayName: "Takoradi",
  },
  "cape coast": {
    address:
      "2nd floor SSNIT Office Complex Commercial Street, Near ABSA Bank, Cape Coast",
    phone: "+233 20 866 8299",
    displayName: "Cape Coast",
  },
  koforidua: {
    address:
      "2nd Floor Room 209, SSNIT Office Complex Building, Ogua, Koforidua",
    phone: "+233 59 891 8380 <br/> +233 35 239 1442",
    displayName: "Koforidua",
  },
  bolgatanga: {
    address: "1st Floor, SSNIT Building, Bolgatanga",
    phone: "+233 20 873 4447 <br/> +233 59 891 8467",
    displayName: "Bolgatanga",
  },
  ho: {
    address: "1st Floor, SSNIT Building Residence Road, Ho",
    phone: "+233 35 229 1441 <br/> +233 59 891 8363 <br/> +233 59 891 8457",
    displayName: "Ho",
  },
  wa: {
    address: "2nd Floor, Opp. SG-SSB Stanbic Bank building, Wa",
    phone: "+233 30 396 6467 <b/r> +233 59 222 9089",
    displayName: "Wa",
  },
  tamale: {
    address: "1st Floor Yamusah Building Gumbihini, Tamale",
    phone: "+233 59 891 8409",
    displayName: "Tamale",
  },
  sunyani: {
    address: "3rd Floor SSNIT Building, Area 1 Opp. The Post Office, Sunyani",
    phone: "+233 35 229 1432",
    displayName: "Sunyani",
  },
  tarkwa: {
    address: "2nd floor SSNIT Office Opposite the District Court, Tarkwa",
    phone: "+233 55 390 6700 <br/> +233 55 390 6496",
    displayName: "Tarkwa",
  },
};

// Map of alternative names and common misspellings for locations
const locationVariations = {
  "head office": [
    "head office",
    "main office",
    "headquarters",
    "accra head office",
    "principal office",
  ],
  accra: ["accra", "akra", "acra", "accra office", "accra branch"],
  kumasi: ["kumasi", "kumas", "kumasi office", "kumasi branch", "kumase"],
  tema: ["tema", "temma", "tema office", "tema branch", "temah"],
  takoradi: [
    "takoradi",
    "takordi",
    "takorade",
    "takoradi office",
    "takoradi branch",
  ],
  "cape coast": [
    "cape coast",
    "capecoast",
    "cape coast office",
    "capecoast office",
    "cc",
  ],
  koforidua: [
    "koforidua",
    "koforidua office",
    "koforidua branch",
    "kofridua",
    "koforiduah",
  ],
  bolgatanga: [
    "bolgatanga",
    "bolga",
    "bolgatanga office",
    "bolga office",
    "bolgatanga branch",
  ],
  ho: ["ho office", "ho branch", "ho volta", "ho town"],
  wa: ["wa office", "wa branch", "wa upper west", "wa town"],
  tamale: [
    "tamale",
    "tamale office",
    "tamale branch",
    "tamali",
    "tamale north",
  ],
  sunyani: [
    "sunyani",
    "sunyani office",
    "sunyani branch",
    "suniani",
    "sunyani bono",
  ],
  tarkwa: [
    "tarkwa",
    "tarkwah",
    "tarkwa office",
    "tarkwa branch",
    "tarkwa mine",
  ],
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
    "I'm sorry, I didn't understand that. Could you please rephrase?";

  // Check for specific keywords or phrases and assign corresponding reply
  if (lowerMsg.includes("quote")) {
    botReply = faqAnswers.quote;
  } else if (lowerMsg.includes("document")) {
    botReply = faqAnswers.documents;
  } else if (lowerMsg.includes("insurance")) {
    botReply = faqAnswers.insurance;
  } else if (lowerMsg.includes("track")) {
    botReply = faqAnswers.track;
  } else if (lowerMsg.includes("payment")) {
    botReply = faqAnswers.payment;
  } else if (lowerMsg.includes("thank")) {
    botReply = faqAnswers.thank;
  } else if (lowerMsg.includes("hello")) {
    botReply = faqAnswers.hello;
  } else if (lowerMsg.includes("hi")) {
    botReply = faqAnswers.hi;
  } else if (lowerMsg.includes("hey")) {
    botReply = faqAnswers.hey;
  } else if (lowerMsg.startsWith("my name is ")) {
    const name = userMsg.substring(11).trim();
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
    botReply = `Nice to meet you ${formattedName}. How may I help you today?`;
  } else if (
    lowerMsg.includes("how are you") ||
    lowerMsg.includes("how are you doing")
  ) {
    botReply = faqAnswers.howareyou;
  } else if (
    lowerMsg.includes("where is my parcel") ||
    lowerMsg.includes("where is my package")
  ) {
    botReply = faqAnswers.track;
  } else if (
    lowerMsg.includes("contact") ||
    lowerMsg.includes("phone") ||
    lowerMsg.includes("email") ||
    lowerMsg.includes("address")
  ) {
    // Handle contact information requests
    const location = findLocationInMessage(lowerMsg);
    if (location) {
      const office = officeContacts[location];
      botReply = `
        <div>Here are the contact details for our ${office.displayName} office:</div>
        <ul class="list-disc pl-5 mt-2 space-y-1">
          <li><strong>Address:</strong> ${office.address}</li>
          <li><strong>Phone:</strong> ${office.phone}</li>
        </ul>
      `;
    } else {
      botReply = `
        <div>Which branch office contact would you like? We have locations in:</div>
        <ul class="list-disc pl-5 mt-2">
          ${Object.values(officeContacts)
            .filter((office) => office.displayName !== "Head Office (Accra)")
            .map((office) => `<li>${office.displayName}</li>`)
            .join("")}
        </ul>
      `;
    }
  } else if (
    lowerMsg.includes("location") ||
    lowerMsg.includes("locate") ||
    lowerMsg.includes("where is") ||
    lowerMsg.includes("address") ||
    lowerMsg.includes("offices")
  ) {
    // Handle location requests
    const location = findLocationInMessage(lowerMsg);
    if (location) {
      const office = officeContacts[location];
      botReply = `
        <div>Our ${office.displayName} office is located at:</div>
        <ul class="list-disc pl-5 mt-2">
          <li>${office.address}</li>
        </ul>
      `;
    } else {
      botReply = `
        <div>We have offices in the following locations:</div>
        <ul class="list-disc pl-5 mt-2">
          ${Object.values(officeContacts)
            .filter((office) => office.displayName !== "Head Office (Accra)")
            .map((office) => `<li>${office.displayName}</li>`)
            .join("")}
        </ul>
        <div class="mt-2">Which location would you like information about?</div>
      `;
    }
  }

  setTimeout(() => {
    chatWindow.innerHTML += `<div class="text-left text-primary"><strong>Aseye:</strong> ${botReply}</div>`;
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, 600);

  input.value = "";
}

// Improved location matching function
function findLocationInMessage(message) {
  // First check for exact matches in office names
  for (const [location, data] of Object.entries(officeContacts)) {
    if (message.includes(location.toLowerCase())) {
      return location;
    }
  }

  // Then check for variations and alternative spellings
  for (const [location, variations] of Object.entries(locationVariations)) {
    for (const variation of variations) {
      if (message.includes(variation)) {
        return location;
      }
    }
  }

  // Finally, check for partial matches in display names
  for (const [location, data] of Object.entries(officeContacts)) {
    if (message.includes(data.displayName.toLowerCase())) {
      return location;
    }
  }

  return null;
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
