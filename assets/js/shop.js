document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", addToCart);
  });

  function addToCart(event) {
    const ticket = event.target.parentElement;

    const ticketId = ticket.getAttribute("data-id");
    const ticketName = ticket.querySelector("h2").textContent;
    const ticketPrice = parseFloat(
      ticket.querySelector("p").textContent.slice(8)
    );
    const quantity = parseInt(
      ticket.querySelector("input[type='number']").value
    );

    saveCart(ticketId, ticketName, ticketPrice, quantity);
  }

  function saveCart(itemId, itemName, itemPrice, itemQuantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    if (!cart[itemId]) {
      cart[itemId] = { name: itemName, price: itemPrice, quantity: 0 };
    }

    cart[itemId].quantity += itemQuantity;
    localStorage.setItem("cart", JSON.stringify(cart));
  }
});
