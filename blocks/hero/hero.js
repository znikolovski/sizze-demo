/**
 * Hero Block
 * Supports a single slide (simple passthrough) or multiple slides authored
 * as separate rows, rendered as a real carousel with pagination dots and a
 * play/pause toggle, matching the real Kmart Australia homepage hero.
 *
 * Authoring model: each direct child of the block is one slide. A slide with
 * only one child (a single cell) is rendered as-is (no gallery machinery
 * needed for single-slide heroes/CTA banners). Multiple rows = multiple
 * slides, and carousel controls are added automatically.
 */

function goToSlide(block, index) {
  const slides = [...block.querySelectorAll('.hero-slide')];
  const dots = [...block.querySelectorAll('.hero-dot')];
  slides.forEach((slide, i) => {
    slide.classList.toggle('is-active', i === index);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('is-active', i === index);
  });
  block.dataset.activeSlide = index;
}

export default function decorate(block) {
  const rows = [...block.children];

  if (rows.length <= 1) {
    // Single slide: no carousel machinery needed.
    if (rows[0]) rows[0].classList.add('hero-slide', 'is-active');
    return;
  }

  const track = document.createElement('div');
  track.className = 'hero-track';

  rows.forEach((row, i) => {
    row.classList.add('hero-slide');
    if (i === 0) row.classList.add('is-active');
    // Force-eager-load every slide's image up front so switching slides
    // never shows a flash of missing background while a lazy image fetches.
    row.querySelectorAll('img').forEach((img) => {
      img.loading = 'eager';
    });
    track.append(row);
  });

  block.append(track);

  const controls = document.createElement('div');
  controls.className = 'hero-controls';

  const playPause = document.createElement('button');
  playPause.type = 'button';
  playPause.className = 'hero-play-pause';
  playPause.setAttribute('aria-label', 'Pause carousel');
  playPause.innerHTML = '<span class="hero-pause-icon"></span>';

  const dotsWrap = document.createElement('div');
  dotsWrap.className = 'hero-dots';
  rows.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'hero-dot';
    if (i === 0) dot.classList.add('is-active');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => {
      goToSlide(block, i);
      restartAutoplay();
    });
    dotsWrap.append(dot);
  });

  controls.append(playPause, dotsWrap);
  block.append(controls);

  let current = 0;
  let playing = true;
  let timer = null;

  function advance() {
    current = (current + 1) % rows.length;
    goToSlide(block, current);
  }

  function restartAutoplay() {
    if (timer) clearInterval(timer);
    if (playing) timer = setInterval(advance, 5000);
  }

  playPause.addEventListener('click', () => {
    playing = !playing;
    playPause.classList.toggle('is-paused', !playing);
    playPause.setAttribute('aria-label', playing ? 'Pause carousel' : 'Play carousel');
    if (playing) restartAutoplay();
    else if (timer) clearInterval(timer);
  });

  restartAutoplay();
}
