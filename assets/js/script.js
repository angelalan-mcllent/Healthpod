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
// Mostrar modal al hacer scroll > 200px (Bootstrap 5 compatible)
// Pegar en: assets/js/script.js (o tu script principal)
// =============================
document.addEventListener('DOMContentLoaded', function () {
  let modalShown = false;

  // Obtener instancia de bootstrap Modal (no instanciamos hasta que la necesitemos)
  const modalEl = document.getElementById('global-modal');
  // Guardamos la instancia en una variable para poder usar show/hide
  let bsModal = null;

  function showGlobalModal() {
    if (!bsModal) {
      bsModal = new bootstrap.Modal(modalEl, {
        backdrop: true,
        keyboard: true
      });
    }
    bsModal.show();
  }

  // Listener de scroll: si scrolleas > 200 px y no se ha mostrado, mostrar modal
  window.addEventListener('scroll', function onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop > 200 && !modalShown) {
      modalShown = true;
      showGlobalModal();
      // opcional: ya no necesitamos este listener (libera recursos)
      window.removeEventListener('scroll', onScroll);
    }
  });

  // Opcional: si quieres asegurarte de que el usuario pueda cerrar con ESC o clic fuera,
  // bootstrap lo gestiona por defecto con las opciones que usamos (backdrop:true, keyboard:true).
});
