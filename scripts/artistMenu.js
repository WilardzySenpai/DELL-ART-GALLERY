document.addEventListener('DOMContentLoaded', function() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const sideNav = document.querySelector('.side-nav');
    const navBackdrop = document.querySelector('.nav-backdrop');
    
    // Toggle mobile navigation
    mobileNavToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        sideNav.classList.toggle('active');
        navBackdrop.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    });
    
    // Close navigation when clicking outside
    navBackdrop.addEventListener('click', function() {
        mobileNavToggle.classList.remove('active');
        sideNav.classList.remove('active');
        navBackdrop.classList.remove('active');
        document.body.classList.remove('nav-open');
    });
    
    // Close navigation when clicking a link
    const navLinks = document.querySelectorAll('.side-nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNavToggle.classList.remove('active');
            sideNav.classList.remove('active');
            navBackdrop.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });
});