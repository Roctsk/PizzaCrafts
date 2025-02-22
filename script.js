document.addEventListener("DOMContentLoaded", function () {
    updateCart();
    updateCartCount();
    displayCartItems();
});

let products = [
    { name: 'Піца 1', price: 100, image: 'img/pizza_1.jpg' },
    { name: 'Піца 2', price: 150, image: 'img/pizza_2.jpg' },
    { name: 'Піца 3', price: 200, image: 'img/pizza_3.jpg' },
    { name: 'Піца 4', price: 300, image: 'img/pizza_4.jpg' },
    { name: 'Роли 1', price: 120, image: 'img/rolly_1.jpg' },
    { name: 'Роли 2', price: 180, image: 'img/rolly_2.jpg' },
    { name: 'Роли 3', price: 220, image: 'img/rolly_3.jpg' },
    { name: 'Роли 4', price: 250, image: 'img/rolly_4.jpg' }
];


// =========================
// 🔹 Оновлення кошика
// =========================




function updateCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsTbody = document.getElementById("cart-items");
    let totalPrice = document.getElementById("total-price");

    cartItemsTbody.innerHTML = "";
    let sum = 0;

    if (cart.length === 0) {
        cartItemsTbody.innerHTML = `<tr><td colspan="6" class="empty-cart">Ваш кошик порожній </td></tr>`;
        totalPrice.innerText = "0";
        return;
    }

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;


        let row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}" class="cart-item-img"></td> <!-- Зображення товару -->
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>
                <button class="btn small" onclick="changeQuantity(${index}, -1)">➖</button>
                ${item.quantity}
                <button class="btn small" onclick="changeQuantity(${index}, 1)">➕</button>
            </td>
            <td>${itemTotal}</td>
            <td><button class="btn remove-item" onclick="removeItem(${index})">❌</button></td>
        `;
        cartItemsTbody.appendChild(row);
        sum += itemTotal;
    });

    totalPrice.innerText = sum;
}
// =========================
// 🔹 Додавання товару до кошика
// =========================
// =========================

function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Шукаємо, чи товар вже є в кошику
    let existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        // Якщо товар вже є, збільшуємо його кількість
        existingItem.quantity++;
    } else {
        // Якщо товару ще немає в кошику, додаємо його
        cart.push({ name, price, quantity: 1, image });
    }

    // Оновлюємо кошик в localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Оновлюємо відображення кошика та лічильника
    alert(`${name} додано до кошика!`);
    updateCart(); // Оновлення кошика на сторінці
    updateCartCount(); // Оновлення лічильника товарів без перезавантаження сторінки
}




// =========================
// 🔹 Оновлення кількості товарів
// =========================
function changeQuantity(index, amount) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart[index].quantity + amount > 0) {
        cart[index].quantity += amount;
    } else {
        cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
    updateCartCount();
}    
    
// =========================    
// 🔹 Видалення товару    
// =========================
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();                                                                               
    updateCartCount();
}


// =========================
// 🔹 Очищення кошика
// =========================
function clearCart() {
    localStorage.removeItem("cart");
    updateCart();
    updateCartCount();
}

// =========================
// 🔹 Оплата
// =========================
function checkout() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Ваш кошик порожній! Додайте товар перед оплатою.");
        return;
    }
    alert("Оплата проведена успішно! 🚀");
    clearCart();
    
    window.location.href = "index.html";
}



window.onload = displayCartItems;

// =========================
// 🔹 Оновлення лічильника товарів
// =========================






function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0); 
    cartCount.textContent = totalCount > 0 ? totalCount : 0; 
}




window.onload = updateCartCount;
// =========================
// 🔹 Відображення товарів у кошику
// =========================


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

// =========================
// 🔹 Перемикання між формами (Реєстрація/Вхід)
// =========================
document.getElementById("go-to-register").addEventListener("click", function(e) {
    e.preventDefault();
    toggleForms("login-form", "register-form");
});

document.getElementById("go-to-login").addEventListener("click", function(e) {
    e.preventDefault();
    toggleForms("register-form", "login-form");
});

function toggleForms(hideFormId, showFormId) {
    let hideForm = document.getElementById(hideFormId);
    let showForm = document.getElementById(showFormId);

    hideForm.classList.remove("active");
    hideForm.classList.add("hide");

    setTimeout(() => {
        hideForm.style.display = "none";
        showForm.style.display = "flex";
        showForm.classList.remove("hide");
        showForm.classList.add("active");
    }, 200);
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("login-form").classList.add("active");
});

// =========================
// 🔹 Модальне вікно
// =========================
function openModal(imgSrc, name, description) {
    document.getElementById("modal-img").src = imgSrc;
    document.getElementById("modal-title").innerText = name;
    document.getElementById("modal-description").innerText = description;
    document.getElementById("modal").style.display = "flex";
}

// Функція для закриття модального вікна

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// Закриваємо модальне вікно при кліку на затемнений фон

document.getElementById("modal").addEventListener("click", function (event) {
    if (event.target === this) {
        closeModal();
    }
});



