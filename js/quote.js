// Initialize AOS animation library
AOS.init({
  duration: 800,
  once: true,
  easing: "ease-in-out",
});

// Mobile menu toggle
document
  .getElementById("mobile-menu-button")
  .addEventListener("click", function () {
    const menu = document.getElementById("mobile-menu");
    menu.classList.toggle("hidden");
  });

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = document.querySelector("header").offsetHeight;
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Close mobile menu if open
      const mobileMenu = document.getElementById("mobile-menu");
      if (!mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
      }
    }
  });
});

// Back to top button
const backToTopButton = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.remove("opacity-0", "invisible");
    backToTopButton.classList.add("opacity-100", "visible");
  } else {
    backToTopButton.classList.remove("opacity-100", "visible");
    backToTopButton.classList.add("opacity-0", "invisible");
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// FAQ toggle functionality
document.querySelectorAll(".faq-toggle").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const content = toggle.nextElementSibling;
    const icon = toggle.querySelector("i");

    content.classList.toggle("hidden");
    icon.classList.toggle("ri-arrow-down-s-line");
    icon.classList.toggle("ri-arrow-up-s-line");
  });
});

// Form submission handling
const quoteForm = document.getElementById("quoteForm");
const formSuccess = document.getElementById("formSuccess");
const newRequestBtn = document.getElementById("newRequest");

if (quoteForm) {
  quoteForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Here you would typically send the form data to your backend
    // For demonstration, we'll simulate a successful submission

    // Show loading state
    const submitBtn = quoteForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.innerHTML =
      '<i class="ri-loader-4-line animate-spin mr-2"></i> Processing...';
    submitBtn.disabled = true;

    // Simulate API call delay
    setTimeout(() => {
      // Hide form and show success message
      quoteForm.classList.add("hidden");
      formSuccess.classList.remove("hidden");

      // Reset form
      quoteForm.reset();
    }, 1500);
  });
}

if (newRequestBtn) {
  newRequestBtn.addEventListener("click", function () {
    formSuccess.classList.add("hidden");
    quoteForm.classList.remove("hidden");

    // Reset submit button
    const submitBtn = quoteForm.querySelector('button[type="submit"]');
    submitBtn.textContent = "Request Quote";
    submitBtn.disabled = false;
  });
}

// Animate contact cards on scroll
const animateOnScroll = () => {
  const contactCards = document.querySelectorAll(".contact-card");

  contactCards.forEach((card) => {
    const cardPosition = card.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (cardPosition < screenPosition) {
      card.classList.add("animate");
    }
  });
};

window.addEventListener("scroll", animateOnScroll);
animateOnScroll(); // Run once on page load
