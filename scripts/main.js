// Main JavaScript for Agro Pet Inácio website

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all functionality
    initSmoothScrolling();
    initProductCards();
    initNewsCards();
    initImageLazyLoading();
    initAnimations();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    navbarToggler.click();
                }
            }
        });
    });
}

// Product cards interaction
// function initProductCards() {
//     const productCards = document.querySelectorAll('.product-card');

//     productCards.forEach(card => {
//         card.addEventListener('click', function () {
//             const category = this.dataset.category;
//             handleProductClick(category);
//         });

//         // Add keyboard support
//         card.setAttribute('tabindex', '0');
//         card.addEventListener('keypress', function (e) {
//             if (e.key === 'Enter' || e.key === ' ') {
//                 e.preventDefault();
//                 this.click();
//             }
//         });
//     });
// }

// // Handle product category click
// function handleProductClick(category) {
//     // In a real application, this would navigate to a products page
//     // For now, we'll show an alert with category info
//     const categoryNames = {
//         'acessorios': 'Acessórios',
//         'cachorro': 'Produtos para Cachorro',
//         'gato': 'Produtos para Gato',
//         'aves': 'Produtos para Aves'
//     };

//     const categoryName = categoryNames[category] || 'Produtos';

//     // Create and show a simple modal-like alert
//     showCustomAlert(`Explore nossos ${categoryName}!`,
//         `Entre em contato para ver nossa seleção completa de ${categoryName.toLowerCase()}.`);
// }

// News cards interaction
function initNewsCards() {
    const newsCards = document.querySelectorAll('.news-card');

    newsCards.forEach(card => {
        card.addEventListener('click', function () {
            const title = this.querySelector('h5').textContent;
            handleNewsClick(title);
        });

        // Add keyboard support
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Handle news item click
function handleNewsClick(title) {
    showCustomAlert(`${title}`,
        'Esta novidade estará disponível em breve! Entre em contato para mais informações.');
}

// WhatsApp integration
function openWhatsApp() {
    const phoneNumber = '5517991735442'; // Phone number without + and with country code
    const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os produtos da Agro Pet Inácio.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    window.open(whatsappUrl, '_blank');
}

// Custom alert function
function showCustomAlert(title, message) {
    // Create modal HTML
    const modalHTML = `
        <div class="modal fade" id="customAlert" tabindex="-1" aria-labelledby="customAlertLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header bg-warning text-white">
                        <h5 class="modal-title" id="customAlertLabel">
                            <i class="fas fa-paw me-2"></i>${title}
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p class="mb-3">${message}</p>
                        <div class="text-center">
                            <button type="button" class="btn btn-success me-2" onclick="openWhatsApp()">
                                <i class="fab fa-whatsapp me-2"></i>Falar no WhatsApp
                            </button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Remove existing modal if present
    const existingModal = document.getElementById('customAlert');
    if (existingModal) {
        existingModal.remove();
    }

    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('customAlert'));
    modal.show();

    // Clean up after modal is hidden
    document.getElementById('customAlert').addEventListener('hidden.bs.modal', function () {
        this.remove();
    });
}

// Lazy loading for images
function initImageLazyLoading() {
    const images = document.querySelectorAll('img[src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '1';
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            img.style.opacity = '0';
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.style.opacity = '1';
        });
    }
}

// Initialize animations and scroll effects
function initAnimations() {
    // Add scroll-triggered animations
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        // Observe elements for animation
        const elementsToAnimate = document.querySelectorAll('.product-card, .news-card, .service-card');
        elementsToAnimate.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            animationObserver.observe(el);
        });
    }
}

// Add CSS for animations
const animationCSS = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;

// Insert animation CSS
const style = document.createElement('style');
style.textContent = animationCSS;
document.head.appendChild(style);

// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('shadow-lg');
        navbar.style.transition = 'box-shadow 0.3s ease';
    } else {
        navbar.classList.remove('shadow-lg');
    }
});

// Form validation and contact functionality
function initContactForm() {
    const contactForms = document.querySelectorAll('form[data-contact]');

    contactForms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Basic form validation
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                }
            });

            if (isValid) {
                // In a real application, you would send the data to a server
                showCustomAlert('Mensagem Enviada!',
                    'Obrigado pelo contato! Entraremos em contato em breve.');
                form.reset();
            } else {
                showCustomAlert('Erro no Formulário',
                    'Por favor, preencha todos os campos obrigatórios.');
            }
        });
    });
}

// Call contact form initialization
initContactForm();

// Error handling for images
document.addEventListener('error', function (e) {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbSBOw6NvIEVuY29udHJhZGE8L3RleHQ+PC9zdmc+';
        e.target.alt = 'Imagem não encontrada';
    }
}, true);

// Make functions globally available
window.openWhatsApp = openWhatsApp;
window.showCustomAlert = showCustomAlert;

// const data = [
//     {
//         "name": "Acessórios",
//         "total": 95,
//         "image": "./assets/acessorios.jpg",
//         "products": [
//             {
//                 "name": "Acessórios",
//                 "description": "Acessórios.",
//                 "price": 29.99,
//                 "image": "./assets/coleira-cachorro.jpg"
//             }
//         ]
//     },
//     {
//         "name": "Cachorros",
//         "total": 22,
//         "image": "./assets/cachorro.jpg",
//         "products": [
//             {
//                 "name": "Coleira para Cachorro",
//                 "description": "Coleira ajustável para cães de todos os tamanhos.",
//                 "price": 29.99,
//                 "image": "./assets/coleira-cachorro.jpg"
//             }
//         ]
//     },
//     {
//         "name": "Gatos",
//         "total": 22,
//         "image": "./assets/gato.jpg",
//         "products": [
//             {
//                 "name": "Coleira para Gato",
//                 "description": "Coleira ajustável para gatos de todos os tamanhos.",
//                 "price": 29.99,
//                 "image": "./assets/coleira-gato.jpg"
//             }
//         ]
//     },
//     {
//         "name": "Aves",
//         "total": 12,
//         "image": "./assets/ave.jpg",
//         "products": [
//             {
//                 "name": "Coleira para Aves",
//                 "description": "Coleira ajustável para aves de todos os tamanhos.",
//                 "price": 29.99,
//                 "image": "./assets/coleira-aves.jpg"
//             }
//         ]
//     }
// ]
async function loadCategories() {
    const categoriesContainer = document.getElementById("categories");
    const productsContainer = document.getElementById("products");

    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbz8uLv4rfClHA-yZ2jjt99_11nj6c9KvpwOL3AInpKseMUmwssCVoZdTu2qnz-HYQ/exec");
        if (!response.ok) throw new Error("Erro na resposta da API");
        const data = await response.json();

        categoriesContainer.innerHTML = "";
        data.forEach((cat, index) => {
            const col = document.createElement("div");
            col.className = "col-6 col-md-4 col-lg-3";

            col.innerHTML = `
                <div class="product-card position-relative overflow-hidden rounded shadow-sm category-card" data-index="${index}">
                    <div class="product-image position-relative">
                        <img src="${cat.image || './assets/logo.png'}" alt="${cat.name}" class="w-100 h-100 object-fit-cover">
                        <div class="gradient-overlay gradient-dark"></div>
                        <div class="product-content position-absolute bottom-0 start-0 end-0 p-3 text-white">
                            <h5 class="fw-semibold mb-1">${cat.name}</h5>
                            <p class="small mb-0 opacity-75">${cat.total} produtos</p>
                        </div>
                    </div>
                </div>
            `;
            categoriesContainer.appendChild(col);
        });

        document.querySelectorAll(".category-card").forEach(card => {
            card.addEventListener("click", () => {
                const idx = card.getAttribute("data-index");
                const category = data[idx];

                productsContainer.innerHTML = "";
                category.products.forEach(prod => {
                    const col = document.createElement("div");
                    col.className = "col-12 col-md-6 col-lg-4";
                    col.innerHTML = `
                        <div class="card h-100 shadow-sm">
                            ${prod.image ? `<img src="${prod.image}" class="card-img-top" alt="${prod.name}">` : ""}
                            <div class="card-body">
                                <h5 class="card-title">${prod.name}</h5>
                                ${prod.description ? `<p class="card-text">${prod.description}</p>` : ""}
                                ${prod.price ? `<p class="fw-bold text-success">R$ ${prod.price.toFixed(2)}</p>` : ""}
                                <a href="https://api.whatsapp.com/send/?phone=5517991735442&text=Olá! Gostaria de saber mais sobre o produto: ${encodeURIComponent(prod.name)}&type=phone_number&app_absent=0" 
                                   target="_blank" class="btn btn-success">
                                   Chamar no WhatsApp
                                </a>
                            </div>
                        </div>
                    `;
                    productsContainer.appendChild(col);
                });

                productsContainer.style.display = "flex";
            });
        });

    } catch (error) {
        console.error("Erro ao carregar categorias:", error);
        productsContainer.style.display = "none";
    }
}

loadCategories();