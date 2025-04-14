document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.slider-btn.prev');
    const nextButton = document.querySelector('.slider-btn.next');
    const dotsContainer = document.querySelector('.slider-dots');

    // Check if slider elements exist on the page before proceeding
    if (!slider || !slides.length || !prevButton || !nextButton || !dotsContainer) {
        // console.log("Slider elements not found on this page.");
        return; // Exit if slider elements aren't present
    }

    let currentSlide = 0;
    let slideInterval;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetInterval(); // Reset timer when dot is clicked
        });
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(slideIndex) {
        // Hide current slide
        slides[currentSlide].classList.remove('active');

        // Update currentSlide index
        currentSlide = (slideIndex + slides.length) % slides.length; // Wrap around

        // Show new slide
        slides[currentSlide].classList.add('active');

        updateDots();
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Button listeners
    nextButton.addEventListener('click', () => {
        nextSlide();
        resetInterval(); // Reset timer on manual navigation
    });

    prevButton.addEventListener('click', () => {
        prevSlide();
        resetInterval(); // Reset timer on manual navigation
    });

    // Auto-play functionality
    function startInterval() {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    // Initialize
    goToSlide(0); // Show the first slide initially
    startInterval(); // Start auto-play

    // Optional: Pause on hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
        sliderContainer.addEventListener('mouseleave', startInterval);
    }
});

// Add active class to current page's nav link (Simple version)
// You might need a more robust solution for complex paths
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('header nav ul li a');
    const currentPath = window.location.pathname.split("/").pop(); // Gets the file name like 'about.html'

    links.forEach(link => {
        const linkPath = link.getAttribute('href').split("/").pop();
        // Handle index.html specifically or empty path for root
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            // Remove active class from all links first
            links.forEach(l => l.classList.remove('active'));
            // Add active class to the current link
            link.classList.add('active');
        }
    });
});