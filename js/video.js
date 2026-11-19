(() => {
  const video = document.getElementById('introVideo');
  const placeholder = document.getElementById('videoPlaceholder');
  if (!video || !placeholder) return;

  const showPlaceholder = () => { placeholder.hidden = false; };
  const hidePlaceholder = () => { placeholder.hidden = true; };
  video.addEventListener('loadeddata', hidePlaceholder);
  video.addEventListener('error', showPlaceholder);
  video.addEventListener('emptied', showPlaceholder);

  const tryPlay = (muted) => {
    video.muted = muted;
    const attempt = video.play();
    if (attempt && typeof attempt.catch === 'function') {
      attempt.catch(() => {
        // Browser may block autoplay. Native controls remain available to the visitor.
        showPlaceholder();
      });
    }
  };

  // A returning visitor may bypass the welcome screen. Muted autoplay is used
  // because browsers generally restrict autoplay with sound without a gesture.
  const welcome = document.getElementById('welcomeScreen');
  if (welcome && welcome.classList.contains('is-hidden')) tryPlay(true);

  // A click on the welcome button is a user gesture; try to play with sound.
  window.addEventListener('website:entered', () => tryPlay(false));
})();
