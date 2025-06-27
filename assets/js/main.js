// Animations et interactions générales
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initialisation des animations...');

    // Animation du menu mobile
    const menuToggle = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav-menu');
    const barre1 = document.querySelector('.bar:first-child');
    const barre2 = document.querySelector('.bar:nth-child(2)');
    const barre3 = document.querySelector('.bar:last-child');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
            if (nav.classList.contains('active')) {
                barre2.style.display = 'none';
                barre1.style.transform = 'rotate(45deg) translate(7px, 6px)';
                barre3.style.transform = 'rotate(-45deg) translate(0, 0)';
            } else {
                barre2.style.display = 'block';
                barre1.style.transform = 'rotate(0deg)';
                barre3.style.transform = 'rotate(0deg)';
            }
        });
    }

    // Fermer le menu en cliquant sur un lien
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav && menuToggle) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                barre2.style.display = 'block';
                barre1.style.transform = 'rotate(0deg)';
                barre3.style.transform = 'rotate(0deg)';
            }
        });
    });

    // Animation du header au scroll
    const header = document.querySelector('.navbar');
    let lastScroll = 0;
    
    if (header) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > lastScroll && currentScroll > 100) {
                header.classList.add('header-hidden');
            } else {
                header.classList.remove('header-hidden');
            }
            
            if (currentScroll > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }

    // Animation des éléments au scroll avec Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                console.log('Élément animé:', entry.target);
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    const animateElements = document.querySelectorAll('.service-card, .project-card, .education-card, .skill-category, .timeline-item, .stat, .contact-item, .faq-item, .testimonial-card');
    animateElements.forEach(el => {
        observer.observe(el);
        console.log('Élément observé:', el);
    });

    // Animation du compteur de statistiques
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('.stat-number');
                    counters.forEach(counter => {
                        const target = parseInt(counter.getAttribute('data-target'));
                        if (!isNaN(target)) {
                            const duration = 2000;
                            const increment = target / (duration / 16);
                            let current = 0;
                            
                            const updateCounter = () => {
                                current += increment;
                                if (current < target) {
                                    counter.textContent = Math.floor(current);
                                    requestAnimationFrame(updateCounter);
                                } else {
                                    counter.textContent = target;
                                }
                            };
                            
                            updateCounter();
                        }
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }

    // Animation du formulaire de contact
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                if (this.parentElement) {
                    this.parentElement.classList.add('focused');
                }
            });
            
            input.addEventListener('blur', function() {
                if (!this.value && this.parentElement) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
    }

    // Animation des cartes de compétences
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Animation des témoignages
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        });
    });

    // Smooth scroll pour les ancres
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animation du bouton CTA
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }

    // Animation du code dans la section hero
    const codeLines = document.querySelectorAll('.code-line');
    codeLines.forEach((line, index) => {
        if (line) {
            setTimeout(() => {
                line.classList.add('animate-in');
            }, index * 200);
        }
    });

    // Animation des icônes de technologie
    const techIcons = document.querySelectorAll('.tech-icon');
    techIcons.forEach((icon, index) => {
        if (icon) {
            setTimeout(() => {
                icon.classList.add('animate-in');
            }, 1000 + (index * 100));
        }
    });

    // Animation des cartes de services
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        if (card) {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        }
    });

    // Animation des cartes de projets
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        if (card) {    
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        }
    });
}); 