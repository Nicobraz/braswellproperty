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
