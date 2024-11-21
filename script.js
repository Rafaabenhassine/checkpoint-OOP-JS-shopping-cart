// Classes
class Product {
    constructor(id, name, price) {
      this.id = id;
      this.name = name;
      this.price = price;
    }
  }
  
  class ShoppingCartItem {
    constructor(product, quantity) {
      this.product = product;
      this.quantity = quantity;
    }
  
    getTotalPrice() {
      return this.product.price * this.quantity;
    }
  }
  
  class ShoppingCart {
    constructor() {
      this.items = [];
    }
  
    addItem(product, quantity = 1) {
      const existingItem = this.items.find(item => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push(new ShoppingCartItem(product, quantity));
      }
      updateCartDisplay();
    }
  
    removeItem(productId) {
      this.items = this.items.filter(item => item.product.id !== productId);
      updateCartDisplay();
    }
  
    getTotalPrice() {
      return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }
  }
  
  // Initialize products and cart
  const products = [
    new Product(1, "Laptop", 1200),
    new Product(2, "Phone", 800),
    new Product(3, "Headphones", 200)
  ];
  
  const cart = new ShoppingCart();
  
  // DOM Manipulation Functions
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
      cart.addItem(product);
    }
  }
  
  function removeFromCart(productId) {
    cart.removeItem(productId);
  }
  
  function updateCartDisplay() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
  
    // Clear current display
    cartItemsContainer.innerHTML = "";
  
    // Display cart items
    if (cart.items.length === 0) {
      cartItemsContainer.innerHTML = "<p>The cart is empty.</p>";
    } else {
      cart.items.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.className = "cart-item";
        itemElement.innerHTML = `
          ${item.product.name} (x${item.quantity}) - $${item.getTotalPrice().toFixed(2)}
          <button onclick="removeFromCart(${item.product.id})">Remove</button>
        `;
        cartItemsContainer.appendChild(itemElement);
      });
    }
  
    // Display total price
    totalPriceElement.textContent = `Total: $${cart.getTotalPrice().toFixed(2)}`;
  }
  