document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.carousel-slide').forEach(slide => {
        if (slide.dataset.bg) {
            slide.style.backgroundImage = `url(${slide.dataset.bg})`;
        }
    });
});

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
// NAVBAR TOGGLER - FIX DEFINITIVO HEALTHPOD
// ===============================

document.addEventListener("DOMContentLoaded", function () {
  const toggler = document.querySelector(".navbar-toggler");
  const navMenu = document.querySelector("#navmenu");
  const bsCollapse = new bootstrap.Collapse(navMenu, { toggle: false });

  toggler.addEventListener("click", () => {
    if (navMenu.classList.contains("show")) {
      bsCollapse.hide();
    } else {
      bsCollapse.show();
    }
    toggler.classList.toggle("active"); // 💫 alterna la animación
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("show")) {
        bsCollapse.hide();
toggler.classList.remove("active"); // 💫 vuelve al estado normal
      }
    });
  });
});


// ===============================
// PRICING TOGGLE FUNCTIONALITY
// ===============================
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("pricingToggle");
  const basic = document.getElementById("basicPrice");
  const pro = document.getElementById("proPrice");
  const master = document.getElementById("masterPrice");
  const crossedPrices = document.querySelectorAll(".crossedprice");
  const monthlyPrices = document.querySelectorAll(".monthlyprice");

  if (toggle && basic && pro && master) {
    toggle.addEventListener("change", () => {
      if (toggle.checked) {
        // 🔁 MODO MENSUAL
        basic.textContent = "$229.00/mes";
        pro.textContent = "$349.00/mes";
        master.textContent = "$429.00/mes";

        // Oculta precios cruzados y precios mensuales
        crossedPrices.forEach(el => el.classList.add("d-none"));
        monthlyPrices.forEach(el => el.classList.add("d-none"));

      } else {
        // 🔁 MODO ANUAL
        basic.textContent = "$2,258.36/año";
        pro.textContent = "$3,434.16/año";
        master.textContent = "$4,221.36/año";

        // Muestra precios cruzados y precios mensuales
        crossedPrices.forEach(el => el.classList.remove("d-none"));
        monthlyPrices.forEach(el => el.classList.remove("d-none"));
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

// ===============================
// Bottom Promo Bar Visible Except Inside Pricing
// ===============================

document.addEventListener('DOMContentLoaded', function () {
  const mainModal = document.getElementById('global-modal');
  const bottomBar = document.getElementById('bottom-promo-bar');
  const bottomBtn = document.getElementById('bottom-promo-btn');
  const pricingSection = document.getElementById('pricing-section');

  // Mostrar barra cuando se cierre el modal principal
  mainModal.addEventListener('hidden.bs.modal', () => {
    bottomBar.classList.remove('d-none');
  });

  // Lógica de visibilidad al hacer scroll
  window.addEventListener('scroll', () => {
    const rect = pricingSection.getBoundingClientRect();
    
    // Detectamos si es versión móvil (usando el mismo breakpoint de tu CSS: 991px)
    const isMobile = window.innerWidth <= 991; 

    // Condición 1: ¿Está el usuario viendo la sección de precios actualmente?
    const isInsidePricing = rect.top < window.innerHeight && rect.bottom > 0;

    // Condición 2: ¿Ya pasó el usuario la sección de precios y está más abajo (en contacto)?
    // (rect.bottom <= 0 significa que el borde inferior de precios subió fuera de la pantalla)
    const isPastPricing = rect.bottom <= 0;

    let shouldHide = false;

    if (isMobile) {
      // EN MOBILE: Ocultar si está en precios O si ya pasó hacia abajo (Contacto)
      if (isInsidePricing || isPastPricing) {
        shouldHide = true;
      }
    } else {
      // EN DESKTOP: Ocultar SOLO si está en precios (Comportamiento original)
      if (isInsidePricing) {
        shouldHide = true;
      }
    }

    // Aplicar la clase según la lógica calculada
    if (shouldHide) {
      bottomBar.classList.add('hidden'); 
    } else {
      bottomBar.classList.remove('hidden');
    }
  });

  // Click → Ir a sección de membresías
  bottomBtn.addEventListener('click', () => {
    pricingSection.scrollIntoView({ behavior: 'smooth' });
  });
});