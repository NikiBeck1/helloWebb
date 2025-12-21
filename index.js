// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Service navigation
const serviceButtons = document.querySelectorAll('.service-nav-button');
const servicePanels = document.querySelectorAll('.service-panel');

serviceButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetService = button.getAttribute('data-service');

    serviceButtons.forEach(btn => btn.classList.remove('active'));
    servicePanels.forEach(panel => panel.classList.remove('active'));

    button.classList.add('active');
    document.getElementById(targetService).classList.add('active');
  });
});

// FAQ accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    faqItems.forEach(otherItem => {
      if (otherItem !== item) otherItem.classList.remove('active');
    });
    item.classList.toggle('active');
  });
});

// Modal
const modal = document.getElementById('contactModal');
const closeModal = document.getElementById('closeModal');
const contactForm = document.getElementById('contactForm');

function openContactModal() {
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeContactModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

closeModal.addEventListener('click', closeContactModal);
modal.querySelector('.modal-overlay').addEventListener('click', closeContactModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeContactModal();
  }
});

// CTA buttons
document
  .querySelectorAll('.cta-button, .hero-cta, .pricing-cta, .learn-more')
  .forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      openContactModal();
    });
  });

/* ================================
   EMAILJS CONFIG
================================ */
const EMAILJS_SERVICE_ID = 'service_3v1spb8';
const EMAILJS_TEMPLATE_ID = 'template_kd09924';

function showSuccess() {
  const modalContent = document.querySelector('.modal-content');
  modalContent.innerHTML = `
    <div class="form-success">
      <div class="form-success-icon">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M5 13L9 17L19 7" stroke="currentColor" stroke-width="3"
            stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h3>Message Sent Successfully!</h3>
      <p>Thank you for reaching out. I'll get back to you within 24 hours.</p>
      <button onclick="closeContactModal()" class="form-submit" style="margin-top:2rem;">
        Close
      </button>
    </div>
  `;
}

/* ================================
   CONTACT FORM SUBMIT
================================ */
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      name: contactForm.name.value,
      email: contactForm.email.value,
      phone: contactForm.phone.value,
      business: contactForm.business.value,
      package: contactForm.package.value,
      message: contactForm.message.value,
    });

    showSuccess();
    contactForm.reset();

    setTimeout(closeContactModal, 2500);
  } catch (err) {
    console.error('EmailJS error:', err);
    alert('Something went wrong. Please try again.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
  }
});

// Make modal close callable from injected HTML
window.closeContactModal = closeContactModal;

// Scroll animations
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

document.querySelectorAll('.fade-in').forEach(el => {
  fadeObserver.observe(el);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    if (href === '#contact') {
      openContactModal();
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Newsletter (still placeholder)
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thank you for subscribing!');
  newsletterForm.reset();
});
