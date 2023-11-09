// Function to adjust the navbar's display based on the window's width
function adjustNavbarDisplay() {
  const navbar = document.querySelector('.navbar');
  if (window.innerWidth >= 769) {
    navbar.classList.remove('is-hidden');
  } else {
    navbar.classList.add('is-hidden');
  }
}

document.addEventListener('DOMContentLoaded', function() {

  // Adjust Navbar Display
  adjustNavbarDisplay();

  // When the window resizes, adjust the navbar's display again
  window.addEventListener('resize', adjustNavbarDisplay);

  // Scroll to top when logo is clicked
  document.getElementById('logo').addEventListener('click', function (event) {
    if (window.location.pathname !== '/index.html') {
        window.location.href = '/index.html';
        event.preventDefault();
    } else {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
  });

  // Toggle dropdown menu
  document.querySelector('.dropdown-toggle').addEventListener('click', function() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('is-hidden');
  });

  // Smooth scroll logic which compensates for navbar height and adds additional space
  const headerHeight = document.querySelector('.header').offsetHeight; // Get the current height of the header
  const additionalOffset = 20; 

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      let targetID = this.getAttribute('href');
      let targetAnchor = document.querySelector(targetID);
      
      if (targetAnchor) {
        let topOffset = window.pageYOffset + targetAnchor.getBoundingClientRect().top - headerHeight + additionalOffset;
        
        window.scrollTo({
          top: topOffset,
          behavior: 'smooth'
        });
      }
    });
  });

  // Carousel logic
  const carousel = document.querySelector('[data-carousel]');
  const slides = carousel.querySelector('[data-slides]');
  let autoSlideInterval;
  let isTransitioning = false;

  function changeSlide(offset) {
    if (isTransitioning) return;

    isTransitioning = true;

    const activeSlide = slides.querySelector('[data-active]');
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;

    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;

    setTimeout(() => {
        isTransitioning = false;
    }, 500);
  }

  function startAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
    autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, 9000);
  }

  startAutoSlide();

  const buttons = document.querySelectorAll("[data-carousel-button]");
  buttons.forEach(button => {
    button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1;
        changeSlide(offset);
        startAutoSlide();
    });
  });

  // Keydown event for carousel navigation
  document.addEventListener('keydown', function(event) {
    const key = event.key; // Which key was pressed

    const s1 = document.getElementById('s1');
    const s2 = document.getElementById('s2');
    const s3 = document.getElementById('s3');

    // Move to the next slide when the right arrow key is pressed
    if (key === "ArrowRight") {
        if (s1.checked) {
            s2.checked = true;
        } else if (s2.checked) {
            s3.checked = true;
        } else if (s3.checked) {
            s1.checked = true;
        }
    }

    // Move to the previous slide when the left arrow key is pressed
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

});
