(() => {
  const playerContainer = document.getElementById('youtubePlayer');
  const placeholder = document.getElementById('videoPlaceholder');
  const status = document.getElementById('videoStatus');
  const welcome = document.getElementById('welcomeScreen');

  if (!playerContainer || !placeholder) return;

  // ID video berasal dari tautan YouTube yang diberikan untuk website Kelompok 6.
  const YOUTUBE_VIDEO_ID = 'QDia3e12czc';
  let playerCreated = false;

  const loadYouTubeVideo = () => {
    if (playerCreated) return;
    playerCreated = true;

    const iframe = document.createElement('iframe');
    const params = new URLSearchParams({
      autoplay: '1',
      loop: '1',
      playlist: YOUTUBE_VIDEO_ID,
      playsinline: '1',
      controls: '1',
      rel: '0',
      modestbranding: '1'
    });

    iframe.title = 'Video pengenalan Etika di Era Teknologi Informasi';
    iframe.src = `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?${params.toString()}`;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allowFullscreen = true;
    iframe.loading = 'eager';

    iframe.addEventListener('load', () => {
      placeholder.hidden = true;
      if (status) status.textContent = '';
    });

    iframe.addEventListener('error', () => {
      placeholder.hidden = false;
      if (status) status.textContent = 'Video tidak dapat dimuat. Periksa koneksi internet.';
      playerCreated = false;
    });

    playerContainer.appendChild(iframe);
  };

  // Pengunjung yang masih dalam masa 6 jam melewati Welcome Screen.
  // Browser dapat memblokir autoplay bersuara jika tidak ada interaksi baru.
  if (welcome && welcome.classList.contains('is-hidden')) {
    loadYouTubeVideo();
  }

  // Pengunjung baru memuat video setelah menekan tombol Masuk.
  // Karena iframe dibuat langsung dari rangkaian klik tersebut, browser
  // berkesempatan mengizinkan autoplay dengan suara. Kebijakan browser
  // tetap menentukan apakah autoplay bersuara benar-benar diizinkan.
  window.addEventListener('website:entered', loadYouTubeVideo);
})();
