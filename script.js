// اللغة الحالية
let currentLanguage = 'en';

/// عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    const savedSection = localStorage.getItem('currentSection');
    if (savedSection) {
        showSection(savedSection);
    } else {
        showSection('home');
        localStorage.setItem('currentSection', 'home');
    }
});

// استرجاع اللغة
if (localStorage.getItem('lang')) {
    currentLanguage = localStorage.getItem('lang');
    applyLanguage();
};

// عرض القسم المطلوب وتخزينه
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.add('active');
        localStorage.setItem('currentSection', sectionId); // حفظ القسم
    }
}

// قائمة الجوال
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-overlay');

    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    
    // Toggle mobile menu icon
    mobileMenu.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    
    // Toggle overlay
    if (overlay) {
        overlay.classList.toggle('active');
    }
}

// تبديل اللغة
function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'ar' : 'en';
    localStorage.setItem('lang', currentLanguage);
    applyLanguage();
}

// تطبيق اللغة
function applyLanguage() {
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-en][data-ar]').forEach(element => {
        element.textContent = element.getAttribute(`data-${currentLanguage}`);
    });

    document.querySelector('.lang-switch').textContent =
        currentLanguage === 'en' ? 'العربية' : 'English';
}

// التحقق من صحة الاسم
function validateName(name) {
    const nameRegex = /^[a-zA-Zأ-ي\s]+$/;
    return nameRegex.test(name.trim());
}

// التحقق من صحة الإيميل
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}

// عند إرسال النموذج
document.getElementById('contactForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    if (!name || !email || !message) {
        alert('يرجى ملء جميع الحقول');
        return;
    }

    if (!validateName(name)) {
        alert('يرجى إدخال اسم صحيح (حروف فقط)');
        return;
    }

    if (!validateEmail(email)) {
        alert('يرجى إدخال بريد إلكتروني صحيح');
        return;
    }

    alert('تم إرسال الرسالة بنجاح!');
    e.target.reset();
});

// تنظيف حقل الاسم أثناء الكتابة
document.getElementById('contactForm')?.addEventListener('input', function (e) {
    if (e.target.name === 'name') {
        const cleaned = e.target.value.replace(/[^a-zA-Zأ-ي\s]/g, '');
        if (cleaned !== e.target.value) {
            e.target.value = cleaned;
        }
    }
});

// إغلاق قائمة الجوال عند النقر بالخارج
document.addEventListener('click', function (e) {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-overlay');

    if (navLinks?.classList.contains('active') &&
        !navLinks.contains(e.target) &&
        !mobileMenu.contains(e.target)) {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenu.textContent = '☰';
        if (overlay) {
            overlay.classList.remove('active');
        }
    }
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const overlay = document.querySelector('.mobile-overlay');
    
    // Close mobile menu when clicking on any nav link
    navItems.forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
                mobileMenu.textContent = '☰';
                if (overlay) {
                    overlay.classList.remove('active');
                }
            }
        });
    });
    
    // Close mobile menu when clicking on overlay
    if (overlay) {
        overlay.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileMenu.textContent = '☰';
            overlay.classList.remove('active');
        });
    }
    
    // Close mobile menu when clicking outside navigation area
    document.addEventListener('click', function(event) {
        const nav = document.querySelector('nav');
        const isClickInsideNav = nav.contains(event.target);
        
        if (!isClickInsideNav && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileMenu.textContent = '☰';
            if (overlay) {
                overlay.classList.remove('active');
            }
        }
    });
});
