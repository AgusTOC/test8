# TokoKita — Web Penjualan Sederhana

Aplikasi toko online sederhana berbasis HTML, CSS, dan JavaScript murni (tanpa framework, tanpa build tool).

## Fitur

- 🛍️ **Katalog Produk** — 12 produk contoh dengan gambar, deskripsi, harga, rating, dan badge (Diskon / Baru / Hot)
- 🔍 **Pencarian & Filter Kategori** — cari produk secara real-time atau filter per kategori
- 🛒 **Keranjang Belanja** — tambah produk, ubah jumlah, hapus item, lihat total belanja
- 💳 **Checkout** — form data pembeli (nama, HP, email, alamat, kota, kode pos, metode pembayaran, catatan)
- ✅ **Konfirmasi Pesanan** — tampil nomor pesanan, nama pembeli, tanggal, dan total secara lokal
- 📱 **Responsif** — tampilan optimal di desktop maupun perangkat mobile

## Cara Menjalankan

Tidak perlu instalasi atau server. Cukup buka file HTML:

### 1. Buka langsung di browser

```bash
# Clone repo
git clone https://github.com/AgusTOC/test4.git
cd test4

# Buka di browser (macOS)
open index.html

# Buka di browser (Linux)
xdg-open index.html

# Buka di browser (Windows)
start index.html
```

Atau klik dua kali file `index.html` di file explorer.

### 2. Jalankan dengan server lokal (opsional, untuk menghindari CORS)

```bash
# Python 3
python -m http.server 8080
# Buka http://localhost:8080

# Node.js (npx)
npx serve .
# Buka URL yang tampil di terminal
```

## Struktur Proyek

```
test4/
├── index.html       # Halaman utama
├── css/
│   └── style.css    # Semua styling (responsif)
├── js/
│   └── app.js       # Data produk + logika keranjang & checkout
└── README.md
```

## Teknologi

- HTML5 semantik
- CSS3 (custom properties, grid, flexbox, animasi)
- Vanilla JavaScript (ES6+)
- Font: [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts
- Gambar produk: [Unsplash](https://unsplash.com)
