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
     Tracking System
  ──────────────────────────────────── */
  const trackingForm = document.getElementById("tracking-form");
  const trackingResults = document.getElementById("tracking-results");
  const trackingError = document.getElementById("tracking-error");
  const tryAgainButton = document.getElementById("try-again");
  const trackingTimeline = document.getElementById("tracking-timeline");

  const trackingData = {
    FTL1234567890: {
      status: "In Transit",
      lastUpdate: "May 17, 2025 at 10:24 AM",
      serviceType: "Express Delivery",
      weight: "5.2 kg",
      dimensions: "30 × 25 × 15 cm",
      estDelivery: "May 19, 2025",
      timeline: [
        {
          status: "Order Received",
          location: "New York, NY",
          date: "May 15, 2025",
          time: "09:15 AM",
          completed: true,
        },
        {
          status: "Processing",
          location: "New York, NY",
          date: "May 15, 2025",
          time: "02:30 PM",
          completed: true,
        },
        {
          status: "Shipped",
          location: "New York, NY",
          date: "May 16, 2025",
          time: "08:45 AM",
          completed: true,
        },
        {
          status: "In Transit",
          location: "Chicago, IL",
          date: "May 17, 2025",
          time: "10:24 AM",
          completed: true,
          current: true,
        },
        {
          status: "Out for Delivery",
          location: "Los Angeles, CA",
          date: "Pending",
          time: "",
          completed: false,
        },
        {
          status: "Delivered",
          location: "Los Angeles, CA",
          date: "Pending",
          time: "",
          completed: false,
        },
      ],
    },
    FTL9876543210: {
      status: "Delivered",
      lastUpdate: "May 16, 2025 at 02:45 PM",
      serviceType: "Standard Shipping",
      weight: "3.8 kg",
      dimensions: "25 × 20 × 10 cm",
      estDelivery: "May 16, 2025",
      timeline: [
        {
          status: "Order Received",
          location: "Boston, MA",
          date: "May 12, 2025",
          time: "11:30 AM",
          completed: true,
        },
        {
          status: "Processing",
          location: "Boston, MA",
          date: "May 12, 2025",
          time: "04:15 PM",
          completed: true,
        },
        {
          status: "Shipped",
          location: "Boston, MA",
          date: "May 13, 2025",
          time: "09:20 AM",
          completed: true,
        },
        {
          status: "In Transit",
          location: "Philadelphia, PA",
          date: "May 14, 2025",
          time: "03:45 PM",
          completed: true,
        },
        {
          status: "Out for Delivery",
          location: "Washington, DC",
          date: "May 16, 2025",
          time: "09:30 AM",
          completed: true,
        },
        {
          status: "Delivered",
          location: "Washington, DC",
          date: "May 16, 2025",
          time: "02:45 PM",
          completed: true,
          current: true,
        },
      ],
    },

    FTL9876543223: {
      status: "Processing",
      lastUpdate: "May 16, 2025 at 02:45 PM",
      serviceType: "Standard Shipping",
      weight: "3.8 kg",
      dimensions: "25 × 20 × 10 cm",
      estDelivery: "May 16, 2025",
      timeline: [
        {
          status: "Order Received",
          location: "Boston, MA",
          date: "May 12, 2025",
          time: "11:30 AM",
          completed: true,
        },
        {
          status: "Processing",
          location: "Boston, MA",
          date: "May 12, 2025",
          time: "04:15 PM",
          completed: true,
          current: true,
        },
        {
          status: "Shipped",
          location: "Boston, MA",
          date: "May 13, 2025",
          time: "09:20 AM",
          completed: false,
        },
        {
          status: "In Transit",
          location: "Philadelphia, PA",
          date: "May 14, 2025",
          time: "03:45 PM",
          completed: false,
        },
        {
          status: "Out for Delivery",
          location: "Washington, DC",
          date: "May 16, 2025",
          time: "09:30 AM",
          completed: false,
        },
        {
          status: "Delivered",
          location: "Washington, DC",
          date: "May 16, 2025",
          time: "02:45 PM",
          completed: false,
        },
      ],
    },
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
      // const shipment = trackingData[number];

      if (tracking.status == "success") {
        trackingResults.classList.remove("hidden");
        trackingError.classList.add("hidden");
        const tracking_data = tracking.data[0];
        console.log(tracking.data[0]);
        // document.getElementById("display-tracking-number").textContent = number;
        // document.getElementById("tracking-status").textContent =
        //   tracking_data.activity_name;
        // document.getElementById("last-update").textContent =
        // tracking_data.activity_name;
        // document.getElementById("service-type").textContent =
        // tracking_data.activity_name;
        // document.getElementById("weight").textContent =tracking_data.activity_name;
        // document.getElementById("dimensions").textContent =tracking_data.activity_name;
        // document.getElementById("est-delivery").textContent = tracking_data.activity_name;

        // document.querySelector("#tracking-results").insertAdjacentHTML(
        // "afterbegin",
        // null)

        //   document.querySelector("#tracking-results").insertAdjacentHTML(
        // "afterbegin",
        // `<div class="border-b border-gray-200 pb-4 mb-6">
        //     <div class="flex justify-between items-center mb-2">
        //       <h3 class="text-lg font-semibold">Shipment Status</h3>
        //       <span
        //         id="tracking-status"
        //         class="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
        //         >${tracking_data.description}</span>
        //     </div>`
        //     )

        document.querySelector("#tracking-results").innerHTML = "";
        document.querySelector("#tracking-results").insertAdjacentHTML(
          "afterbegin",
          tracking.data
            .map((data, index) => {
              return `
  <div class="border-b border-gray-200 pb-4 mb-6">
    <div class="flex justify-between items-center mb-2">
      <h3 class="text-lg font-semibold">${
        index === 0 ? "SHIPMENT STATUS" : ""
      }</h3>
      <div class="flex flex-col items-center w-80 gap-2">
        <span class="px-3 py-1 rounded-full text-xs text-center w-36 font-bold bg-blue-600 text-white">
          ${data.description}
        </span>
      </div>
    </div>

    ${
      index === 0
        ? `
      <p class="text-sm text-gray-500">
        Tracking Number:
        <span class="font-bold text-gray-700">${number}</span>
      </p>
    `
        : ""
    }

    <p class="text-sm text-gray-500">
      Last Updated:
      <span class="font-bold text-gray-700">${data.date_scaned}</span>
    </p>

    ${
      data.activity_name === "Delivered"
        ? `
      <div class="mt-4 text-sm text-slate-600 font-medium">
        <p><span class="font-bold">Recipient Full name:</span> ${data.consignee_first_name} ${data.consignee_last_name}</p>
        <p><span class="font-bold">Recipient Contact:</span> ${data.consignee_contact}</p>
        <img class="w-52 h-16 mt-2 rounded shadow border" src="${data.pod}" alt="Proof of Delivery" />
      </div>
    `
        : ""
    }
  </div>
`;
            })
            .join("") // join the array into a single string
        );

        // const statusEl = document.getElementById("tracking-status");
        // statusEl.className = "px-3 py-1 rounded-full text-xs font-medium";
        // const colours = {
        //   Delivered: ["bg-green-100", "text-green-800"],
        //   "In Transit": ["bg-yellow-100", "text-yellow-800"],
        //   "Out for Delivery": ["bg-yellow-100", "text-yellow-800"],
        //   Processing: ["bg-blue-100", "text-blue-800"],
        //   "At Local Facility": ["bg-blue-100", "text-blue-800"],
        //   Picked: ["bg-blue-100", "text-blue-800"],
        //   "Order Received": ["bg-blue-100", "text-blue-800"],
        // };
        // statusEl.classList.add(
        //   ...(colours[shipment.status] || ["bg-gray-100", "text-gray-800"])
        // );

        // trackingTimeline.innerHTML = "";
        // tracking.data.forEach((data) => {
        //   // console.log(data.description)
        //   const item = document.createElement("div");
        //   item.className = "flex";

        //   const indicator = document.createElement("div");
        //   indicator.className =
        //     "relative flex items-center justify-center w-8 mr-4";
        //   const circle = document.createElement("div");
        //   if (data.description) {
        //     circle.className =
        //       "z-10 w-8 h-8 rounded-full bg-primary flex items-center justify-center";
        //     circle.innerHTML = `<i class="${
        //       data.current ? "ri-checkbox-blank-circle-fill" : "ri-check-line"
        //     } text-white"></i>`;
        //   } else {
        //     circle.className =
        //       "z-10 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center";
        //     circle.innerHTML =
        //       '<i class="ri-checkbox-blank-circle-line text-gray-400"></i>';
        //   }
        //   indicator.appendChild(circle);
        //   const details = document.createElement("div");
        //   details.className = "flex-grow pb-6";
        //   details.innerHTML = `
        //     <div class="flex justify-between items-center mb-1">
        //       <h4 class="font-medium">${data.description}</h4>
        //       <span class="text-sm text-gray-500">${data.description}${
        //     data.description ? " · " + data.description : ""
        //   }</span>
        //     </div>
        //     <p class="text-sm text-gray-600">${data.description}</p>`;

        //   item.append(indicator, details);
        //   trackingTimeline.appendChild(item);
        // });

        // console.log(document.querySelector("#tracking-results"))
      } else {
        trackingResults.classList.add("hidden");
        trackingError.classList.remove("hidden");
      }

      hideLoader();
    }, 1000);
  });

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
