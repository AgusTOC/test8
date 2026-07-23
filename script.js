// ===== DATA PRODUK =====
const products = [
  { id: 1, name: "Smartphone Pro X", category: "elektronik", icon: "📱", price: 4500000, originalPrice: 5500000, rating: 4.8, reviews: 320, desc: "Layar AMOLED 6.7\", kamera 108MP, baterai 5000mAh." },
  { id: 2, name: "Laptop UltraBook", category: "elektronik", icon: "💻", price: 12000000, originalPrice: 14000000, rating: 4.7, reviews: 215, desc: "Intel Core i7, RAM 16GB, SSD 512GB, ringan & cepat." },
  { id: 3, name: "TWS Earbuds Pro", category: "elektronik", icon: "🎧", price: 350000, originalPrice: 500000, rating: 4.5, reviews: 540, desc: "Active noise cancellation, tahan air IPX5." },
  { id: 4, name: "Smartwatch Series 5", category: "elektronik", icon: "⌚", price: 1200000, originalPrice: 1500000, rating: 4.6, reviews: 180, desc: "Monitor detak jantung, GPS, tahan air 50m." },
  { id: 5, name: "Kaos Polos Premium", category: "fashion", icon: "👕", price: 85000, originalPrice: 120000, rating: 4.4, reviews: 890, desc: "Bahan katun combed 30s, nyaman dipakai sehari-hari." },
  { id: 6, name: "Sepatu Casual Keren", category: "fashion", icon: "👟", price: 320000, originalPrice: 450000, rating: 4.7, reviews: 410, desc: "Sol anti-slip, tersedia berbagai ukuran." },
  { id: 7, name: "Tas Ransel Elegan", category: "fashion", icon: "🎒", price: 250000, originalPrice: 350000, rating: 4.5, reviews: 290, desc: "Kapasitas 30L, waterproof, banyak kompartemen." },
  { id: 8, name: "Jaket Hoodie", category: "fashion", icon: "🧥", price: 180000, originalPrice: 240000, rating: 4.6, reviews: 560, desc: "Bahan fleece tebal, hangat untuk cuaca dingin." },
  { id: 9, name: "Kursi Gaming Ergonomis", category: "rumah", icon: "🪑", price: 2200000, originalPrice: 2800000, rating: 4.8, reviews: 135, desc: "Bantal lumbar, sandaran kaki, tahan hingga 150kg." },
  { id: 10, name: "Lampu LED Smart", category: "rumah", icon: "💡", price: 75000, originalPrice: 100000, rating: 4.5, reviews: 720, desc: "16 juta warna, kontrol via app, hemat energi." },
  { id: 11, name: "Dumbbell Set 10kg", category: "olahraga", icon: "🏋️", price: 450000, originalPrice: 600000, rating: 4.7, reviews: 380, desc: "Baja anti karat, pegangan anti selip, lengkap dengan rak." },
  { id: 12, name: "Sepeda Lipat City", category: "olahraga", icon: "🚲", price: 3500000, originalPrice: 4200000, rating: 4.6, reviews: 95, desc: "Rangka aluminium, 7 kecepatan, mudah dilipat." },
];

// ===== STATE =====
let cart = [];
let activeFilter = "";
let purchaseHistory = [];

// ===== HELPERS =====
function formatRupiah(n) {
  return "Rp " + n.toLocaleString("id-ID");
}

function stars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? "½" : "";
  return "⭐".repeat(full) + half + ` (${rating})`;
}

function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2500);
}

// ===== RENDER PRODUCTS =====
function renderProducts(filter = "") {
  const grid = document.getElementById("productGrid");
  const filtered = filter ? products.filter(p => p.category === filter) : products;

  grid.innerHTML = filtered.map(p => `
    <div class="product-card" data-id="${p.id}">
      <div class="product-img">${p.icon}</div>
      <div class="product-body">
        <div class="product-category">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-rating">${stars(p.rating)} · ${p.reviews} ulasan</div>
        <div class="product-price">
          ${formatRupiah(p.price)}
          <span class="product-original-price">${formatRupiah(p.originalPrice)}</span>
        </div>
        <button class="add-to-cart" data-id="${p.id}">+ Tambah ke Keranjang</button>
      </div>
    </div>
  `).join("");

  grid.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => addToCart(Number(btn.dataset.id)));
  });
}

// ===== CART =====
function addToCart(id) {
  const product = products.find(p => p.id === ids);
  if (!product) return;
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCartUI();
  showToast(`✅ ${product.name} ditambahkan ke keranjang!`);
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  updateCartUI();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else updateCartUI();
}

function updateCartUI() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  document.getElementById("cartCount").textContent = count;
  document.getElementById("cartTotal").textContent = formatRupiah(total);

  const itemsEl = document.getElementById("cartItems");
  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="cart-empty">Keranjang masih kosong.</p>';
    return;
  }
  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-icon">${item.icon}</div>
      <div class="cart-item-info">
        <strong>${item.name}</strong>
        <div class="cart-item-controls">
          <button class="qty-btn" data-id="${item.id}" data-delta="-1">−</button>
          <span class="qty-label">${item.qty}</span>
          <button class="qty-btn" data-id="${item.id}" data-delta="1">+</button>
        </div>
        <span>${formatRupiah(item.price)} × ${item.qty}</span>
      </div>
      <div class="cart-item-price">${formatRupiah(item.price * item.qty)}</div>
    </div>
  `).join("");

  itemsEl.querySelectorAll(".qty-btn").forEach(btn => {
    btn.addEventListener("click", () => changeQty(Number(btn.dataset.id), Number(btn.dataset.delta)));
  });
}

// ===== CART SIDEBAR TOGGLE =====
function openCart() {
  document.getElementById("cartSidebar").classList.add("open");
  document.getElementById("cartOverlay").classList.add("open");
}
function closeCart() {
  document.getElementById("cartSidebar").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("open");
}

// ===== CHECKOUT MODAL =====
function openCheckout() {
  if (cart.length === 0) { showToast("⚠️ Keranjang masih kosong!"); return; }
  closeCart();
  document.getElementById("modalOverlay").classList.add("open");
}
function closeCheckout() {
  document.getElementById("modalOverlay").classList.remove("open");
}

// ===== CATEGORIES FILTER =====
function initCategories() {
  document.querySelectorAll(".cat-card").forEach(card => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".cat-card").forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      activeFilter = card.dataset.filter || "";
      renderProducts(activeFilter);
    });
  });
  // mark "Semua" as default active
  const all = document.querySelector('.cat-card[data-filter=""]');
  if (all) all.classList.add("active");
}

// ===== CONTACT FORM =====
function initContactForm() {
  document.getElementById("contactForm").addEventListener("submit", e => {
    e.preventDefault();
    showToast("✅ Pesan berhasil dikirim! Kami akan segera menghubungi Anda.");
    e.target.reset();
  });
}

// ===== HISTORY =====
function openHistory() {
  renderHistory();
  document.getElementById("historyOverlay").classList.add("open");
}
function closeHistory() {
  document.getElementById("historyOverlay").classList.remove("open");
}

function renderHistory() {
  const listEl = document.getElementById("historyList");
  if (purchaseHistory.length === 0) {
    listEl.innerHTML = '<p class="cart-empty">Belum ada riwayat pembelian.</p>';
    return;
  }
  listEl.innerHTML = purchaseHistory.slice().reverse().map((order, idx) => `
    <div class="history-order">
      <div class="history-order-header">
        <span class="history-order-id">Pesanan #${purchaseHistory.length - idx}</span>
        <span class="history-order-date">${order.date}</span>
        <span class="history-order-total">${formatRupiah(order.total)}</span>
      </div>
      <div class="history-order-info">
        <span>👤 ${order.name}</span>
        <span>📞 ${order.phone}</span>
        <span>📍 ${order.address}</span>
        <span>💳 ${order.payment}</span>
      </div>
      <div class="history-order-items">
        ${order.items.map(i => `
          <div class="history-item">
            <span>${i.icon} ${i.name}</span>
            <span>${formatRupiah(i.price)} × ${i.qty}</span>
            <span>${formatRupiah(i.price * i.qty)}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join("");
}

// ===== CHECKOUT FORM =====
function initCheckoutForm() {
  document.getElementById("checkoutForm").addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("coName").value.trim();
    const phone = document.getElementById("coPhone").value.trim();
    const address = document.getElementById("coAddress").value.trim();
    const paymentVal = document.getElementById("coPayment").value;
    const paymentLabels = { transfer: "Transfer Bank", cod: "COD (Bayar di Tempat)", ewallet: "E-Wallet" };
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const now = new Date();
    const date = now.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });

    purchaseHistory.push({
      name,
      phone,
      address,
      payment: paymentLabels[paymentVal] || paymentVal,
      items: cart.map(i => ({ ...i })),
      total,
      date,
    });

    closeCheckout();
    cart = [];
    updateCartUI();
    showToast(`🎉 Pesanan berhasil! Terima kasih, ${name}!`);
    e.target.reset();
  });
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  initCategories();
  initContactForm();
  initCheckoutForm();

  document.getElementById("cartBtn").addEventListener("click", openCart);
  document.getElementById("closeCart").addEventListener("click", closeCart);
  document.getElementById("cartOverlay").addEventListener("click", closeCart);
  document.getElementById("checkoutBtn").addEventListener("click", openCheckout);
  document.getElementById("cancelCheckout").addEventListener("click", closeCheckout);
  document.getElementById("modalOverlay").addEventListener("click", e => {
    if (e.target === document.getElementById("modalOverlay")) closeCheckout();
  });
  document.getElementById("historyNavBtn").addEventListener("click", e => { e.preventDefault(); openHistory(); });
  document.getElementById("closeHistory").addEventListener("click", closeHistory);
  document.getElementById("historyOverlay").addEventListener("click", e => {
    if (e.target === document.getElementById("historyOverlay")) closeHistory();
  });
});
