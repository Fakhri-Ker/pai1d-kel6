(() => {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  const pageLoader = document.getElementById('pageLoader');
  const backToTop = document.getElementById('backToTop');
  const TRANSITION_KEY = 'pai1dPageTransition';

  /* =========================================================
     1. Navigasi utama + subbab khusus HP
     Desktop tetap memakai susunan menu lama dan sidebar TOC.
     ========================================================= */
  const subtopicsByPage = {
    'cyberethics.html': [
      ['Pengertian dan ruang lingkup Cyberethics', 'bagian-1'],
      ['Empat fase perkembangan isu Cyberethics', 'bagian-2'],
      ['Cyberethics sebagai etika terapan', 'bagian-3'],
      ['Komponen dasar sistem moral', 'bagian-4']
    ],
    'prinsip-etika.html': [
      ['Prinsip etika dan aturan perilaku', 'bagian-1'],
      ['Hak informasi dan kewajiban privasi', 'bagian-2'],
      ['Hak kepemilikan dan kekayaan intelektual', 'bagian-3'],
      ['Kualitas sistem informasi', 'bagian-4'],
      ['Kualitas hidup dalam masyarakat digital', 'bagian-5'],
      ['Akuntabilitas, tanggung jawab, dan kontrol', 'bagian-6']
    ],
    'perkembangan-cyberspace.html': [
      ['Perubahan masyarakat dan gelombang teknologi', 'bagian-1'],
      ['Unsur pembentuk cyberspace: akses, jaringan, aplikasi, dan konten', 'bagian-2'],
      ['Transformasi sosial-budaya dan aktivitas masyarakat', 'bagian-3'],
      ['Tren teknologi yang memperbesar kebutuhan etika', 'bagian-4']
    ],
    'real-space-cyber-space.html': [
      ['Makna Real Space = Cyber Space', 'bagian-1'],
      ['Norma sosial dan etiket dalam interaksi digital', 'bagian-2'],
      ['Konten negatif dan pembentukan kebiasaan', 'bagian-3'],
      ['Reputasi, privasi, dan jejak digital', 'bagian-4'],
      ['Norma hukum sebagai batas perilaku', 'bagian-5']
    ],
    'kasus-kesimpulan.html': [
      ['Dua kelompok kejahatan komputer', 'bagian-1'],
      ['Contoh kasus: penipuan dengan bukti transfer palsu', 'bagian-2'],
      ['Phishing dan pencurian informasi', 'bagian-3'],
      ['Tahapan penanganan insiden siber', 'bagian-4'],
      ['Langkah awal bagi pengguna dan pelestarian bukti digital', 'bagian-5'],
      ['Bukti elektronik, hukum, dan kesimpulan akhir', 'bagian-6']
    ]
  };

  const closeMenu = () => {
    if (!toggle || !nav) return;
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Buka navigasi');
  };

  if (nav) {
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    const originalLinks = Array.from(nav.children).filter(
      child => child.matches && child.matches('a.nav-link')
    );

    originalLinks.forEach((link, index) => {
      const href = (link.getAttribute('href') || '').split('#')[0];
      const topics = subtopicsByPage[href];
      const group = document.createElement('div');
      group.className = 'mobile-nav-group';

      const row = document.createElement('div');
      row.className = 'mobile-nav-row';

      nav.insertBefore(group, link);
      group.appendChild(row);
      row.appendChild(link);

      if (!topics) return;

      const submenuId = `mobile-subnav-${href.replace(/[^a-z0-9]+/gi, '-')}`;
      const submenuToggle = document.createElement('button');
      submenuToggle.type = 'button';
      submenuToggle.className = 'mobile-submenu-toggle';
      submenuToggle.setAttribute('aria-label', `Tampilkan subbab ${link.textContent.trim()}`);
      submenuToggle.setAttribute('aria-controls', submenuId);
      submenuToggle.setAttribute('aria-expanded', 'false');
      submenuToggle.innerHTML = '<span class="mobile-submenu-chevron" aria-hidden="true">⌄</span>';

      const submenu = document.createElement('div');
      submenu.className = 'mobile-subnav';
      submenu.id = submenuId;
      submenu.setAttribute('aria-label', `Subbab ${link.textContent.trim()}`);
      submenu.hidden = true;

      const label = document.createElement('span');
      label.className = 'mobile-subnav-label';
      label.textContent = 'SUBBAB DALAM HALAMAN';
      submenu.appendChild(label);

      topics.forEach(([title, sectionId], topicIndex) => {
        const topicLink = document.createElement('a');
        topicLink.href = `${href}#${sectionId}`;
        topicLink.textContent = title;
        topicLink.dataset.section = sectionId;
        topicLink.insertAdjacentHTML('afterbegin',
          `<span class="mobile-subnav-number">${String(topicIndex + 1).padStart(2, '0')}</span>`);
        submenu.appendChild(topicLink);
      });

      row.appendChild(submenuToggle);
      group.appendChild(submenu);

      const isCurrentPage = currentFile === href || link.classList.contains('active');
      if (isCurrentPage) {
        group.classList.add('is-expanded');
        submenu.hidden = false;
        submenuToggle.setAttribute('aria-expanded', 'true');
      }

      submenuToggle.addEventListener('click', () => {
        const willOpen = !group.classList.contains('is-expanded');
        nav.querySelectorAll('.mobile-nav-group.is-expanded').forEach(openGroup => {
          openGroup.classList.remove('is-expanded');
          const openSubmenu = openGroup.querySelector('.mobile-subnav');
          const openButton = openGroup.querySelector('.mobile-submenu-toggle');
          if (openSubmenu) openSubmenu.hidden = true;
          if (openButton) openButton.setAttribute('aria-expanded', 'false');
        });
        if (willOpen) {
          group.classList.add('is-expanded');
          submenu.hidden = false;
          submenuToggle.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // Klik tautan (termasuk subbab) menutup panel hamburger.
    nav.addEventListener('click', event => {
      const target = event.target instanceof Element ? event.target : event.target?.parentElement;
      if (target?.closest('a[href]')) closeMenu();
    });
  }

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Tutup navigasi' : 'Buka navigasi');
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  /* =========================================================
     2. Tombol kembali ke atas
     ========================================================= */
  if (backToTop) {
    const updateBackToTopVisibility = () => {
      backToTop.classList.toggle('is-visible', window.scrollY > 400);
    };
    window.addEventListener('scroll', updateBackToTopVisibility, { passive: true });
    updateBackToTopVisibility();
    backToTop.addEventListener('click', () => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    });
  }

  /* =========================================================
     3. Scroll progress bar
     ========================================================= */
  const progress = document.createElement('div');
  progress.className = 'reading-progress';
  progress.setAttribute('aria-hidden', 'true');
  progress.innerHTML = '<span></span>';
  document.body.prepend(progress);
  const progressFill = progress.firstElementChild;
  let progressQueued = false;

  const updateProgress = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const amount = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
    progressFill.style.transform = `scaleX(${amount})`;
    progressQueued = false;
  };
  const requestProgressUpdate = () => {
    if (progressQueued) return;
    progressQueued = true;
    window.requestAnimationFrame(updateProgress);
  };
  window.addEventListener('scroll', requestProgressUpdate, { passive: true });
  window.addEventListener('resize', requestProgressUpdate);
  updateProgress();

  /* =========================================================
     4. Scroll reveal yang menghormati pengaturan reduced motion
     ========================================================= */
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion && 'IntersectionObserver' in window) {
    const revealTargets = document.querySelectorAll([
      '.hero-copy', '.hero-visual', '.section-heading', '.video-section',
      '.intro-band-inner', '.material-card', '.closing-cta',
      '.article-hero', '.article-callout', '.toc', '.article-section',
      '.about-hero', '.about-purpose', '.member-card', '.contribution-note'
    ].join(','));

    revealTargets.forEach((element, index) => {
      element.classList.add('reveal');
      element.style.setProperty('--reveal-delay', `${Math.min(index % 5, 4) * 55}ms`);
    });

    document.body.classList.add('reveal-ready');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -36px 0px' });

    revealTargets.forEach(element => revealObserver.observe(element));
  }

  /* =========================================================
     5. Active subbab: sidebar desktop + submenu mobile
     ========================================================= */
  const articleSections = Array.from(document.querySelectorAll('.article-section[id]'));
  const tocLinks = Array.from(document.querySelectorAll('.toc a[href^="#"], .mobile-subnav a[data-section]'));

  const setActiveSection = sectionId => {
    tocLinks.forEach(link => {
      const linkSection = link.dataset.section ||
        (link.getAttribute('href') || '').split('#')[1];
      const active = linkSection === sectionId;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
      const item = link.closest('li');
      if (item) item.classList.toggle('is-active', active);
    });
  };

  if (articleSections.length) {
    const initialSection = window.location.hash
      ? window.location.hash.slice(1)
      : articleSections[0].id;
    setActiveSection(initialSection);

    if ('IntersectionObserver' in window) {
      const sectionObserver = new IntersectionObserver(entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) setActiveSection(visible[0].target.id);
      }, {
        rootMargin: '-16% 0px -68% 0px',
        threshold: 0
      });
      articleSections.forEach(section => sectionObserver.observe(section));
    }
  }

  /* =========================================================
     6. Skeleton loading saat berpindah antarhalaman (dipertahankan)
     ========================================================= */
  const arrivingFromPage = document.documentElement.classList.contains('page-transition-in');
  if (arrivingFromPage && pageLoader) {
    pageLoader.classList.add('is-active');
    pageLoader.setAttribute('aria-hidden', 'false');
    window.setTimeout(() => {
      pageLoader.classList.remove('is-active');
      pageLoader.setAttribute('aria-hidden', 'true');
      document.documentElement.classList.remove('page-transition-in');
    }, 360);
  }

  if (pageLoader) {
    document.addEventListener('click', event => {
      const target = event.target instanceof Element ? event.target : event.target?.parentElement;
      const link = target?.closest('a[href]');
      if (!link || event.defaultPrevented || event.button !== 0 ||
          event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (link.target && link.target !== '_self') return;
      if (link.hasAttribute('download') || link.relList.contains('external')) return;

      let destination;
      try {
        destination = new URL(link.href, window.location.href);
      } catch (_) {
        return;
      }
      if (destination.origin !== window.location.origin) return;
      if (destination.pathname === window.location.pathname &&
          destination.search === window.location.search) return;

      event.preventDefault();
      closeMenu();
      try {
        window.sessionStorage.setItem(TRANSITION_KEY, '1');
      } catch (_) {}
      pageLoader.classList.add('is-active');
      pageLoader.setAttribute('aria-hidden', 'false');
      window.setTimeout(() => window.location.assign(destination.href), 140);
    });
  }
})();
