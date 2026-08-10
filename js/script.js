document.getElementById("year").textContent = new Date().getFullYear();

const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const intentButtons = document.querySelectorAll(".intent-btn");
const interestSelect = document.getElementById("interest");
const contactHeading = document.getElementById("contactHeading");
const contactSection = document.getElementById("contact");
const messageField = document.getElementById("message");

const headingByIntent = {
  buy: "Thinking about buying?",
  sell: "Thinking about selling?",
  both: "Let's start with a conversation.",
};

const placeholderByIntent = {
  buy: "Tell me about your timeline, budget, and what you're looking for in a home...",
  sell: "Tell me about your timeline and the property you're looking to sell...",
  both: "Tell me about your timeline, budget, and what you're hoping to buy or sell...",
  other: "Tell me a bit about what you're exploring or curious about...",
};

function updateMessagePlaceholder(intent) {
  messageField.placeholder = placeholderByIntent[intent] || placeholderByIntent.other;
}

intentButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const intent = btn.dataset.intent;

    intentButtons.forEach((b) => b.classList.toggle("active", b === btn));
    interestSelect.value = intent;
    contactHeading.textContent = headingByIntent[intent];
    updateMessagePlaceholder(intent);
    contactSection.scrollIntoView({ behavior: "smooth" });
  });
});

interestSelect.addEventListener("change", () => {
  updateMessagePlaceholder(interestSelect.value);
});

updateMessagePlaceholder(interestSelect.value);

const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !emailPattern.test(email)) {
    status.textContent = "Please enter your name and a valid email address.";
    status.className = "form-status error";
    return;
  }

  // No backend wired up yet — replace with a real submission endpoint
  // (e.g. Formspree, Netlify Forms, or a custom API) when ready to go live.
  status.textContent = "Thanks! Your message has been received — I'll be in touch soon.";
  status.className = "form-status success";
  form.reset();
});

// Placeholder blurbs — swap in Taylor's own notes/photos per city when ready.
const cityData = {
  highland: {
    name: "Highland, Utah",
    description:
      "Highland is where I grew up. It's a quiet, family-oriented city tucked at the base of Mt. Timpanogos, known for top-rated schools, spacious lots, and some of the best mountain views in Utah County.",
    image: "assets/highland.jpg",
  },
  "american-fork": {
    name: "American Fork, Utah",
    description:
      "Bordered by Utah Lake and the Wasatch Mountains, American Fork blends small-town charm with easy access to American Fork Canyon, Timpanogos Cave, and a growing downtown scene.",
    image: "assets/american-fork.jpg",
  },
  lehi: {
    name: "Lehi, Utah",
    description:
      "Home to Silicon Slopes and Thanksgiving Point, Lehi is one of Utah's fastest-growing cities, blending tech-driven energy with family-friendly master-planned neighborhoods.",
    image: "assets/lehi.jpg",
  },
  orem: {
    name: "Orem, Utah",
    description:
      "Orem offers a walkable, community feel with easy access to Utah Lake, the Wasatch mountains, and Utah Valley University.",
    image: "assets/orem.jpg",
  },
  vineyard: {
    name: "Vineyard, Utah",
    description:
      "One of Utah's newest and fastest-growing cities, Vineyard sits right on the shore of Utah Lake, offering a master-planned community with modern homes, parks, and lake views just minutes from Orem and Provo.",
    image: "assets/vineyard.jpg",
  },
  provo: {
    name: "Provo, Utah",
    description:
      "Utah County's largest city, Provo pairs a vibrant downtown and BYU campus energy with quick access to Provo Canyon and Rock Canyon trails.",
    image: "assets/provo.jpg",
  },
  "saratoga-springs": {
    name: "Saratoga Springs, Utah",
    description:
      "A fast-growing lakeside community on Utah Lake, Saratoga Springs offers new construction, master-planned neighborhoods, and some of the best sunset views around.",
  },
  "eagle-mountain": {
    name: "Eagle Mountain, Utah",
    description:
      "One of Utah's fastest-growing cities, Eagle Mountain offers spacious lots, sweeping valley views, and a more laid-back pace at the edge of Utah County.",
  },
  "pleasant-grove": {
    name: "Pleasant Grove, Utah",
    description:
      "Pleasant Grove combines a historic downtown and close-knit community feel with easy access to Timpanogos hiking trails.",
  },
  alpine: {
    name: "Alpine, Utah",
    description:
      "Tucked against the mountains with larger lots and top-rated schools, Alpine is one of Utah County's most scenic and sought-after communities.",
  },
  "spanish-fork": {
    name: "Spanish Fork, Utah",
    description:
      "Spanish Fork blends small-town charm with steady growth, home to the annual Fiesta Days celebration and easy access to Spanish Fork Canyon.",
  },
  mapleton: {
    name: "Mapleton, Utah",
    description:
      "Mapleton offers a quiet, semi-rural feel with larger properties and stunning views of Spanish Fork Peak and Maple Mountain.",
  },
  payson: {
    name: "Payson, Utah",
    description:
      "In southern Utah County, Payson offers small-town charm, a historic temple, and easy access to Payson Canyon and Payson Lakes.",
  },
  "salt-lake-city": {
    name: "Salt Lake City, Utah",
    description:
      "Utah's capital pairs a vibrant downtown and diverse neighborhoods with quick access to world-class ski resorts in the surrounding canyons.",
  },
  "south-jordan": {
    name: "South Jordan, Utah",
    description:
      "South Jordan is known for master-planned communities like Daybreak, plus shopping, trails, and easy freeway access.",
  },
  "west-jordan": {
    name: "West Jordan, Utah",
    description:
      "One of Utah's largest cities, West Jordan offers diverse, affordable neighborhoods close to shopping, parks, and the Jordan River Parkway.",
  },
  "west-valley-city": {
    name: "West Valley City, Utah",
    description:
      "Utah's second-largest city, West Valley City is known for its cultural diversity and community amenities like the Utah Cultural Celebration Center.",
  },
  sandy: {
    name: "Sandy, Utah",
    description:
      "Sandy is an established suburb with excellent schools and quick access to Alta and Snowbird, making it a favorite for families who love the mountains.",
  },
  draper: {
    name: "Draper, Utah",
    description:
      "Nestled at the base of the mountains, Draper mixes a growing tech corridor with outdoor access to Corner Canyon's extensive trail system.",
  },
  riverton: {
    name: "Riverton, Utah",
    description:
      "Riverton offers a family-friendly, small-town feel along the Jordan River, with growing retail and dining options nearby.",
  },
  herriman: {
    name: "Herriman, Utah",
    description:
      "One of the fastest-growing cities in the state, Herriman offers new master-planned communities and sweeping mountain and valley views.",
  },
  bluffdale: {
    name: "Bluffdale, Utah",
    description:
      "Bluffdale blends semi-rural charm with new development, sitting near Camp Williams and the rapidly growing Point of the Mountain area.",
  },
  "cottonwood-heights": {
    name: "Cottonwood Heights, Utah",
    description:
      "A foothill community at the mouth of Big and Little Cottonwood Canyons, Cottonwood Heights is the gateway to some of the best skiing in the world.",
  },
};

const cityModal = document.getElementById("cityModal");
const cityModalImage = document.getElementById("cityModalImage");
const cityModalTitle = document.getElementById("cityModalTitle");
const cityModalDesc = document.getElementById("cityModalDesc");

function openCityModal(citySlug) {
  const city = cityData[citySlug];
  if (!city) return;

  cityModalTitle.textContent = city.name;
  cityModalDesc.textContent = city.description;
  cityModalImage.style.backgroundImage = city.image ? `url(${city.image})` : "";
  cityModal.classList.add("open");
  cityModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeCityModal() {
  cityModal.classList.remove("open");
  cityModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".area-chip").forEach((btn) => {
  btn.addEventListener("click", () => openCityModal(btn.dataset.city));
});

cityModal.querySelectorAll("[data-close]").forEach((el) => {
  el.addEventListener("click", closeCityModal);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && cityModal.classList.contains("open")) {
    closeCityModal();
  }
});
