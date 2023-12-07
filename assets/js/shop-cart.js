document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", addToCart);
  });

  // Load cart items from local storage
  loadCart();

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

    // Create a new cart item
    const cartItem = document.createElement("li");
    cartItem.innerHTML = `${ticketName} - $${ticketPrice} x ${quantity} <button class="remove-from-cart" data-id="${ticketId}">Remove</button>`;
    cartItems.appendChild(cartItem);

    // Update the cart total
    const currentTotal = parseFloat(cartTotal.textContent);
    cartTotal.textContent = (currentTotal + ticketPrice).toFixed(2);

    // Save the cart to local storage
    saveCart(ticketId, ticketName, ticketPrice, quantity);
  }

  // Function to remove an item from the cart
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-from-cart")) {
      const itemId = event.target.getAttribute("data-id");
      const itemPrice = parseFloat(
        event.target.previousSibling.textContent.slice(8)
      );

      // Remove item from the cart
      event.target.parentElement.remove();

      // Update the cart total
      const currentTotal = parseFloat(cartTotal.textContent);
      cartTotal.textContent = (currentTotal - itemPrice).toFixed(2);

      // Remove item from local storage
      removeCartItem(itemId);
    }
  });

  function saveCart(itemId, itemName, itemPrice, itemQuantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    if (!cart[itemId]) {
      cart[itemId] = { name: itemName, price: itemPrice, quantity: 0 };
    }

    cart[itemId].quantity += itemQuantity;
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
        for (let itemId in cart) {
            const { name, price, quantity } = cart[itemId];

            // Create a new cart item
            const cartItem = document.createElement("li");
            cartItem.innerHTML = `${name} - $${price} x ${quantity}`;
            cartItems.appendChild(cartItem);

            // Update the cart total
            const currentTotal = parseFloat(cartTotal.textContent);
            cartTotal.textContent = (currentTotal + price * quantity).toFixed(2);
        }
    }
}
});
