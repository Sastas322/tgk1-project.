/**
 * ТГК-1 — Основной скрипт приложения
 * Модульная архитектура на чистом JavaScript.
 *
 * Модули:
 *  1. MobileMenu      — переключение мобильного меню
 *  2. SmoothScroll     — плавная прокрутка по якорным ссылкам
 *  3. ContactForm      — валидация и отправка формы обратной связи
 *  4. ScrollAnimations — анимации появления при прокрутке (IntersectionObserver)
 *  5. ActiveNav        — подсветка текущего раздела в навигации
 */

'use strict';

/* ==========================================================================
   1. Mobile Menu
   ========================================================================== */
const MobileMenu = (() => {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');

  if (!toggle || !menu) return { init() {} };

  const links = menu.querySelectorAll('.header__mobile-link');

  function open() {
    menu.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Закрыть меню');
  }

  function close() {
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Открыть меню');
  }

  function handleToggle() {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    isOpen ? close() : open();
  }

  function handleKeyDown(event) {
    if (event.key === 'Escape') close();
  }

  function init() {
    toggle.addEventListener('click', handleToggle);
    document.addEventListener('keydown', handleKeyDown);

    links.forEach((link) => {
      link.addEventListener('click', close);
    });
  }

  return { init };
})();


/* ==========================================================================
   2. Smooth Scroll
   ========================================================================== */
const SmoothScroll = (() => {
  const HEADER_OFFSET = 80;

  function scrollToTarget(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;

    const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  function handleClick(event) {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    const targetId = link.getAttribute('href').slice(1);
    if (!targetId) return;

    event.preventDefault();
    scrollToTarget(targetId);

    // Update URL without triggering scroll
    history.pushState(null, '', `#${targetId}`);
  }

  function init() {
    document.addEventListener('click', handleClick);
  }

  return { init };
})();


/* ==========================================================================
   3. Contact Form
   ========================================================================== */
const ContactForm = (() => {
  const form = document.getElementById('contact-form');
  if (!form) return { init() {} };

  const submitBtn = document.getElementById('submit-btn');
  const btnText = submitBtn?.querySelector('.btn__text');
  const btnLoader = submitBtn?.querySelector('.btn__loader');
  const statusEl = document.getElementById('form-status');

  // Cache input references
  const fields = {
    name: form.querySelector('#form-name'),
    email: form.querySelector('#form-email'),
    phone: form.querySelector('#form-phone'),
    message: form.querySelector('#form-message'),
  };

  const errors = {
    name: document.getElementById('name-error'),
    email: document.getElementById('email-error'),
    message: document.getElementById('message-error'),
  };

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const STATUS_TIMEOUT = 5000;

  /* --- Validation helpers --- */

  function clearFieldError(fieldName) {
    const input = fields[fieldName];
    const error = errors[fieldName];
    if (input) input.classList.remove('form__input--invalid');
    if (error) error.textContent = '';
  }

  function setFieldError(fieldName, message) {
    const input = fields[fieldName];
    const error = errors[fieldName];
    if (input) input.classList.add('form__input--invalid');
    if (error) error.textContent = message;
  }

  function validate() {
    let isValid = true;

    // Имя
    if (!fields.name.value.trim()) {
      setFieldError('name', 'Введите ваше имя');
      isValid = false;
    } else {
      clearFieldError('name');
    }

    // Электронная почта
    const email = fields.email.value.trim();
    if (!email) {
      setFieldError('email', 'Введите адрес электронной почты');
      isValid = false;
    } else if (!EMAIL_REGEX.test(email)) {
      setFieldError('email', 'Введите корректный адрес электронной почты');
      isValid = false;
    } else {
      clearFieldError('email');
    }

    // Сообщение
    if (!fields.message.value.trim()) {
      setFieldError('message', 'Введите сообщение');
      isValid = false;
    } else {
      clearFieldError('message');
    }

    return isValid;
  }

  /* --- UI state helpers --- */

  function setLoading(isLoading) {
    if (submitBtn) submitBtn.disabled = isLoading;
    if (btnText) btnText.textContent = isLoading ? 'Отправка...' : 'Отправить сообщение';
    if (btnLoader) btnLoader.hidden = !isLoading;
  }

  function showStatus(type, message) {
    if (!statusEl) return;

    statusEl.hidden = false;
    statusEl.className = `form__status form__status--${type}`;
    statusEl.textContent = message;

    setTimeout(() => {
      statusEl.hidden = true;
      statusEl.textContent = '';
    }, STATUS_TIMEOUT);
  }

  function resetForm() {
    form.reset();
    Object.keys(errors).forEach(clearFieldError);
  }

  /* --- Submission --- */

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validate()) return;

    const selectedType = form.querySelector('input[name="type"]:checked');

    const payload = {
      name: fields.name.value.trim(),
      email: fields.email.value.trim(),
      phone: fields.phone.value.trim(),
      message: fields.message.value.trim(),
      type: selectedType ? selectedType.value : 'job',
    };

    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        showStatus('success', data.message || 'Ваше сообщение успешно отправлено!');
        resetForm();
      } else {
        showStatus('error', data.error || 'Произошла ошибка. Попробуйте ещё раз.');
      }
    } catch {
      showStatus('error', 'Не удалось отправить сообщение. Проверьте подключение к интернету и попробуйте снова.');
    } finally {
      setLoading(false);
    }
  }

  /* --- Live validation on blur --- */

  function addBlurValidation() {
    fields.name.addEventListener('blur', () => {
      if (!fields.name.value.trim()) {
        setFieldError('name', 'Введите ваше имя');
      } else {
        clearFieldError('name');
      }
    });

    fields.email.addEventListener('blur', () => {
      const val = fields.email.value.trim();
      if (!val) {
        setFieldError('email', 'Введите адрес электронной почты');
      } else if (!EMAIL_REGEX.test(val)) {
        setFieldError('email', 'Введите корректный адрес электронной почты');
      } else {
        clearFieldError('email');
      }
    });

    fields.message.addEventListener('blur', () => {
      if (!fields.message.value.trim()) {
        setFieldError('message', 'Введите сообщение');
      } else {
        clearFieldError('message');
      }
    });
  }

  /* --- Clear errors on input --- */

  function addInputClear() {
    Object.keys(errors).forEach((key) => {
      fields[key]?.addEventListener('input', () => clearFieldError(key));
    });
  }

  function init() {
    form.addEventListener('submit', handleSubmit);
    addBlurValidation();
    addInputClear();
  }

  return { init };
})();


/* ==========================================================================
   4. Scroll Animations (Intersection Observer)
   ========================================================================== */
const ScrollAnimations = (() => {
  const SELECTOR = '.card, .stats__item, .cta-banner, .contact-info__card, .vacancy-card, .steps__item, .connect-steps .card, .info-card';
  const STAGGER_DELAY = 80; // ms between each child element

  function init() {
    if (!('IntersectionObserver' in window)) return;

    const elements = document.querySelectorAll(SELECTOR);
    if (!elements.length) return;

    elements.forEach((el) => el.classList.add('fade-in'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Find siblings that are also in viewport to stagger
            const parent = entry.target.parentElement;
            if (parent) {
              const siblings = Array.from(parent.querySelectorAll('.fade-in:not(.fade-in--visible)'));
              const idx = siblings.indexOf(entry.target);
              const delay = Math.max(0, idx) * STAGGER_DELAY;
              setTimeout(() => {
                entry.target.classList.add('fade-in--visible');
              }, delay);
            } else {
              entry.target.classList.add('fade-in--visible');
            }
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));
  }

  return { init };
})();


/* ==========================================================================
   5. Active Navigation Highlight
   ========================================================================== */
const ActiveNav = (() => {
  const NAV_LINKS_SELECTOR = '.header__nav-link';
  const SECTIONS = ['about', 'services', 'careers', 'contact'];
  const OFFSET = 120;

  let links = [];

  function update() {
    const scrollY = window.scrollY;
    let current = '';

    SECTIONS.forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return;
      const top = section.offsetTop - OFFSET;
      const bottom = top + section.offsetHeight;
      if (scrollY >= top && scrollY < bottom) {
        current = id;
      }
    });

    links.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${current}`) {
        link.classList.add('header__nav-link--active');
      } else {
        link.classList.remove('header__nav-link--active');
      }
    });
  }

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
      ticking = true;
    }
  }

  function init() {
    links = Array.from(document.querySelectorAll(NAV_LINKS_SELECTOR));
    if (!links.length) return;

    window.addEventListener('scroll', onScroll, { passive: true });
    update();
  }

  return { init };
})();


/* ==========================================================================
   Bootstrap
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  MobileMenu.init();
  SmoothScroll.init();
  ContactForm.init();
  ScrollAnimations.init();
  ActiveNav.init();
});
