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
