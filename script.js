// Shopping cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add event listeners to all "Add to Cart" buttons
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.btn-add');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.price').textContent;
            
            // Extract price number
            const priceNumber = parseInt(productPrice.replace(/[^0-9]/g, ''));
            
            // Check if product already exists in cart
            const existingProduct = cart.find(item => item.name === productName);
            
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push({
                    name: productName,
                    price: priceNumber,
                    quantity: 1
                });
            }
            
            // Save cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Show confirmation
            alert(productName + ' ditambahkan ke keranjang!');
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Function to display cart
function displayCart() {
    const cartContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('total-price');
    
    if (!cartContainer) return;
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Keranjang Anda kosong</p>';
        totalContainer.innerHTML = 'Rp 0';
        return;
    }
    
    let html = '<table><tr><th>Produk</th><th>Harga</th><th>Jumlah</th><th>Total</th><th>Aksi</th></tr>';
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        html += `
            <tr>
                <td>${item.name}</td>
                <td>Rp ${item.price.toLocaleString('id-ID')}</td>
                <td>
                    <input type="number" min="1" value="${item.quantity}" 
                           onchange="updateQuantity(${index}, this.value)">
                </td>
                <td>Rp ${itemTotal.toLocaleString('id-ID')}</td>
                <td><button onclick="removeFromCart(${index})">Hapus</button></td>
            </tr>
        `;
    });
    
    html += '</table>';
    cartContainer.innerHTML = html;
    totalContainer.innerHTML = 'Rp ' + total.toLocaleString('id-ID');
}

// Update quantity
function updateQuantity(index, newQuantity) {
    newQuantity = parseInt(newQuantity);
    if (newQuantity > 0) {
        cart[index].quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Keranjang Anda kosong!');
        return;
    }
    
    alert('Terima kasih telah berbelanja! Pesanan Anda sedang diproses.');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}