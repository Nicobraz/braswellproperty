document.getElementById("year").textContent = new Date().getFullYear();

const heroProcess = document.getElementById("heroProcess");
const heroVisual = document.getElementById("heroVisual");
const heroCopy = document.querySelector(".hero-copy");
const heroMobileQuery = window.matchMedia("(max-width: 860px)");

function placeHeroProcess(isMobile) {
  if (isMobile) {
    heroVisual.insertAdjacentElement("afterend", heroProcess);
  } else {
    heroCopy.appendChild(heroProcess);
  }
}

placeHeroProcess(heroMobileQuery.matches);
heroMobileQuery.addEventListener("change", (e) => placeHeroProcess(e.matches));

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
const messageField = document.getElementById("message");
const buyersSection = document.getElementById("approach");
const sellersSection = document.getElementById("for-sellers");

const headingByIntent = {
  buy: "Thinking about buying?<br>Let's talk.",
  sell: "Thinking about selling?<br>Let's talk.",
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
    contactHeading.innerHTML = headingByIntent[intent];
    updateMessagePlaceholder(intent);

    if (intent === "sell") {
      sellersSection.scrollIntoView({ behavior: "smooth" });
    } else if (intent === "both") {
      const headerHeight = document.querySelector("header").getBoundingClientRect().height;
      const targetY = buyersSection.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    } else {
      buyersSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});

interestSelect.addEventListener("change", () => {
  updateMessagePlaceholder(interestSelect.value);
});

updateMessagePlaceholder(interestSelect.value);

const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");
const submitButton = form.querySelector("button[type=submit]");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !emailPattern.test(email)) {
    status.textContent = "Please enter your name and a valid email address.";
    status.className = "form-status error";
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      status.textContent = "Thanks! Your message has been received — I'll be in touch soon.";
      status.className = "form-status success";
      form.reset();
    } else {
      status.textContent = "Something went wrong sending your message. Please try emailing me directly.";
      status.className = "form-status error";
    }
  } catch (err) {
    status.textContent = "Something went wrong sending your message. Please try emailing me directly.";
    status.className = "form-status error";
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Send Message";
  }
});

// Placeholder blurbs — swap in Taylor's own notes/photos per city when ready.
const cityData = {
  highland: {
    name: "Highland, Utah",
    description:
      "Highland is where I grew up. It's a quiet, family-oriented city tucked at the base of Mt. Timpanogos, known for top-rated schools, spacious lots, and some of the best mountain views in Utah County.",
    image: "assets/highland.jpg",
    price: "~$975K",
  },
  "american-fork": {
    name: "American Fork, Utah",
    description:
      "Bordered by Utah Lake and the Wasatch Mountains, American Fork blends small-town charm with easy access to American Fork Canyon, Timpanogos Cave, and a growing downtown scene.",
    image: "assets/american-fork.jpg",
    price: "~$530K",
  },
  lehi: {
    name: "Lehi, Utah",
    description:
      "Home to Silicon Slopes and Thanksgiving Point, Lehi is one of Utah's fastest-growing cities, blending tech-driven energy with family-friendly master-planned neighborhoods.",
    image: "assets/lehi.jpg",
    price: "~$575K",
  },
  orem: {
    name: "Orem, Utah",
    description:
      "Orem offers a walkable, community feel with easy access to Utah Lake, the Wasatch mountains, and Utah Valley University.",
    image: "assets/orem.jpg",
    price: "~$510K",
  },
  vineyard: {
    name: "Vineyard, Utah",
    description:
      "One of Utah's newest and fastest-growing cities, Vineyard sits right on the shore of Utah Lake, offering a master-planned community with modern homes, parks, and lake views just minutes from Orem and Provo.",
    image: "assets/vineyard.jpg",
    price: "~$530K",
  },
  provo: {
    name: "Provo, Utah",
    description:
      "Utah County's largest city, Provo pairs a vibrant downtown and BYU campus energy with quick access to Provo Canyon and Rock Canyon trails.",
    image: "assets/provo.jpg",
    price: "~$485K",
  },
  "saratoga-springs": {
    name: "Saratoga Springs, Utah",
    description:
      "A fast-growing lakeside community on Utah Lake, Saratoga Springs offers new construction, master-planned neighborhoods, and some of the best sunset views around.",
    image: "assets/saratoga-springs.jpg",
    price: "~$560K",
  },
  "eagle-mountain": {
    name: "Eagle Mountain, Utah",
    description:
      "One of Utah's fastest-growing cities, Eagle Mountain offers spacious lots, sweeping valley views, and a more laid-back pace at the edge of Utah County.",
    image: "assets/eagle-mountain.jpg",
    price: "~$510K",
  },
  "pleasant-grove": {
    name: "Pleasant Grove, Utah",
    description:
      "Pleasant Grove combines a historic downtown and close-knit community feel with easy access to Timpanogos hiking trails.",
    image: "assets/pleasant-grove.jpg",
    price: "~$560K",
  },
  alpine: {
    name: "Alpine, Utah",
    description:
      "Tucked against the mountains with larger lots and top-rated schools, Alpine is one of Utah County's most scenic and sought-after communities.",
    image: "assets/alpine.jpg",
    price: "~$1.2M",
  },
  "spanish-fork": {
    name: "Spanish Fork, Utah",
    description:
      "Spanish Fork blends small-town charm with steady growth, home to the annual Fiesta Days celebration and easy access to Spanish Fork Canyon.",
    image: "assets/spanish-fork.jpg",
    price: "~$520K",
  },
  mapleton: {
    name: "Mapleton, Utah",
    description:
      "Mapleton offers a quiet, semi-rural feel with larger properties and stunning views of Spanish Fork Peak and Maple Mountain.",
    image: "assets/mapleton.jpg",
    price: "~$725K",
  },
  payson: {
    name: "Payson, Utah",
    description:
      "In southern Utah County, Payson offers small-town charm, a historic temple, and easy access to Payson Canyon and Payson Lakes.",
    image: "assets/payson.jpg",
    price: "~$475K",
  },
  "salt-lake-city": {
    name: "Salt Lake City, Utah",
    description:
      "Utah's capital pairs a vibrant downtown and diverse neighborhoods with quick access to world-class ski resorts in the surrounding canyons.",
    image: "assets/salt-lake-city.jpg",
    price: "~$580K",
  },
  "south-jordan": {
    name: "South Jordan, Utah",
    description:
      "South Jordan is known for master-planned communities like Daybreak, plus shopping, trails, and easy freeway access.",
    image: "assets/south-jordan.jpg",
    price: "~$665K",
  },
  "west-jordan": {
    name: "West Jordan, Utah",
    description:
      "One of Utah's largest cities, West Jordan offers diverse, affordable neighborhoods close to shopping, parks, and the Jordan River Parkway.",
    image: "assets/west-jordan.jpg",
    price: "~$560K",
  },
  "west-valley-city": {
    name: "West Valley City, Utah",
    description:
      "Utah's second-largest city, West Valley City is known for its cultural diversity and community amenities like the Utah Cultural Celebration Center.",
    image: "assets/west-valley-city.jpg",
    price: "~$470K",
  },
  sandy: {
    name: "Sandy, Utah",
    description:
      "Sandy is an established suburb with excellent schools and quick access to Alta and Snowbird, making it a favorite for families who love the mountains.",
    image: "assets/sandy.jpg",
    price: "~$670K",
  },
  draper: {
    name: "Draper, Utah",
    description:
      "Nestled at the base of the mountains, Draper mixes a growing tech corridor with outdoor access to Corner Canyon's extensive trail system.",
    image: "assets/draper.jpg",
    price: "~$820K",
  },
  riverton: {
    name: "Riverton, Utah",
    description:
      "Riverton offers a family-friendly, small-town feel along the Jordan River, with growing retail and dining options nearby.",
    image: "assets/riverton.jpg",
    price: "~$625K",
  },
  herriman: {
    name: "Herriman, Utah",
    description:
      "One of the fastest-growing cities in the state, Herriman offers new master-planned communities and sweeping mountain and valley views.",
    image: "assets/herriman.jpg",
    price: "~$605K",
  },
  bluffdale: {
    name: "Bluffdale, Utah",
    description:
      "Bluffdale blends semi-rural charm with new development, sitting near Camp Williams and the rapidly growing Point of the Mountain area.",
    image: "assets/bluffdale.jpg",
    price: "~$615K",
  },
  "cottonwood-heights": {
    name: "Cottonwood Heights, Utah",
    description:
      "A foothill community at the mouth of Big and Little Cottonwood Canyons, Cottonwood Heights is the gateway to some of the best skiing in the world.",
    image: "assets/cottonwood-heights.jpg",
    price: "~$785K",
  },
  "cedar-hills": {
    name: "Cedar Hills, Utah",
    description:
      "A small, quiet city bordering Pleasant Grove and Highland, Cedar Hills is known for its golf course, well-kept neighborhoods, and easy access to trails along the Wasatch Front.",
    image: "assets/cedar-hills.jpg",
    price: "~$670K",
  },
  lindon: {
    name: "Lindon, Utah",
    description:
      "Tucked between Orem and Pleasant Grove, Lindon offers a quiet residential feel with quick access to I-15, Utah Lake, and the Lindon Marina.",
    image: "assets/lindon.jpg",
    price: "~$735K",
  },
  taylorsville: {
    name: "Taylorsville, Utah",
    description:
      "A centrally located Salt Lake County city, Taylorsville offers established neighborhoods, easy freeway access, and proximity to the Jordan River Parkway.",
    image: "assets/taylorsville.jpg",
    price: "~$500K",
  },
};

const cityModal = document.getElementById("cityModal");
const cityModalImage = document.getElementById("cityModalImage");
const cityModalTitle = document.getElementById("cityModalTitle");
const cityModalDesc = document.getElementById("cityModalDesc");
const cityModalPrice = document.getElementById("cityModalPrice");

function openCityModal(citySlug) {
  const city = cityData[citySlug];
  if (!city) return;

  cityModalTitle.textContent = city.name;
  cityModalDesc.textContent = city.description;
  cityModalImage.style.backgroundImage = city.image ? `url(${city.image})` : "";
  cityModalPrice.textContent = city.price ? `Typical Home Price: ${city.price}` : "";
  cityModalPrice.style.display = city.price ? "" : "none";
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
