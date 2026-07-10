// Fungsi untuk scroll ke section tertentu
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Fungsi ketika tombol "Beli Sekarang" diklik
function beliProduk(namaProduk) {
    alert(`Produk "${namaProduk}" telah ditambahkan ke keranjang belanja!\n\nSilakan lanjutkan ke checkout untuk menyelesaikan pembelian.`);
    console.log(`Produk "${namaProduk}" ditambahkan ke keranjang`);
}

// Fungsi submit form kontak
function submitForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const nama = form.elements[0].value;
    const email = form.elements[1].value;
    const pesan = form.elements[2].value;
    
    console.log('Data Form:');
    console.log(`- Nama: ${nama}`);
    console.log(`- Email: ${email}`);
    console.log(`- Pesan: ${pesan}`);
    
    alert(`Terima kasih, ${nama}!\n\nPesan Anda telah kami terima. Kami akan menghubungi Anda di ${email} dalam waktu 24 jam.`);
    
    form.reset();
}

// Menambahkan efek active pada navbar saat scroll
window.addEventListener('scroll', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Log ketika halaman selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    console.log('Website telah dimuat dengan sukses!');
    console.log('Selamat datang di Toko Kami');
});
