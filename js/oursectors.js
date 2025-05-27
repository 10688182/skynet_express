// Mobile menu toggle
document
  .querySelector('[aria-controls="mobile-menu"]')
  .addEventListener("click", function () {
    const menu = document.getElementById("mobile-menu");
    menu.classList.toggle("hidden");
  });

// Service tab functionality
function changeServiceTab(service) {
  // Hide all tabs
  document.querySelectorAll(".service-tab").forEach((tab) => {
    tab.classList.add("hidden");
  });

  // Remove active class from all buttons
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.classList.remove("active", "bg-blue-100", "text-blue-800");
    button.classList.add("bg-gray-100", "text-gray-800");
  });

  // Show selected tab
  document.getElementById(`${service}-tab`).classList.remove("hidden");

  // Add active class to clicked button
  const activeButton = document.querySelector(
    `.tab-button:nth-child(${getTabIndex(service)})`
  );
  if (activeButton) {
    activeButton.classList.remove("bg-gray-100", "text-gray-800");
    activeButton.classList.add("active", "bg-blue-100", "text-blue-800");
  }
}

function getTabIndex(service) {
  const services = ["pharma", "oil", "supply", "express", "customs", "special"];
  return services.indexOf(service) + 1;
}
