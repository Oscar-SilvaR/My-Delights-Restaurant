let cartItems = [];
let cartCount = 0;

document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.querySelector('.cart-icon');
    const cartModal = document.querySelector('.cart-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const closeModal = document.querySelector('.close-modal');
    const cartContent = document.querySelector('.cart-content');
    const totalAmount = document.querySelector('.total-amount');

    // Debug
    console.log('Cart Icon:', cartIcon);
    console.log('Cart Modal:', cartModal);

    if (cartIcon && cartModal) {
        // Open cart only when clicking the cart icon
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            cartModal.classList.add('active');
            modalOverlay.classList.add('active');
        });

        // Close modal with X button
        if (closeModal) {
            closeModal.addEventListener('click', closeCart);
        }

        // Close modal when clicking overlay
        if (modalOverlay) {
            modalOverlay.addEventListener('click', closeCart);
        }
    }

    // Add to cart functionality - removed openCart()
    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const item = {
                id: e.target.dataset.id,
                name: e.target.dataset.name,
                price: parseFloat(e.target.dataset.price)
            };
            addToCart(item);
            showAddedNotification(item.name);
        });
    });

    // Add checkout button handler
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            // Close cart modal
            closeCart();
            // Scroll to order form section
            const orderSection = document.querySelector('#pedidos');
            if (orderSection) {
                orderSection.scrollIntoView({ behavior: 'smooth' });
            }
            // Enable form validation
            enableFormValidation();
        });
    }
});

// Replace in enableFormValidation function
function enableFormValidation() {
    const orderForm = document.querySelector('#orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Check if cart is empty
            if (cartItems.length === 0) {
                showCustomAlert('Por favor agrega productos al carrito antes de hacer el pedido');
                return;
            }

            // Validate required fields
            if (!name || !email || !phone || !address) {
                showCustomAlert('Por favor completa todos los campos requeridos');
                return;
            }

            // Get form fields
            const name = document.querySelector('#customerName').value;
            const email = document.querySelector('#customerEmail').value;
            const phone = document.querySelector('#customerPhone').value;
            const address = document.querySelector('#customerAddress').value;

            // Validate required fields
            if (!name || !email || !phone || !address) {
                showCustomAlert('Por favor completa todos los campos requeridos');
                return;
            }

            // If all validations pass, process the order
            processOrder({
                customer: { name, email, phone, address },
                items: cartItems,
                total: calculateTotal()
            });
        });
    }
}

// Replace in processOrder function
function processOrder(orderData) {
    // Here you would typically send the order to your backend
    console.log('Procesando orden:', orderData);
    
    // Clear cart after successful order
    cartItems = [];
    cartCount = 0;
    updateCartCount();
    updateCartUI();
    
    // Show success message
    showCustomAlert('¡Gracias por tu pedido! Te contactaremos pronto para confirmar.');
}

// Replace in checkout button handler
// Add custom notification styles
const customAlertStyles = document.createElement('style');
customAlertStyles.textContent = `
    .custom-alert {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #ffffff;
        padding: 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        text-align: center;
        min-width: 300px;
        animation: slideIn 0.3s ease;
    }

    .custom-alert-message {
        color: #2c3e50;
        font-size: 16px;
        margin-bottom: 20px;
    }

    .custom-alert-button {
        background: #4CAF50;
        color: white;
        border: none;
        padding: 10px 25px;
        border-radius: 5px;
        cursor: pointer;
        font-weight: 500;
        transition: background 0.3s ease;
    }

    .custom-alert-button:hover {
        background: #45a049;
    }

    @keyframes slideIn {
        from {
            transform: translate(-50%, -60%);
            opacity: 0;
        }
        to {
            transform: translate(-50%, -50%);
            opacity: 1;
        }
    }
`;
document.head.appendChild(customAlertStyles);

// Add custom alert function
function showCustomAlert(message) {
    const alert = document.createElement('div');
    alert.className = 'custom-alert';
    alert.innerHTML = `
        <div class="custom-alert-message">${message}</div>
        <button class="custom-alert-button">Aceptar</button>
    `;
    document.body.appendChild(alert);

    const button = alert.querySelector('button');
    button.addEventListener('click', () => {
        alert.remove();
    });
}

// Update the checkout button handler
const checkoutBtn = document.querySelector('.checkout-btn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        showCustomAlert('Por favor, rellena los campos de información y dirección de entrega');
        closeCart();
        const orderSection = document.querySelector('#pedidos');
        if (orderSection) {
            orderSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

function calculateTotal() {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 5000;
    return subtotal + deliveryFee;
}

function showAddedNotification(productName) {
    const notification = document.createElement('div');
    notification.className = 'add-notification';
    notification.textContent = `¡${productName} agregado al carrito!`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Updated notification style
const style = document.createElement('style');
style.textContent = `
    .add-notification {
        position: fixed;
        bottom: 100px;  /* Changed from 20px to 100px to position above cart icon */
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 12px 24px;
        border-radius: 5px;
        animation: fadeInOut 2s ease;
        z-index: 1000;
        font-size: 14px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }

    .cart-icon {
        background: #4CAF50 !important;  /* Changed from #e74c3c to #4CAF50 */
    }

    .cart-icon:hover {
        background: #45a049 !important;  /* Darker shade for hover effect */
    }
`;
document.head.appendChild(style);

function closeCart() {
    const cartModal = document.querySelector('.cart-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    if (cartModal && modalOverlay) {
        cartModal.classList.remove('active');
        modalOverlay.classList.remove('active');
    }
}

function addToCart(item) {
    const existingItem = cartItems.find(i => i.id === item.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({ ...item, quantity: 1 });
    }
    cartCount++;
    updateCartCount();
    updateCartUI();
    updateTotal();
}

function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

function updateCartUI() {
    const cartContent = document.querySelector('.cart-content');
    const orderSummary = document.querySelector('#cartItems');
    
    if (cartItems.length === 0) {
        if (orderSummary) {
            orderSummary.innerHTML = '<p class="empty-cart">Tu carrito está vacío. Agrega platos desde nuestro menú.</p>';
        }
        if (cartContent) {
            cartContent.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
        }
        updateOrderTotals(0);
        return;
    }

    const itemsHTML = cartItems.map(item => `
        <div class="cart-item">
            <span>${item.name}</span>
            <div class="quantity-controls">
                <button type="button" class="quantity-btn minus" onclick="handleQuantityChange('${item.id}', -1)">-</button>
                <span class="quantity">x${item.quantity}</span>
                <button type="button" class="quantity-btn plus" onclick="handleQuantityChange('${item.id}', 1)">+</button>
            </div>
            <span>$${formatPrice(item.price * item.quantity)}</span>
            <button type="button" class="remove-item" data-id="${item.id}">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');

    if (cartContent) cartContent.innerHTML = itemsHTML;
    if (orderSummary) orderSummary.innerHTML = itemsHTML;

    // Add event listeners to remove buttons
    cartContent.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = e.target.closest('.remove-item').dataset.id;
            removeFromCart(itemId);
        });
    });
    
    if (orderSummary) {
        orderSummary.innerHTML = itemsHTML;
        // Add event listeners to remove buttons in order summary
        orderSummary.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const itemId = e.target.closest('.remove-item').dataset.id;
                removeFromCart(itemId);
            });
        });
    }

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    updateOrderTotals(subtotal);
}

// Add this new function to handle item removal
function removeFromCart(itemId) {
    const itemIndex = cartItems.findIndex(item => item.id === itemId);
    if (itemIndex > -1) {
        const item = cartItems[itemIndex];
        cartCount -= item.quantity;
        cartItems.splice(itemIndex, 1);
        updateCartCount();
        updateCartUI();
        updateTotal();
        showRemovedNotification(item.name);
    }
}

// Add notification for removed items
function showRemovedNotification(productName) {
    const notification = document.createElement('div');
    notification.className = 'add-notification remove-notification';
    notification.textContent = `¡${productName} eliminado del carrito!`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Add these styles
const removeStyles = document.createElement('style');
removeStyles.textContent = `
    .cart-item {
        position: relative;
        padding-right: 30px;
    }

    .remove-item {
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: #ff4444;
        cursor: pointer;
        padding: 5px;
        font-size: 16px;
    }

    .remove-item:hover {
        color: #cc0000;
    }

    .remove-notification {
        background: #ff4444 !important;
    }
`;
document.head.appendChild(removeStyles);

function updateOrderTotals(subtotal) {
    const subtotalElement = document.querySelector('#subtotal');
    const totalElement = document.querySelector('#total');
    const deliveryFee = 5000; // $5.000 delivery fee

    if (subtotalElement) {
        subtotalElement.textContent = `$${formatPrice(subtotal)}`;
    }
    
    if (totalElement) {
        totalElement.textContent = `$${formatPrice(subtotal + deliveryFee)}`;
    }
}

function updateTotal() {
    const totalAmount = document.querySelector('.total-amount');
    if (totalAmount) {
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalAmount.textContent = `$${formatPrice(total)}`;
    }
}

function formatPrice(price) {
    return (price).toLocaleString('es-CO', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}


function addQuantityControls(container) {
    container.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const itemId = button.getAttribute('data-id');
            const isPlus = button.classList.contains('plus');
            
            if (itemId) {
                updateItemQuantity(itemId, isPlus ? 1 : -1);
            }
        });
    });
}

// Add this new function to handle quantity changes
function handleQuantityChange(itemId, change) {
    const item = cartItems.find(i => i.id === itemId);
    if (item) {
        const newQuantity = item.quantity + change;
        if (newQuantity > 0) {
            item.quantity = newQuantity;
            cartCount += change;
            updateCartCount();
            updateCartUI();
            updateTotal();
            updateOrderTotals(cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0));
        } else if (newQuantity === 0) {
            removeFromCart(itemId);
        }
    }
}

// Add these styles for quantity controls
const quantityStyles = document.createElement('style');
quantityStyles.textContent = `
    .quantity-controls {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 3px;
        background: white;
        padding: 3px;
        border-radius: 8px;
        border: 1px solid #e0e0e0;
        min-width: 85px;
        max-width: 85px;
    }

    .quantity-btn {
        width: 22px;
        height: 22px;
        min-width: 22px;
        border-radius: 4px;
        background: #4CAF50;
        color: white;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        padding: 0;
        transition: background 0.3s ease;
    }

    .quantity-btn:hover {
        background: #45a049;
    }

    .quantity {
        min-width: 30px;
        text-align: center;
        font-weight: 500;
        color: #2c3e50;
    }
`;
document.head.appendChild(quantityStyles);