// ========================================
// TYPING EFFECT
// ========================================
const typedTextElement = document.getElementById('typedText');
const textArray = [
    'Full-Stack Developer',
    'UI/UX Designer',
    'Software Engineer',
    'Problem Solver',
    'Digital Craftsman'
];
let textArrayIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function typeText() {
    const currentText = textArray[textArrayIndex];
    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50;
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingDelay = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textArrayIndex = (textArrayIndex + 1) % textArray.length;
        typingDelay = 500;
    }

    setTimeout(typeText, typingDelay);
}

if (typedTextElement) {
    setTimeout(typeText, 1000);
}

// ========================================
// LOADING ANIMATION
// ========================================
window.addEventListener('load', () => {
    const loaderWrapper = document.getElementById('loaderWrapper');
    const loaderProgress = document.getElementById('loaderProgress');
    const body = document.body;
    
    // Add loading class to body
    body.classList.add('loading');
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += 2;
        loaderProgress.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
        }
    }, 100); // 100ms * 50 steps = 5 seconds
    
    // Hide loader after 5 seconds
    setTimeout(() => {
        loaderWrapper.classList.add('fade-out');
        body.classList.remove('loading');
        
        // Remove loader from DOM after animation
        setTimeout(() => {
            loaderWrapper.style.display = 'none';
        }, 500);
    }, 5000); // 5 seconds
});

// Rest of your existing JavaScript code follows...

// ========================================
// SCROLL REVEAL ANIMATION
// ========================================
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 80) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ========================================
// SKILL BARS ANIMATION
// ========================================
const skillBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

const animateSkills = () => {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const skillsSectionTop = skillsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (skillsSectionTop < windowHeight - 80 && !skillsAnimated) {
        skillBars.forEach(bar => {
            const percent = bar.getAttribute('data-percent');
            bar.style.width = percent + '%';
        });
        skillsAnimated = true;
    }
};

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

// ========================================
// COUNTER ANIMATION
// ========================================
const counters = document.querySelectorAll('.counter');
let countersAnimated = false;

const animateCounters = () => {
    const statsSection = document.querySelector('.statistics');
    if (!statsSection) return;

    const statsSectionTop = statsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (statsSectionTop < windowHeight - 80 && !countersAnimated) {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
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
        });
        countersAnimated = true;
    }
};

window.addEventListener('scroll', animateCounters);
window.addEventListener('load', animateCounters);

// ========================================
// CONTACT FORM
// ========================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span>';
        formMessage.style.display = 'none';

        const formData = new FormData(contactForm);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                formMessage.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
                formMessage.className = 'form-message success';
                contactForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            formMessage.textContent = '✗ Something went wrong. Please try again or email me directly.';
            formMessage.className = 'form-message error';
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Send Message</span><i class="bx bx-send"></i>';
            formMessage.style.display = 'block';

            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    });
}

// ========================================
// SCROLL TO TOP BUTTON
// ========================================
const createScrollToTop = () => {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="bx bx-up-arrow-alt"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollBtn.classList.add('active');
        } else {
            scrollBtn.classList.remove('active');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

createScrollToTop();

// ========================================
// SMOOTH SCROLL
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// ========================================
// DEBOUNCE OPTIMIZATION
// ========================================
const debounce = (func, wait = 10) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

window.addEventListener('scroll', debounce(() => {
    revealOnScroll();
    animateSkills();
    animateCounters();
}, 10));

console.log('%c🚀 Portfolio by Zeraphyx', 'color: #0969da; font-size: 18px; font-weight: bold;');
console.log('%cInterested in collaboration? Let\'s connect!', 'color: #6e7681; font-size: 13px;');
