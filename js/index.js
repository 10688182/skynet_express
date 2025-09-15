// Initialize AOS animation library
AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: false,
  mirror: true,
});

// Mobile menu toggle
document
  .getElementById("mobile-menu-button")
  .addEventListener("click", function () {
    const menu = document.getElementById("mobile-menu");
    menu.classList.toggle("hidden");
  });

document.addEventListener("DOMContentLoaded", function () {
  // Carousel elements
  const carousel = document.getElementById("carousel");
  const slides = document.querySelectorAll(".carousel-item");
  const dots = document.querySelectorAll(".carousel-dot");
  const prevBtn = document.getElementById("prev-slide");
  const nextBtn = document.getElementById("next-slide");

  let currentIndex = 0;
  let slideInterval;

  // Timing controls (modified values)
  const TRANSITION_DURATION = 700; // 700ms for slide animation
  const SLIDE_DELAY = 9000; // 9000ms (9 seconds) between slides

  // Set transition duration in JavaScript to match CSS
  carousel.style.transition = `transform ${TRANSITION_DURATION}ms ease-in-out`;

  // Start auto-advancing
  function startCarousel() {
    slideInterval = setInterval(nextSlide, SLIDE_DELAY);
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  }

  function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  // Event listeners
  nextBtn.addEventListener("click", () => {
    clearInterval(slideInterval);
    nextSlide();
    startCarousel();
  });

  prevBtn.addEventListener("click", () => {
    clearInterval(slideInterval);
    prevSlide();
    startCarousel();
  });

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      clearInterval(slideInterval);
      currentIndex = index;
      updateCarousel();
      startCarousel();
    });
  });

  // Start the carousel
  startCarousel();
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

// Intersection Observer to trigger count up when stats are visible
// const observer = new IntersectionObserver(
//   (entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         animateCountUp();
//         observer.unobserve(entry.target);
//       }
//     });
//   },
//   { threshold: 0.5 }
// );

countUpElements.forEach((element) => {
  observer.observe(element);
});

