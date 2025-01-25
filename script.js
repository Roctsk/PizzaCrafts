
let cart = JSON.parse(localStorage.getItem('cart')) || [];


function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart)); 
    alert(`${name} додано до кошика!`);
}


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
   