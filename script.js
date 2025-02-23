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
        if (window.scrollY > 500) {
            scrollToTop.classList.add('visible');
        } else {
            scrollToTop.classList.remove('visible');
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

    // Console log for debugging
    console.log('All animations and interactions initialized');
});