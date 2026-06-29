/**
 * CEYNOVA CINNAMON - Premium Sri Lankan Spices
 * Modern Vanilla JavaScript Application
 * ============================================
 */

// ============================================
// PRODUCT DATA
// ============================================
const products = [
    {
        id: 1,
        name: 'Ceylon Cinnamon Sticks',
        description: 'Premium Alba grade Ceylon cinnamon sticks, hand-rolled and sun-dried for the finest aroma and flavor.',
        price: 24.99,
        category: 'cinnamon',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=450&fit=crop',
        badge: 'Bestseller'
    },
    {
        id: 2,
        name: 'Cinnamon Powder',
        description: 'Finely ground Ceylon cinnamon powder, perfect for baking, beverages, and culinary creations.',
        price: 18.99,
        category: 'cinnamon',
        image: 'https://images.unsplash.com/photo-1628556270448-e8c9b9a9e3b4?w=600&h=450&fit=crop',
        badge: 'Popular'
    },
    {
        id: 3,
        name: 'Cinnamon Tea',
        description: 'Aromatic cinnamon tea blend with pure Ceylon cinnamon and selected herbs for a soothing experience.',
        price: 14.99,
        category: 'tea',
        image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=600&h=450&fit=crop',
        badge: 'New'
    },
    {
        id: 4,
        name: 'Black Pepper',
        description: 'Tellicherry grade black peppercorns from Sri Lanka, known for their bold flavor and high oil content.',
        price: 16.99,
        category: 'spices',
        image: 'https://images.unsplash.com/photo-1599909533681-96b9a0f8b0b5?w=600&h=450&fit=crop',
        badge: null
    },
    {
        id: 5,
        name: 'Cloves',
        description: 'Whole hand-picked Sri Lankan cloves with intense aroma. Ideal for cooking and medicinal use.',
        price: 12.99,
        category: 'spices',
        image: 'https://www.istockphoto.com/photo/cloves-closeup-gm471346177-18921370&fit=crop',
        badge: null
    },
    {
        id: 6,
        name: 'Cardamom',
        description: 'Green cardamom pods from Sri Lankan highlands. The queen of spices for sweet and savory dishes.',
        price: 19.99,
        category: 'spices',
        image: 'https://images.unsplash.com/photo-1626139666708-24b1c1e3e8e1?w=600&h=450&fit=crop',
        badge: 'Premium'
    }
];

// Gallery images
const galleryImages = [
    'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1599940824399-b87987ce0799?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1628556270448-e8c9b9a9e3b4?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=1200&h=800&fit=crop'
];

// ============================================
// STATE MANAGEMENT
// ============================================
let cart = JSON.parse(localStorage.getItem('ceynova_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('ceynova_wishlist')) || [];
let productQuantities = {};
let currentTestimonial = 0;
let testimonialInterval;
let currentLightboxIndex = 0;

// ============================================
// DOM ELEMENTS
// ============================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const cartToggle = document.getElementById('cart-toggle');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const cartClose = document.getElementById('cart-close');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');
const productsGrid = document.getElementById('products-grid');
const productSearch = document.getElementById('product-search');
const filterBtns = document.querySelectorAll('.filter-btn');
const backToTop = document.getElementById('back-to-top');
const themeToggle = document.getElementById('theme-toggle');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
const testimonialsTrack = document.getElementById('testimonials-track');
const testimonialPrev = document.getElementById('testimonial-prev');
const testimonialNext = document.getElementById('testimonial-next');
const testimonialsDots = document.getElementById('testimonials-dots');
const contactForm = document.getElementById('contact-form');
const newsletterForm = document.getElementById('newsletter-form');
const toastContainer = document.getElementById('toast-container');

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();
    initCart();
    initProducts();
    initProductFilter();
    initProductSearch();
    initLightbox();
    initTestimonials();
    initCounters();
    initBackToTop();
    initThemeToggle();
    initContactForm();
    initNewsletterForm();
    initAboutTabs();
    initParallax();
});

// ============================================
// NAVBAR
// ============================================
function initNavbar() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active nav link based on scroll position
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${section.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        const isExpanded = hamburger.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isExpanded);
        document.body.style.overflow = isExpanded ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });
}

// ============================================
// SMOOTH SCROLLING
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = navbar.offsetHeight + 20;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

// ============================================
// PRODUCTS
// ============================================
function initProducts() {
    renderProducts(products);
}

function renderProducts(productsToRender) {
    productsGrid.innerHTML = productsToRender.map(product => {
        const qty = productQuantities[product.id] || 1;
        const isWishlisted = wishlist.includes(product.id);
        return `
            <div class="product-card" data-category="${product.category}" data-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                    <button class="product-wishlist ${isWishlisted ? 'active' : ''}" data-id="${product.id}" aria-label="${isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}">
                        <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                    </button>
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-desc">${product.description}</p>
                    <div class="product-footer">
                        <span class="product-price">$${product.price.toFixed(2)}</span>
                        <div class="product-qty">
                            <button class="qty-btn qty-decrease" data-id="${product.id}">-</button>
                            <span class="qty-value" data-id="${product.id}">${qty}</span>
                            <button class="qty-btn qty-increase" data-id="${product.id}">+</button>
                        </div>
                    </div>
                    <button class="add-to-cart" data-id="${product.id}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                            <line x1="3" y1="6" x2="21" y2="6"/>
                            <path d="M16 10a4 4 0 01-8 0"/>
                        </svg>
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
    }).join('');

    attachProductEvents();
}

function attachProductEvents() {
    // Quantity buttons
    document.querySelectorAll('.qty-decrease').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            if (productQuantities[id] > 1) {
                productQuantities[id]--;
                document.querySelector(`.qty-value[data-id="${id}"]`).textContent = productQuantities[id];
            }
        });
    });

    document.querySelectorAll('.qty-increase').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            productQuantities[id] = (productQuantities[id] || 1) + 1;
            document.querySelector(`.qty-value[data-id="${id}"]`).textContent = productQuantities[id];
        });
    });

    // Add to cart
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            const qty = productQuantities[id] || 1;
            addToCart(id, qty);
        });
    });

    // Wishlist
    document.querySelectorAll('.product-wishlist').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.dataset.id);
            toggleWishlist(id, btn);
        });
    });
}

// ============================================
// PRODUCT FILTERING
// ============================================
function initProductFilter() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            filterProducts(filter);
        });
    });
}

function filterProducts(category) {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.classList.remove('hidden');
            card.style.animation = 'fadeUp 0.5s ease forwards';
        } else {
            card.classList.add('hidden');
        }
    });
}

// ============================================
// PRODUCT SEARCH
// ============================================
function initProductSearch() {
    productSearch.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const cards = document.querySelectorAll('.product-card');

        cards.forEach(card => {
            const name = card.querySelector('.product-name').textContent.toLowerCase();
            const desc = card.querySelector('.product-desc').textContent.toLowerCase();
            if (name.includes(query) || desc.includes(query)) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
}

// ============================================
// SHOPPING CART
// ============================================
function initCart() {
    updateCartUI();

    cartToggle.addEventListener('click', openCart);
    cartClose.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    // Checkout button
    document.getElementById('checkout-btn').addEventListener('click', () => {
        if (cart.length === 0) {
            showToast('Your cart is empty!', 'error');
            return;
        }
        showToast('Checkout feature coming soon! Thank you for your interest.', 'info');
    });
}

function openCart() {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    saveCart();
    updateCartUI();
    showToast(`${product.name} added to cart!`, 'success');
    openCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    showToast('Item removed from cart', 'info');
}

function updateCartQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }

    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('ceynova_cart', JSON.stringify(cart));
}

function updateCartUI() {
    // Update count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';

    // Update items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img" loading="lazy">
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <div class="cart-item-actions">
                        <button class="cart-qty-btn" onclick="updateCartQuantity(${item.id}, -1)">-</button>
                        <span class="cart-qty-value">${item.quantity}</span>
                        <button class="cart-qty-btn" onclick="updateCartQuantity(${item.id}, 1)">+</button>
                        <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalPrice.textContent = `$${total.toFixed(2)}`;
}

// ============================================
// WISHLIST
// ============================================
function toggleWishlist(productId, btn) {
    const index = wishlist.indexOf(productId);
    if (index > -1) {
        wishlist.splice(index, 1);
        btn.classList.remove('active');
        btn.setAttribute('aria-label', 'Add to wishlist');
        showToast('Removed from wishlist', 'info');
    } else {
        wishlist.push(productId);
        btn.classList.add('active');
        btn.setAttribute('aria-label', 'Remove from wishlist');
        showToast('Added to wishlist!', 'success');
    }
    localStorage.setItem('ceynova_wishlist', JSON.stringify(wishlist));
}

// ============================================
// LIGHTBOX
// ============================================
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentLightboxIndex = index;
            openLightbox();
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrevImage);
    lightboxNext.addEventListener('click', showNextImage);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
    });

    // Swipe support
    let touchStartX = 0;
    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    lightbox.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) showNextImage();
        if (touchEndX - touchStartX > 50) showPrevImage();
    });
}

function openLightbox() {
    lightboxImg.src = galleryImages[currentLightboxIndex];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function showPrevImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentLightboxIndex];
}

function showNextImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentLightboxIndex];
}

// ============================================
// TESTIMONIALS SLIDER
// ============================================
function initTestimonials() {
    const totalTestimonials = testimonialsTrack.children.length;

    // Create dots
    for (let i = 0; i < totalTestimonials; i++) {
        const dot = document.createElement('button');
        dot.className = `testimonial-dot ${i === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
        dot.addEventListener('click', () => goToTestimonial(i));
        testimonialsDots.appendChild(dot);
    }

    testimonialPrev.addEventListener('click', () => {
        goToTestimonial(currentTestimonial - 1);
        resetAutoSlide();
    });

    testimonialNext.addEventListener('click', () => {
        goToTestimonial(currentTestimonial + 1);
        resetAutoSlide();
    });

    startAutoSlide();
}

function goToTestimonial(index) {
    const total = testimonialsTrack.children.length;
    currentTestimonial = (index + total) % total;

    const isMobile = window.innerWidth <= 768;
    const slideWidth = isMobile ? 100 : 33.333;
    testimonialsTrack.style.transform = `translateX(-${currentTestimonial * slideWidth}%)`;

    // Update dots
    document.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentTestimonial);
    });
}

function startAutoSlide() {
    testimonialInterval = setInterval(() => {
        goToTestimonial(currentTestimonial + 1);
    }, 5000);
}

function resetAutoSlide() {
    clearInterval(testimonialInterval);
    startAutoSlide();
}

// ============================================
// ANIMATED COUNTERS
// ============================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * easeOut);
        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }

    requestAnimationFrame(update);
}

// ============================================
// BACK TO TOP
// ============================================
function initBackToTop() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// DARK MODE TOGGLE
// ============================================
function initThemeToggle() {
    const savedTheme = localStorage.getItem('ceynova_theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.querySelector('.theme-icon').textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('ceynova_theme', 'light');
            themeToggle.querySelector('.theme-icon').textContent = '🌙';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('ceynova_theme', 'dark');
            themeToggle.querySelector('.theme-icon').textContent = '☀️';
        }
    });
}

// ============================================
// ABOUT TABS
// ============================================
function initAboutTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;

            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `tab-${tab}`) {
                    content.classList.add('active');
                }
            });
        });
    });
}

// ============================================
// PARALLAX EFFECT
// ============================================
function initParallax() {
    const heroBg = document.querySelector('.hero-bg');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (heroBg && scrolled < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
    });
}

// ============================================
// CONTACT FORM
// ============================================
function initContactForm() {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (validateContactForm()) {
            showToast('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
        }
    });
}

function validateContactForm() {
    let isValid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const country = document.getElementById('country');
    const message = document.getElementById('message');

    // Clear previous errors
    document.querySelectorAll('.form-error').forEach(el => el.textContent = '');

    // Name validation
    if (name.value.trim().length < 2) {
        document.getElementById('name-error').textContent = 'Please enter your full name';
        isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address';
        isValid = false;
    }

    // Country validation
    if (!country.value) {
        document.getElementById('country-error').textContent = 'Please select your country';
        isValid = false;
    }

    // Message validation
    if (message.value.trim().length < 10) {
        document.getElementById('message-error').textContent = 'Message must be at least 10 characters';
        isValid = false;
    }

    return isValid;
}

// ============================================
// NEWSLETTER FORM
// ============================================
function initNewsletterForm() {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('newsletter-email').value;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            showToast('Thank you for subscribing to our newsletter!', 'success');
            newsletterForm.reset();
        } else {
            showToast('Please enter a valid email address', 'error');
        }
    });
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️'
    };

    toast.innerHTML = `<span>${icons[type]}</span> ${message}`;
    toastContainer.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    // Remove after delay
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// ============================================
// KEYBOARD ACCESSIBILITY
// ============================================
document.addEventListener('keydown', (e) => {
    // Close cart with Escape
    if (e.key === 'Escape' && cartSidebar.classList.contains('active')) {
        closeCart();
    }

    // Close lightbox with Escape
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

// ============================================
// WINDOW RESIZE HANDLER
// ============================================
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Reset testimonial position on resize
        goToTestimonial(currentTestimonial);
    }, 250);
});
