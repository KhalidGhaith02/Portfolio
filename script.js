// المتغيرات الأساسية
let currentLanguage = 'en';
let isLoading = true;

// تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// تهيئة الموقع
function initializePortfolio() {
    // إظهار شاشة التحميل
    showLoadingScreen();
    
    // تحميل المحتوى
    setTimeout(() => {
        hideLoadingScreen();
        showSection('home');
        initializeAnimations();
        initializeScrollEffects();
        createParticles();
        initializeBackToTop();
    }, 1500);
}

// شاشة التحميل
function showLoadingScreen() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loader"></div>
    `;
    document.body.appendChild(loadingOverlay);
}

function hideLoadingScreen() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.classList.add('fade-out');
        setTimeout(() => {
            loadingOverlay.remove();
            isLoading = false;
        }, 500);
    }
}

// شريط التقدم في التمرير
function initializeScrollEffects() {
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });
}

// تهيئة الرسوم المتحركة
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // مراقبة العناصر للرسوم المتحركة
    document.querySelectorAll('.service-card, .skill-card, .cert-item, .contact-item').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// إنشاء الجسيمات المتحركة
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// زر العودة للأعلى
function initializeBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// عرض القسم المطلوب
function showSection(sectionId) {
    // إخفاء جميع الأقسام
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // إظهار القسم المطلوب
    document.getElementById(sectionId).classList.add('active');
}

// تبديل اللغة
function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
    
    // تحديث اتجاه الصفحة
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    
    // تحديث النصوص
    document.querySelectorAll('[data-en][data-ar]').forEach(element => {
        element.textContent = element.getAttribute(`data-${currentLanguage}`);
    });
    
    // تحديث زر اللغة
    document.querySelector('.lang-switch').textContent = 
        currentLanguage === 'en' ? 'العربية' : 'English';
}

// التحقق من صحة الاسم (حروف فقط)
function validateName(name) {
    // التحقق من أن الاسم يحتوي على حروف فقط (عربية وإنجليزية ومسافات)
    const nameRegex = /^[a-zA-Zأ-ي\s]+$/;
    return nameRegex.test(name.trim());
}

// معالجة النموذج
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
  // التحقق من تعبئة الحقول
if (!name || !email || !message) {
    alert(currentLanguage === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill out all fields');
    return;
}

// التحقق من الاسم
if (!validateName(name)) {
    alert(currentLanguage === 'ar' ? 'يرجى إدخال اسم صحيح (حروف فقط)' : 'Please enter a valid name (letters only)');
    return;
}

// التحقق من البريد الإلكتروني
if (!validateEmail(email)) {
    alert(currentLanguage === 'ar' ? 'يرجى إدخال بريد إلكتروني صالح' : 'Please enter a valid email address');
    return;
}

// التحقق من طول الرسالة
if (message.length < 10) {
    alert(currentLanguage === 'ar' ? 'يرجى كتابة رسالة أطول (10 أحرف على الأقل)' : 'Please write a longer message (at least 10 characters)');
    return;
}


    // محاكاة الإرسال
    showSuccessMessage();
    e.target.reset();
});

// التحقق من صحة البريد الإلكتروني
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// إظهار رسالة النجاح
function showSuccessMessage() {
    const form = document.getElementById('contactForm');
    let successMessage = document.querySelector('.success-message');
    
    if (!successMessage) {
        successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        form.appendChild(successMessage);
    }
    
    successMessage.textContent = currentLanguage === 'ar' ? 
        'تم إرسال الرسالة بنجاح! سأتواصل معك قريباً.' : 
        'Message sent successfully! I will get back to you soon.';
    
    successMessage.classList.add('show');
    
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 5000);
}

// تحسين تجربة المستخدم للنماذج
function enhanceFormExperience() {
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    inputs.forEach(input => {
        // إضافة placeholder متحرك
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // التحقق من الصحة أثناء الكتابة
        input.addEventListener('input', function() {
            validateInputRealTime(this);
        });
    });
}

// التحقق الفوري من صحة الإدخال
function validateInputRealTime(input) {
    const value = input.value.trim();
    const inputType = input.type || input.tagName.toLowerCase();
    
    // إزالة الرسائل السابقة
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    let isValid = true;
    let errorMessage = '';
    
    switch (input.name) {
        case 'name':
            if (!validateName(value)) {
                isValid = false;
                errorMessage = currentLanguage === 'ar' ? 
                    'الاسم يجب أن يحتوي على حروف فقط' : 
                    'Name should contain letters only';
            }
            break;
        case 'email':
            if (value && !validateEmail(value)) {
                isValid = false;
                errorMessage = currentLanguage === 'ar' ? 
                    'البريد الإلكتروني غير صحيح' : 
                    'Invalid email format';
            }
            break;
        case 'message':
            if (value && value.length < 10) {
                isValid = false;
                errorMessage = currentLanguage === 'ar' ? 
                    'الرسالة قصيرة جداً' : 
                    'Message too short';
            }
            break;
    }
    
    // إظهار رسالة الخطأ
    if (!isValid && value) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        errorDiv.style.color = 'var(--error-color)';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        input.parentElement.appendChild(errorDiv);
        input.style.borderColor = 'var(--error-color)';
    } else {
        input.style.borderColor = 'var(--border-color)';
    }
}

// تحسين الأداء مع Debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// تحسين أداء التمرير
const optimizedScrollHandler = debounce(() => {
    // معالجة أحداث التمرير المحسنة
    const scrollTop = window.pageYOffset;
    const header = document.querySelector('header');
    
    if (scrollTop > 100) {
        header.style.background = 'var(--bg-glass)';
        header.style.backdropFilter = 'blur(20px)';
    } else {
        header.style.background = 'var(--bg-glass)';
        header.style.backdropFilter = 'blur(10px)';
    }
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// تحسين الأداء للأجهزة المحمولة
function optimizeForMobile() {
    if (window.innerWidth <= 768) {
        // تقليل عدد الجسيمات للأجهزة المحمولة
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            if (index > 20) {
                particle.remove();
            }
        });
        
        // تحسين الرسوم المتحركة
        document.body.classList.add('mobile-optimized');
    }
}

// استدعاء التحسينات
document.addEventListener('DOMContentLoaded', () => {
    enhanceFormExperience();
    optimizeForMobile();
});

// معالجة تغيير حجم النافذة
window.addEventListener('resize', debounce(() => {
    optimizeForMobile();
}, 250));

// تحسين إمكانية الوصول
function enhanceAccessibility() {
    // إضافة دعم لوحة المفاتيح
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeMenu = document.querySelector('.nav-links.active');
            if (activeMenu) {
                toggleMobileMenu();
            }
        }
    });
    
    // تحسين التنقل بالتاب
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid var(--highlight-color)';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = 'none';
        });
    });
}

// استدعاء تحسينات إمكانية الوصول
enhanceAccessibility();

// حفظ تفضيلات المستخدم
function saveUserPreferences() {
    localStorage.setItem('portfolioLanguage', currentLanguage);
}

// تحميل تفضيلات المستخدم
function loadUserPreferences() {
    const savedLanguage = localStorage.getItem('portfolioLanguage');
    if (savedLanguage && savedLanguage !== currentLanguage) {
        toggleLanguage();
    }
}

// استدعاء تحميل التفضيلات
document.addEventListener('DOMContentLoaded', () => {
    loadUserPreferences();
});

// حفظ التفضيلات عند تغيير اللغة
const originalToggleLanguage = toggleLanguage;
toggleLanguage = function() {
    originalToggleLanguage();
    saveUserPreferences();
};

// إضافة التحقق المباشر أثناء الكتابة في حقل الاسم
document.getElementById('contactForm')?.addEventListener('input', function(e) {
    if (e.target.name === 'name') {
        const nameInput = e.target;
        const nameValue = nameInput.value;
        
        // إزالة الأحرف غير المسموحة
        const cleanedName = nameValue.replace(/[^a-zA-Zأ-ي\s]/g, '');
        
        // تحديث القيمة إذا كانت مختلفة
        if (cleanedName !== nameValue) {
            nameInput.value = cleanedName;
        }
    }
});

// إغلاق القائمة عند النقر خارجها
document.addEventListener('click', function(e) {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !mobileMenu.contains(e.target)) {
        toggleMobileMenu();
    }
});