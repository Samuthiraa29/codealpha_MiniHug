// Basic client-side logic for MiniHug

// UI State Management
function checkAuth() {
    const token = localStorage.getItem('token');
    const landingPage = document.getElementById('landing-page');
    const mainApp = document.getElementById('main-app');

    if (token) {
        landingPage.style.display = 'none';
        mainApp.style.display = 'block';
        showProducts(); // Default to products view
        loadProducts();
        loadToys();
        updateCartCount();
    } else {
        landingPage.style.display = 'flex';
        mainApp.style.display = 'none';
        resetAuthSelection();
    }
}

function logout() {
    localStorage.removeItem('token');
    checkAuth();
}

function showTab(tabName) {
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    
    document.getElementById(`${tabName}-form`).classList.add('active');
    event.target.classList.add('active');
}

function startAuth(type) {
    document.getElementById('auth-selection').style.display = 'none';
    document.getElementById('auth-forms-container').style.display = 'block';
    
    // Manually set active states since we aren't using the click event target here
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`${type}-form`).classList.add('active');
    document.getElementById(`tab-${type}`).classList.add('active');
}

function resetAuthSelection() {
    document.getElementById('auth-selection').style.display = 'flex';
    document.getElementById('auth-forms-container').style.display = 'none';
}

// Cart functionality (simple local storage)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(product) {
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Added to cart!');
  updateCartCount();
}

function updateCartCount() {
    const count = document.getElementById('cart-count');
    if(count) count.innerText = cart.length;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  loadCartPage(); // Refresh display
}

function loadCartPage() {
  const container = document.getElementById('cart-items-list');
  const totalSpan = document.getElementById('cart-total');
  
  if (!container) return; // We are not on the cart page

  container.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = '<p>Your cart is empty.</p>';
  } else {
    cart.forEach((item, index) => {
      total += item.price;
      container.innerHTML += `
        <div class="cart-item-row">
          <img src="${item.image || 'placeholder.jpg'}" alt="${item.name}" onerror="this.onerror=null; this.src='https://placehold.co/300?text=No+Image'">
          <div class="cart-details">
            <h3>${item.name}</h3>
            <p>$${item.price}</p>
          </div>
          <button class="remove-sm" onclick="removeFromCart(${index})">Remove</button>
        </div>
      `;
    });
  }
  if(totalSpan) totalSpan.innerText = total.toFixed(2);
}

// Auth functions
async function login(email, password) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  if (response.ok) {
    localStorage.setItem('token', data.token);
    alert('Logged in!');
    checkAuth();
  } else {
    alert(data.error);
  }
}

async function signup(name, email, password) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  const data = await response.json();
  if (response.ok) {
    alert('Signed up!');
    // Optionally auto-login or switch to login tab
    showTab('login');
  } else {
    alert(data.error);
  }
}

// Load products/toys
async function loadProducts() {
  const response = await fetch('/api/products');
  const products = await response.json();
  const container = document.getElementById('products-list');
  container.innerHTML = products.map(p => `
    <div class="product-card" onclick="openProductDetail(${JSON.stringify(p).replace(/"/g, '&quot;')})">
      <img src="${p.image || 'placeholder.jpg'}" alt="${p.name}" onerror="this.onerror=null; this.src='https://placehold.co/300?text=No+Image'">
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button onclick="event.stopPropagation(); addToCart(${JSON.stringify(p).replace(/"/g, '&quot;')})">Add to Cart</button>
    </div>
  `).join('');
}

async function loadToys() {
  const response = await fetch('/api/toys');
  const toys = await response.json();
  const container = document.getElementById('toys-list');
  container.innerHTML = toys.map(t => `
    <div class="product-card" onclick="openProductDetail(${JSON.stringify(t).replace(/"/g, '&quot;')})">
      <img src="${t.image || 'placeholder.jpg'}" alt="${t.name}" onerror="this.onerror=null; this.src='https://placehold.co/300?text=No+Image'">
      <h3>${t.name}</h3>
      <p>$${t.price}</p>
      <button onclick="event.stopPropagation(); addToCart(${JSON.stringify(t).replace(/"/g, '&quot;')})">Add to Cart</button>
    </div>
  `).join('');
}

function openProductDetail(item) {
    const img = document.getElementById('detail-img');
    img.src = item.image || 'placeholder.jpg';
    // Reset error handler in case previous image was broken
    img.onerror = function() { this.src='https://placehold.co/300?text=No+Image'; };
    
    document.getElementById('detail-name').innerText = item.name;
    document.getElementById('detail-desc').innerText = item.description;
    document.getElementById('detail-price').innerText = '$' + item.price;
    
    const btn = document.getElementById('detail-add-btn');
    btn.onclick = function() { addToCart(item); };
    
    switchView('product-detail-view');
}

// View Navigation Functions
function switchView(viewId) {
    ['product-view', 'cart-view', 'payment-view', 'confirmation-view', 'product-detail-view'].forEach(id => {
        const el = document.getElementById(id);
        if(el) el.style.display = (id === viewId) ? 'block' : 'none';
    });
}

function showProducts() {
    switchView('product-view');
}

function showCart() {
    switchView('cart-view');
    loadCartPage();
}

function showPayment() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    switchView('payment-view');
}

function confirmOrder() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    switchView('confirmation-view');
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  // checkAuth(); // Disabled to force login page on load

  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      localStorage.removeItem('cart'); // Clear cart
      
      const container = document.querySelector('.auth-container');
      if (container) {
        container.innerHTML = `
          <h2 style="color: #28a745; margin-bottom: 15px;">Order Confirmed!</h2>
          <p style="margin-bottom: 20px;">Your payment was successful.</p>
          <a href="index.html" class="btn" style="text-decoration: none;">Back to Home</a>
        `;
      }
    });
  }

  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      login(email, password);
    });
  }

  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('signup-name').value;
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;
      signup(name, email, password);
    });
  }

});
