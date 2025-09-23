document.addEventListener("DOMContentLoaded", () => {
  /* ────────────────────────────────────
     Fancy Lottie Loader Integration
  ──────────────────────────────────── */
  const lottieContainer = document.getElementById("lottie-animation");
  const lottieOverlay = document.getElementById("lottie-loader");

  const loaderAnim = lottie.loadAnimation({
    container: lottieContainer,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "https://lottie.host/700fd06f-47b5-45c8-9399-e9c1b2c21970/HcC8YNJt0W.json",
  });

  function showLoader() {
    lottieOverlay.classList.remove("hidden");
  }

  function hideLoader() {
    lottieOverlay.classList.add("hidden");
  }

  /* ────────────────────────────────────
     Mobile Menu Toggle
  ──────────────────────────────────── */
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  mobileMenuButton?.addEventListener("click", () => {
    mobileMenu?.classList.toggle("hidden");
  });

  /* ────────────────────────────────────
     Carousel Logic
  ──────────────────────────────────── */
  let carousel = null;
  let carouselDots = [];
  let prevButton = null;
  let nextButton = null;
  let currentSlide = 0;
  let slideCount = 0;
  let carouselInterval = null;

  function updateCarousel() {
    if (!carousel) return;
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;

    carouselDots.forEach((dot, i) => {
      dot.classList.toggle("bg-white", i === currentSlide);
      dot.classList.toggle("bg-white/50", i !== currentSlide);
    });

    const slide = document.querySelectorAll(".carousel-item")[currentSlide];
    slide?.querySelectorAll(".slide-up").forEach((el) => {
      el.style.animation = "none";
      requestAnimationFrame(() => {
        el.style.animation = "";
      });
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    updateCarousel();
  }
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    updateCarousel();
  }

  function initCarousel() {
    carousel = document.getElementById("carousel");
    carouselDots = [...document.querySelectorAll(".carousel-dot")];
    prevButton = document.getElementById("prev-slide");
    nextButton = document.getElementById("next-slide");
    slideCount = document.querySelectorAll(".carousel-item").length;
    if (!carousel) return;

    prevButton?.addEventListener("click", prevSlide);
    nextButton?.addEventListener("click", nextSlide);
    carouselDots.forEach((dot, i) =>
      dot.addEventListener("click", () => {
        currentSlide = i;
        updateCarousel();
      })
    );

    carouselInterval = setInterval(nextSlide, 5000);
    carousel.addEventListener("mouseenter", () =>
      clearInterval(carouselInterval)
    );
    carousel.addEventListener(
      "mouseleave",
      () => (carouselInterval = setInterval(nextSlide, 5000))
    );

    updateCarousel();
  }
  initCarousel();

  /* ────────────────────────────────────
     Tracking System with Modal Display
  ──────────────────────────────────── */
  const trackingForm = document.getElementById("tracking-form");
  const trackingError = document.getElementById("tracking-error");
  const tryAgainButton = document.getElementById("try-again");

  // Create the tracking modal
  const trackingModal = document.createElement("div");
  trackingModal.id = "tracking-modal";
  trackingModal.className =
    "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm hidden";
  trackingModal.innerHTML = `
    <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden transform transition-all duration-500 scale-95 opacity-0">
      <div class="modal-header bg-gradient-to-r from-primary to-secondary/80 p-6 text-white relative">
        <button id="close-modal" class="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors">
          <i class="ri-close-line text-2xl"></i>
        </button>
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-2xl font-bold">Shipment Tracking</h2>
            <p id="modal-tracking-number" class="text-white-100 mt-1">Waybill No.: <span class="font-mono"></span></p>
          </div>
          <div id="modal-status-badge" class="px-4 py-2 rounded-full text-sm font-semibold bg-white/20 backdrop-blur-sm"></div>
        </div>
      </div>
      
      <div class="modal-body p-6 overflow-y-auto max-h-[60vh]">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div class="bg-gray-50 p-4 rounded-lg">
            <h3 class="text-sm font-medium text-gray-500 mb-1">Consignee</h3>
            <p id="modal-consignee" class="font-semibold">-</p>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <h3 class="text-sm font-medium text-gray-500 mb-1">Company</h3>
            <p id="modal-company" class="font-semibold">-</p>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <h3 class="text-sm font-medium text-gray-500 mb-1">Contact</h3>
            <p id="modal-contact" class="font-semibold">-</p>
          </div>
        </div>
        <div id="modal-delivery-info" class="bg-green-50 border border-green-200 rounded-lg p-2 hidden">
          <h3 class="text-lg font-semibold text-green-800 mb-2">Delivery Information</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-green-700"><span class="font-medium">Recipient:</span> <span id="modal-recipient-name">-</span></p>
              <p class="text-sm text-green-700"><span class="font-medium">Contact:</span> <span id="modal-recipient-contact">-</span></p>
            </div>
            <div id="modal-pod-container" class="hidden">
              <p class="text-sm text-green-700 font-medium mb-2">Proof of Delivery:</p>
              <img id="modal-pod-image" src="" alt="Proof of Delivery" class="rounded border border-green-300 max-w-full h-auto">
            </div>
          </div>
        </div>

        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-4">Shipment Timeline</h3>
          <div id="modal-timeline" class="space-y-4">
            <!-- Timeline will be populated here -->
          </div>
        </div>
      </div>
      
      <div class="modal-footer bg-gray-50 p-4 border-t border-gray-200">
        <div class="flex justify-end">
          <button id="print-tracking" class="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            <i class="ri-printer-line"></i> Print Details
          </button>
        </div>
      </div>
    </div>
  `;

  // Add modal to the page
  document.body.appendChild(trackingModal);

  // Modal control functions
  function openTrackingModal() {
    trackingModal.classList.remove("hidden");
    setTimeout(() => {
      const modalContent = trackingModal.querySelector("div");
      modalContent.classList.remove("scale-95", "opacity-0");
      modalContent.classList.add("scale-100", "opacity-100");
    }, 10);
  }

  function closeTrackingModal() {
    const modalContent = trackingModal.querySelector("div");
    modalContent.classList.remove("scale-100", "opacity-100");
    modalContent.classList.add("scale-95", "opacity-0");

    setTimeout(() => {
      trackingModal.classList.add("hidden");
    }, 300);
  }

  // Event listeners for modal
  document
    .getElementById("close-modal")
    ?.addEventListener("click", closeTrackingModal);
  trackingModal.addEventListener("click", (e) => {
    if (e.target === trackingModal) {
      closeTrackingModal();
    }
  });

  document.getElementById("print-tracking")?.addEventListener("click", () => {
    window.print();
  });

  // Status color mapping for Skynet Express statuses
  const statusColors = {
    "To Pick": {
      bg: "bg-gray-100",
      text: "text-gray-800",
      border: "border-gray-200",
    },
    Picked: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      border: "border-blue-200",
    },
    "Deposit at Agency": {
      bg: "bg-indigo-100",
      text: "text-indigo-800",
      border: "border-indigo-200",
    },
    "In Transit": {
      bg: "bg-purple-100",
      text: "text-purple-800",
      border: "border-purple-200",
    },
    "Arrival at Facility": {
      bg: "bg-teal-100",
      text: "text-teal-800",
      border: "border-teal-200",
    },
    Processed: {
      bg: "bg-cyan-100",
      text: "text-cyan-800",
      border: "border-cyan-200",
    },
    "On Delivery": {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      border: "border-yellow-200",
    },
    Delivered: {
      bg: "bg-green-100",
      text: "text-green-800",
      border: "border-green-200",
    },
    "Can't Deliver": {
      bg: "bg-red-100",
      text: "text-red-800",
      border: "border-red-200",
    },
    "Returning to Client": {
      bg: "bg-orange-100",
      text: "text-orange-800",
      border: "border-orange-200",
    },
    "Returned to Client": {
      bg: "bg-pink-100",
      text: "text-pink-800",
      border: "border-pink-200",
    },
  };

  // Icon mapping for Skynet Express timeline statuses
  const statusIcons = {
    "To Pick": "ri-inbox-line", // Waiting to be picked up
    Picked: "ri-truck-line", // Package has been picked up
    "Deposit at Agency": "ri-building-line", // At agency location
    "In Transit": "ri-road-map-line", // Moving between locations
    "Arrival at Facility": "ri-community-line", // Arrived at facility
    Processed: "ri-settings-5-line", // Being processed
    "On Delivery": "ri-home-7-line", // Out for delivery
    Delivered: "ri-checkbox-circle-line", // Successfully delivered
    "Can't Deliver": "ri-close-circle-line", // Delivery attempt failed
    "Returning to Client": "ri-arrow-go-back-line", // Being returned
    "Returned to Client": "ri-archive-line", // Return completed
  };

  const trackshipment = async (waybill_number) => {
    const data = await fetch(
      `https://www.app.skynetexpressgh.com/api/v1/track-shipment?waybill_number=${waybill_number}`
    );
    const res = await data.json();
    return res;
  };

  trackingForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const number = document.getElementById("tracking-number").value.trim();

    const tracking = await trackshipment(number);
    console.log(tracking);
    showLoader();

    setTimeout(() => {
      if (tracking.status == "success") {
        trackingError.classList.add("hidden");

        // Populate modal with tracking data
        populateTrackingModal(number, tracking.data);
        openTrackingModal();
      } else {
        trackingError.classList.remove("hidden");
      }

      hideLoader();
    }, 1000);
  });

  function populateTrackingModal(trackingNumber, trackingData) {
    // Set tracking number
    document
      .getElementById("modal-tracking-number")
      .querySelector("span").textContent = trackingNumber;

    // Get the latest status (first item in array)
    const latestStatus = trackingData[0];

    // Set status badge with appropriate color
    const statusBadge = document.getElementById("modal-status-badge");
    const statusText = latestStatus.description || latestStatus.activity_name;
    statusBadge.textContent = statusText;

    // Apply color based on status - match partial status names
    const statusKey =
      Object.keys(statusColors).find((key) =>
        statusText.toLowerCase().includes(key.toLowerCase())
      ) || "To Pick";

    const colors = statusColors[statusKey] || statusColors["To Pick"];
    statusBadge.className = `px-4 py-2 rounded-full text-sm font-semibold ${colors.bg} ${colors.text} ${colors.border}`;

    // Set consignee information from API data
    const consigneeName = latestStatus.consignee_first_name
      ? `${latestStatus.consignee_first_name} ${
          latestStatus.consignee_last_name || ""
        }`
      : "Not Available";

    document.getElementById("modal-consignee").textContent = consigneeName;
    document.getElementById("modal-company").textContent =
      latestStatus.company_name || "N/A";
    document.getElementById("modal-contact").textContent =
      latestStatus.consignee_contact || "N/A";

    // Populate timeline
    const timelineContainer = document.getElementById("modal-timeline");
    timelineContainer.innerHTML = "";

    trackingData.forEach((data, index) => {
      const timelineItem = document.createElement("div");
      timelineItem.className = `flex items-start gap-4 p-3 rounded-lg border-l-4 ${
        index === 0 ? "bg-blue-50 border-red-500" : "bg-gray-50 border-gray-300"
      }`;

      // Determine icon based on status - match partial status names
      const statusKey =
        Object.keys(statusIcons).find((key) =>
          (data.description || data.activity_name)
            .toLowerCase()
            .includes(key.toLowerCase())
        ) || "ri-inbox-line";

      const icon = statusIcons[statusKey] || "ri-inbox-line";

      timelineItem.innerHTML = `
        <div class="flex-shrink-0 w-10 h-10 rounded-full ${
          index === 0 ? "bg-blue-100 text-red-600" : "bg-gray-200 text-gray-600"
        } flex items-center justify-center">
          <i class="${icon} text-lg"></i>
        </div>
        <div class="flex-1">
          <div class="flex justify-between items-start">
            <h4 class="font-medium ${
              index === 0 ? "text-red-800" : "text-gray-800"
            }">${data.description || data.activity_name}</h4>
            <span class="text-sm ${
              index === 0 ? "text-red-600" : "text-gray-500"
            }">${data.date_scaned}</span>
          </div>
          ${
            data.location || data.scan_location
              ? `<p class="text-sm text-gray-600 mt-1">${
                  data.location || data.scan_location
                }</p>`
              : ""
          }
          ${
            data.notes
              ? `<p class="text-sm text-gray-500 mt-1">${data.notes}</p>`
              : ""
          }
        </div>
      `;

      // Add animation delay for staggered appearance
      timelineItem.style.animationDelay = `${index * 0.1}s`;
      timelineItem.classList.add("animate-fade-in-up");

      timelineContainer.appendChild(timelineItem);
    });

    // Show delivery information if delivered
    const deliveryInfo = document.getElementById("modal-delivery-info");
    const isDelivered = (latestStatus.description || latestStatus.activity_name)
      .toLowerCase()
      .includes("delivered");

    if (isDelivered && latestStatus.consignee_first_name) {
      deliveryInfo.classList.remove("hidden");
      document.getElementById("modal-recipient-name").textContent = `${
        latestStatus.consignee_first_name
      } ${latestStatus.consignee_last_name || ""}`;
      document.getElementById("modal-recipient-contact").textContent =
        latestStatus.consignee_contact || "N/A";

      // Show proof of delivery if available
      const podContainer = document.getElementById("modal-pod-container");
      const podImage = document.getElementById("modal-pod-image");

      if (latestStatus.pod) {
        podContainer.classList.remove("hidden");
        podImage.src = latestStatus.pod;
        podImage.onerror = function () {
          podContainer.classList.add("hidden");
        };
      } else {
        podContainer.classList.add("hidden");
      }
    } else {
      deliveryInfo.classList.add("hidden");
    }
  }

  tryAgainButton?.addEventListener("click", () => {
    trackingError.classList.add("hidden");
    document.getElementById("tracking-number").value = "";
    document.getElementById("tracking-number").focus();
  });

  /* ────────────────────────────────────
     Animated Counters & Fade‑ins
  ──────────────────────────────────── */

  function animateCounter(id, target, duration) {
    const el = document.getElementById(id);
    if (!el) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      const val = Math.min(Math.round(start), target);
      el.textContent = val.toLocaleString();
      if (val >= target) clearInterval(timer);
    }, 16);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter("counter-countries", 16, 1500);
          animateCounter("counter-shipments", 180000, 3000);
          animateCounter("counter-clients", 573, 1800);
          animateCounter("counter-employees", 120, 1600);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  const counterSection = document
    .getElementById("counter-countries")
    ?.closest("section");
  counterSection && counterObserver.observe(counterSection);

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".fade-in").forEach((el) => {
    el.style.opacity = "0";
    fadeObserver.observe(el);
  });

  /* ────────────────────────────────────
     Forms (Contact & Newsletter)
  ──────────────────────────────────── */
  document.getElementById("contact-form")?.addEventListener("submit", (e) => {
    e.preventDefault();

    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "Thank you for your message! We will get back to you soon.",
      timer: 3000,
      showConfirmButton: false,
    });

    e.target.reset();
  });

  document
    .getElementById("newsletter-form")
    ?.addEventListener("submit", (e) => {
      e.preventDefault();

      Swal.fire({
        icon: "success",
        title: "Subscribed!",
        text: "Thank you for subscribing to our newsletter!",
        timer: 3000,
        showConfirmButton: false,
      });

      e.target.reset();
    });

  /* ────────────────────────────────────
     Custom Checkbox Styling
  ──────────────────────────────────── */
  document
    .querySelectorAll('.custom-checkbox input[type="checkbox"]')
    .forEach((cb) => {
      cb.addEventListener("change", function () {
        this.nextElementSibling?.classList.toggle("checked", this.checked);
      });
    });
});
