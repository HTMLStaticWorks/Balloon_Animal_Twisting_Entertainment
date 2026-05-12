document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const drawerThemeToggle = document.getElementById('drawer-theme-toggle');
    const htmlElement = document.documentElement;
    const currentTheme = localStorage.getItem('twistcraft-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    const setTheme = (theme) => {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('twistcraft-theme', theme);
        updateThemeIcons(theme);
    };

    const updateThemeIcons = (theme) => {
        const iconClass = theme === 'dark' ? 'ph-sun' : 'ph-moon';
        [themeToggle, drawerThemeToggle].forEach(btn => {
            if (btn) {
                const icon = btn.querySelector('i');
                if (icon) icon.className = iconClass;
            }
        });
    };

    setTheme(currentTheme);

    [themeToggle, drawerThemeToggle].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                const newTheme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
                setTheme(newTheme);
            });
        }
    });

    // RTL Toggle
    const rtlToggle = document.getElementById('rtl-toggle');
    const drawerRtlToggle = document.getElementById('drawer-rtl-toggle');

    const setRTL = (isRTL) => {
        htmlElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
        localStorage.setItem('twistcraft-rtl', isRTL);
    };

    const currentRTL = localStorage.getItem('twistcraft-rtl') === 'true';
    setRTL(currentRTL);

    [rtlToggle, drawerRtlToggle].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                const isRTL = htmlElement.getAttribute('dir') === 'rtl';
                setRTL(!isRTL);
            });
        }
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Drawer
    const hamburger = document.getElementById('hamburger');
    const drawer = document.getElementById('drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');
    const drawerClose = document.getElementById('drawer-close');

    const toggleDrawer = (isOpen) => {
        drawer.classList.toggle('active', isOpen);
        drawerOverlay.classList.toggle('active', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    if (hamburger) hamburger.addEventListener('click', () => toggleDrawer(true));
    if (drawerClose) drawerClose.addEventListener('click', () => toggleDrawer(false));
    if (drawerOverlay) drawerOverlay.addEventListener('click', () => toggleDrawer(false));

    // Active Link Detection
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link, .drawer-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
        }
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section > *, .card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // Workshop Countdown
    const countdownEl = document.getElementById('countdown');
    if (countdownEl) {
        const NEXT_WORKSHOP_DATE = new Date("2025-08-15T10:00:00").getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = NEXT_WORKSHOP_DATE - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minsEl = document.getElementById('mins');
            const secsEl = document.getElementById('secs');

            if (daysEl) daysEl.innerText = days;
            if (hoursEl) hoursEl.innerText = hours;
            if (minsEl) minsEl.innerText = minutes;
            if (secsEl) secsEl.innerText = seconds;

            if (distance < 0) {
                clearInterval(countdownInterval);
                countdownEl.innerHTML = "WORKSHOP IN PROGRESS";
            }
        };

        const countdownInterval = setInterval(updateCountdown, 1000);
        updateCountdown();
    }
});
