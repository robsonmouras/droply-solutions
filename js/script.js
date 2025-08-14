// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuIcon = mobileMenuBtn.querySelector('i');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        
        // Toggle icon
        if (mobileMenu.classList.contains('hidden')) {
            mobileMenuIcon.className = 'ri-menu-line text-2xl';
        } else {
            mobileMenuIcon.className = 'ri-close-line text-2xl';
        }
    });

    // Close mobile menu when clicking on links
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            mobileMenuIcon.className = 'ri-menu-line text-2xl';
        });
    });

    // Smooth Scroll for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header Background on Scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('bg-white/95', 'shadow-sm');
            header.classList.remove('bg-white/95');
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });

    // Active Navigation Link
    const sections = document.querySelectorAll('section[id]');
    const navigationLinks = document.querySelectorAll('nav a[href^="#"]');

    function updateActiveLink() {
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navigationLinks.forEach(link => {
                    link.classList.remove('text-primary', 'font-semibold');
                    link.classList.add('text-gray-700');
                    
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.remove('text-gray-700');
                        link.classList.add('text-primary', 'font-semibold');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    // Form Validation and Submission
    const contactForm = document.getElementById('contact-form');
    const formInputs = contactForm.querySelectorAll('input, textarea');

    // Add input validation styles
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('border-red-500')) {
                validateInput(this);
            }
        });
    });

    function validateInput(input) {
        const value = input.value.trim();
        const isRequired = input.hasAttribute('required');
        const isEmail = input.type === 'email';

        // Remove previous validation classes
        input.classList.remove('border-red-500', 'border-green-500');
        
        // Remove previous error message
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (isRequired && !value) {
            isValid = false;
            errorMessage = 'Este campo é obrigatório';
        }
        // Email validation
        else if (isEmail && value && !isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Por favor, insira um email válido';
        }

        // Apply validation styles
        if (!isValid) {
            input.classList.add('border-red-500');
            
            // Add error message
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message text-red-500 text-sm mt-1';
            errorDiv.textContent = errorMessage;
            input.parentNode.appendChild(errorDiv);
        } else if (value) {
            input.classList.add('border-green-500');
        }

        return isValid;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let isFormValid = true;
        const formData = new FormData();

        // Validate all inputs
        formInputs.forEach(input => {
            if (!validateInput(input)) {
                isFormValid = false;
            } else {
                formData.append(input.name, input.value);
            }
        });

        if (isFormValid) {
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Show success message
                showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                
                // Reset form
                contactForm.reset();
                formInputs.forEach(input => {
                    input.classList.remove('border-green-500', 'border-red-500');
                });

                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        } else {
            showNotification('Por favor, corrija os erros no formulário.', 'error');
        }
    });

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        const notification = document.createElement('div');
        notification.className = `notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform translate-x-full transition-transform duration-300 ${
            type === 'success' ? 'bg-green-500 text-white' : 
            type === 'error' ? 'bg-red-500 text-white' : 
            'bg-blue-500 text-white'
        }`;
        
        notification.innerHTML = `
            <div class="flex items-center justify-between">
                <span>${message}</span>
                <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                    <i class="ri-close-line"></i>
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);

        // Auto hide after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }

    // Intersection Observer for Scroll Animations
    const scrollAnimationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Don't unobserve to allow re-animation if needed
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all elements with scroll-animate class
    const scrollAnimateElements = document.querySelectorAll('.scroll-animate');
    scrollAnimateElements.forEach(element => {
        scrollAnimationObserver.observe(element);
    });

    // Intersection Observer for Animations (legacy support)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for legacy animation
    const animateElements = document.querySelectorAll('.card-hover:not(.scroll-animate), .gradient-bg:not(.scroll-animate)');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Hero Section CTA Buttons
    const ctaButtons = document.querySelectorAll('.gradient-bg, button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple CSS
    const rippleCSS = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        button {
            position: relative;
            overflow: hidden;
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = rippleCSS;
    document.head.appendChild(style);

    // Statistics Counter Animation
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '') + 
                                    (element.textContent.includes('%') ? '%' : '');
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + (element.textContent.includes('+') ? '+' : '') + 
                                    (element.textContent.includes('%') ? '%' : '');
            }
        }
        
        updateCounter();
    }

    // Observe statistics section
    const statsSection = document.querySelector('#sobre');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.gradient-bg .text-4xl');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    const number = parseInt(text.replace(/\D/g, ''));
                    if (number && !stat.classList.contains('animated')) {
                        stat.classList.add('animated');
                        animateCounter(stat, number);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Scroll to top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="ri-arrow-up-line"></i>';
    scrollToTopBtn.className = 'fixed bottom-6 right-6 w-12 h-12 gradient-bg text-white rounded-full shadow-lg opacity-0 transition-opacity duration-300 hover:opacity-90 z-40';
    scrollToTopBtn.style.transform = 'translateY(100px)';
    document.body.appendChild(scrollToTopBtn);

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.transform = 'translateY(0)';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.transform = 'translateY(100px)';
        }
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                img.style.transition = 'opacity 0.3s ease';
                
                img.onload = () => {
                    img.style.opacity = '1';
                };
                
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    console.log('🚀 Droply Landing Page carregada com sucesso!');
});

  document.getElementById("year").textContent = new Date().getFullYear();

      const openBtn = document.getElementById("openMenu");
      const mobileMenu = document.getElementById("mobileMenu");
      openBtn?.addEventListener("click", () =>
        mobileMenu.classList.toggle("hidden")
      );

      // Reveal on scroll
      const revealOpts = { threshold: 0.12 };
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed", "animate-fadeUp");
            io.unobserve(entry.target);
          }
        });
      }, revealOpts);
      document.querySelectorAll(".will-reveal").forEach((el) => io.observe(el));

      // Lista com os nomes dos meses
      const meses = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ];

      // Pega o mês atual (0-11)
      const data = new Date();
      const mes = meses[data.getMonth()];

      // Insere no span
      document.getElementById("mesAtual").textContent = mes;

      const telefoneInput = document.getElementById("telefone");

      telefoneInput.addEventListener("input", function (e) {
        let valor = e.target.value.replace(/\D/g, ""); // Remove tudo que não é número

        if (valor.length > 11) valor = valor.slice(0, 11); // Limita a 11 dígitos

        if (valor.length > 10) {
          // Formato celular: (99) 99999-9999
          valor = valor.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
        } else if (valor.length > 6) {
          // Formato fixo: (99) 9999-9999
          valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
        } else if (valor.length > 2) {
          // Apenas DDD e parte do número
          valor = valor.replace(/^(\d{2})(\d{0,5})$/, "($1) $2");
        } else {
          valor = valor.replace(/^(\d*)$/, "($1");
        }

        e.target.value = valor;
      });