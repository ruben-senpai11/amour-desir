/**
 * AMOUR & DÉSIR - High Conversion Landing Page Scripts & FedaPay Integration
 * Target Markets: Côte d'Ivoire 🇨🇮, Congo Brazzaville 🇨🇬, RD Congo 🇨🇩
 * Features:
 * - Dynamic Midnight Countdown Timer (23:59:59)
 * - Interactive FAQ Accordion
 * - Floating Sticky CTA Bar on scroll (Responsive Desktop & Mobile)
 * - Ultra-Realistic Randomized Social Proof Engine with Country Flags
 * - FedaPay Native Modal & Checkout Integration
 * - Smooth anchor navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initFAQ();
  initStickyBar();
  initSocialProof();
  initSmoothScroll();
  initCheckoutModal();
});

/* ----------------------------------------------------
   1. Midnight Countdown Timer (23:59:59)
   ---------------------------------------------------- */
function initCountdown() {
  const hoursEls = document.querySelectorAll('.cd-hours');
  const minutesEls = document.querySelectorAll('.cd-minutes');
  const secondsEls = document.querySelectorAll('.cd-seconds');

  function updateTimer() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(23, 59, 59, 999);

    let diff = midnight.getTime() - now.getTime();
    if (diff < 0) diff = 0;

    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const format = (n) => String(n).padStart(2, '0');

    hoursEls.forEach(el => el.textContent = format(hours));
    minutesEls.forEach(el => el.textContent = format(minutes));
    secondsEls.forEach(el => el.textContent = format(seconds));
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ----------------------------------------------------
   2. Interactive FAQ Accordion
   ---------------------------------------------------- */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items for a clean single-open accordion feel
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherContent = other.querySelector('.faq-content');
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 30 + 'px';
      }
    });
  });
}

/* ----------------------------------------------------
   3. Floating Sticky CTA Bar on Scroll (Desktop & Mobile)
   ---------------------------------------------------- */
function initStickyBar() {
  const stickyBar = document.getElementById('stickyCtaBar');
  const heroSection = document.getElementById('hero');
  const orderSection = document.getElementById('offre');

  if (!stickyBar || !heroSection) return;

  window.addEventListener('scroll', () => {
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    const orderRect = orderSection ? orderSection.getBoundingClientRect() : null;

    // Show sticky bar once hero is passed
    const isPastHero = heroBottom < 0;
    // Hide when inside the order section to avoid duplicate buttons
    const isInsideOrder = orderRect && orderRect.top < window.innerHeight && orderRect.bottom > 0;

    if (isPastHero && !isInsideOrder) {
      stickyBar.classList.add('visible');
    } else {
      stickyBar.classList.remove('visible');
    }
  }, { passive: true });
}

/* ----------------------------------------------------
   4. Ultra-Realistic Randomized Social Proof Engine (CI 🇨🇮, CG 🇨🇬, CD 🇨🇩)
   ---------------------------------------------------- */
function initSocialProof() {
  const toast = document.getElementById('socialProofToast');
  const nameEl = document.getElementById('toastName');
  const cityEl = document.getElementById('toastCity');
  const flagEl = document.getElementById('toastFlag');
  const timeEl = document.getElementById('toastTime');

  if (!toast || !nameEl) return;

  // Realistic pool of buyers across Côte d'Ivoire 🇨🇮, Congo Brazzaville 🇨🇬, RD Congo 🇨🇩
  const buyerPool = [
    { name: 'Kouamé K.', city: 'Abidjan (Cocody)', flag: '🇨🇮' },
    { name: 'Dieudonné M.', city: 'Brazzaville (Bacongo)', flag: '🇨🇬' },
    { name: 'Patrick K.', city: 'Kinshasa (Gombe)', flag: '🇨🇩' },
    { name: 'Ibrahim S.', city: 'Abidjan (Yopougon)', flag: '🇨🇮' },
    { name: 'Arcel B.', city: 'Pointe-Noire', flag: '🇨🇬' },
    { name: 'Christian M.', city: 'Lubumbashi', flag: '🇨🇩' },
    { name: 'Yao D.', city: 'Bouaké', flag: '🇨🇮' },
    { name: 'Rodrigue N.', city: 'Brazzaville (Talangaï)', flag: '🇨🇬' },
    { name: 'Junior T.', city: 'Kinshasa (Limete)', flag: '🇨🇩' },
    { name: 'Serge B.', city: 'San-Pédro', flag: '🇨🇮' },
    { name: 'Fabrice N.', city: 'Dolisie', flag: '🇨🇬' },
    { name: 'Emmanuel L.', city: 'Goma', flag: '🇨🇩' },
    { name: 'Arsène G.', city: 'Abidjan (Marcory)', flag: '🇨🇮' },
    { name: 'Gloire M.', city: 'Brazzaville (Moungali)', flag: '🇨🇬' },
    { name: 'Fiston B.', city: 'Kinshasa (Bandal)', flag: '🇨🇩' },
    { name: 'Yannick A.', city: 'Yamoussoukro', flag: '🇨🇮' },
    { name: 'Brice P.', city: 'Pointe-Noire (Tié-Tié)', flag: '🇨🇬' },
    { name: 'Didier K.', city: 'Kolwezi', flag: '🇨🇩' }
  ];

  // Possible relative times for organic realism
  const timePhrases = [
    'à l\'instant',
    'il y a 1 min',
    'il y a 2 min',
    'il y a 3 min',
    'il y a 4 min',
    'il y a 6 min',
    'il y a 8 min',
    'il y a 11 min'
  ];

  // Shuffle array randomly
  function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  let shuffledBuyers = shuffle([...buyerPool]);
  let poolIndex = 0;

  function triggerRandomToast() {
    if (poolIndex >= shuffledBuyers.length) {
      shuffledBuyers = shuffle([...buyerPool]);
      poolIndex = 0;
    }

    const buyer = shuffledBuyers[poolIndex];
    const randomTime = timePhrases[Math.floor(Math.random() * timePhrases.length)];

    nameEl.textContent = buyer.name;
    cityEl.textContent = buyer.city;
    if (flagEl) flagEl.textContent = buyer.flag;
    timeEl.textContent = randomTime + ' • Accès envoyé par email';

    toast.classList.add('show');

    // Random display duration between 4.2s and 5.4s
    const displayDuration = 4200 + Math.random() * 1200;

    setTimeout(() => {
      toast.classList.remove('show');
    }, displayDuration);

    poolIndex++;

    // Schedule next notification at an organic random interval between 9s and 22s
    const nextInterval = 9000 + Math.random() * 13000;
    setTimeout(triggerRandomToast, nextInterval);
  }

  // Initial natural delay before first toast (3.2 seconds)
  setTimeout(triggerRandomToast, 3200);
}

/* ----------------------------------------------------
   5. Smooth Scroll for Anchor Links
   ---------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.startsWith('#open-checkout')) return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* ----------------------------------------------------
   6. FedaPay Checkout Modal Handler
   ---------------------------------------------------- */
function initCheckoutModal() {
  const modal = document.getElementById('checkoutModal');
  const closeBtn = document.getElementById('closeModalBtn');
  const checkoutForm = document.getElementById('modalCheckoutForm');
  const openButtons = document.querySelectorAll('.open-checkout-trigger');

  if (!modal) return;

  function openModal(e) {
    if (e) e.preventDefault();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Handle Form Submission & Launch FedaPay Widget
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('mClientName').value.trim();
      const email = document.getElementById('mClientEmail').value.trim();
      const phone = document.getElementById('mClientPhone').value.trim();
      const country = document.getElementById('mClientCountry').value;

      if (!name || !email || !phone) {
        alert('Veuillez remplir toutes les informations pour recevoir votre pack.');
        return;
      }

      closeModal();

      try {
        if (typeof FedaPay !== 'undefined') {
          const widget = FedaPay.init({
            public_key: 'pk_live_Ps51ySoBt1b2ZAxB6RuEkRHt',
            transaction: {
              amount: 1000,
              description: 'PACK DU DÉSIR - Enfin Comprendre Les Hormones (107 pages + 8 Bonus)',
              custom_metadata: {
                customer_name: name,
                customer_country: country
              }
            },
            customer: {
              email: email,
              lastname: name.split(' ').slice(1).join(' ') || name,
              firstname: name.split(' ')[0],
              phone_number: {
                number: phone,
                country: country === 'OTHER' ? 'BJ' : country
              }
            },
            onComplete: function(response) {
              console.log('FedaPay transaction complete:', response);
              window.location.href = 'merci.html?status=success&ref=' + (response.id || '');
            }
          });

          widget.open();
        } else {
          // Fallback if CDN failed
          window.location.href = 'checkout.html';
        }
      } catch (err) {
        console.error('Error initializing FedaPay:', err);
        window.location.href = 'checkout.html';
      }
    });
  }
}
