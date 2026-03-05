/* ============================================
   PRIMEO — Shared JavaScript
   Cart, Wishlist, Search, Header, and shared utilities
   ============================================ */

// ============================================
//  PRODUCT DATA (for search)
// ============================================
const PRODUCTS = [
    { name: 'Survêtement Green Eagles', price: 161, category: 'Homme', image: 'images/product-tracksuit.png', link: 'product.html' },
    { name: 'Maillot Black Gold Edition', price: 96, category: 'Homme', image: 'images/product-jersey.png', link: 'product.html' },
    { name: 'Sneakers Wave Runner', price: 84, originalPrice: 120, category: 'Homme', image: 'images/product-sneakers.png', link: 'product.html' },
    { name: 'Hoodie Oversize Classic', price: 89, category: 'Homme', image: 'images/product-hoodie.png', link: 'product.html' },
    { name: 'Hoodie Signature Logo', price: 105, category: 'Homme', image: 'images/product-hoodie.png', link: 'product.html' },
    { name: 'Survêtement Scarface 2.0', price: 155, originalPrice: 194, category: 'Homme', image: 'images/product-tracksuit.png', link: 'product.html' },
    { name: 'Maillot Pro Edition', price: 78, category: 'Homme', image: 'images/product-jersey.png', link: 'product.html' },
    { name: 'Sneakers Urban Elite', price: 134, category: 'Homme', image: 'images/product-sneakers.png', link: 'product.html' },
    { name: 'Survêtement Night Rider', price: 178, category: 'Homme', image: 'images/product-tracksuit.png', link: 'product.html' },
    { name: 'Ensemble Sporty Chic', price: 145, category: 'Femme', image: 'images/product-tracksuit.png', link: 'product.html' },
    { name: 'Hoodie Crop Signature', price: 79, category: 'Femme', image: 'images/product-hoodie.png', link: 'product.html' },
    { name: 'Legging Performance Pro', price: 52, originalPrice: 69, category: 'Femme', image: 'images/product-sneakers.png', link: 'product.html' },
    { name: 'Sneakers Cloud Femme', price: 118, category: 'Femme', image: 'images/product-sneakers.png', link: 'product.html' },
    { name: 'Ensemble Urban Queen', price: 169, category: 'Femme', image: 'images/product-tracksuit.png', link: 'product.html' },
    { name: 'Hoodie Oversize Femme', price: 95, category: 'Femme', image: 'images/product-hoodie.png', link: 'product.html' },
    { name: 'Legging Sculpt Luxe', price: 65, category: 'Femme', image: 'images/product-jersey.png', link: 'product.html' },
    { name: 'Ensemble Fitness Elite', price: 127, originalPrice: 149, category: 'Femme', image: 'images/product-tracksuit.png', link: 'product.html' },
    { name: 'Sac Banane Sport Elite', price: 45, category: 'Accessoires', image: 'images/product-sneakers.png', link: 'product.html' },
    { name: 'Casquette Logo Brodé', price: 35, category: 'Accessoires', image: 'images/product-jersey.png', link: 'product.html' },
    { name: 'Pack 3 Chaussettes Sport', price: 22, category: 'Accessoires', image: 'images/product-hoodie.png', link: 'product.html' },
    { name: 'Sac à Dos Urban', price: 56, originalPrice: 70, category: 'Accessoires', image: 'images/product-tracksuit.png', link: 'product.html' },
    { name: 'Bob PRIMEO Classic', price: 32, category: 'Accessoires', image: 'images/product-jersey.png', link: 'product.html' },
    { name: 'Gourde Sport 750ml', price: 28, category: 'Accessoires', image: 'images/product-sneakers.png', link: 'product.html' },
    { name: 'Serviette Sport XL', price: 19, category: 'Accessoires', image: 'images/product-hoodie.png', link: 'product.html' },
    { name: 'Pochette Zip Premium', price: 38, category: 'Accessoires', image: 'images/product-tracksuit.png', link: 'product.html' },
];

// ============================================
//  CART SYSTEM (localStorage)
// ============================================
const Cart = {
    getItems() {
        return JSON.parse(localStorage.getItem('primeo_cart') || '[]');
    },
    saveItems(items) {
        localStorage.setItem('primeo_cart', JSON.stringify(items));
        Cart.updateBadge();
    },
    addItem(product) {
        const items = Cart.getItems();
        const existing = items.find(i => i.name === product.name && i.size === product.size);
        if (existing) {
            existing.qty += product.qty || 1;
        } else {
            items.push({ ...product, qty: product.qty || 1 });
        }
        Cart.saveItems(items);
        Cart.showNotification(product.name);
    },
    removeItem(index) {
        const items = Cart.getItems();
        items.splice(index, 1);
        Cart.saveItems(items);
    },
    updateQty(index, qty) {
        const items = Cart.getItems();
        if (qty < 1) {
            items.splice(index, 1);
        } else {
            items[index].qty = qty;
        }
        Cart.saveItems(items);
    },
    getTotal() {
        return Cart.getItems().reduce((sum, item) => sum + item.price * item.qty, 0);
    },
    getCount() {
        return Cart.getItems().reduce((sum, item) => sum + item.qty, 0);
    },
    updateBadge() {
        const count = Cart.getCount();
        document.querySelectorAll('.cart-count').forEach(el => {
            el.textContent = count;
        });
    },
    showNotification(productName) {
        const notif = document.createElement('div');
        notif.className = 'cart-notification';
        notif.innerHTML = `<i class="fas fa-check-circle"></i> <strong>${productName}</strong> ajouté au panier`;
        document.body.appendChild(notif);
        requestAnimationFrame(() => notif.classList.add('show'));
        setTimeout(() => {
            notif.classList.remove('show');
            setTimeout(() => notif.remove(), 400);
        }, 2500);
    },
    clear() {
        localStorage.removeItem('primeo_cart');
        Cart.updateBadge();
    }
};

// ============================================
//  WISHLIST SYSTEM (localStorage)
// ============================================
const Wishlist = {
    getItems() {
        return JSON.parse(localStorage.getItem('primeo_wishlist') || '[]');
    },
    saveItems(items) {
        localStorage.setItem('primeo_wishlist', JSON.stringify(items));
        Wishlist.updateBadge();
    },
    addItem(product) {
        const items = Wishlist.getItems();
        if (!items.find(i => i.name === product.name)) {
            items.push(product);
            Wishlist.saveItems(items);
            Wishlist.showNotification(product.name, true);
        }
    },
    removeItem(productName) {
        let items = Wishlist.getItems();
        items = items.filter(i => i.name !== productName);
        Wishlist.saveItems(items);
    },
    toggleItem(product) {
        if (Wishlist.isInWishlist(product.name)) {
            Wishlist.removeItem(product.name);
            Wishlist.showNotification(product.name, false);
            return false;
        } else {
            Wishlist.addItem(product);
            return true;
        }
    },
    isInWishlist(name) {
        return Wishlist.getItems().some(i => i.name === name);
    },
    getCount() {
        return Wishlist.getItems().length;
    },
    updateBadge() {
        const count = Wishlist.getCount();
        document.querySelectorAll('.wishlist-count').forEach(el => {
            el.textContent = count;
        });
    },
    showNotification(productName, added) {
        const notif = document.createElement('div');
        notif.className = 'cart-notification';
        if (added) {
            notif.innerHTML = `<i class="fas fa-heart" style="color:var(--color-accent);"></i> <strong>${productName}</strong> ajouté aux favoris`;
        } else {
            notif.innerHTML = `<i class="far fa-heart"></i> <strong>${productName}</strong> retiré des favoris`;
        }
        document.body.appendChild(notif);
        requestAnimationFrame(() => notif.classList.add('show'));
        setTimeout(() => {
            notif.classList.remove('show');
            setTimeout(() => notif.remove(), 400);
        }, 2500);
    }
};

// ============================================
//  ACCOUNT SYSTEM (localStorage)
// ============================================
const Account = {
    getUser() {
        return JSON.parse(localStorage.getItem('primeo_user') || 'null');
    },
    login(email, password) {
        const users = JSON.parse(localStorage.getItem('primeo_users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem('primeo_user', JSON.stringify(user));
            return { success: true, user };
        }
        return { success: false, message: 'Email ou mot de passe incorrect.' };
    },
    register(data) {
        const users = JSON.parse(localStorage.getItem('primeo_users') || '[]');
        if (users.find(u => u.email === data.email)) {
            return { success: false, message: 'Cet email est déjà utilisé.' };
        }
        const user = { ...data, id: Date.now(), orders: [] };
        users.push(user);
        localStorage.setItem('primeo_users', JSON.stringify(users));
        localStorage.setItem('primeo_user', JSON.stringify(user));
        return { success: true, user };
    },
    logout() {
        localStorage.removeItem('primeo_user');
    },
    isLoggedIn() {
        return Account.getUser() !== null;
    }
};

// ============================================
//  SEARCH OVERLAY
// ============================================
function createSearchOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'searchOverlay';
    overlay.className = 'search-overlay';
    overlay.innerHTML = `
        <div class="search-overlay-inner">
            <div class="search-header">
                <h2>Rechercher</h2>
                <button class="search-close" id="searchClose"><i class="fas fa-times"></i></button>
            </div>
            <div class="search-input-wrap">
                <i class="fas fa-search"></i>
                <input type="text" id="searchInput" placeholder="Rechercher un produit..." autocomplete="off">
            </div>
            <div class="search-results" id="searchResults">
                <div class="search-placeholder">
                    <i class="fas fa-search" style="font-size:3rem;color:var(--color-border);margin-bottom:1.5rem;"></i>
                    <p>Tapez pour rechercher parmi nos produits</p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchClose = document.getElementById('searchClose');

    searchClose.addEventListener('click', () => {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        searchInput.value = '';
        searchResults.innerHTML = `<div class="search-placeholder"><i class="fas fa-search" style="font-size:3rem;color:var(--color-border);margin-bottom:1.5rem;"></i><p>Tapez pour rechercher parmi nos produits</p></div>`;
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            searchClose.click();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            searchClose.click();
        }
    });

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (!query) {
            searchResults.innerHTML = `<div class="search-placeholder"><i class="fas fa-search" style="font-size:3rem;color:var(--color-border);margin-bottom:1.5rem;"></i><p>Tapez pour rechercher parmi nos produits</p></div>`;
            return;
        }
        const results = PRODUCTS.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        );
        if (results.length === 0) {
            searchResults.innerHTML = `<div class="search-placeholder"><i class="fas fa-search-minus" style="font-size:3rem;color:var(--color-border);margin-bottom:1.5rem;"></i><p>Aucun résultat pour « ${e.target.value} »</p></div>`;
            return;
        }
        searchResults.innerHTML = results.map(p => `
            <a href="${p.link}" class="search-result-item">
                <div class="search-result-img"><img src="${p.image}" alt="${p.name}"></div>
                <div class="search-result-info">
                    <span class="search-result-cat">${p.category}</span>
                    <h4>${p.name}</h4>
                    <div class="search-result-price">
                        <span class="current">${p.price.toFixed(2)} $ CAD</span>
                        ${p.originalPrice ? `<span class="original">${p.originalPrice.toFixed(2)} $</span>` : ''}
                    </div>
                </div>
            </a>
        `).join('');
    });
}

// ============================================
//  HEADER / SCROLL UTILITIES
// ============================================
function initHeader() {
    const header = document.getElementById('siteHeader');
    const btt = document.getElementById('backToTop');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
            if (btt) btt.classList.toggle('visible', window.scrollY > 400);
        });
    }
    if (btt) {
        btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
}

function initMobileMenu() {
    const toggle = document.getElementById('mobileToggle');
    const menu = document.getElementById('mobileMenu');
    const close = document.getElementById('mobileClose');
    if (toggle && menu) {
        toggle.addEventListener('click', () => menu.classList.add('active'));
        if (close) close.addEventListener('click', () => menu.classList.remove('active'));
        menu.addEventListener('click', (e) => { if (e.target === menu) menu.classList.remove('active'); });
    }
}

function initSearchToggle() {
    const searchToggles = document.querySelectorAll('#searchToggle, .search-trigger');
    searchToggles.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const overlay = document.getElementById('searchOverlay');
            if (overlay) {
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                setTimeout(() => document.getElementById('searchInput').focus(), 300);
            }
        });
    });
}

function initReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length === 0) return;
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('active'); obs.unobserve(e.target); }
        });
    }, { threshold: 0.15 });
    reveals.forEach(el => obs.observe(el));
}

function initFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const f = btn.dataset.filter;
            document.querySelectorAll('.product-card').forEach(c => {
                c.style.display = (f === 'all' || c.dataset.category === f) ? '' : 'none';
            });
        });
    });
}

// ============================================
//  ADD TO CART FROM PRODUCT PAGE
// ============================================
function initProductPageCart() {
    const addToCartBtn = document.querySelector('.product-actions-detail .btn-dark');
    if (!addToCartBtn) return;

    addToCartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const title = document.querySelector('.product-detail-title');
        const price = document.querySelector('.price-current');
        const sizeBtn = document.querySelector('.size-btn.active');
        const qtyInput = document.getElementById('qtyInput');
        const img = document.getElementById('mainImage');

        if (!title || !price) return;

        const product = {
            name: title.textContent.trim(),
            price: parseFloat(price.textContent.replace(/[^0-9.]/g, '')),
            size: sizeBtn ? sizeBtn.textContent.trim() : 'M',
            qty: qtyInput ? parseInt(qtyInput.value) : 1,
            image: img ? img.src : 'images/product-tracksuit.png'
        };
        Cart.addItem(product);
    });
}

// ============================================
//  ADD TO CART FROM LISTING (product cards)
// ============================================
function initAddToCartButtons() {
    document.querySelectorAll('.product-card .product-actions button').forEach(btn => {
        const icon = btn.querySelector('i');
        if (!icon) return;
        if (icon.classList.contains('fa-shopping-bag')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const card = btn.closest('.product-card');
                if (!card) return;
                const nameEl = card.querySelector('.product-info h4');
                const priceEl = card.querySelector('.product-price .current');
                const imgEl = card.querySelector('.product-image img');
                if (!nameEl || !priceEl) return;
                const product = {
                    name: nameEl.textContent.trim(),
                    price: parseFloat(priceEl.textContent.replace(/[^0-9.]/g, '')),
                    size: 'M',
                    qty: 1,
                    image: imgEl ? imgEl.src : 'images/product-tracksuit.png'
                };
                Cart.addItem(product);
            });
        }
    });
}

// ============================================
//  WISHLIST BUTTONS (product cards + detail)
// ============================================
function initWishlistButtons() {
    // Product card heart buttons
    document.querySelectorAll('.product-card .product-actions button').forEach(btn => {
        const icon = btn.querySelector('i');
        if (!icon) return;
        if (icon.classList.contains('fa-heart')) {
            const card = btn.closest('.product-card');
            if (!card) return;
            const nameEl = card.querySelector('.product-info h4');
            const priceEl = card.querySelector('.product-price .current');
            const imgEl = card.querySelector('.product-image img');
            if (!nameEl) return;

            // Set initial state
            if (Wishlist.isInWishlist(nameEl.textContent.trim())) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = 'var(--color-accent)';
            }

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const product = {
                    name: nameEl.textContent.trim(),
                    price: parseFloat(priceEl ? priceEl.textContent.replace(/[^0-9.]/g, '') : '0'),
                    image: imgEl ? imgEl.src : 'images/product-tracksuit.png',
                    link: 'product.html'
                };
                const added = Wishlist.toggleItem(product);
                if (added) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    icon.style.color = 'var(--color-accent)';
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    icon.style.color = '';
                }
            });
        }
    });

    // Product detail page wishlist button
    const wishlistBtn = document.querySelector('.btn-wishlist-lg');
    if (wishlistBtn) {
        const icon = wishlistBtn.querySelector('i');
        const titleEl = document.querySelector('.product-detail-title');
        const priceEl = document.querySelector('.price-current');
        const imgEl = document.getElementById('mainImage');

        if (titleEl && icon) {
            // Set initial state
            if (Wishlist.isInWishlist(titleEl.textContent.trim())) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = 'var(--color-accent)';
            }

            wishlistBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const product = {
                    name: titleEl.textContent.trim(),
                    price: parseFloat(priceEl ? priceEl.textContent.replace(/[^0-9.]/g, '') : '0'),
                    image: imgEl ? imgEl.src : 'images/product-tracksuit.png',
                    link: 'product.html'
                };
                const added = Wishlist.toggleItem(product);
                if (added) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    icon.style.color = 'var(--color-accent)';
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    icon.style.color = '';
                }
            });
        }
    }
}

// ============================================
//  SIZE & COLOR SELECTORS
// ============================================
function initSizeButtons() {
    document.querySelectorAll('.size-buttons').forEach(group => {
        group.querySelectorAll('.size-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                group.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    });
}

function initColorSwatches() {
    document.querySelectorAll('.color-swatches').forEach(group => {
        group.querySelectorAll('.swatch').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                group.querySelectorAll('.swatch').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    });
}

// ============================================
//  NEWSLETTER FORMS
// ============================================
function initNewsletterForms() {
    // Main newsletter form
    document.querySelectorAll('.newsletter-form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input[type="email"]');
            if (input && input.value.trim()) {
                const btn = form.querySelector('button');
                const origText = btn.textContent;
                btn.textContent = '✓ Inscrit !';
                btn.style.background = '#27ae60';
                btn.style.borderColor = '#27ae60';
                input.value = '';
                setTimeout(() => {
                    btn.textContent = origText;
                    btn.style.background = '';
                    btn.style.borderColor = '';
                }, 3000);
            }
        });
    });

    // Footer newsletter
    document.querySelectorAll('.footer-newsletter').forEach(wrap => {
        const btn = wrap.querySelector('button');
        const input = wrap.querySelector('input');
        if (btn && input) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (input.value.trim()) {
                    const origText = btn.textContent;
                    btn.textContent = '✓ Inscrit !';
                    btn.style.background = '#27ae60';
                    btn.style.color = '#fff';
                    input.value = '';
                    setTimeout(() => {
                        btn.textContent = origText;
                        btn.style.background = '';
                        btn.style.color = '';
                    }, 3000);
                }
            });
        }
    });
}

// ============================================
//  BUY NOW BUTTON
// ============================================
function initBuyNowButton() {
    const buyNowBtn = document.querySelector('.buy-now-row .btn-accent');
    if (!buyNowBtn) return;

    buyNowBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const title = document.querySelector('.product-detail-title');
        const price = document.querySelector('.price-current');
        const sizeBtn = document.querySelector('.size-btn.active');
        const qtyInput = document.getElementById('qtyInput');
        const img = document.getElementById('mainImage');

        if (!title || !price) return;

        const product = {
            name: title.textContent.trim(),
            price: parseFloat(price.textContent.replace(/[^0-9.]/g, '')),
            size: sizeBtn ? sizeBtn.textContent.trim() : 'M',
            qty: qtyInput ? parseInt(qtyInput.value) : 1,
            image: img ? img.src : 'images/product-tracksuit.png'
        };

        // Add to cart and redirect to checkout
        Cart.addItem(product);
        setTimeout(() => {
            window.location.href = 'checkout.html';
        }, 300);
    });
}

// ============================================
//  INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    createSearchOverlay();
    initHeader();
    initMobileMenu();
    initSearchToggle();
    initReveal();
    initFilters();
    initProductPageCart();
    initAddToCartButtons();
    initWishlistButtons();
    initSizeButtons();
    initColorSwatches();
    initNewsletterForms();
    initBuyNowButton();
    Cart.updateBadge();
    Wishlist.updateBadge();
});
