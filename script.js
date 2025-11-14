(function(){
const videoIds = [
  "dQw4w9WgXcQ","kXYiU_JCYtU","3JZ_D3ELwOQ","LsoLEjrDogU","fLexgOxsZu0",
  "nCkpzqqog4k","5qap5aO4i9A","IcrbM1l_BoI","sCNrK-n68CM","hTWKbfoikeg"
];
let muted = true;
const frame = document.getElementById('ytFrame');
const playlist = document.getElementById('playlist');

function setYt(id, autoplay=true){
  // autoplay=1, muted=1 to allow autoplay in browsers
  frame.src = 'https://www.youtube.com/embed/' + id + '?autoplay=' + (autoplay?1:0) + '&mute=' + (muted?1:0) + '&rel=0';
}

function pickRandom(){
  const id = videoIds[Math.floor(Math.random()*videoIds.length)];
  setYt(id,true);
  // set select value
  if(playlist) playlist.value = id;
}

document.getElementById('randBtn').addEventListener('click', pickRandom);
document.getElementById('muteBtn').addEventListener('click', ()=>{ muted = !muted; pickRandom(); });

// populate playlist select
videoIds.forEach(id=>{
  const o = document.createElement('option'); o.value = id; o.textContent = id; playlist.appendChild(o);
});
playlist.addEventListener('change', ()=> setYt(playlist.value, true));

// Auto-play on load (muted to satisfy browser policies)
window.addEventListener('load', ()=>{ pickRandom(); });

// YouTube search - opens YouTube results in new tab (no API key needed)
document.getElementById('ytSearchBtn').addEventListener('click', ()=>{
  const q = document.getElementById('ytQuery').value.trim();
  if(!q) return alert('Masukkan kata pencarian');
  window.open('https://www.youtube.com/results?search_query=' + encodeURIComponent(q), '_blank');
});

// Simple AI demo (rule-based)
document.getElementById('aiBtn').addEventListener('click', ()=>{
  const t = document.getElementById('aiInput').value.trim();
  const out = document.getElementById('aiOut');
  if(!t){ out.innerText = 'Silakan tulis pertanyaan.'; return; }
  const low = t.toLowerCase();
  if(low.includes('lagu')||low.includes('musik')) return out.innerText = 'Tekan tombol Random untuk rekomendasi lagu.';
  if(low.includes('motiv')||low.includes('semangat')) return out.innerText = 'Kamu pasti bisa — mulai dengan satu langkah kecil.';
  out.innerText = 'AI (demo): ' + t;
});

// theme toggle
document.getElementById('themeToggle').addEventListener('click', ()=>{
  document.body.classList.toggle('dark');
});
})();