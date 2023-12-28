let isTransitioning = false;

function adjustNavbarDisplay() {
  const navbar = document.querySelector('.navbar');
  navbar.classList.toggle('is-hidden', window.innerWidth < 769);
}

function adjustCarouselPadding() {
  const header = document.querySelector('.header');
  const carousel = document.querySelector('.carousel');
  carousel.style.paddingTop = `${header.offsetHeight}px`;
}

function adjustTwitterHeight() {
  const leftSection = document.getElementById('leftsection');
  const twitterSection = document.getElementById('twitter');
  twitterSection.style.height = `${leftSection.offsetHeight}px`;
}

function smoothScroll(anchor) {
  const headerHeight = document.querySelector('.header').offsetHeight;
  const additionalOffset = 0;
  let targetID = anchor.getAttribute('href');
  let targetAnchor = document.querySelector(targetID);

  if (targetAnchor) {
    let topOffset = window.pageYOffset + targetAnchor.getBoundingClientRect().top - headerHeight - additionalOffset;
    window.scrollTo({ top: topOffset, behavior: 'smooth' });
  }
}

function changeSlide(offset) {
  const carousel = document.querySelector('[data-carousel]');
  const slides = carousel.querySelector('[data-slides]');

  if (isTransitioning) return;
  isTransitioning = true;

  const activeSlide = slides.querySelector('[data-active]');
  let newIndex = [...slides.children].indexOf(activeSlide) + offset;

  if (newIndex < 0) newIndex = slides.children.length - 1;
  if (newIndex >= slides.children.length) newIndex = 0;

  slides.children[newIndex].dataset.active = true;
  delete activeSlide.dataset.active;

  setTimeout(() => { isTransitioning = false; }, 500);
}

function startAutoSlide() {
  if (autoSlideInterval) clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(() => { changeSlide(1); }, 9000);
}

document.addEventListener('DOMContentLoaded', () => {
  adjustNavbarDisplay();
  adjustCarouselPadding();
  adjustTwitterHeight(); 

  document.getElementById('logo').addEventListener('click', (event) => {
    if (window.location.pathname !== '/index.html') {
      event.preventDefault();
      window.location.href = '/index.html';
    } else {  
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScroll(anchor);
    });
  });

  document.querySelector('.dropdown-toggle').addEventListener('click', () => {
    document.querySelector('.navbar').classList.toggle('is-hidden');
  });

  startAutoSlide();

  const buttons = document.querySelectorAll("[data-carousel-button]");
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const offset = button.dataset.carouselButton === "next" ? 1 : -1;
      changeSlide(offset);
      startAutoSlide();
    });
  });

  document.addEventListener('keydown', function(event) {
    const key = event.key;

    const s1 = document.getElementById('s1');
    const s2 = document.getElementById('s2');
    const s3 = document.getElementById('s3');

    if (key === "ArrowRight") {
      if (s1.checked) {
        s2.checked = true;
      } else if (s2.checked) {
        s3.checked = true;
      } else if (s3.checked) {
        s1.checked = true;
      }
    }

    if (key === "ArrowLeft") {
      if (s1.checked) {
        s3.checked = true;
      } else if (s2.checked) {
        s1.checked = true;
      } else if (s3.checked) {
        s2.checked = true;
      }
    }
  });

  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.querySelector('.btn-contact').addEventListener('click', (event) => {
      var inputId = card.parentNode.getAttribute('for');
      var input = document.getElementById(inputId);
      if (!input.checked) {
        event.preventDefault();
        input.checked = true;
      }
    });
  });

  const handleSwipe = (function() {
    let touchstartX = 0;
    let touchendX = 0;

    function checkSwipeDirection() {
      if (touchendX < touchstartX) changeSlide(1); // Swiped left
      if (touchendX > touchstartX) changeSlide(-1); // Swiped right
    }

    return {
      onTouchStart: (event) => { touchstartX = event.changedTouches[0].screenX; },
      onTouchEnd: (event) => { touchendX = event.changedTouches[0].screenX; checkSwipeDirection(); }
    };
  })();

  const carouselElement = document.querySelector('.carousel');
  carouselElement.addEventListener('touchstart', handleSwipe.onTouchStart, false);
  carouselElement.addEventListener('touchend', handleSwipe.onTouchEnd, false);
});

window.addEventListener('load', () => {
  adjustNavbarDisplay();
  adjustCarouselPadding();
  adjustTwitterHeight();
});

window.addEventListener('resize', () => {
  adjustNavbarDisplay();
  adjustCarouselPadding();
  adjustTwitterHeight();
});

let autoSlideInterval = setInterval(() => { changeSlide(1); }, 9000);
