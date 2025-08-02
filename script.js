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

    navLinks.classList.toggle('active');
    mobileMenu.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
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

    if (navLinks?.classList.contains('active') &&
        !navLinks.contains(e.target) &&
        !mobileMenu.contains(e.target)) {
        toggleMobileMenu();
    }
});
// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    
    // Toggle mobile menu
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    navItems.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks.contains(event.target) || mobileMenu.contains(event.target);
        
        if (!isClickInsideNav && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
});
