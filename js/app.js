/* ============================================================
   app.js  –  TokoKita Simple Online Store
   All logic: product data, cart, checkout, order confirmation
   ============================================================ */

'use strict';

// ─── Product Data ────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    name: 'Sepatu Lari Pro X1',
    category: 'Sepatu',
    price: 349000,
    originalPrice: 499000,
    desc: 'Sepatu lari ringan dengan sol empuk, cocok untuk jogging harian maupun lari jarak jauh.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
    rating: 4.8,
    reviews: 214,
    badge: 'sale',
  },
  {
    id: 2,
    name: 'Kemeja Kasual Premium',
    category: 'Pakaian',
    price: 189000,
    originalPrice: null,
    desc: 'Kemeja berbahan katun premium, nyaman dipakai seharian. Tersedia berbagai pilihan warna.',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80',
    rating: 4.5,
    reviews: 87,
    badge: 'new',
  },
  {
    id: 3,
    name: 'Smartwatch Series 5',
    category: 'Elektronik',
    price: 899000,
    originalPrice: 1299000,
    desc: 'Jam tangan pintar dengan layar AMOLED, pemantau detak jantung, dan baterai 7 hari.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
    rating: 4.7,
    reviews: 432,
    badge: 'sale',
  },
  {
    id: 4,
    name: 'Tas Ransel Outdoor 30L',
    category: 'Tas',
    price: 275000,
    originalPrice: null,
    desc: 'Ransel tahan air kapasitas 30L dengan banyak kompartemen, ideal untuk hiking atau perjalanan.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
    rating: 4.6,
    reviews: 156,
    badge: 'hot',
  },
  {
    id: 5,
    name: 'Headphone Wireless NC',
    category: 'Elektronik',
    price: 599000,
    originalPrice: 799000,
    desc: 'Headphone nirkabel dengan noise-cancelling aktif, suara jernih, dan baterai 30 jam.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
    rating: 4.9,
    reviews: 678,
    badge: 'sale',
  },
  {
    id: 6,
    name: 'Celana Chino Slim',
    category: 'Pakaian',
    price: 219000,
    originalPrice: null,
    desc: 'Celana chino slim fit berbahan stretch, nyaman untuk aktivitas santai maupun semi-formal.',
    image: 'https://images.unsplash.com/photo-1624378441864-6eda7ca3g4c3?w=400&q=80',
    rating: 4.4,
    reviews: 62,
    badge: null,
  },
  {
    id: 7,
    name: 'Kacamata Hitam UV400',
    category: 'Aksesori',
    price: 129000,
    originalPrice: 189000,
    desc: 'Kacamata hitam dengan lensa anti-UV400, frame ringan, cocok untuk aktivitas luar ruangan.',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80',
    rating: 4.3,
    reviews: 44,
    badge: 'sale',
  },
  {
    id: 8,
    name: 'Sepatu Formal Kulit',
    category: 'Sepatu',
    price: 459000,
    originalPrice: null,
    desc: 'Sepatu formal berbahan kulit sintetis berkualitas tinggi, sol anti-slip, tampilan elegan.',
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400&q=80',
    rating: 4.6,
    reviews: 99,
    badge: 'new',
  },
  {
    id: 9,
    name: 'Topi Baseball Premium',
    category: 'Aksesori',
    price: 89000,
    originalPrice: null,
    desc: 'Topi baseball berbahan katun breathable, adjustable strap, tersedia berbagai warna.',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&q=80',
    rating: 4.2,
    reviews: 38,
    badge: null,
  },
  {
    id: 10,
    name: 'Power Bank 20000mAh',
    category: 'Elektronik',
    price: 249000,
    originalPrice: 329000,
    desc: 'Power bank kapasitas besar 20000mAh, pengisian cepat 18W, dilengkapi 2 port USB + USB-C.',
    image: 'https://images.unsplash.com/photo-1585338805893-e5c44a580e3f?w=400&q=80',
    rating: 4.7,
    reviews: 305,
    badge: 'hot',
  },
  {
    id: 11,
    name: 'Parfum Unisex Woods',
    category: 'Kecantikan',
    price: 189000,
    originalPrice: 249000,
    desc: 'Parfum unisex dengan aroma kayu segar, tahan lama hingga 8 jam, ukuran 50ml.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=400&q=80',
    rating: 4.5,
    reviews: 123,
    badge: 'sale',
  },
  {
    id: 12,
    name: 'Sandal Sliders Karet',
    category: 'Sepatu',
    price: 79000,
    originalPrice: null,
    desc: 'Sandal sliders ringan berbahan karet EVA anti-slip, nyaman untuk rumah dan aktivitas santai.',
    image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&q=80',
    rating: 4.1,
    reviews: 57,
    badge: null,
  },
];

// ─── State ────────────────────────────────────────────────────
const state = {
  cart: [],
  activeCategory: 'Semua',
  searchQuery: '',
};

// ─── Helpers ──────────────────────────────────────────────────
const fmt = (n) =>
  'Rp\u00a0' + n.toLocaleString('id-ID');

const generateOrderId = () =>
  'TK-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 5).toUpperCase();

function starsHtml(rating) {
  const full  = Math.floor(rating);
  const half  = rating - full >= 0.5;
  let html = '';
  for (let i = 0; i < 5; i++) {
    if (i < full)            html += '★';
    else if (i === full && half) html += '½';
    else                    html += '☆';
  }
  return html;
}

// ─── DOM refs ─────────────────────────────────────────────────
const productsGrid    = document.getElementById('productsGrid');
const productCountEl  = document.getElementById('productCount');
const cartSidebar     = document.getElementById('cartSidebar');
const overlay         = document.getElementById('overlay');
const cartItemsEl     = document.getElementById('cartItems');
const cartCountEl     = document.getElementById('cartCount');
const cartSubtotalEl  = document.getElementById('cartSubtotal');
const cartShippingEl  = document.getElementById('cartShipping');
const cartTotalEl     = document.getElementById('cartTotal');
const checkoutModal   = document.getElementById('checkoutModal');
const confirmModal    = document.getElementById('confirmModal');
const searchInput     = document.getElementById('searchInput');
const categoriesEl    = document.getElementById('categories');
const orderSummaryEl  = document.getElementById('orderSummaryItems');
const orderTotalEl    = document.getElementById('orderSummaryTotal');
const checkoutForm    = document.getElementById('checkoutForm');
const toastContainer  = document.getElementById('toastContainer');
const orderNumEl      = document.getElementById('orderNum');
const orderBuyerEl    = document.getElementById('orderBuyer');
const orderTotalConfEl= document.getElementById('orderTotalConf');
const orderDateEl     = document.getElementById('orderDate');

// ─── Cart Logic ───────────────────────────────────────────────
function cartTotal() {
  return state.cart.reduce((s, i) => s + i.price * i.qty, 0);
}

function cartItemCount() {
  return state.cart.reduce((s, i) => s + i.qty, 0);
}

function addToCart(productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const existing = state.cart.find((i) => i.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ ...product, qty: 1 });
  }
  renderCart();
  bumpCartCount();
  showToast(`${product.name} ditambahkan ke keranjang`, 'success');
}

function changeQty(productId, delta) {
  const item = state.cart.find((i) => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(productId);
  else renderCart();
}

function removeFromCart(productId) {
  state.cart = state.cart.filter((i) => i.id !== productId);
  renderCart();
}

function bumpCartCount() {
  cartCountEl.classList.remove('bump');
  void cartCountEl.offsetWidth; // reflow
  cartCountEl.classList.add('bump');
  setTimeout(() => cartCountEl.classList.remove('bump'), 300);
}

// ─── Render Cart ──────────────────────────────────────────────
function renderCart() {
  const count    = cartItemCount();
  const subtotal = cartTotal();
  const shipping = count > 0 ? 15000 : 0;
  const total    = subtotal + shipping;

  cartCountEl.textContent = count;
  cartSubtotalEl.textContent = fmt(subtotal);
  cartShippingEl.textContent = count > 0 ? fmt(shipping) : 'Gratis';
  cartTotalEl.textContent    = fmt(total);

  if (count === 0) {
    cartItemsEl.innerHTML = `
      <div class="cart-empty">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 7h12.8M7 13L5.4 5M17 21a1 1 0 100-2 1 1 0 000 2zm-9 0a1 1 0 100-2 1 1 0 000 2z"/>
        </svg>
        <p>Keranjang belanja kosong</p>
      </div>`;
    return;
  }

  cartItemsEl.innerHTML = state.cart.map((item) => `
    <div class="cart-item">
      <img class="cart-item-img" src="${item.image}" alt="${item.name}"
           onerror="this.src='https://placehold.co/72x72/e2e8f0/94a3b8?text=IMG'">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${fmt(item.price)}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span class="qty-display">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, +1)">+</button>
          <button class="remove-btn" onclick="removeFromCart(${item.id})" title="Hapus">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
        </div>
      </div>
    </div>`).join('');
}

// ─── Render Products ──────────────────────────────────────────
function filteredProducts() {
  return PRODUCTS.filter((p) => {
    const matchCat = state.activeCategory === 'Semua' || p.category === state.activeCategory;
    const q = state.searchQuery.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });
}

function renderProducts() {
  const list = filteredProducts();
  productCountEl.textContent = `${list.length} produk`;

  if (list.length === 0) {
    productsGrid.innerHTML = `
      <div class="no-results">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <p>Produk tidak ditemukan</p>
      </div>`;
    return;
  }

  productsGrid.innerHTML = list.map((p) => {
    const badgeHtml = p.badge
      ? `<span class="badge badge-${p.badge}">${p.badge === 'sale' ? 'Diskon' : p.badge === 'new' ? 'Baru' : 'Hot'}</span>`
      : '';
    const originalHtml = p.originalPrice
      ? `<div class="product-price-original">${fmt(p.originalPrice)}</div>`
      : '';
    return `
      <div class="product-card">
        <div class="product-img-wrap">
          <img src="${p.image}" alt="${p.name}"
               onerror="this.src='https://placehold.co/400x400/e2e8f0/94a3b8?text=${encodeURIComponent(p.name)}'">
          ${badgeHtml}
        </div>
        <div class="product-info">
          <div class="product-category">${p.category}</div>
          <div class="product-name">${p.name}</div>
          <div class="product-desc">${p.desc}</div>
          <div class="product-rating">
            <span class="stars">${starsHtml(p.rating)}</span>
            ${p.rating} (${p.reviews})
          </div>
        </div>
        <div class="product-footer">
          <div>
            <div class="product-price">${fmt(p.price)}</div>
            ${originalHtml}
          </div>
          <button class="add-to-cart-btn" onclick="addToCart(${p.id})">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 7h12.8"/>
            </svg>
            Tambah
          </button>
        </div>
      </div>`;
  }).join('');
}

// ─── Render Categories ────────────────────────────────────────
function renderCategories() {
  const cats = ['Semua', ...new Set(PRODUCTS.map((p) => p.category))];
  categoriesEl.innerHTML = cats.map((c) =>
    `<button class="cat-btn${c === state.activeCategory ? ' active' : ''}"
             onclick="setCategory('${c}')">${c}</button>`
  ).join('');
}

function setCategory(cat) {
  state.activeCategory = cat;
  renderCategories();
  renderProducts();
}

// ─── Cart Sidebar Open/Close ───────────────────────────────────
function openCart() {
  cartSidebar.classList.add('open');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartSidebar.classList.remove('open');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// ─── Checkout Modal ───────────────────────────────────────────
function openCheckout() {
  if (cartItemCount() === 0) {
    showToast('Keranjang masih kosong!', 'error');
    return;
  }
  closeCart();

  const subtotal = cartTotal();
  const shipping = 15000;
  const total    = subtotal + shipping;

  orderSummaryEl.innerHTML = state.cart.map((item) =>
    `<div class="mini-item">
       <span>${item.name} × ${item.qty}</span>
       <span>${fmt(item.price * item.qty)}</span>
     </div>`
  ).join('') +
  `<div class="mini-item">
     <span>Ongkos kirim</span><span>${fmt(shipping)}</span>
   </div>`;

  orderTotalEl.textContent = fmt(total);

  checkoutModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCheckout() {
  checkoutModal.classList.remove('open');
  document.body.style.overflow = '';
}

// ─── Submit Order ─────────────────────────────────────────────
checkoutForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data  = new FormData(checkoutForm);
  const name  = data.get('name').trim();
  const total = cartTotal() + 15000;
  const orderId = generateOrderId();
  const now   = new Date().toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' });

  closeCheckout();

  orderNumEl.textContent      = orderId;
  orderBuyerEl.textContent    = name;
  orderTotalConfEl.textContent = fmt(total);
  orderDateEl.textContent     = now;

  confirmModal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Clear cart
  state.cart = [];
  renderCart();
  checkoutForm.reset();
});

function closeConfirm() {
  confirmModal.classList.remove('open');
  document.body.style.overflow = '';
}

// ─── Toast ────────────────────────────────────────────────────
function showToast(message, type = '') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const iconSvg = type === 'success'
    ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
       </svg>`
    : type === 'error'
    ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
       </svg>`
    : '';

  toast.innerHTML = iconSvg + message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('out');
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// ─── Event Listeners ──────────────────────────────────────────
document.getElementById('cartBtnHeader').addEventListener('click', openCart);
document.getElementById('closeCart').addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);
document.getElementById('checkoutBtn').addEventListener('click', openCheckout);
document.getElementById('closeCheckout').addEventListener('click', closeCheckout);
document.getElementById('closeConfirm').addEventListener('click', closeConfirm);
document.getElementById('continueShop').addEventListener('click', closeConfirm);

searchInput.addEventListener('input', () => {
  state.searchQuery = searchInput.value;
  renderProducts();
});

// Close modals on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeCart();
    closeCheckout();
    closeConfirm();
  }
});

// ─── Init ─────────────────────────────────────────────────────
renderCategories();
renderProducts();
renderCart();
