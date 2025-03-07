// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // Loading Screen
    const loadingScreen = document.querySelector('.loading-screen');

    // Simulate loading time (remove this setTimeout in production and use actual load event)
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);

    // Video control
    const video = document.querySelector('.video-background');
    const muteBtn = document.getElementById('muteBtn');
    const pauseBtn = document.getElementById('pauseBtn');

    muteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        muteBtn.textContent = video.muted ? '🔇 Unmute' : '🔊 Mute';
    });

    pauseBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            pauseBtn.textContent = '⏸️ Pause';
        } else {
            video.pause();
            pauseBtn.textContent = '▶️ Play';
        }
    });

    // Ensure video plays on mobile devices
    video.play().catch(function (error) {
        console.log("Video autoplay failed:", error);
    });

    // Intersection Observer for video pause
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                video.pause();
            } else {
                video.play().catch(error => console.log("Video play failed:", error));
            }
        });
    }, { threshold: 0.5 });

    videoObserver.observe(document.querySelector('.header'));

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Console log for debugging
    console.log('GSAP and ScrollTrigger initialized');

    // Animate art cards on scroll
    const artCards = document.querySelectorAll('.art-card');
    artCards.forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.6,
            delay: index * 0.2,
            scrollTrigger: {
                trigger: card,
                start: "top bottom-=100",
                toggleActions: "play none none reverse",
                // markers: true // Remove this in production
            }
        });
    });

    // Animate section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        gsap.from(title, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            scrollTrigger: {
                trigger: title,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Enhanced modal functionality
    const modal = document.querySelector('.modal');
    const modalImg = document.querySelector('.modal-content');
    const closeModal = document.querySelector('.close-modal');
    const images = document.querySelectorAll('.art-image');

    images.forEach(img => {
        img.addEventListener('click', () => {
            console.log('Image clicked');
            modal.style.display = 'block';
            modalImg.src = img.src;
            requestAnimationFrame(() => {
                modal.classList.add('active');
            });
        });
    });

    closeModal.addEventListener('click', closeModalFunction);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModalFunction();
    });

    function closeModalFunction() {
        console.log('Closing modal');
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    // Smooth scroll functionality
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Down visibility
    const scrollDown = document.querySelector('.scroll-down');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollDown.classList.add('hidden');
        } else {
            scrollDown.classList.remove('hidden');
        }
    });

    // Scroll to Top functionality
    const scrollToTop = document.querySelector('.scroll-to-top');

    window.addEventListener('scroll', () => {
        const scrollToTop = document.querySelector('.scroll-to-top');
        const themeToggle = document.querySelector('.theme-toggle');

        if (window.scrollY > 500) {
            scrollToTop.classList.add('visible');
            // Push up theme toggle when scroll button appears
            themeToggle.style.transform = 'translateY(-10px)';
        } else {
            scrollToTop.classList.remove('visible');
            // Reset theme toggle position
            themeToggle.style.transform = 'translateY(0)';
        }
    });

    scrollToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Active section highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-20% 0px -20% 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.style.color = 'var(--accent-color)';
                    } else {
                        link.style.color = 'var(--text-color)';
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Add hover effect for art cards
    artCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Initial animation for header content
    gsap.from('.header-content h1', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.5
    });

    gsap.from('.header-content p', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.8
    });

    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.setAttribute('data-theme', currentTheme);
        updateButtonIcon(currentTheme);
    }

    function toggleTheme() {
        const isDark = body.getAttribute('data-theme') === 'dark';
        body.setAttribute('data-theme', isDark ? 'light' : 'dark');
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
        updateButtonIcon(isDark ? 'light' : 'dark');
    }

    function updateButtonIcon(theme) {
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    themeToggle.addEventListener('click', toggleTheme);

    // Initialize button icon
    updateButtonIcon(currentTheme || 'light');

    // Console log for debugging
    console.log('All animations and interactions initialized');

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input');

            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(emailInput.value)) {
                // Here you would typically send the email to a backend service
                gsap.to(newsletterForm, {
                    scale: 1.05,
                    duration: 0.1,
                    onComplete: () => {
                        gsap.to(newsletterForm, {
                            scale: 1,
                            duration: 0.1
                        });
                    }
                });

                // Show success message (you could replace this with a more sophisticated notification)
                alert('Thank you for subscribing!');
                emailInput.value = '';
            } else {
                // Shake animation for invalid email
                gsap.to(newsletterForm, {
                    x: [-10, 10, -10, 10, 0],
                    duration: 0.1,
                    ease: 'power1.inOut'
                });
            }
        });
    }

    // Subtle hover animations for social icons
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            gsap.to(icon, {
                rotation: 360,
                scale: 1.2,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });

        icon.addEventListener('mouseleave', () => {
            gsap.to(icon, {
                rotation: 0,
                scale: 1,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });

    // Side Nav
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const sideNav = document.querySelector('.side-nav');
    const navBackdrop = document.querySelector('.nav-backdrop');

    // Toggle mobile navigation
    mobileNavToggle.addEventListener('click', function () {
        this.classList.toggle('active');
        sideNav.classList.toggle('active');
        navBackdrop.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    });

    // Close navigation when clicking outside
    navBackdrop.addEventListener('click', function () {
        mobileNavToggle.classList.remove('active');
        sideNav.classList.remove('active');
        navBackdrop.classList.remove('active');
        document.body.classList.remove('nav-open');
    });

    // Close navigation when clicking a link
    const navLinksParent = document.querySelectorAll('.side-nav-links a');
    navLinksParent.forEach(link => {
        link.addEventListener('click', function () {
            mobileNavToggle.classList.remove('active');
            sideNav.classList.remove('active');
            navBackdrop.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });
});