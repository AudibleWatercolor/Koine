const letters = [
  { id:'alpha', upper:'Α', lower:'α', name:'Alpha', greekName:'ἄλφα', sound:'a as in “father”', tip:'Pure open “ah”. Never the short English “a” in “cat”.', example:'ἀπόστολος', meaning:'apostle' },
  { id:'beta', upper:'Β', lower:'β', name:'Beta', greekName:'βῆτα', sound:'b as in “Bible”', tip:'Hard “b”. (Historical Koine was shifting toward “v”.)', example:'βάπτισμα', meaning:'baptism' },
  { id:'gamma', upper:'Γ', lower:'γ', name:'Gamma', greekName:'γάμμα', sound:'g as in “go”', tip:'Hard g. Before γ κ ξ χ it becomes “ng” (ἄγγελος = angel).', example:'γνῶσις', meaning:'knowledge' },
  { id:'delta', upper:'Δ', lower:'δ', name:'Delta', greekName:'δέλτα', sound:'d as in “dog”', tip:'', example:'δοῦλος', meaning:'servant' },
  { id:'epsilon', upper:'Ε', lower:'ε', name:'Epsilon', greekName:'ἒ ψιλόν', sound:'e as in “met”', tip:'Always short. “Simple e”.', example:'ἐλπίς', meaning:'hope' },
  { id:'zeta', upper:'Ζ', lower:'ζ', name:'Zeta', greekName:'ζῆτα', sound:'z as in “zoo”', tip:'', example:'ζωή', meaning:'life' },
  { id:'eta', upper:'Η', lower:'η', name:'Eta', greekName:'ἦτα', sound:'ay as in “day” / “obey”', tip:'Always long.', example:'ἡσυχία', meaning:'quiet' },
  { id:'theta', upper:'Θ', lower:'θ', name:'Theta', greekName:'θῆτα', sound:'th as in “thin”', tip:'Voiceless “th”.', example:'θεός', meaning:'God' },
  { id:'iota', upper:'Ι', lower:'ι', name:'Iota', greekName:'ἰῶτα', sound:'i as in “machine”', tip:'Usually long “ee”.', example:'ἰχθύς', meaning:'fish' },
  { id:'kappa', upper:'Κ', lower:'κ', name:'Kappa', greekName:'κάππα', sound:'k as in “kite”', tip:'', example:'καλός', meaning:'good' },
  { id:'lambda', upper:'Λ', lower:'λ', name:'Lambda', greekName:'λάμβδα', sound:'l as in “love”', tip:'', example:'λόγος', meaning:'word' },
  { id:'mu', upper:'Μ', lower:'μ', name:'Mu', greekName:'μῦ', sound:'m as in “mother”', tip:'', example:'μαρτυρία', meaning:'testimony' },
  { id:'nu', upper:'Ν', lower:'ν', name:'Nu', greekName:'νῦ', sound:'n as in “new”', tip:'Looks like English “v” but is “n”.', example:'νόμος', meaning:'law' },
  { id:'xi', upper:'Ξ', lower:'ξ', name:'Xi', greekName:'ξῖ', sound:'x / ks as in “box”', tip:'', example:'ξύλον', meaning:'wood' },
  { id:'omicron', upper:'Ο', lower:'ο', name:'Omicron', greekName:'ὂ μικρόν', sound:'o as in “not” (short)', tip:'Always short. “Little o”.', example:'ὄνομα', meaning:'name' },
  { id:'pi', upper:'Π', lower:'π', name:'Pi', greekName:'πῖ', sound:'p as in “pie”', tip:'', example:'πίστις', meaning:'faith' },
  { id:'rho', upper:'Ρ', lower:'ρ', name:'Rho', greekName:'ῥῶ', sound:'r (lightly rolled)', tip:'Often “hr” at the start of a word.', example:'ῥῆμα', meaning:'spoken word' },
  { id:'sigma', upper:'Σ', lower:'σ / ς', name:'Sigma', greekName:'σῖγμα', sound:'s as in “sit”', tip:'Use ς only at the end of a word; σ everywhere else.', example:'σάρξ', meaning:'flesh' },
  { id:'tau', upper:'Τ', lower:'τ', name:'Tau', greekName:'ταῦ', sound:'t as in “top”', tip:'', example:'τέλος', meaning:'end' },
  { id:'upsilon', upper:'Υ', lower:'υ', name:'Upsilon', greekName:'ὖ ψιλόν', sound:'u as in “universe” / “oo”', tip:'Often like French “u”.', example:'ὕδωρ', meaning:'water' },
  { id:'phi', upper:'Φ', lower:'φ', name:'Phi', greekName:'φῖ', sound:'f as in “phone”', tip:'', example:'φῶς', meaning:'light' },
  { id:'chi', upper:'Χ', lower:'χ', name:'Chi', greekName:'χῖ', sound:'ch as in Scottish “loch” (kh)', tip:'Guttural, not English “ch”.', example:'χάρις', meaning:'grace' },
  { id:'psi', upper:'Ψ', lower:'ψ', name:'Psi', greekName:'ψῖ', sound:'ps as in “lips”', tip:'', example:'ψυχή', meaning:'soul' },
  { id:'omega', upper:'Ω', lower:'ω', name:'Omega', greekName:'ὦ μέγα', sound:'o as in “note” (long)', tip:'Always long. Jesus is the Alpha and the Omega.', example:'ὥρα', meaning:'hour' }
];

const diphthongs = [
  { l:'αι', s:'ai as in “aisle”', ex:'αἰών — age' },
  { l:'ει', s:'ei as in “eight”', ex:'χείρ — hand' },
  { l:'οι', s:'oi as in “oil”', ex:'οἶνος — wine' },
  { l:'υι', s:'ui as in “queen”', ex:'υἱός — son' },
  { l:'αυ', s:'au as in “house”', ex:'Παῦλος — Paul' },
  { l:'ευ', s:'eu as in “feud”', ex:'εὐαγγέλιον — gospel' },
  { l:'ου', s:'oo as in “soup”', ex:'Ἰησοῦς — Jesus' },
  { l:'ηυ', s:'similar to ευ', ex:'rare' }
];

let mastered = JSON.parse(localStorage.getItem('ka-mastered') || '[]');
let view = 'learn';
let selected = null;
let flashIdx = 0, flashShow = false;
let quiz = { order:[], i:0, score:0, total:0 };

function save() {
  localStorage.setItem('ka-mastered', JSON.stringify(mastered));
  updateProgress();
}
function updateProgress() {
  const pct = Math.round(mastered.length / letters.length * 100);
  document.querySelector('.progress').style.width = pct + '%';
}
function speak(text) {
  if (!('speechSynthesis' in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.85;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}
function setView(v) {
  view = v;
  document.querySelectorAll('.nav button').forEach(b => b.classList.toggle('active', b.dataset.v === v));
  if (v === 'quiz') quiz.order = [];
  if (v === 'flash') { flashIdx = 0; flashShow = false; }
  selected = null;
  render();
}
function toggleMastered(id) {
  mastered = mastered.includes(id) ? mastered.filter(x => x !== id) : [...mastered, id];
  save();
  render();
}

function renderLearn() {
  const grid = letters.map(l => `
    <div class="card ${mastered.includes(l.id)?'mastered':''}" onclick="selected='${l.id}';render()">
      <div class="letter">${l.upper}</div>
      <div class="lower">${l.lower}</div>
      <div class="name">${l.name}</div>
    </div>`).join('');
  let det = '';
  if (selected) {
    const l = letters.find(x => x.id === selected);
    det = `<div class="detail">
      <div class="detail-top">
        <div class="big">${l.upper}<div style="font-size:2.2rem;color:#888;margin-top:.2rem">${l.lower}</div></div>
        <div><h2>${l.name}</h2><div class="gn">${l.greekName}</div></div>
      </div>
      <div class="sound"><strong>${l.sound}</strong>${l.tip?`<br><em>${l.tip}</em>`:''}</div>
      <div><strong>Example</strong><div class="example">${l.example}</div><div>${l.meaning}</div></div>
      <div class="btn-row">
        <button class="btn-primary" onclick="speak('${l.name}. ${l.sound}')">Hear</button>
        <button class="btn-gold" onclick="toggleMastered('${l.id}')">${mastered.includes(l.id)?'Mastered ✓':'Mark mastered'}</button>
        <button class="btn-secondary" onclick="selected=null;render()">Close</button>
      </div>
    </div>`;
  }
  return `<div class="grid">${grid}</div>${det}`;
}

function renderFlash() {
  const l = letters[flashIdx];
  return `<div style="text-align:center">
    <div class="flash-letter">${l.upper}</div>
    ${flashShow ? `
      <h2>${l.name}</h2>
      <div class="gn" style="font-family:'Noto Serif',serif;font-size:1.2rem;color:#666">${l.greekName}</div>
      <div class="sound" style="text-align:left;margin:1rem 0"><strong>${l.sound}</strong><br>${l.tip||''}</div>
      <div class="example">${l.example} — ${l.meaning}</div>
    ` : '<p style="color:#888">Tap reveal to see the name and sound</p>'}
    <div class="btn-row" style="justify-content:center">
      <button class="btn-primary" onclick="flashShow=!flashShow;render()">${flashShow?'Hide':'Reveal'}</button>
      <button class="btn-secondary" onclick="speak('${l.name}')">Hear</button>
      <button class="btn-secondary" onclick="flashIdx=(flashIdx+1)%letters.length;flashShow=false;render()">Next</button>
    </div>
    <p style="color:#888;margin-top:1rem">${flashIdx+1} / ${letters.length}</p>
  </div>`;
}

function startQuiz() {
  quiz.order = [...Array(letters.length).keys()].sort(()=>Math.random()-.5).slice(0,12);
  quiz.i = 0; quiz.score = 0; quiz.total = 0;
  showQuiz();
}
function showQuiz() {
  if (quiz.i >= quiz.order.length) {
    document.getElementById('main').innerHTML = `<div style="text-align:center;padding:2rem 0">
      <div class="quiz-letter">${quiz.score}/${quiz.total}</div>
      <h2>${quiz.score===quiz.total?'Excellent!':'Well done'}</h2>
      <p>You answered ${quiz.score} of ${quiz.total} correctly.</p>
      <div class="btn-row" style="justify-content:center">
        <button class="btn-primary" onclick="startQuiz()">New Quiz</button>
        <button class="btn-secondary" onclick="setView('learn')">Back</button>
      </div>
    </div>`;
    return;
  }
  const correct = letters[quiz.order[quiz.i]];
  const opts = [correct];
  while (opts.length < 4) {
    const r = letters[Math.floor(Math.random()*letters.length)];
    if (!opts.find(o=>o.id===r.id)) opts.push(r);
  }
  opts.sort(()=>Math.random()-.5);
  document.getElementById('main').innerHTML = `<div style="text-align:center">
    <p>Which letter is this?</p>
    <div class="quiz-letter">${correct.upper}</div>
    <div class="options">
      ${opts.map(o=>`<button onclick="answer('${o.id}','${correct.id}',this)">${o.name}</button>`).join('')}
    </div>
    <p style="color:#888;margin-top:1rem">Score ${quiz.score} / ${quiz.total}</p>
  </div>`;
}
function answer(chosen, correctId, el) {
  quiz.total++;
  const btns = el.parentElement.querySelectorAll('button');
  btns.forEach(b=>b.disabled=true);
  if (chosen === correctId) {
    quiz.score++;
    el.classList.add('correct');
  } else {
    el.classList.add('wrong');
    btns.forEach(b => { if (b.textContent === letters.find(l=>l.id===correctId).name) b.classList.add('correct'); });
  }
  setTimeout(()=>{ quiz.i++; showQuiz(); }, 800);
}

function renderReference() {
  return `<div class="note">
    <strong>Key notes</strong><br>
    • Sigma: <strong>σ</strong> medial, <strong>ς</strong> final only.<br>
    • Gamma becomes “ng” before γ κ ξ χ.<br>
    • Rough breathing (῾) adds “h”; smooth (᾿) does not.<br>
    • Accents mark the stressed syllable.
  </div>
  <h3 style="margin:1.2rem 0 .6rem">Common Diphthongs</h3>
  <div class="dip-grid">
    ${diphthongs.map(d=>`<div class="dip"><div class="l">${d.l}</div><div>${d.s}</div><div style="font-size:.8rem;color:#666;margin-top:.3rem">${d.ex}</div></div>`).join('')}
  </div>
  <div class="note">Improper diphthongs (ᾳ ῃ ῳ) have a silent iota subscript.</div>`;
}

function render() {
  const main = document.getElementById('main');
  if (view === 'learn') main.innerHTML = renderLearn();
  else if (view === 'flash') main.innerHTML = renderFlash();
  else if (view === 'quiz') {
    if (!quiz.order.length) startQuiz();
    else showQuiz();
  }
  else if (view === 'ref') main.innerHTML = renderReference();
  updateProgress();
}

document.querySelectorAll('.nav button').forEach(b => b.addEventListener('click', () => setView(b.dataset.v)));

// PWA install
let deferred;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferred = e;
  document.getElementById('install').style.display = 'block';
});
function installApp() {
  if (deferred) {
    deferred.prompt();
    deferred.userChoice.then(() => { document.getElementById('install').style.display = 'none'; deferred = null; });
  }
}

// Service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(()=>{});
}

render();
updateProgress();
