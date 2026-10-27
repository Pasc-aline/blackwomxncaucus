document.documentElement.classList.add('js');
// ============================================================
// BLACK WOMXN CAUCUS — shared behaviour
// ============================================================

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('nav.links');
  if(toggle && links){
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'primary-nav');
    links.id = 'primary-nav';
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, {threshold:0, rootMargin:'0px 0px -6% 0px'});
    reveals.forEach(el => io.observe(el));
    // safety net: if anything is still hidden after a few seconds, show it
    setTimeout(() => reveals.forEach(el => el.classList.add('in')), 4000);
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  // ---------------- Global audio/mute control ----------------
  // Persists across pages via localStorage. Any <video>/<audio>
  // tagged data-audio="true" is kept in sync with this state.
  const KEY = 'bwc-audio-enabled';
  const btn = document.querySelector('.audio-toggle');
  const label = btn ? btn.querySelector('.label') : null;

  function isEnabled(){
    return localStorage.getItem(KEY) === 'on';
  }
  function applyState(){
    const on = isEnabled();
    document.querySelectorAll('[data-audio="true"]').forEach(m => { m.muted = !on; });
    if(btn){
      btn.classList.toggle('muted', !on);
      if(label) label.textContent = on ? 'Sound on' : 'Sound off';
    }
  }
  if(btn){
    btn.addEventListener('click', () => {
      const nowOn = !isEnabled();
      localStorage.setItem(KEY, nowOn ? 'on' : 'off');
      btn.setAttribute('aria-pressed', String(nowOn));
      applyState();
    });
  }
  applyState();

  // ---------------- Read-aloud (screen-reader-free support) ----------------
  // Uses the browser's built-in text-to-speech (Web Speech API) so blind or
  // low-vision visitors can hear the page's content even without their own
  // screen-reader software installed. Reads the visible text inside <main>.
  const readBtn = document.getElementById('readAloudBtn');
  if(readBtn && 'speechSynthesis' in window){
    const synth = window.speechSynthesis;
    let speaking = false;

    function getPageText(){
      const main = document.getElementById('main');
      if(!main) return '';
      // Walk visible text nodes, skipping scripts/buttons/icons
      const clone = main.cloneNode(true);
      clone.querySelectorAll('button, script, .a11y-bar').forEach(el => el.remove());
      return clone.innerText.replace(/\s+/g, ' ').trim();
    }

    function stop(){
      synth.cancel();
      speaking = false;
      readBtn.classList.remove('active');
      readBtn.querySelector('.label').textContent = 'Listen to this page';
      readBtn.setAttribute('aria-pressed', 'false');
    }

    readBtn.addEventListener('click', () => {
      if(speaking){ stop(); return; }
      const text = getPageText();
      if(!text) return;
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 1;
      utter.onend = stop;
      utter.onerror = stop;
      synth.cancel(); // clear any queued speech first
      synth.speak(utter);
      speaking = true;
      readBtn.classList.add('active');
      readBtn.querySelector('.label').textContent = 'Stop reading';
      readBtn.setAttribute('aria-pressed', 'true');
    });

    // Stop reading if the visitor navigates away
    window.addEventListener('beforeunload', () => synth.cancel());
  } else if(readBtn){
    // Browser doesn't support speech synthesis — hide the control rather
    // than offering something that silently fails
    readBtn.style.display = 'none';
  }
});

// Simple play/pause handler for video cards on the Media page
function toggleVideo(id){
  const vid = document.getElementById(id);
  if(!vid) return;
  const card = vid.closest('.video-card');
  if(vid.paused){
    vid.play();
    card.classList.add('playing');
  } else {
    vid.pause();
    card.classList.remove('playing');
  }
}
