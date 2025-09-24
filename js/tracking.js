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
            <h2 class="text-2xl font-bold">Shipment Tracking Details</h2>
            <p id="modal-tracking-number" class="text-white-100 mt-1">Waybill No.: <span class="font-mono"></span></p>
          </div>
          <div id="modal-status-badge" class="px-4 py-2 rounded-full text-sm font-semibold bg-white/20 backdrop-blur-sm"></div>
        </div>
      </div>
      
      <div class="modal-body p-6 overflow-y-auto max-h-[60vh]">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
  <div class="bg-gray-50 p-4 rounded-lg">
    <h3 class="text-sm font-medium text-gray-500 mb-1">Consignee Name</h3>
    <p id="modal-consignee" class="font-semibold">-</p>
  </div>
  <div class="bg-gray-50 p-4 rounded-lg">
    <h3 class="text-sm font-medium text-gray-500 mb-1">Company Name</h3>
    <p id="modal-company" class="font-semibold">-</p>
  </div>
  <div class="bg-gray-50 p-4 rounded-lg">
    <h3 class="text-sm font-medium text-gray-500 mb-1">Contact</h3>
    <p id="modal-contact" class="font-semibold">-</p>
  </div>
  <div class="bg-gray-50 p-4 rounded-lg">
    <h3 class="text-sm font-medium text-gray-500 mb-1">Location</h3>
    <p id="modal-location" class="font-semibold">-</p>
  </div>
</div>
        <div id="modal-delivery-info" class="bg-gray-50 border border-gray-200 rounded-lg p-2 hidden">
          <h3 class="text-lg font-semibold text-red-800 mb-2">Delivery Information</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-red-700"><span class="font-medium">Recipient:</span> <span id="modal-recipient-name">-</span></p>
              <p class="text-sm text-red-700"><span class="font-medium">Contact:</span> <span id="modal-recipient-contact">-</span></p>
            </div>
            <div id="modal-pod-container" class="hidden">
              <p class="text-sm text-red-700 font-medium mb-2">Signature:</p>
                <img id="modal-pod-image" src="" alt="Signature"class="rounded border border-red-300"style="width: 120px; height: auto;">
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

  // Enhanced Print Function
  document.getElementById("print-tracking")?.addEventListener("click", () => {
    printTrackingDetails();
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
    "To Pick": "ri-inbox-archive-line",
    Picked: "ri-truck-line",
    "Deposit at Agency": "ri-building-line",
    "In Transit": "ri-road-map-line",
    "Arrival at Facility": "ri-community-line",
    Processed: "ri-settings-5-line",
    "On Delivery": "ri-home-7-line",
    Delivered: "ri-checkbox-circle-line",
    "Can't Deliver": "ri-close-circle-line",
    "Returning to Client": "ri-arrow-go-back-line",
    "Returned to Client": "ri-archive-line",
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
    // Store tracking data for printing
    window.currentTrackingData = {
      number: trackingNumber,
      data: trackingData,
      latestStatus: trackingData[0],
    };

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

    document.getElementById("modal-consignee").textContent =
      latestStatus.Receiver_name;
    document.getElementById("modal-company").textContent =
      latestStatus.delivery_company_name || "N/A";
    document.getElementById("modal-contact").textContent =
      latestStatus.d_contact_number || "N/A";
    document.getElementById("modal-location").textContent =
      latestStatus.location_delivery || "N/A";

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

  // Enhanced Print Function - Direct to Print Preview
  function printTrackingDetails() {
    if (!window.currentTrackingData) return;

    const { number, data, latestStatus } = window.currentTrackingData;

    // Create a hidden iframe for printing
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "none";
    iframe.style.visibility = "hidden";

    document.body.appendChild(iframe);

    const printDocument = iframe.contentWindow.document;

    // Create print-friendly HTML
    const printContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>SkyNet Express Ltd - Tracking Details</title>
      <style>
        @page {
          size: A4;
          margin: 0.5cm;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          font-size: 12px;
          line-height: 1.4;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .print-container {
          max-width: 100%;
          margin: 0 auto;
        }
        .print-header {
          text-align: center;
          border-bottom: 2px solid #dc2626;
          padding-bottom: 15px;
          margin-bottom: 20px;
        }
        .print-header h1 {
          color: #dc2626;
          font-size: 24px;
          margin: 0 0 5px 0;
        }
        .print-header .subtitle {
          color: #666;
          font-size: 14px;
        }
        .shipment-info {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin-bottom: 20px;
        }
        .info-card {
          border: 1px solid #ddd;
          padding: 10px;
          border-radius: 5px;
          background: #f9f9f9;
        }
        .info-card h3 {
          margin: 0 0 5px 0;
          font-size: 11px;
          color: #666;
          text-transform: uppercase;
        }
        .info-card p {
          margin: 0;
          font-weight: bold;
          font-size: 12px;
        }
        .timeline {
          margin-top: 20px;
        }
        .timeline-item {
          display: flex;
          margin-bottom: 10px;
          page-break-inside: avoid;
        }
        .timeline-icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 10px;
          flex-shrink: 0;
          font-weight: bold;
          font-size: 12px;
        }
        .timeline-content {
          flex: 1;
          border-left: 2px solid #dc2626;
          padding-left: 10px;
          padding-bottom: 10px;
        }
        .timeline-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .timeline-status {
          font-weight: bold;
          color: #dc2626;
          font-size: 11px;
        }
        .timeline-date {
          color: #666;
          font-size: 10px;
        }
        .timeline-location {
          color: #666;
          font-size: 10px;
          margin-top: 2px;
        }
        .print-footer {
          margin-top: 30px;
          text-align: center;
          font-size: 10px;
          color: #666;
          border-top: 1px solid #ddd;
          padding-top: 10px;
        }
        .status-badge {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        @media print {
          .no-print { display: none !important; }
          body { -webkit-print-color-adjust: exact; }
        }
      </style>
    </head>
    <body>
      <div class="print-container">
        <div class="print-header">
          <div class="company-logo-container">
            <img src="images/logo_red.png" alt="Skynet Express Ltd" class="company-logo" style="width: 180px; height: auto;">
          </div>
            <div class="subtitle">Shipment Tracking Details</div>
              <div class="status-badge" style="background: ${
                getStatusColor(latestStatus).bg
              }; color: ${getStatusColor(latestStatus).text}">
                ${latestStatus.description || latestStatus.activity_name}
              </div>
            </div>
        
        <div class="shipment-info">
          <div class="info-card">
            <h3>Waybill Number</h3>
            <p>${number}</p>
          </div>
          <div class="info-card">
            <h3>Consignee Name</h3>
            <p>${latestStatus.Receiver_name || "N/A"}</p>
          </div>
          <div class="info-card">
            <h3>Company Name</h3>
            <p>${latestStatus.delivery_company_name || "N/A"}</p>
          </div>
          <div class="info-card">
            <h3>Contact</h3>
            <p>${latestStatus.d_contact_number || "N/A"}</p>
          </div>
          <div class="info-card">
            <h3>Delivery Location</h3>
            <p>${latestStatus.location_delivery}</p>
          </div>
          <div class="info-card">
            <h3>Last Updated</h3>
            <p>${data[0].date_scaned}</p>
          </div>
        </div>

        <div class="timeline">
          <h3 style="margin-bottom: 15px; color: #dc2626;">SHIPMENT TIMELINE</h3>
          ${data
            .map(
              (item, index) => `
            <div class="timeline-item">
              <div class="timeline-icon">${index + 1}</div>
              <div class="timeline-content">
                <div class="timeline-header">
                  <span class="timeline-status">${
                    item.description || item.activity_name
                  }</span>
                  <span class="timeline-date">${item.date_scaned}</span>
                </div>
                ${
                  item.location || item.scan_location
                    ? `<div class="timeline-location">Location: ${
                        item.location || item.scan_location
                      }</div>`
                    : ""
                }
                ${
                  item.notes
                    ? `<div class="timeline-location">Notes: ${item.notes}</div>`
                    : ""
                }
              </div>
            </div>
          `
            )
            .join("")}
        </div>

        ${
          (latestStatus.description || latestStatus.activity_name)
            .toLowerCase()
            .includes("delivered")
            ? `
          <div style="margin-top: 20px; padding: 15px; background: #f0f9f0; border: 1px solid #d1f0d1; border-radius: 5px;">
            <h3 style="color: #166534; margin: 0 0 10px 0;">DELIVERY INFORMATION</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
              <div>
                <p style="margin: 2px 0;"><strong>Recipient:</strong> ${
                  latestStatus.consignee_first_name
                } ${latestStatus.consignee_last_name || ""}</p>
                <p style="margin: 2px 0;"><strong>Contact:</strong> ${
                  latestStatus.consignee_contact || "N/A"
                }</p>
              </div>
              ${
                latestStatus.pod
                  ? `
                <div>
                <p style="margin: 2px 0;"><strong>Signature:</strong></p>
                  <img src="${latestStatus.pod}" 
                    width="100" 
                    height="200" 
                    style="max-width: 100%; height: auto;" />
                </div>
              `
                  : ""
              }
            </div>
          </div>
        `
            : ""
        }

        <div class="print-footer">
          <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
          <p>SkyNet Express Ltd - www.skynetexpressgh.com</p>
        </div>
      </div>
      
      <script>
        // Automatically trigger print when content loads
        window.onload = function() {
          setTimeout(function() {
            window.print();
            // Close the iframe after printing
            setTimeout(function() {
              window.frameElement.parentNode.removeChild(window.frameElement);
            }, 100);
          }, 500);
        };
      </script>
    </body>
    </html>
  `;

    printDocument.open();
    printDocument.write(printContent);
    printDocument.close();
  }

  // Helper function to get status color for print
  function getStatusColor(status) {
    const statusText = status.description || status.activity_name;
    const statusKey =
      Object.keys(statusColors).find((key) =>
        statusText.toLowerCase().includes(key.toLowerCase())
      ) || "To Pick";

    const colors = statusColors[statusKey] || statusColors["To Pick"];

    // Convert Tailwind colors to hex for print
    const colorMap = {
      "bg-gray-100": "#f3f4f6",
      "text-gray-800": "#1f2937",
      "bg-blue-100": "#dbeafe",
      "text-blue-800": "#1e40af",
      "bg-indigo-100": "#e0e7ff",
      "text-indigo-800": "#3730a3",
      "bg-purple-100": "#f3e8ff",
      "text-purple-800": "#6b21a8",
      "bg-teal-100": "#ccfbf1",
      "text-teal-800": "#115e59",
      "bg-cyan-100": "#cffafe",
      "text-cyan-800": "#155e75",
      "bg-yellow-100": "#fef9c3",
      "text-yellow-800": "#854d0e",
      "bg-green-100": "#dcfce7",
      "text-green-800": "#166534",
      "bg-red-100": "#fee2e2",
      "text-red-800": "#991b1b",
      "bg-orange-100": "#ffedd5",
      "text-orange-800": "#9a3412",
      "bg-pink-100": "#fce7f3",
      "text-pink-800": "#9d174d",
    };

    return {
      bg: colorMap[colors.bg] || "#f3f4f6",
      text: colorMap[colors.text] || "#1f2937",
    };
  }

  // Helper function to get status color for print
  function getStatusColor(status) {
    const statusText = status.description || status.activity_name;
    const statusKey =
      Object.keys(statusColors).find((key) =>
        statusText.toLowerCase().includes(key.toLowerCase())
      ) || "To Pick";

    const colors = statusColors[statusKey] || statusColors["To Pick"];

    // Convert Tailwind colors to hex for print
    const colorMap = {
      "bg-gray-100": "#f3f4f6",
      "text-gray-800": "#1f2937",
      "bg-blue-100": "#dbeafe",
      "text-blue-800": "#1e40af",
      "bg-indigo-100": "#e0e7ff",
      "text-indigo-800": "#3730a3",
      "bg-purple-100": "#f3e8ff",
      "text-purple-800": "#6b21a8",
      "bg-teal-100": "#ccfbf1",
      "text-teal-800": "#115e59",
      "bg-cyan-100": "#cffafe",
      "text-cyan-800": "#155e75",
      "bg-yellow-100": "#fef9c3",
      "text-yellow-800": "#854d0e",
      "bg-green-100": "#dcfce7",
      "text-green-800": "#166534",
      "bg-red-100": "#fee2e2",
      "text-red-800": "#991b1b",
      "bg-orange-100": "#ffedd5",
      "text-orange-800": "#9a3412",
      "bg-pink-100": "#fce7f3",
      "text-pink-800": "#9d174d",
    };

    return {
      bg: colorMap[colors.bg] || "#f3f4f6",
      text: colorMap[colors.text] || "#1f2937",
    };
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
