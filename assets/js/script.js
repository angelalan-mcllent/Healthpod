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


// ===============================
// PRICING TOGGLE FUNCTIONALITY
// ===============================
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("pricingToggle");
  const basic = document.getElementById("basicPrice");
  const pro = document.getElementById("proPrice");
  const master = document.getElementById("masterPrice");

  if (toggle && basic && pro && master) {
    toggle.addEventListener("change", () => {
      if (toggle.checked) {
        // 🔁 MODO MENSUAL
        basic.textContent = "$229.00/mes";
        pro.textContent = "$349.00/mes";
        master.textContent = "$429.00/mes";
      } else {
        // 🔁 MODO ANUAL (precio por mes equivalente o total anual)
        basic.textContent = "$2,748.00/año";
        pro.textContent = "$4,188.00/año";
        master.textContent = "$4,699.00/año";
      }
    });
  }
});

// =============================
// Mostrar modal al hacer scroll > 200px
// =============================
document.addEventListener('DOMContentLoaded', function () {
  let modalShown = false;
  const modalEl = document.getElementById('global-modal');
  const modal = new bootstrap.Modal(modalEl);

  // Mostrar modal al hacer scroll más de 200px
  window.addEventListener('scroll', function () {
    if (window.scrollY > 200 && !modalShown) {
      modal.show();
      modalShown = true;
    }
  });

  // Cerrar modal con el botón CTA y hacer scroll a #pricing-section
  modalEl.addEventListener('click', function (e) {
    if (e.target.closest('.btn--primary')) {
      e.preventDefault();
      modal.hide();

      // Esperar a que termine la animación del modal antes de hacer scroll
      setTimeout(() => {
        const target = document.querySelector('#pricing-section');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    }
  });
});
