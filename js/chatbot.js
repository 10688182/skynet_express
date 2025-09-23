const faqAnswers = {
  quote:
    "We usually respond to quote requests within 24 hours. Call us for urgent needs.",
  documents:
    "Typically required: commercial invoice, packing list, waybill, and any applicable licenses.",
  okay: "Is there anything else you need help with?",
  ok: "Is there anything else you need help with?",
  alright: "Is there anything else you need help with?",
  track: "Use our online tracking portal. You'll need your tracking number.",
  yes: "What else can I help you with?",
  no: "Alright then, thank you for choosing SkyNet Express Ltd.",
  thank: "You are most welcome, thank you for choosing SkyNet Express Ltd.",
  hello: "Welcome to SkyNet Express Ltd, my name is SkyBot. What is your name?",
  hi: "Welcome to SkyNet Express Ltd, my name is SkyBot. What is your name?",
  hey: "Welcome to SkyNet Express Ltd, my name is SkyBot. What is your name?",
  howareyou: "I'm doing great, thank you! How can I assist you today?",
  whereismypackage:
    "Use our online tracking portal. You'll need your tracking number.",
  cost: "For pricing information, please contact our Head Office directly: +233 24 205 0501",
  temu: "Please note: SkyNet Express Ltd is not affiliated with Temu, the online shopping platform. We only handle shipments booked directly with us.",
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

// Comprehensive list of Ghanaian locations by region
const ghanaLocations = {
  "greater accra": [
    "accra",
    "tema",
    "madina",
    "kissieman",
    "frafraha",
    "pantang",
    "oyarifa",
    "haatso",
    "pokuase",
    "asylum down",
    "new ningo",
    "old ningo",
    "ogbodjo",
    "amrahia",
    "lakeside",
    "abosseyokai",
    "amasaman",
    "jamestown",
    "dansoman",
    "osu",
    "labone",
    "cantonment",
    "kwashieman",
    "awoshie",
    "airport residential area",
    "south industrial area",
    "north industrial area",
    "alajo",
    "burma camp",
    "adjiringanor",
    "east legon",
    "west legon",
    "north legon",
    "madina",
    "adenta",
    "legon",
    "adenta",
    "akwetemang",
    "ashongman",
    "ablekuma",
    "alhaji",
    "nyamekye",
    "lapaz",
    "mile 7",
    "taifa",
    "achimota",
    "circle",
    "kaneshie",
    "darkuman",
    "odorkor",
    "mataheko",
    "kweiman",
    "kasoa",
    "amonom",
    "weija",
    "gbawe",
    "mccarthy hill",
    "tantra hill",
    "tabora",
    "fadama",
    "abeka",
    "nima",
    "mamobi",
    "newtown",
    "korle bu",
    "jamestown",
    "chorkor",
    "kokomlemle",
    "adanchi",
    "laterbiokorshie",
    "dzorwulu",
    "roman ridge",
    "cantonments",
    "labadi",
    "parakuo estate",
    "teshie",
    "nungua",
    "spintex",
    "sakumono",
    "batsonaa",
    "community 18",
    "community 25",
    "ashiaman",
    "afienya",
    "dawhenya",
    "prampram",
  ],
  "ashanti region": [
    "kumasi",
    "asanteman",
    "suame",
    "asokwa",
    "bantama",
    "manhyia",
    "tafo",
    "atem",
    "kwadaso",
    "ahodwo",
    "nhyiaeso",
    "abuakwa",
    "effiduase",
    "konongo",
    "agyakoo",
    "mampong",
    "bekwai",
    "obuasj",
    "ejisu",
    "oforikrom",
    "atonsu",
    "chirapatre",
    "ayigya",
    "bohyen",
    "patasi",
    "tanoso",
    "abrepo",
    "buokrom",
    "sepe",
    "tikrom",
    "deduako",
    "fomena",
    "jacobu",
    "nyinahin",
    "ahinsan",
    "esreso",
    "atimatim",
    "akropong",
    "beposo",
    "adankwame",
    "abira",
    "dompoase",
    "adum",
  ],
  "central region": [
    "cape coast",
    "elmina",
    "saltpond",
    "winneba",
    "kasoa",
    "agona swedru",
    "dunkwa",
    "assenfosman",
    "breman",
    "mankessim",
    "abura",
    "domeabra",
    "apam",
    "gomoa",
    "ekumfi",
    "ajumako",
    "enyan",
    "asikuma",
    "obon",
    "biriwa",
    "anomabo",
    "moree",
    "kormantse",
    "nyakrom",
    "agona",
    "awutu",
    "senya",
    "berekum",
    "bawjiase",
    "nsawam",
    "nsutam",
    "awoshie",
    "awutu",
    "effutu",
  ],
  "eastern region": [
    "koforidua",
    "nsawam",
    "suhum",
    "akim",
    "osen",
    "akwatia",
    "asamankese",
    "akropong",
    "mamfe",
    "akim oda",
  ],
  "western region": [
    "takoradi",
    "sekondi",
    "tarkwa",
    "axim",
    "prestea",
    "huni valley",
    "bogoso",
    "daboase",
    "shama",
    "elubo",
    "half assini",
    "asankragwa",
    "wassa",
    "akontombra",
    "nsuaem",
    "adjoa",
    "benso",
    "awudua",
    "abura",
    "dixcove",
    "princes town",
    "esiama",
    "nkroful",
    "atem",
    "bogoso",
    "prestea",
    "huni valley",
    "tarkwa",
    "axim",
    "sekondi",
  ],
  "volta region": [
    "ho",
    "hohoe",
    "keta",
    "akatsi",
    "kpetoe",
    "ave",
    "kpeve",
    "peki",
    "ada",
    "sogakope",
    "akuse",
    "adaklu",
    "aflao",
    "kpoeta",
    "tsito",
    "aveme",
    "anyirawase",
    "abutia",
    "klefe",
    "zongo",
    "adidome",
  ],
  "brong ahafo": [
    "sunyani",
    "techiman",
    "berekum",
    "wenchi",
    "dua",
    "nkrankwanta",
    "nkranza",
    "nsawkaw",
    "japekrom",
    "drobo",
    "seikwa",
    "chiraa",
    "odumase",
    "kintampo",
    "prang",
    "yeji",
    "aworowa",
    "tanoso",
    "fiapre",
    "ntotroso",
    "baa",
    "dormaa",
  ],
  "northern region": [
    "tamale",
    "yendi",
    "savelugu",
    "walewale",
    "bimbilla",
    "damongo",
    "salaga",
    "karaga",
    "gushegu",
    "nanton",
    "kumbungu",
    "saboba",
    "zabzugu",
    "tatale",
    "cheriponi",
    "wulensi",
    "nakpanduri",
    "bunkpurugu",
    "yunyoo",
    "gambaga",
    "nanumba",
    "kpalbe",
    "wungu",
  ],
  "upper east": [
    "bolgatanga",
    "bawku",
    "navrongo",
    "zebilla",
    "paga",
    "bongo",
    "tongo",
    "nangodi",
    "sandema",
    "fumbisi",
    "kongo",
    "wiesi",
    "tempane",
    "garu",
    "pusiga",
    "binaba",
    "zanlerigu",
    "dazongo",
    "winkogo",
    "sirigu",
    "vea",
    "tilli",
    "soe",
    "nyangua",
  ],
  "upper west": [
    "wa",
    "tumu",
    "lawra",
    "jirapa",
    "nandom",
    "hamile",
    "lambussie",
    "funsi",
    "wechiau",
    "babile",
    "daffiama",
    "sabuli",
    "napogbakole",
    "charia",
    "tizza",
    "buffiama",
    "han",
    "nyoli",
    "dapuori",
    "dori",
    "goli",
  ],
  "oti region": [
    "dambai",
    "kete",
    "krachi",
    "nkwanta",
    "juale",
    "pai",
    "borae",
    "chinderi",
    "kpassa",
    "keri",
    "brekum",
    "banda",
    "kajaji",
    "santrokofi",
    "likpe",
    "buem",
    "kyindobo",
    "worawora",
    "awate",
    "bodada",
  ],
  "savannah region": [
    "damongo",
    "buipe",
    "salaga",
    "daboya",
    "sawla",
    "fulfulso",
    "larabanga",
    "mankarigu",
    "tuluwe",
    "kpalbe",
    "mognori",
    "busunu",
    "mura",
    "debre",
    "kafaba",
    "mpaha",
    "jentilpe",
    "kigbape",
    "chama",
    "kajese",
  ],
};

// List of countries (excluding Ghana)
const countries = [
  "afghanistan",
  "albania",
  "algeria",
  "andorra",
  "angola",
  "antigua and barbuda",
  "argentina",
  "armenia",
  "australia",
  "austria",
  "azerbaijan",
  "bahamas",
  "bahrain",
  "bangladesh",
  "barbados",
  "belarus",
  "belgium",
  "belize",
  "benin",
  "bhutan",
  "bolivia",
  "bosnia and herzegovina",
  "botswana",
  "brazil",
  "brunei",
  "bulgaria",
  "burkina faso",
  "burundi",
  "cabo verde",
  "cambodia",
  "cameroon",
  "canada",
  "central african republic",
  "chad",
  "chile",
  "china",
  "colombia",
  "comoros",
  "congo",
  "costa rica",
  "côte d'ivoire",
  "croatia",
  "cuba",
  "cyprus",
  "czech republic",
  "denmark",
  "djibouti",
  "dominica",
  "dominican republic",
  "ecuador",
  "egypt",
  "el salvador",
  "equatorial guinea",
  "eritrea",
  "estonia",
  "eswatini",
  "ethiopia",
  "fiji",
  "finland",
  "france",
  "gabon",
  "gambia",
  "georgia",
  "germania",
  "germany",
  "greece",
  "grenada",
  "guatemala",
  "guinea",
  "guinea-bissau",
  "guyana",
  "haiti",
  "honduras",
  "hungary",
  "iceland",
  "india",
  "indonesia",
  "iran",
  "iraq",
  "ireland",
  "israel",
  "italy",
  "jamaica",
  "japan",
  "jordan",
  "kazakhstan",
  "kenya",
  "kiribati",
  "korea north",
  "korea south",
  "kosovo",
  "kuwait",
  "kyrgyzstan",
  "laos",
  "latvia",
  "lebanon",
  "lesotho",
  "liberia",
  "libya",
  "liechtenstein",
  "lithuania",
  "luxembourg",
  "madagascar",
  "malawi",
  "malaysia",
  "maldives",
  "mali",
  "malta",
  "marshall islands",
  "mauritania",
  "mauritius",
  "mexico",
  "micronesia",
  "moldova",
  "monaco",
  "mongolia",
  "montenegro",
  "morocco",
  "mozambique",
  "myanmar",
  "namibia",
  "nauru",
  "nepal",
  "netherlands",
  "new zealand",
  "nicaragua",
  "nigeria",
  "north macedonia",
  "norway",
  "oman",
  "pakistan",
  "palau",
  "panama",
  "papua new guinea",
  "paraguay",
  "peru",
  "philippines",
  "poland",
  "portugal",
  "qatar",
  "romania",
  "russia",
  "rwanda",
  "saint kitts and nevis",
  "saint lucia",
  "saint vincent and the grenadines",
  "samoa",
  "san marino",
  "sao tome and principe",
  "saudi arabia",
  "senegal",
  "serbia",
  "seychelles",
  "sierra leone",
  "singapore",
  "slovakia",
  "slovenia",
  "solomon islands",
  "somalia",
  "south africa",
  "south sudan",
  "spain",
  "sri lanka",
  "sudan",
  "suriname",
  "sweden",
  "switzerland",
  "syria",
  "taiwan",
  "tajikistan",
  "tanzania",
  "thailand",
  "timor-leste",
  "togo",
  "tonga",
  "trinidad and tobago",
  "tunisia",
  "turkey",
  "turkmenistan",
  "tuvalu",
  "uganda",
  "ukraine",
  "united arab emirates",
  "united kingdom",
  "united states",
  "uruguay",
  "uzbekistan",
  "vanuatu",
  "vatican city",
  "venezuela",
  "vietnam",
  "yemen",
  "zambia",
  "zimbabwe",
];

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

  // Show typing loader
  chatWindow.innerHTML += `<div id="typing-loader" class="text-left text-gray-500 italic">SkyBot is typing<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></div>`;
  chatWindow.scrollTop = chatWindow.scrollHeight;

  // Simple keyword-based reply
  const lowerMsg = userMsg.toLowerCase();
  let botReply =
    "I'm sorry, I didn't understand that. Could you please rephrase and use keywords I could understand?";

  // Check for delivery location queries within Ghana (highest priority)
  const deliveryQuery = checkForDeliveryLocationQuery(lowerMsg);
  if (deliveryQuery) {
    botReply = deliveryQuery;
  }
  // Check for international delivery queries
  else if (checkForInternationalDelivery(lowerMsg)) {
    botReply = `I'm sorry, but SkyNet Express Ltd does not deliver to ${internationalDeliveryMatch}. We are a domestic courier service only operating within Ghana. We do not engage in international shipments.`;
  }
  // Check for domestic pricing queries
  else if (checkForDomesticPricingQuery(lowerMsg)) {
    botReply =
      "For pricing information on domestic deliveries within Ghana, please contact our Head Office directly: <br/><br/>" +
      "<strong>Phone:</strong> +233 24 205 0501 or +233 30 223 0516<br/>" +
      "<strong>Address:</strong> Adabla Plaza No.5 Asafoatse Oman Street, Kokomlemle, Accra";
  }
  // Check for exact word matches to avoid partial matching
  else if (hasExactWord(lowerMsg, "quote")) {
    botReply = faqAnswers.quote;
  } else if (hasExactWord(lowerMsg, "document")) {
    botReply = faqAnswers.documents;
  } else if (
    hasExactWord(lowerMsg, "okay") ||
    hasExactWord(lowerMsg, "ok") ||
    hasExactWord(lowerMsg, "alright")
  ) {
    botReply = faqAnswers.okay;
  } else if (hasExactWord(lowerMsg, "track")) {
    botReply = faqAnswers.track;
  } else if (hasExactWord(lowerMsg, "yes")) {
    botReply = faqAnswers.yes;
  } else if (hasExactWord(lowerMsg, "no")) {
    botReply = faqAnswers.no;
  } else if (hasExactWord(lowerMsg, "thank")) {
    botReply = faqAnswers.thank;
  } else if (hasExactWord(lowerMsg, "hello")) {
    botReply = faqAnswers.hello;
  } else if (hasExactWord(lowerMsg, "hi")) {
    botReply = faqAnswers.hi;
  } else if (hasExactWord(lowerMsg, "hey")) {
    botReply = faqAnswers.hey;
  } else if (hasExactWord(lowerMsg, "temu")) {
    botReply = faqAnswers.temu;
  } else if (lowerMsg.startsWith("my name is ")) {
    const name = userMsg.substring(11).trim();
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
    botReply = `Nice to meet you ${formattedName}. How may I help you today?`;
  } else if (hasExactWord(lowerMsg, "how are you")) {
    botReply = faqAnswers.howareyou;
  } else if (
    hasExactWord(lowerMsg, "where is my parcel") ||
    hasExactWord(lowerMsg, "where is my package")
  ) {
    botReply = faqAnswers.track;
  } else if (
    hasExactWord(lowerMsg, "contact") ||
    hasExactWord(lowerMsg, "phone") ||
    hasExactWord(lowerMsg, "email") ||
    hasExactWord(lowerMsg, "address")
  ) {
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
    hasExactWord(lowerMsg, "location") ||
    hasExactWord(lowerMsg, "locate") ||
    hasExactWord(lowerMsg, "where is") ||
    hasExactWord(lowerMsg, "address") ||
    hasExactWord(lowerMsg, "offices")
  ) {
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
    // Remove typing loader
    const typingLoader = document.getElementById("typing-loader");
    if (typingLoader) typingLoader.remove();

    // Show bot reply
    chatWindow.innerHTML += `<div class="text-left text-primary"><strong>SkyBot:</strong> ${botReply}</div>`;
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, 1000);

  input.value = "";
}

// Helper function to check for exact word matches
function hasExactWord(message, word) {
  const words = message.split(/\s+/);
  return words.includes(word);
}

function checkForDeliveryLocationQuery(message) {
  const deliveryKeywords = [
    "deliver",
    "delivery",
    "ship",
    "send",
    "service",
    "cover",
    "operate",
    "go to",
    "reach",
    "serve",
    "available",
    "do you deliver",
    "can you deliver",
  ];

  // Check if message contains any delivery keywords
  const hasDeliveryKeyword = deliveryKeywords.some((keyword) =>
    message.includes(keyword)
  );

  if (!hasDeliveryKeyword) return null;

  // Check if it's a Ghana location query
  let foundLocations = [];

  // Check for specific location mentions using exact matching
  for (const [region, locations] of Object.entries(ghanaLocations)) {
    for (const location of locations) {
      // Use exact word matching for locations
      if (hasExactWord(message, location)) {
        foundLocations.push(location);
      }
    }
  }

  // Check for region mentions
  const regions = Object.keys(ghanaLocations);
  for (const region of regions) {
    if (hasExactWord(message, region)) {
      foundLocations.push(region);
    }
  }

  if (foundLocations.length > 0) {
    if (foundLocations.length === 1) {
      return `Yes! SkyNet Express Ltd delivers to ${foundLocations[0]} and throughout Ghana. We have nationwide coverage across all 16 regions.`;
    } else {
      return `Yes! SkyNet Express Ltd delivers between ${foundLocations.join(
        " and "
      )} and throughout Ghana. We have comprehensive nationwide coverage across all regions.`;
    }
  }

  // Check for general Ghana delivery questions
  if (
    hasExactWord(message, "ghana") ||
    hasExactWord(message, "nationwide") ||
    hasExactWord(message, "everywhere") ||
    hasExactWord(message, "all areas")
  ) {
    return "Yes! SkyNet Express provides nationwide delivery services across all 16 regions of Ghana. We deliver to both urban and rural areas throughout the country.";
  }

  return null;
}

function checkForInternationalDelivery(message) {
  // Check for delivery-related keywords combined with country names
  const deliveryKeywords = [
    "deliver",
    "ship",
    "send",
    "shipment",
    "delivery",
    "service",
  ];

  const hasDeliveryKeyword = deliveryKeywords.some((keyword) =>
    message.includes(keyword)
  );

  if (hasDeliveryKeyword) {
    // Look for any country mentioned (excluding Ghana)
    for (const country of countries) {
      if (hasExactWord(message, country) && country !== "ghana") {
        return country;
      }
    }

    // Check for "international" or "abroad" keywords
    if (
      hasExactWord(message, "international") ||
      hasExactWord(message, "abroad") ||
      message.includes("outside ghana") ||
      message.includes("outside of ghana") ||
      message.includes("another country") ||
      message.includes("other countries")
    ) {
      return "other countries";
    }
  }

  return null;
}

function checkForDomesticPricingQuery(message) {
  // Check for cost-related keywords combined with Ghana locations
  const costKeywords = ["cost", "price", "how much", "charge", "fee", "rate"];
  const hasCostKeyword = costKeywords.some((keyword) =>
    hasExactWord(message, keyword)
  );

  if (hasCostKeyword) {
    // Check if the query mentions two Ghanaian locations (from-to)
    const ghanaLocations = Object.keys(officeContacts);
    let locationCount = 0;

    for (const location of ghanaLocations) {
      if (hasExactWord(message, location)) {
        locationCount++;
      }

      // Also check variations
      if (locationVariations[location]) {
        for (const variation of locationVariations[location]) {
          if (hasExactWord(message, variation)) {
            locationCount++;
            break;
          }
        }
      }

      if (locationCount >= 2) {
        return true;
      }
    }

    // Check for general domestic delivery cost queries
    if (
      hasExactWord(message, "deliver") &&
      (hasExactWord(message, "ghana") ||
        message.includes("within ghana") ||
        hasExactWord(message, "domestic"))
    ) {
      return true;
    }
  }

  return false;
}

function findLocationInMessage(message) {
  for (const [location, data] of Object.entries(officeContacts)) {
    if (hasExactWord(message, location.toLowerCase())) {
      return location;
    }
  }
  for (const [location, variations] of Object.entries(locationVariations)) {
    for (const variation of variations) {
      if (hasExactWord(message, variation)) {
        return location;
      }
    }
  }
  for (const [location, data] of Object.entries(officeContacts)) {
    if (hasExactWord(message, data.displayName.toLowerCase())) {
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
    toggleBtn.classList.add("bottom-28");
  } else {
    toggleBtn.classList.remove("bottom-28");
    toggleBtn.classList.add("bottom-4");
  }
}

document
  .getElementById("chat-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });
