document.addEventListener("DOMContentLoaded", function () {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  // Load cart items from local storage
  loadCart();

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
      if (currentTotal !== 0) {
        cartTotal.textContent = (currentTotal - itemPrice).toFixed(2);
      } else {
        cartTotal.textContent = "0.00";
      }

      // Remove item from local storage
      removeCartItem(itemId);
    }
  });

  function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      let newTotal = 0; // Variable to calculate the new total

      for (let itemId in cart) {
        const { name, price, quantity } = cart[itemId];

        // Create a new cart item container
        const cartItem = document.createElement("li");

        // Create elements for name, price, and quantity
        const itemName = document.createElement("span");
        itemName.textContent = name;

        const itemPrice = document.createElement("span");
        itemPrice.textContent = `$${price} x ${quantity}`;

        // Create remove button and handle removal from localStorage
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.setAttribute("data-id", itemId);
        removeButton.classList.add("remove-from-cart");

        removeButton.addEventListener("click", function (event) {
          const itemId = event.target.getAttribute("data-id");
          const itemPrice = cart[itemId].price;
          const itemQuantity = cart[itemId].quantity;

          // Remove item from the cart
          event.target.parentElement.remove();

          // Update the cart total
          const currentTotal = parseFloat(cartTotal.textContent);
          if (currentTotal !== 0) {
            cartTotal.textContent = (
              currentTotal -
              itemPrice * itemQuantity
            ).toFixed(2);
          } else {
            cartTotal.textContent = "0.00";
          }

          // Remove item from local storage
          removeCartItem(itemId);
        });

        // Append elements to cart item container
        cartItem.appendChild(itemName);
        cartItem.appendChild(document.createTextNode(" - "));
        cartItem.appendChild(itemPrice);
        cartItem.appendChild(document.createTextNode(" "));
        cartItem.appendChild(removeButton);

        // Append the cart item to the cart
        cartItems.appendChild(cartItem);

        // Update the new total
        newTotal += price * quantity;
      }

      // Update the cart total if newTotal is not zero
      if (newTotal !== 0) {
        cartTotal.textContent = newTotal.toFixed(2);
      } else {
        cartTotal.textContent = "0.00";
      }
    }
  }

  function removeCartItem(itemId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    const itemPrice = cart[itemId].price;
    const itemQuantity = cart[itemId].quantity;

    delete cart[itemId];
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update the cart total
    const currentTotal = parseFloat(cartTotal.textContent);
    if (currentTotal !== 0) {
      cartTotal.textContent = (currentTotal - itemPrice * itemQuantity).toFixed(
        2
      );
    } else {
      cartTotal.textContent = "0.00";
    }
  }
});
