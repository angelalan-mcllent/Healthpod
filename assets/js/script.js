document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[n].classList.add('active');
        dots[n].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Auto slideshow
    let slideshowInterval = setInterval(nextSlide, slideInterval);

    // Manual controls
    nextButton.addEventListener('click', () => {
        clearInterval(slideshowInterval);
        nextSlide();
        slideshowInterval = setInterval(nextSlide, slideInterval);
    });

    prevButton.addEventListener('click', () => {
        clearInterval(slideshowInterval);
        prevSlide();
        slideshowInterval = setInterval(nextSlide, slideInterval);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideshowInterval);
            currentSlide = index;
            showSlide(currentSlide);
            slideshowInterval = setInterval(nextSlide, slideInterval);
        });
    });

    // Initial show
    showSlide(currentSlide);
});