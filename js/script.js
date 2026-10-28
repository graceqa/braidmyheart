/**
 * Braid My Heart - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // Mobile Navigation Drawer
  // ==========================================
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const mobileDrawer = document.querySelector('.mobile-menu-drawer');
  const mobileBackdrop = document.querySelector('.mobile-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function toggleMobileMenu(open) {
    const isOpen = open !== undefined ? open : !mobileDrawer.classList.contains('is-active');
    if (isOpen) {
      mobileDrawer.classList.add('is-active');
      mobileBackdrop.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    } else {
      mobileDrawer.classList.remove('is-active');
      mobileBackdrop.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => toggleMobileMenu());
  }

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', () => toggleMobileMenu(false));
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  // ==========================================
  // Testimonial Carousel
  // ==========================================
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  let currentSlide = 0;
  let autoplayTimer = null;

  function showSlide(index) {
    if (!slides.length) return;
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) {
      dots[currentSlide].classList.add('active');
    }
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  if (nextBtn) nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoplay();
  });

  if (prevBtn) prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoplay();
  });

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
      resetAutoplay();
    });
  });

  function startAutoplay() {
    if (slides.length > 1) {
      autoplayTimer = setInterval(nextSlide, 6500);
    }
  }

  function resetAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      startAutoplay();
    }
  }

  startAutoplay();

  // ==========================================
  // Contact Inquiry Form
  // ==========================================
  const inquiryForm = document.getElementById('inquiryForm');
  const formStatus = document.getElementById('formStatus');

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = inquiryForm.querySelector('.form-submit-btn');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      if (formStatus) {
        formStatus.textContent = '';
        formStatus.className = 'form-status';
      }

      const formData = new FormData(inquiryForm);
      const data = Object.fromEntries(formData.entries());

      try {
        // Submit using Web3Forms or standard form submit endpoint
        // Web3Forms provides free access key or Formspree
        const accessKey = inquiryForm.dataset.accessKey || 'YOUR_ACCESS_KEY';

        // Check if access key is set
        if (accessKey && accessKey !== 'YOUR_ACCESS_KEY') {
          const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ ...data, access_key: accessKey })
          });

          if (res.ok) {
            showSuccess();
            return;
          }
        }

        // Direct mailto / fallback behavior
        const mailSubject = encodeURIComponent(`Braid Inquiry: ${data.service || 'Appointment Request'}`);
        const mailBody = encodeURIComponent(
          `Name: ${data.firstName} ${data.lastName}\n` +
          `Email: ${data.email}\n` +
          `Phone: ${data.phone || 'N/A'}\n` +
          `Service: ${data.service || 'Not specified'}\n` +
          `Preferred Date: ${data.preferredDate || 'Flexible'}\n\n` +
          `Message:\n${data.message || ''}`
        );
        
        window.location.href = `mailto:braidmyheart@gmail.com?subject=${mailSubject}&body=${mailBody}`;
        showSuccess();
      } catch (err) {
        if (formStatus) {
          formStatus.textContent = 'An error occurred. Please text or call (646) 484-9380 directly.';
          formStatus.className = 'form-status error';
        }
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }

      function showSuccess() {
        if (formStatus) {
          formStatus.textContent = "Thank you! Your inquiry has been sent to Grace. You'll receive a response within 48 hours.";
          formStatus.className = 'form-status success';
        }
        inquiryForm.reset();
      }
    });
  }
});
