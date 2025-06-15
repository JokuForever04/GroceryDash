document.addEventListener('DOMContentLoaded', () => {
  const products = [
    { id: 1, name: 'Fresh Apples', price: 158.61, image: 'https://ik.imagekit.io/fngldq7ef/FreshApples.png?updatedAt=1749955556195', category: 'produce', weight: '1kg' },
    { id: 2, name: 'Organic Bananas', price: 112, image: 'https://ik.imagekit.io/fngldq7ef/OrganicBananas.png?updatedAt=1749955789571', category: 'produce', weight: '3kg' },
    { id: 3, name: 'Free-Range Eggs', price: 300, image: 'https://ik.imagekit.io/fngldq7ef/Free-RangeEggs.png?updatedAt=1749955523930', category: 'dairy', weight: '720g' },
    { id: 4, name: 'Cheddar Cheese', price: 475.66, image: 'https://ik.imagekit.io/fngldq7ef/CheddarCheese.png?updatedAt=1749955322136', category: 'dairy', weight: '160g' },
    { id: 5, name: 'Whole Milk', price: 120, image: 'https://ik.imagekit.io/fngldq7ef/WholeMilk.png?updatedAt=1749955877054', category: 'dairy', weight: '1L' },
    { id: 6, name: 'Greek Yogurt', price: 150, image: 'https://ik.imagekit.io/fngldq7ef/GreekYogurt.png?updatedAt=1749955687751', category: 'dairy', weight: '300g' },
    { id: 7, name: 'Chicken Breast', price: 124.88, image: 'https://ik.imagekit.io/fngldq7ef/ChickenBreast.png?updatedAt=1749955400029', category: 'meat', weight: '0.5kg' },
    { id: 8, name: 'Ground Beef', price: 361, image: 'https://ik.imagekit.io/fngldq7ef/GroundBeef.png?updatedAt=1749955777903', category: 'meat', weight: '0.5kg' },
    { id: 9, name: 'Pork Chops', price: 260, image: 'https://ik.imagekit.io/fngldq7ef/PorkChops.png?updatedAt=1749955894486', category: 'meat', weight: '0.5kg' },
    { id: 10, name: 'Fresh Spinach', price: 23.22, image: 'https://ik.imagekit.io/fngldq7ef/FreshSpinach.png?updatedAt=1749955589592', category: 'produce', weight: '250g' },
    { id: 11, name: 'Carrots', price: 99.46, image: 'https://ik.imagekit.io/fngldq7ef/Carrots.png?updatedAt=1749955289046', category: 'produce', weight: '0.5kg' },
    { id: 12, name: 'Broccoli', price: 150, image: 'https://ik.imagekit.io/fngldq7ef/Broccoli.png?updatedAt=1749955019936', category: 'produce', weight: '0.5kg' },
    { id: 13, name: 'Mozzarella Cheese', price: 475.66, image: 'https://ik.imagekit.io/fngldq7ef/MozzarellaCheese.png?updatedAt=1749955786572', category: 'dairy', weight: '125g' },
    { id: 14, name: 'Butter', price: 299, image: 'https://ik.imagekit.io/fngldq7ef/Butter.png?updatedAt=1749955046800', category: 'dairy', weight: '200g' },
    { id: 15, name: 'Cottage Cheese', price: 300, image: 'https://ik.imagekit.io/fngldq7ef/CottageCheese.png?updatedAt=1749955431402', category: 'dairy', weight: '200g' },
    { id: 16, name: 'Pork Sausage', price: 280, image: 'https://ik.imagekit.io/fngldq7ef/PorkSausage.png?updatedAt=1749955887181', category: 'meat', weight: '360g' },
    { id: 17, name: 'Salmon Fillet', price: 316, image: 'https://ik.imagekit.io/fngldq7ef/SalmonFillet.png?updatedAt=1749955898524', category: 'meat', weight: '0.5kg' },
    { id: 18, name: 'Turkey Breast', price: 245.43, image: 'https://ik.imagekit.io/fngldq7ef/TurkeyBreast.png?updatedAt=1749955876482', category: 'meat', weight: '0.45kg' },
    { id: 19, name: 'Avocados', price: 137.35, image: 'https://ik.imagekit.io/fngldq7ef/Avocados.png?updatedAt=1749902399507', category: 'produce', weight: '150g' },
    { id: 20, name: 'Tomatoes', price: 44.91, image: 'https://ik.imagekit.io/fngldq7ef/Tomatoes.png?updatedAt=1749955899656', category: 'produce', weight: '1kg' },
    { id: 21, name: 'Cucumbers', price: 64.54, image: 'https://ik.imagekit.io/fngldq7ef/Cucumbers.png?updatedAt=1749955461518', category: 'produce', weight: '1kg' }
  ];

  let users = JSON.parse(localStorage.getItem('users')) || [];
  let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let orders = JSON.parse(localStorage.getItem('orders')) || [];
  let currentSection = 'home';
  let currentCategory = 'all';
  let currentFilter = 'default';

  function showWelcomeModal() {
    const welcomeModal = document.querySelector('#welcome-modal');
    if (welcomeModal && !sessionStorage.getItem('welcomeModalShown')) {
      // Hide all sections initially to avoid overlap
      document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
      });
      welcomeModal.style.display = 'flex';
      setTimeout(() => welcomeModal.classList.add('active'), 100);
      sessionStorage.setItem('welcomeModalShown', 'true');

      // Event listeners for modal buttons
      document.querySelector('.login-btn')?.addEventListener('click', () => {
        welcomeModal.style.display = 'none';
        showSection('login');
      });

      document.querySelector('.register-btn')?.addEventListener('click', () => {
        welcomeModal.style.display = 'none';
        showSection('register');
      });

      document.querySelector('.continue-guest')?.addEventListener('click', () => {
        welcomeModal.style.display = 'none';
        showSection('home');
      });
    } else {
      showSection('home');
    }
  }

  function showToast(message) {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  function updateUserStatus() {
    const userStatus = document.querySelector('#user-status');
    const loginLink = document.querySelector('#login-link');
    if (currentUser) {
      userStatus.textContent = `Welcome, ${currentUser.name}`;
      loginLink.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';
      loginLink.href = '#';
      loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        currentUser = null;
        localStorage.removeItem('currentUser');
        showToast('Logged out successfully');
        updateUserStatus();
        showSection('home');
        sessionStorage.removeItem('welcomeModalShown'); // Allow modal to show again after logout
      });
    } else {
      userStatus.textContent = '';
      loginLink.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
      loginLink.href = '#login';
    }
  }

  function showSection(sectionId) {
    document.querySelectorAll('section').forEach(section => {
      section.style.display = section.id === sectionId ? 'block' : 'none';
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
    });
    currentSection = sectionId;
    if (sectionId === 'products') renderProducts();
    if (sectionId === 'cart' || sectionId === 'checkout') renderCart();
    if (sectionId === 'orders') renderOrders();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderProducts(searchQuery = '') {
    const productGrid = document.querySelector('.product-grid');
    const loader = document.querySelector('#products .loader');
    if (!productGrid || !loader) return;

    loader.style.display = 'block';
    productGrid.style.opacity = '0';
    setTimeout(() => {
      productGrid.innerHTML = '';
      let filteredProducts = products.filter(product =>
        (currentCategory === 'all' || product.category === currentCategory) &&
        (searchQuery === '' || product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.category.toLowerCase().includes(searchQuery.toLowerCase()))
      );

      if (currentFilter === 'price-asc') {
        filteredProducts.sort((a, b) => a.price - b.price);
      } else if (currentFilter === 'price-desc') {
        filteredProducts.sort((a, b) => b.price - a.price);
      } else if (currentFilter === 'weight') {
        filteredProducts.sort((a, b) => {
          const weightA = parseFloat(a.weight);
          const weightB = parseFloat(b.weight);
          return weightA - weightB;
        });
      }

      filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <h3>${product.name}</h3>
          <p>₱${product.price.toFixed(2)}</p>
          <p>Weight: ${product.weight}</p>
          <button class="add-to-cart" data-id="${product.id}" aria-label="Add ${product.name} to cart">Add to Cart</button>
        `;
        productGrid.appendChild(productCard);
      });
      loader.style.display = 'none';
      productGrid.style.opacity = '1';
    }, 500);
  }

  function renderCart() {
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelectorAll('#cart-total');
    const loader = document.querySelector('#cart .loader');
    if (!cartItems || !cartTotal || !loader) return;

    loader.style.display = 'block';
    cartItems.style.opacity = '0';
    cartItems.style.transform = 'scale(0.98)';
    setTimeout(() => {
      cartItems.innerHTML = '';
      if (cart.length === 0) {
        cartItems.innerHTML = '<p style="color: var(--text); font-size: clamp(0.9rem, 2.2vw, 1.1rem);">Your cart is empty.</p>';
      } else {
        const groupedCart = cart.reduce((acc, item) => {
          acc[item.id] = acc[item.id] || { ...item, quantity: 0 };
          acc[item.id].quantity += 1;
          return acc;
        }, {});

        let total = 0;
        Object.values(groupedCart).forEach(item => {
          const itemTotal = item.price * item.quantity;
          total += itemTotal;
          const cartItem = document.createElement('div');
          cartItem.classList.add('cart-item');
          cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" loading="lazy">
            <div>
              <h3>${item.name}</h3>
              <p>₱${item.price.toFixed(2)} x ${item.quantity} = ₱${itemTotal.toFixed(2)}</p>
            </div>
            <div class="cart-item-controls">
              <button class="decrease-quantity" data-id="${item.id}" aria-label="Decrease quantity">-</button>
              <input type="number" value="${item.quantity}" min="1" data-id="${item.id}" aria-label="Quantity">
              <button class="increase-quantity" data-id="${item.id}" aria-label="Increase quantity">+</button>
              <button class="remove-item" data-id="${item.id}" aria-label="Remove ${item.name}">✕</button>
            </div>
          `;
          cartItems.appendChild(cartItem);
        });
        cartTotal.forEach(el => el.textContent = total.toFixed(2));
      }
      loader.style.display = 'none';
      cartItems.style.opacity = '1';
      cartItems.style.transform = 'scale(1)';
      localStorage.setItem('cart', JSON.stringify(cart));
    }, 500);
  }

  function renderOrders() {
    const orderList = document.querySelector('.order-list');
    const loader = document.querySelector('#orders .loader');
    if (!orderList || !loader) return;

    loader.style.display = 'block';
    orderList.style.opacity = '0';
    orderList.style.transform = 'scale(0.98)';
    setTimeout(() => {
      orderList.innerHTML = '';
      if (orders.length === 0) {
        orderList.innerHTML = '<p style="color: var(--text); font-size: clamp(0.9rem, 2.2vw, 1.1rem);">No orders found.</p>';
      } else {
        orders.forEach(order => {
          const orderItem = document.createElement('div');
          orderItem.classList.add('order-item');
          orderItem.innerHTML = `
            <h3>Order #${order.id}</h3>
            <p>Status: ${order.status}</p>
            <p>Total: ₱${order.total.toFixed(2)}</p>
            <p>Placed: ${new Date(order.date).toLocaleString()}</p>
            <p>Delivery Address: ${order.address}</p>
          `;
          orderList.appendChild(orderItem);
        });
      }
      loader.style.display = 'none';
      orderList.style.opacity = '1';
      orderList.style.transform = 'scale(1)';
    }, 500);
  }

  function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(el => el.textContent = cart.length);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function handleAddToCart(e) {
    if (!currentUser) {
      showToast('Please log in to add items to cart');
      showSection('login');
      return;
    }
    if (e.target.classList.contains('add-to-cart')) {
      const productId = parseInt(e.target.dataset.id);
      const product = products.find(p => p.id === productId);
      if (product) {
        cart.push(product);
        updateCartCount();
        showToast(`${product.name} added to cart!`);
        if (currentSection === 'cart') renderCart();
      }
    }
  }

  function debounce(func, wait) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  function handleCartControls(e) {
    const target = e.target;
    const productId = parseInt(target.dataset.id);
    if (target.classList.contains('increase-quantity')) {
      const product = products.find(p => p.id === productId);
      if (product) {
        cart.push(product);
        showToast(`Added another ${product.name}`);
      }
    } else if (target.classList.contains('decrease-quantity')) {
      const index = cart.findIndex(item => item.id === productId);
      if (index !== -1) {
        cart.splice(index, 1);
        showToast(`Removed one ${products.find(p => p.id === productId).name}`);
      }
    } else if (target.classList.contains('remove-item')) {
      const productName = products.find(p => p.id === productId).name;
      cart = cart.filter(item => item.id !== productId);
      showToast(`${productName} removed from cart`);
    } else if (target.tagName === 'INPUT') {
      const newQuantity = parseInt(target.value) || 1;
      cart = cart.filter(item => item.id !== productId);
      const product = products.find(p => p.id === productId);
      if (product) {
        for (let i = 0; i < newQuantity; i++) cart.push(product);
        showToast(`Updated ${product.name} quantity to ${newQuantity}`);
      }
    }
    updateCartCount();
    renderCart();
  }

  function handleCategoryFilter(e) {
    if (e.target.classList.contains('category-btn')) {
      document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      currentCategory = e.target.dataset.category;
      renderProducts();
    }
  }

  function handleSortFilter(e) {
    currentFilter = e.target.value;
    renderProducts();
  }

  function handleSearch(e) {
    const searchQuery = e.target.value;
    renderProducts(searchQuery);
  }

  function handleLogin(e) {
    if (e.target.id === 'login-form') {
      e.preventDefault();
      const email = e.target.querySelector('#login-email').value;
      const password = e.target.querySelector('#login-password').value;
      if (!email || !password) {
        showToast('Please fill in all fields');
        return;
      }
      const existingUser = users.find(u => u.email === email && u.password === password);
      if (!existingUser) {
        showToast('Invalid email or password. Please try again or register.');
        showSection('register');
        return;
      }
      currentUser = { email: existingUser.email, name: existingUser.name, password: existingUser.password };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      showToast(`Welcome, ${currentUser.name}!`);
      updateUserStatus();
      showSection('home');
    }
  }

  function handleRegister(e) {
    if (e.target.id === 'register-form') {
      e.preventDefault();
      const email = e.target.querySelector('#register-email').value;
      const password = e.target.querySelector('#register-password').value;
      const confirmPassword = e.target

.querySelector('#confirm-password').value;
      if (!email || !password || !confirmPassword) {
        showToast('Please fill in all fields');
        return;
      }
      if (password !== confirmPassword) {
        showToast('Passwords do not match');
        return;
      }
      if (users.find(u => u.email === email)) {
        showToast('Email already registered. Please log in.');
        showSection('login');
        return;
      }
      const newUser = { email, name: email.split('@')[0], password };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      currentUser = newUser;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      showToast(`Registered successfully, ${currentUser.name}!`);
      updateUserStatus();
      showSection('home');
    }
  }

  function handleCheckout(e) {
    if (e.target.id === 'checkout-form') {
      e.preventDefault();
      if (!currentUser) {
        showToast('Please log in to checkout');
        showSection('login');
        return;
      }
      const address = e.target.querySelector('#address').value;
      const zipCode = e.target.querySelector('#zip-code').value;
      const deliveryTime = e.target.querySelector('#delivery-time').value;
      const paymentMethod = e.target.querySelector('#payment-method').value;
      if (!address || !zipCode || !deliveryTime || !paymentMethod) {
        showToast('Please fill in all fields');
        return;
      }
      if (cart.length === 0) {
        showToast('Your cart is empty');
        return;
      }
      const total = parseFloat(document.querySelector('#cart-total').textContent);
      const order = {
        id: orders.length + 1,
        status: 'Pending',
        total,
        date: Date.now(),
        address: `${address}, ${zipCode}`,
        items: cart
      };
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));
      cart = [];
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      showToast(`Order #${order.id} placed successfully!`);
      showSection('orders');
    }
  }

  function handleContactForm(e) {
    if (e.target.id === 'contact-form') {
      e.preventDefault();
      const name = e.target.querySelector('input[type="text"]').value;
      const email = e.target.querySelector('input[type="email"]').value;
      const message = e.target.querySelector('textarea').value;
      if (!name || !email || !message) {
        showToast('Please fill in all fields');
        return;
      }
      showToast(`Thank you, ${name}, for your message! We'll get back to you soon.`);
      e.target.reset();
    }
  }

  function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
  }

  function handleNavigation(e) {
    if (e.target.classList.contains('nav-link')) {
      e.preventDefault();
      const sectionId = e.target.getAttribute('href').substring(1);
      showSection(sectionId);
    }
  }

  // Event listeners for login/register navigation
  document.querySelector('#login-form a[href="#register"]')?.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('register');
  });

  document.querySelector('#register-form a[href="#login"]')?.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('login');
  });

  // Initialize app
  updateUserStatus();
  updateCartCount();
  if (!currentUser) {
    showWelcomeModal();
  } else {
    showSection('home');
  }

  // Event listeners
  document.querySelector('.category-buttons')?.addEventListener('click', handleCategoryFilter);
  document.querySelector('.filter-select')?.addEventListener('change', handleSortFilter);
  document.querySelector('#search-input')?.addEventListener('input', debounce(handleSearch, 300));
  document.querySelector('#contact-form')?.addEventListener('submit', handleContactForm);
  document.querySelector('#login-form')?.addEventListener('submit', handleLogin);
  document.querySelector('#register-form')?.addEventListener('submit', handleRegister);
  document.querySelector('#checkout-form')?.addEventListener('submit', handleCheckout);
  document.querySelector('.shop-now')?.addEventListener('click', () => showSection('products'));
  document.querySelector('.checkout')?.addEventListener('click', () => {
    if (!currentUser) {
      showToast('Please log in to checkout');
      showSection('login');
      return;
    }
    showSection('checkout');
  });
  document.querySelector('.menu-toggle')?.addEventListener('click', toggleMenu);
  document.querySelector('.nav-links')?.addEventListener('click', handleNavigation);

  document.addEventListener('click', e => {
    if (e.target.classList.contains('add-to-cart')) handleAddToCart(e);
    if (
      e.target.classList.contains('increase-quantity') ||
      e.target.classList.contains('decrease-quantity') ||
      e.target.classList.contains('remove-item')
    ) handleCartControls(e);
  });

  document.addEventListener('input', debounce(e => {
    if (e.target.tagName === 'INPUT' && e.target.closest('.cart-item-controls')) handleCartControls(e);
  }, 500));
});