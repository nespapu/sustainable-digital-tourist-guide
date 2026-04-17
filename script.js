const pois = {
  Viewpoint: {
    type: "tourism",
    id: "Viewpoint",
    name: "Viewpoint of Saint Marcos",
    category: "Natural",
    description: "A viewpoint where you can see very pretty sunshine and a perfect vision of Alcala, its near a church in the city.",
    tip:"Don´t throw rubbish in that place.",
    image: "images/viewpoint.jpg"
  },
  llanos: {
      type: "green",
      id: "llanos",
      name: "los llanos",
      category: "rural area",
      description: "This park, with its wonderful views, is worth visiting after the climb. Additionally, halfway up, there are two beautiful hermitages, Veronica and Fatima. At the top, there is a divine view of the entire Sierra Nevada. It also offers a spectacular view of the Castle of La Mota from various angles",
      tip: "Don´t make noise",
      image: "images/llanos.jpg"
    },
    Angustias: {
      type: "tourism",
      id: "Angustias",
      name: "Church of Las Angustias",
      category: "Religious and historic monument",
      description: "The Church of Las Angustias in Alcalá la Real (Jaén) is a church known for marking the transition between two major artistic periods, dating from the mid-18th century to the early 19th century.",
      tip: "Please remain quiet and respectful when entering this church to show consideration for all visitors and the significance of the place, as well as to avoid causing noise pollution.",
      image: "images/Church of las Angustias.jpg"
    },
    Historicalmovement: {
      type: "tourism",
      id: "Historicalmovement",
      name: "La fortaleza de la Mota",
      category: " Historical movement",
      description: "Is a castle which was an important defensive part on the border between the kingdoms of Castilla y Granada during the Middle Ages, notable for its walls, the Main Abbey Church and its citadel.",
      tip: "Do not litter and respect the nature of its gardens, as well as the ancient stone structure from which it is made.",
      image: "images/lamota.jpeg"
    },
    hotel: {
      type: "tourism",
      id: "hotel",
      name: "Torrepalma hotel",
      category: "Cultural tourism",
      description: "The Hotel Torrepalma is a 3 star hotel located in the center of Alcalá la Real. It features comfortable rooms equipped with air conditioning, private bathrooms, and Wi-Fi. It offers amenities such as a restaurant, café, and event spaces.",
      tip: "It could also promote responsible water use with water saving devices in showers and faucets.",
      image: "images/Torrepalma.jpg"
    },
    chapelEH: {
      type: "tourism",
      id: "chapel-EH",
      name: "Ecce Homo Chapel",
      category: "Historical Chapel",
      description: "The Ecce Homo Chapel is a small temple located in the historic center of Alcalá la Real, specifically in the Las Cruces neighborhood. Its origins date back to making it a very important part of local religion the 17th century,.Inside, it houses an Ecce Homo image in the Granadan style, created in the 18th century. This image was brought from Granada in the 1960s to replace the previous one, which was destroyed during the Spanish Civil War.In addition, the chapel is part of the Calvary route and it is a  point of interest.",
      tip:" It is recommended to visit on foot to reduce environmental impact and respect the surroundings.",
      image: "images/imagen.png"
    },
    busStop: {
      id: "busStop",
      type: "transport",
      name: "Main Bus Stop",
      category: "Transport",
      description: "This is the main public transport stop in the town.",
      tip: "Use public transport instead of private cars.",
      image: "images/bus.jpg"
    },
    solarPlant: {
      id: "solarPlant",
      type: "energy",
      name: "Solar Energy Area",
      category: "Renewable energy",
      description: "This area promotes clean energy using solar panels.",
      tip: "Support renewable energy sources.",
      image: "images/solar.jpg"
    },
    park: {
      id: "park",
      type: "green",
      name: "Central Park",
      category: "Green area",
      description: "A green space for relaxing and enjoying nature.",
      tip: "Respect plants and do not leave rubbish.",
      image: "images/park.jpg"
    },
    recyclingPoint: {
      id: "recyclingPoint",
      type: "recycling",
      name: "Recycling Center",
      category: "Waste management",
      description: "A place where people can recycle different materials.",
      tip: "Separate your waste correctly.",
      image: "images/recycling.jpg"
    }
  // Write your POI information here
};

const typeIcons = {
  tourism: "📍",
  transport: "🚌",
  energy: "⚡",
  green: "🌳",
  recycling: "♻️"
};

let currentPoiId = "Angustias";

const card = document.getElementById("poi-card");
const poiName = document.getElementById("poi-name");
const poiCategory = document.getElementById("poi-category");
const poiDescription = document.getElementById("poi-description");
const poiTip = document.getElementById("poi-tip");
const poiImage = document.getElementById("poi-image");
const poiScore = document.getElementById("poi-score");
const rankingList = document.getElementById("ranking-list");

const likeBtn = document.getElementById("like-btn");
const dislikeBtn = document.getElementById("dislike-btn");
const voteButtons = document.querySelectorAll(".vote-buttons button");

function getVotes() {
  const storedVotes = localStorage.getItem("poiVotes");
  return storedVotes ? JSON.parse(storedVotes) : {};
}

function saveVotes(votes) {
  localStorage.setItem("poiVotes", JSON.stringify(votes));
}

function ensurePoiVotesExist() {
  const votes = getVotes();

  Object.keys(pois).forEach((poiId) => {
    if (typeof votes[poiId] !== "number") {
      votes[poiId] = 0;
    }
  });

  saveVotes(votes);
}

function renderPoi(poiId) {
  const poi = pois[poiId];
  const votes = getVotes();

  currentPoiId = poiId;

  poiName.textContent = poi.name;
  poiCategory.textContent = poi.category;
  poiDescription.textContent = poi.description;
  poiTip.textContent = poi.tip;
  poiImage.src = poi.image;
  poiImage.alt = poi.name;
  poiScore.textContent = votes[poiId] ?? 0;

  // Cambiar color de la tarjeta según el tipo
  card.className = "poi-card";
  card.classList.add("type-" + poi.type);

  // Cambiar clase del título
  poiName.className = "";
  poiName.classList.add("title-" + poi.type);

  // Cambiar clase de los botones
  voteButtons.forEach((button) => {
    button.className = "";
    button.classList.add("btn-" + poi.type);
  });
}

function updateVote(poiId, value) {
  const votes = getVotes();
  votes[poiId] = (votes[poiId] ?? 0) + value;
  saveVotes(votes);

  renderPoi(poiId);
  renderAllRankings();
}

function renderRankingByType(type, elementId) {
  const votes = getVotes();

  const list = Object.values(pois)
    .filter(poi => poi.type === type)
    .sort((a, b) => (votes[b.id] || 0) - (votes[a.id] || 0));

  const container = document.getElementById(elementId);
  container.innerHTML = "";

  list.forEach(poi => {
    const li = document.createElement("li");
    li.textContent = `${poi.name} (${votes[poi.id] || 0})`;
    container.appendChild(li);
  });
}

function renderAllRankings() {
  renderRankingByType("tourism", "ranking-tourism");
  renderRankingByType("transport", "ranking-transport");
  renderRankingByType("energy", "ranking-energy");
  renderRankingByType("green", "ranking-green");
  renderRankingByType("recycling", "ranking-recycling");
}

document.querySelectorAll(".marker").forEach((marker) => {
  marker.addEventListener("click", () => {
    const poiId = marker.dataset.poi;
    renderPoi(poiId);
  });
});

likeBtn.addEventListener("click", () => {
  updateVote(currentPoiId, 1);
});

dislikeBtn.addEventListener("click", () => {
  updateVote(currentPoiId, -1);
});

document.querySelectorAll(".marker").forEach((marker) => {
  const poiId = marker.dataset.poi;
  const poi = pois[poiId];

  if (poi && poi.type) {
    marker.textContent = typeIcons[poi.type] || "📍";
  }
});

ensurePoiVotesExist();
renderPoi(currentPoiId);
renderAllRankings();