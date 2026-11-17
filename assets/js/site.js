/* SAT Blueprint — site behavior. No dependencies. */
(function () {
  'use strict';
  var doc = document.documentElement;
  doc.classList.add('js');
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Legacy single-page anchors (old ads / bookmarks) → new pages
  if (location.pathname === '/' && location.hash) {
    var legacy = { '#book': '/book/', '#results': '/results/', '#faq': '/faq/', '#about': '/about/' };
    if (legacy[location.hash]) { location.replace(legacy[location.hash]); return; }
  }

  // Review mode: ?review outlines copy that needs fact-checking
  if (/[?&]review\b/.test(location.search)) doc.classList.add('review-mode');

  // Year
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // Header shrink
  var header = $('[data-header]');
  var onScroll = function () { if (header) header.classList.toggle('is-scrolled', window.scrollY > 12); };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  var toggle = $('.nav-toggle');
  var menu = $('#mobile-menu');
  if (toggle && menu) {
    var setMenu = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      menu.hidden = !open;
      toggle.querySelector('.sr-only').textContent = open ? 'Close menu' : 'Menu';
    };
    toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true'); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setMenu(false); toggle.focus(); }
    });
    window.addEventListener('resize', function () { if (window.innerWidth > 1160) setMenu(false); });
  }

  // Scroll reveal
  var reveals = $$('.reveal');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 70 + 'ms';
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // Hero score count-up
  $$('[data-count-to]').forEach(function (el) {
    var from = Number(el.dataset.countFrom), to = Number(el.dataset.countTo);
    if (reduceMotion || !from) return;
    var start = null, dur = 1600;
    el.textContent = from;
    var tick = function (t) {
      if (!start) start = t;
      var k = Math.min(1, (t - start) / dur);
      var e = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(from + (to - from) * e);
      if (k < 1) requestAnimationFrame(tick);
    };
    setTimeout(function () { requestAnimationFrame(tick); }, 350);
  });

  // Accordions
  $$('.acc-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      btn.setAttribute('aria-expanded', String(!open));
      if (panel) panel.hidden = open;
      btn.closest('.acc-item').classList.toggle('is-open', !open);
    });
  });

  // Carousel
  $$('[data-carousel]').forEach(function (car) {
    var track = $('.car-track', car);
    var prev = $('[data-prev]', car);
    var next = $('[data-next]', car);
    var step = function () { var s = $('.car-slide', track); return s ? s.getBoundingClientRect().width + 16 : 300; };
    var update = function () {
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    };
    prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: reduceMotion ? 'auto' : 'smooth' }); });
    next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: reduceMotion ? 'auto' : 'smooth' }); });
    track.addEventListener('scroll', update, { passive: true });
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); next.click(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev.click(); }
    });
    window.addEventListener('resize', update);
    update();
  });

  // Video facades (load YouTube only on click)
  $$('.video[data-yt]').forEach(function (v) {
    var btn = $('.video-play', v);
    if (!btn) return;
    btn.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + v.dataset.yt + '?autoplay=1&rel=0&modestbranding=1';
      f.title = v.dataset.title || 'Video testimonial';
      f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      f.allowFullscreen = true;
      v.innerHTML = '';
      v.appendChild(f);
      f.focus();
    });
  });

  // Blog filter
  var chips = $$('.chip[data-filter]');
  if (chips.length) {
    var cards = $$('[data-blog-grid] .blog-card');
    var empty = $('[data-empty]');
    var status = $('[data-filter-status]');
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var f = chip.dataset.filter;
        chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
        var shown = 0;
        cards.forEach(function (c) {
          var match = f === 'all' || c.dataset.cat === f;
          c.hidden = !match;
          if (match) { shown++; c.classList.add('in'); }
        });
        if (empty) empty.hidden = shown > 0;
        if (status) status.textContent = shown + (shown === 1 ? ' article' : ' articles') + ' shown';
      });
    });
  }

  // ── Form helpers ─────────────────────────────────────────────────────
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function setErr(input, msg) {
    var err = document.getElementById(input.id + '-err');
    if (msg) { input.setAttribute('aria-invalid', 'true'); if (err) { err.hidden = false; input.setAttribute('aria-describedby', err.id); } }
    else { input.removeAttribute('aria-invalid'); if (err) err.hidden = true; }
    return !msg;
  }
  function checkField(input) {
    var v = (input.value || '').trim();
    if (input.required && !v) return setErr(input, true);
    if (input.type === 'email' && v && !EMAIL.test(v)) return setErr(input, true);
    if (input.type === 'tel' && input.required && v.replace(/\D/g, '').length < 10) return setErr(input, true);
    return setErr(input, false);
  }
  function encode(form) {
    var fd = new FormData(form);
    var parts = [];
    fd.forEach(function (val, key) { parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(val)); });
    return parts.join('&');
  }
  function postNetlify(form) {
    return fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: encode(form) });
  }
  function track(name, data) {
    try { if (window.gtag) window.gtag('event', name, data || {}); } catch (e) {}
    try { if (window.fbq) window.fbq('track', name === 'generate_lead' ? 'Lead' : 'Contact'); } catch (e) {}
  }

  // Contact form
  var contact = $('[data-contact]');
  if (contact) {
    var cStatus = $('[data-form-status]', contact);
    contact.addEventListener('submit', function (e) {
      e.preventDefault();
      var fields = $$('input[required], textarea[required], input[type="email"]', contact);
      var ok = fields.map(checkField).every(Boolean);
      if (!ok) { var bad = $('[aria-invalid="true"]', contact); if (bad) bad.focus(); return; }
      var btn = $('button[type="submit"]', contact);
      btn.disabled = true;
      cStatus.className = 'form-status';
      cStatus.textContent = 'Sending…';
      postNetlify(contact).then(function (r) {
        if (!r.ok) throw new Error('bad status');
        contact.reset();
        cStatus.className = 'form-status ok';
        cStatus.textContent = 'Thanks — your message is on its way. Patrick will get back to you soon.';
        track('contact');
      }).catch(function () {
        cStatus.className = 'form-status bad';
        cStatus.innerHTML = 'Something went wrong. Please call <a href="tel:+15614302972">(561) 430-2972</a> or email <a href="mailto:patrick@gradefultestprep.com">patrick@gradefultestprep.com</a>.';
      }).then(function () { btn.disabled = false; });
    });
    $$('input, textarea', contact).forEach(function (i) {
      ['input', 'change'].forEach(function (ev) { i.addEventListener(ev, function () { if (i.getAttribute('aria-invalid')) checkField(i); }); });
    });
  }

  // ── Booking flow ─────────────────────────────────────────────────────
  var booking = $('[data-booking]');
  if (booking) {
    var cfg = window.SB_BOOKING || {};
    var form = $('[data-intake]', booking);
    var steps = $$('[data-step]', booking);
    var inds = $$('[data-step-ind]', booking);
    var stepStatus = $('[data-step-status]', booking);
    var names = ['Student snapshot', 'Who will attend', 'Parent contact', 'Pick a time'];
    var current = 1;

    // Month options for the next 18 months
    var sel = $('[data-months]', booking);
    if (sel) {
      var d = new Date(); d.setDate(1);
      for (var i = 0; i < 18; i++) {
        var label = d.toLocaleString('en-US', { month: 'long', year: 'numeric' });
        var o = document.createElement('option'); o.value = label; o.textContent = label;
        sel.appendChild(o);
        d.setMonth(d.getMonth() + 1);
      }
    }

    var show = function (n, focus) {
      current = n;
      steps.forEach(function (s) { s.hidden = Number(s.dataset.step) !== n; });
      inds.forEach(function (li) {
        var k = Number(li.dataset.stepInd);
        li.classList.toggle('done', k < n);
        if (k === n) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
      });
      if (stepStatus) stepStatus.textContent = 'Step ' + n + ' of 4: ' + names[n - 1];
      if (focus !== false) {
        var target = $('[data-step="' + n + '"]', booking);
        var first = target && (target.querySelector('input:not([type=hidden]), select, textarea') || target);
        if (first) { if (first === target) target.focus(); else first.focus({ preventScroll: true }); }
        var top = booking.getBoundingClientRect().top + window.scrollY - 90;
        if (window.scrollY > top) window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    };

    var validate = function (n) {
      var stepEl = $('[data-step="' + n + '"]', booking);
      if (n === 2) {
        var p1 = form.elements.attend_parent_1.checked, p2 = form.elements.attend_parent_2.checked;
        var err = $('#attend-err');
        err.hidden = p1 || p2;
        return p1 || p2;
      }
      var ok = $$('input[required], select[required], input[type="email"]', stepEl).map(checkField).every(Boolean);
      if (!ok) { var bad = $('[aria-invalid="true"]', stepEl); if (bad) bad.focus(); }
      return ok;
    };

    var studentBox = form.elements.attend_student;
    var nudge = $('[data-student-nudge]', booking);
    if (studentBox && nudge) studentBox.addEventListener('change', function () { nudge.hidden = studentBox.checked; });

    $$('[data-next]', booking).forEach(function (b) {
      b.addEventListener('click', function () { if (validate(current)) show(current + 1); });
    });
    $$('[data-back]', booking).forEach(function (b) {
      b.addEventListener('click', function () { show(current === 4 ? 3 : current - 1); });
    });
    $$('input, select', form).forEach(function (i) {
      ['input', 'change'].forEach(function (ev) { i.addEventListener(ev, function () { if (i.getAttribute('aria-invalid')) checkField(i); }); });
    });

    var loadScheduler = function () {
      var holder = $('[data-scheduler]', booking);
      var name = (form.elements.parent_name.value || '').trim();
      var first = name.split(' ')[0] || '';
      var last = name.split(' ').slice(1).join(' ');
      var params = new URLSearchParams({
        first_name: first, last_name: last,
        email: form.elements.email.value.trim(), phone: form.elements.phone.value.trim(),
      });
      var url = cfg.url + '?' + params.toString();
      var link = $('[data-scheduler-link]', booking);
      if (link) link.href = url;
      holder.innerHTML = '';
      var f = document.createElement('iframe');
      f.src = url;
      f.title = 'Pick a time for your free Roadmap Session';
      f.id = 'sat-roadmap-booking';
      f.setAttribute('scrolling', 'no');
      holder.appendChild(f);
      if (!document.querySelector('script[data-ghl]')) {
        var s = document.createElement('script');
        s.src = 'https://link.gradefultestprep.com/js/form_embed.js';
        s.async = true; s.setAttribute('data-ghl', '');
        document.body.appendChild(s);
      }
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(3)) return;
      var btn = $('[data-submit]', form);
      btn.disabled = true;
      // Save the intake answers (Netlify Forms + optional CRM webhook), then
      // move on to the live calendar either way so booking is never blocked.
      var saves = [postNetlify(form).catch(function () {})];
      if (cfg.webhook) {
        saves.push(fetch(cfg.webhook, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: encode(form), keepalive: true }).catch(function () {}));
      }
      var timeout = new Promise(function (r) { setTimeout(r, 3500); });
      Promise.race([Promise.all(saves), timeout]).then(function () {
        btn.disabled = false;
        track('generate_lead', { method: 'roadmap_intake' });
        loadScheduler();
        show(4);
      });
    });

    // On the booking page, "Book" links just scroll to the form
    $$('a[href="/book/"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        booking.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        var f = $('#student_name'); if (f && current === 1) setTimeout(function () { f.focus({ preventScroll: true }); }, 400);
      });
    });

    show(1, false);
  }
})();

/* Screenshot lightbox */
(function () {
  var links = document.querySelectorAll('[data-lightbox]');
  if (!links.length || typeof HTMLDialogElement === 'undefined') return;
  var dlg = document.createElement('dialog');
  dlg.className = 'lightbox';
  dlg.setAttribute('aria-label', 'Full-size message');
  dlg.innerHTML = '<button type="button" class="lightbox-close" aria-label="Close"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></button><img alt="">';
  document.body.appendChild(dlg);
  var img = dlg.querySelector('img');
  var last = null;
  dlg.querySelector('button').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('close', function () { img.removeAttribute('src'); if (last) last.focus(); });
  Array.prototype.forEach.call(links, function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      last = a;
      var inner = a.querySelector('img');
      img.src = a.getAttribute('href');
      img.alt = inner ? inner.alt : '';
      dlg.showModal();
    });
  });
})();
