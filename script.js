
let cart = JSON.parse(localStorage.getItem('cart')) || [];


function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} додано до кошика!`);

    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartCount.textContent = cart.length;
}

window.onload = updateCartCount;


function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    
    if (!cartItemsContainer || !totalPriceElement) return;  

    cartItemsContainer.innerHTML = ''; 
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Ваш кошик порожній.</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item.name}</span>
                <span>${item.price} грн</span>
                <button onclick="removeFromCart('${item.name}')">Видалити</button>
            `;
            cartItemsContainer.appendChild(cartItem);
            totalPrice += item.price;
        });
    }

    totalPriceElement.textContent = totalPrice; 
}


function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}


function checkout() {
    if (cart.length === 0) {
        alert('Ваш кошик порожній!');
        return;
    }
    alert('Оплата проведена успішно!');
    localStorage.removeItem('cart');  
    window.location.href = 'index.html';  
}


window.onload = displayCartItems;

document.getElementById('go-to-register').addEventListener('click', function(e) {
    e.preventDefault();
    let loginForm = document.getElementById('login-form');
    let registerForm = document.getElementById('register-form');

    // Спочатку плавно приховуємо login форму
    loginForm.classList.remove('active');
    loginForm.classList.add('hide');

    setTimeout(() => {
        loginForm.style.display = 'none';
        registerForm.style.display = 'flex';
        registerForm.classList.remove('hide');
        registerForm.classList.add('active');
    }, 200); // Час анімації збігається з CSS
});

document.getElementById('go-to-login').addEventListener('click', function(e) {
    e.preventDefault();
    let loginForm = document.getElementById('login-form');
    let registerForm = document.getElementById('register-form');

    registerForm.classList.remove('active');
    registerForm.classList.add('hide');

    setTimeout(() => {
        registerForm.style.display = 'none';
        loginForm.style.display = 'flex';
        loginForm.classList.remove('hide');
        loginForm.classList.add('active');
    }, 200);
});
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('login-form').classList.add('active');
});
