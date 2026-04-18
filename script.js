// Presentation Controller
class Presentation {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 11;
        this.slides = document.querySelectorAll('.slide');
        this.progressFill = document.getElementById('progressFill');
        this.currentSlideEl = document.getElementById('currentSlide');
        this.totalSlidesEl = document.getElementById('totalSlides');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.slideDots = document.getElementById('slideDots');
        
        this.init();
    }
    
    init() {
        // Set total slides
        this.totalSlidesEl.textContent = this.totalSlides;
        
        // Create dots
        this.createDots();
        
        // Create particles for title slide
        this.createParticles();
        
        // Bind events
        this.bindEvents();
        
        // Update UI
        this.updateUI();
        
        // Initialize chat demo
        this.initChatDemo();
    }
    
    createDots() {
        for (let i = 1; i <= this.totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = `dot ${i === 1 ? 'active' : ''}`;
            dot.dataset.slide = i;
            dot.addEventListener('click', () => this.goToSlide(i));
            this.slideDots.appendChild(dot);
        }
    }
    
    createParticles() {
        const particlesContainer = document.getElementById('particles1');
        if (!particlesContainer) return;
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 15}s`;
            particle.style.animationDuration = `${15 + Math.random() * 10}s`;
            
            const colors = ['#B0F2AE', '#00825A', '#DFFF61', '#99D1FC'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            particlesContainer.appendChild(particle);
        }
    }
    
    bindEvents() {
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                this.nextSlide();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.prevSlide();
            }
        });
        
        // Click to advance (on slides)
        this.slides.forEach(slide => {
            slide.addEventListener('click', (e) => {
                // Don't advance if clicking on interactive elements
                if (e.target.closest('.nav-btn, .dot, button, a, input')) return;
                this.nextSlide();
            });
        });
        
        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
        
        this.handleSwipe = () => {
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        };
    }
    
    goToSlide(slideNum) {
        if (slideNum < 1 || slideNum > this.totalSlides) return;
        
        const currentSlideEl = document.querySelector('.slide.active');
        const nextSlideEl = document.querySelector(`[data-slide="${slideNum}"]`);
        
        if (currentSlideEl) {
            currentSlideEl.classList.remove('active');
            if (slideNum > this.currentSlide) {
                currentSlideEl.classList.add('prev');
            }
        }
        
        // Remove prev class from all slides
        this.slides.forEach(slide => {
            if (slide !== currentSlideEl) {
                slide.classList.remove('prev');
            }
        });
        
        if (nextSlideEl) {
            nextSlideEl.classList.add('active');
            nextSlideEl.classList.remove('prev');
        }
        
        this.currentSlide = slideNum;
        this.updateUI();
        
        // Trigger slide-specific animations
        this.triggerSlideAnimations(slideNum);
    }
    
    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            this.goToSlide(this.currentSlide + 1);
        }
    }
    
    prevSlide() {
        if (this.currentSlide > 1) {
            this.goToSlide(this.currentSlide - 1);
        }
    }
    
    updateUI() {
        // Update progress bar
        const progress = (this.currentSlide / this.totalSlides) * 100;
        this.progressFill.style.width = `${progress}%`;
        
        // Update counter
        this.currentSlideEl.textContent = this.currentSlide;
        
        // Update dots
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index + 1 === this.currentSlide);
        });
        
        // Update buttons
        this.prevBtn.disabled = this.currentSlide === 1;
        this.nextBtn.disabled = this.currentSlide === this.totalSlides;
    }
    
    triggerSlideAnimations(slideNum) {
        // Chat demo animation on slide 5
        if (slideNum === 5) {
            this.animateChatDemo();
        }
        
        // Confetti on last slide
        if (slideNum === 11) {
            this.createConfetti();
        }
    }
    
    initChatDemo() {
        this.chatMessages = [
            { type: 'bot', text: '¡Hola! Soy el agente de vinculación de Wompi. ¿Cómo puedo ayudarte hoy?' },
            { type: 'user', text: 'Quiero vincular mi negocio' },
            { type: 'bot', text: '¡Perfecto! Cuéntame, ¿qué tipo de negocio tienes y cuál es tu volumen mensual de ventas?' },
            { type: 'user', text: 'Tengo una tienda online, vendo aprox $50M al mes' },
            { type: 'bot', text: 'Basado en tu perfil, te recomiendo el modelo Agregador. Es ideal para tu volumen. ¿Tienes tu RUT a la mano?' }
        ];
    }
    
    animateChatDemo() {
        const chatContainer = document.getElementById('chatMessages');
        if (!chatContainer) return;
        
        chatContainer.innerHTML = '';
        
        this.chatMessages.forEach((msg, index) => {
            setTimeout(() => {
                const messageEl = document.createElement('div');
                messageEl.className = `chat-message ${msg.type}`;
                messageEl.textContent = msg.text;
                chatContainer.appendChild(messageEl);
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }, index * 1200);
        });
    }
    
    createConfetti() {
        const confettiContainer = document.getElementById('confetti');
        if (!confettiContainer) return;
        
        confettiContainer.innerHTML = '';
        
        const colors = ['#6366f1', '#ec4899', '#06b6d4', '#10b981', '#f59e0b'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = `${Math.random() * 3}s`;
            confetti.style.animationDuration = `${3 + Math.random() * 2}s`;
            
            // Random shapes
            const shapes = ['50%', '0%', '30%'];
            confetti.style.borderRadius = shapes[Math.floor(Math.random() * shapes.length)];
            
            confettiContainer.appendChild(confetti);
        }
    }
}

// Initialize presentation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new Presentation();
    initImageModal();
});

// Image Modal functionality
function initImageModal() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = modal.querySelector('.modal-overlay');
    
    // Get all clickable images
    const images = document.querySelectorAll('.demo-screenshot-compare, .demo-screenshot-full');
    
    images.forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            modalImage.src = img.src;
            modalCaption.textContent = img.alt;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Prevent context menu on right-click (optional, for presentation mode)
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});
