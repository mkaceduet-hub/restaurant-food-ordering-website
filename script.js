document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) lucide.createIcons();
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.innerHTML = open ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
    if (window.lucide) lucide.createIcons();
  });
  navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = '<i data-lucide="menu"></i>';
    if (window.lucide) lucide.createIcons();
  }));

  const filters = document.querySelectorAll(".filter");
  const cards = document.querySelectorAll(".food-card");
  filters.forEach(button => button.addEventListener("click", () => {
    filters.forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const category = button.dataset.filter;
    cards.forEach(card => {
      card.hidden = category !== "all" && card.dataset.category !== category;
    });
  }));

  const order = [];
  const count = document.querySelector(".order-count");
  const total = document.querySelector(".order-total");
  const toast = document.querySelector(".toast");
  let toastTimer;
  function notify(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2300);
  }
  function renderOrder() {
    count.textContent = order.length;
    const sum = order.reduce((value, item) => value + item.price, 0);
    total.textContent = " • $" + sum.toFixed(2);
  }
  document.querySelectorAll(".add-btn").forEach(button => button.addEventListener("click", () => {
    order.push({name: button.dataset.item, price: Number(button.dataset.price)});
    renderOrder();
    notify(button.dataset.item + " added to your order");
  }));
  document.querySelector("#view-order").addEventListener("click", () => {
    if (!order.length) return notify("Your order is empty. Choose a dish first!");
    const summary = order.map(item => item.name + " — $" + item.price.toFixed(2)).join("\n");
    const sum = order.reduce((value, item) => value + item.price, 0);
    alert("YOUR SAVORIA ORDER\n\n" + summary + "\n\nTotal: $" + sum.toFixed(2) + "\n\nDemo only — no order has been submitted.");
  });

  document.querySelector("#contact-form").addEventListener("submit", event => {
    event.preventDefault();
    document.querySelector(".form-note").textContent = "Thanks! This demo form is not connected to a messaging service.";
    event.target.reset();
  });
  document.querySelector("#year").textContent = new Date().getFullYear();
});