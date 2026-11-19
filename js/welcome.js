(() => {
  const screen = document.getElementById('welcomeScreen');
  const enterButton = document.getElementById('enterWebsite');
  if (!screen || !enterButton) return;

  const LOCAL_KEY = 'pai1dEtikaDigitalLastVisit';
  const SESSION_KEY = 'pai1dEtikaDigitalLastActivityInTab';
  const SIX_HOURS = 6 * 60 * 60 * 1000;
  const WINDOW_TOKEN = '__PAI1D_WELCOME_LAST_ACTIVITY__=';
  let entered = false;

  const readStorage = (storage, key) => {
    try { return Number(storage.getItem(key) || 0); }
    catch (error) { return 0; }
  };

  const writeStorage = (storage, key, value) => {
    try { storage.setItem(key, String(value)); }
    catch (error) { /* Fallback window.name tetap digunakan. */ }
  };

  const readWindowTime = () => {
    try {
      const match = String(window.name || '').match(/(?:^|;)__PAI1D_WELCOME_LAST_ACTIVITY__=(\d+)/);
      return match ? Number(match[1]) : 0;
    } catch (error) { return 0; }
  };

  const writeWindowTime = (timestamp) => {
    try {
      // Pertahankan bagian window.name lain jika sebelumnya sudah digunakan.
      const current = String(window.name || '');
      const cleaned = current
        .replace(/(?:^|;)__PAI1D_WELCOME_LAST_ACTIVITY__=\d+/g, '')
        .replace(/^;+|;+$/g, '');
      window.name = (cleaned ? cleaned + ';' : '') + WINDOW_TOKEN + timestamp;
    } catch (error) { /* Penyimpanan utama tetap dicoba. */ }
  };

  const getLastActivity = () => Math.max(
    readStorage(window.localStorage, LOCAL_KEY),
    readStorage(window.sessionStorage, SESSION_KEY),
    readWindowTime()
  );

  const recordActivity = () => {
    const timestamp = Date.now();
    writeStorage(window.localStorage, LOCAL_KEY, timestamp);
    writeStorage(window.sessionStorage, SESSION_KEY, timestamp);
    writeWindowTime(timestamp);
  };

  const hideWelcome = () => {
    screen.classList.add('is-hidden');
    document.documentElement.classList.add('welcome-suppressed');
    document.body.classList.remove('welcome-active');
  };

  const showWelcome = () => {
    entered = false;
    document.documentElement.classList.remove('welcome-suppressed');
    screen.classList.remove('is-hidden');
    document.body.classList.add('welcome-active');
  };

  const now = Date.now();
  const lastActivity = getLastActivity();
  const recentVisit = lastActivity > 0 &&
    now >= lastActivity &&
    now - lastActivity < SIX_HOURS;

  if (recentVisit) {
    entered = true;
    hideWelcome();
  } else {
    showWelcome();
  }

  // Aktivitas pengguna memperbarui waktu terakhir. window.name menjadi
  // fallback saat preview memakai file:// dan storage browser terisolasi.
  let lastWrite = 0;
  const updateActivity = () => {
    if (!entered) return;
    const now = Date.now();
    if (now - lastWrite >= 5000) {
      recordActivity();
      lastWrite = now;
    }
  };

  ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach(type => {
    window.addEventListener(type, updateActivity, { passive: true });
  });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState !== 'visible' || !entered) return;
    const last = getLastActivity();
    if (!last || Date.now() < last || Date.now() - last >= SIX_HOURS) {
      showWelcome();
    } else {
      recordActivity();
    }
  });

  enterButton.addEventListener('click', () => {
    entered = true;
    recordActivity();
    lastWrite = Date.now();
    hideWelcome();
    window.dispatchEvent(new Event('website:entered'));
  });
})();
