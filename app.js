const letters = [
  { id:'alpha', upper:'Α', lower:'α', name:'Alpha', greekName:'ἄλφα', sound:'a as in “father”', pronounce:'ah', tip:'Pure open “ah”. Never the short English “a” in “cat”.', example:'ἀπόστολος', meaning:'apostle' },
  { id:'beta', upper:'Β', lower:'β', name:'Beta', greekName:'βῆτα', sound:'b as in “Bible”', pronounce:'bay', tip:'Hard “b”. (Historical Koine was shifting toward “v”.)', example:'βάπτισμα', meaning:'baptism' },
  { id:'gamma', upper:'Γ', lower:'γ', name:'Gamma', greekName:'γάμμα', sound:'g as in “go”', pronounce:'gay', tip:'Hard g. Before γ κ ξ χ it becomes “ng” (ἄγγελος = angel).', example:'γνῶσις', meaning:'knowledge' },
  { id:'delta', upper:'Δ', lower:'δ', name:'Delta', greekName:'δέλτα', sound:'d as in “dog”', pronounce:'day', tip:'', example:'δοῦλος', meaning:'servant' },
  { id:'epsilon', upper:'Ε', lower:'ε', name:'Epsilon', greekName:'ἒ ψιλόν', sound:'e as in “met”', pronounce:'eh', tip:'Always short. “Simple e”.', example:'ἐλπίς', meaning:'hope' },
  { id:'zeta', upper:'Ζ', lower:'ζ', name:'Zeta', greekName:'ζῆτα', sound:'z as in “zoo”', pronounce:'zay', tip:'', example:'ζωή', meaning:'life' },
  { id:'eta', upper:'Η', lower:'η', name:'Eta', greekName:'ἦτα', sound:'ay as in “day” / “obey”', pronounce:'the long ay sound as in the word day', tip:'Always long.', example:'ἡσυχία', meaning:'quiet' },
  { id:'theta', upper:'Θ', lower:'θ', name:'Theta', greekName:'θῆτα', sound:'th as in “thin”', pronounce:'thay', tip:'Voiceless “th”.', example:'θεός', meaning:'God' },
  { id:'iota', upper:'Ι', lower:'ι', name:'Iota', greekName:'ἰῶτα', sound:'i as in “machine”', pronounce:'ee', tip:'Usually long “ee”.', example:'ἰχθύς', meaning:'fish' },
  { id:'kappa', upper:'Κ', lower:'κ', name:'Kappa', greekName:'κάππα', sound:'k as in “kite”', pronounce:'kay', tip:'', example:'καλός', meaning:'good' },
  { id:'lambda', upper:'Λ', lower:'λ', name:'Lambda', greekName:'λάμβδα', sound:'l as in “love”', pronounce:'lay', tip:'', example:'λόγος', meaning:'word' },
  { id:'mu', upper:'Μ', lower:'μ', name:'Mu', greekName:'μῦ', sound:'m as in “mother”', pronounce:'moo', tip:'', example:'μαρτυρία', meaning:'testimony' },
  { id:'nu', upper:'Ν', lower:'ν', name:'Nu', greekName:'νῦ', sound:'n as in “new”', pronounce:'noo', tip:'Looks like English “v” but is “n”.', example:'νόμος', meaning:'law' },
  { id:'xi', upper:'Ξ', lower:'ξ', name:'Xi', greekName:'ξῖ', sound:'x / ks as in “box”', pronounce:'ksee', tip:'', example:'ξύλον', meaning:'wood' },
  { id:'omicron', upper:'Ο', lower:'ο', name:'Omicron', greekName:'ὂ μικρόν', sound:'o as in “not” (short)', pronounce:'oh', tip:'Always short. “Little o”.', example:'ὄνομα', meaning:'name' },
  { id:'pi', upper:'Π', lower:'π', name:'Pi', greekName:'πῖ', sound:'p as in “pie”', pronounce:'pee', tip:'', example:'πίστις', meaning:'faith' },
  { id:'rho', upper:'Ρ', lower:'ρ', name:'Rho', greekName:'ῥῶ', sound:'r (lightly rolled)', pronounce:'row', tip:'Often “hr” at the start of a word.', example:'ῥῆμα', meaning:'spoken word' },
  { id:'sigma', upper:'Σ', lower:'σ / ς', name:'Sigma', greekName:'σῖγμα', sound:'s as in “sit”', pronounce:'see', tip:'Use ς only at the end of a word; σ everywhere else.', example:'σάρξ', meaning:'flesh' },
  { id:'tau', upper:'Τ', lower:'τ', name:'Tau', greekName:'ταῦ', sound:'t as in “top”', pronounce:'tah', tip:'', example:'τέλος', meaning:'end' },
  { id:'upsilon', upper:'Υ', lower:'υ', name:'Upsilon', greekName:'ὖ ψιλόν', sound:'u as in “universe” / “oo”', pronounce:'oo', tip:'Often like French “u”.', example:'ὕδωρ', meaning:'water' },
  { id:'phi', upper:'Φ', lower:'φ', name:'Phi', greekName:'φῖ', sound:'f as in “phone”', pronounce:'fee', tip:'', example:'φῶς', meaning:'light' },
  { id:'chi', upper:'Χ', lower:'χ', name:'Chi', greekName:'χῖ', sound:'ch as in Scottish “loch” (kh)', pronounce:'kh', tip:'Guttural, not English “ch”.', example:'χάρις', meaning:'grace' },
  { id:'psi', upper:'Ψ', lower:'ψ', name:'Psi', greekName:'ψῖ', sound:'ps as in “lips”', pronounce:'ps', tip:'', example:'ψυχή', meaning:'soul' },
  { id:'omega', upper:'Ω', lower:'ω', name:'Omega', greekName:'ὦ μέγα', sound:'o as in “note” (long)', pronounce:'oh', tip:'Always long. Jesus is the Alpha and the Omega.', example:'ὥρα', meaning:'hour' }
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
let caseMode = localStorage.getItem('ka-case') || 'both'; // 'both' | 'upper' | 'lower'
let view = 'learn';
let selected = null;
let flashIdx = 0, flashShow = false;
let practice = { order: [], i: 0, show: false };
let quiz = { order: [], i: 0, score: 0, total: 0 };

function save() {
  localStorage.setItem('ka-mastered', JSON.stringify(mastered));
  localStorage.setItem('ka-case', caseMode);
  updateProgress();
}
function updateProgress() {
  const pct = Math.round(mastered.length / letters.length * 100);
  document.querySelector('.progress').style.width = pct + '%';
}
// Pre-load voices (helps iOS Safari)
if ('speechSynthesis' in window) {
  speechSynthesis.onvoiceschanged = () => {
    speechSynthesis.getVoices();
    if (view === 'ref') render();
  };
  speechSynthesis.getVoices();
}

let preferredVoice = localStorage.getItem('ka-voice') || '';

function getBestVoice() {
  const voices = speechSynthesis.getVoices();
  if (!voices.length) return null;

  // Prefer a saved voice
  if (preferredVoice) {
    const saved = voices.find(v => v.name === preferredVoice);
    if (saved) return saved;
  }

  // Prefer higher-quality English voices
  const prefer = [
    'Samantha', 'Alex', 'Daniel', 'Karen', 'Moira', 'Tessa', // macOS / iOS
    'Google US English', 'Google UK English Female', 'Google UK English Male',
    'Microsoft Aria', 'Microsoft Jenny', 'Microsoft Guy',
    'English United States', 'en-US'
  ];
  for (const name of prefer) {
    const v = voices.find(x => x.name.includes(name) || x.lang.includes(name));
    if (v) return v;
  }
  return voices.find(v => v.lang.startsWith('en')) || voices[0];
}

function speakFull(name, sound) {
  const spokenName = name === 'Eta' ? 'eata' : name;
  const spokenSound = name === 'Eta' ? 'day' : sound;
  speak(spokenName);
  setTimeout(() => speak(spokenSound), 900);
}

function speak(text) {
  if (!('speechSynthesis' in window)) {
    alert('Speech is not supported in this browser.');
    return;
  }

  speechSynthesis.cancel();
  setTimeout(() => {
    speechSynthesis.resume();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.58;
    utterance.pitch = 0.92;
    utterance.volume = 1;
    utterance.lang = 'en-US';

    const voice = getBestVoice();
    if (voice) utterance.voice = voice;

    speechSynthesis.speak(utterance);
  }, 100);
}

function setVoice(name) {
  preferredVoice = name;
  localStorage.setItem('ka-voice', name);
  render();
  speak('Voice set to ' + name);
}
function setView(v) {
  view = v;
  document.querySelectorAll('.nav button').forEach(b => b.classList.toggle('active', b.dataset.v === v));
  if (v === 'quiz') {
    quiz.order = [];
    quiz.i = 0;
    quiz.score = 0;
    quiz.total = 0;
  }
  if (v === 'practice') startPractice();
  if (v === 'flash') { flashIdx = 0; flashShow = false; }
  selected = null;
  render();
}
function toggleMastered(id) {
  mastered = mastered.includes(id) ? mastered.filter(x => x !== id) : [...mastered, id];
  save();
  render();
}

function setCaseMode(mode) {
  caseMode = mode;
  save();
  render();
}

function letterDisplay(l, big = false) {
  if (caseMode === 'upper') return `<div class="letter">${l.upper}</div>`;
  if (caseMode === 'lower') return `<div class="letter">${l.lower}</div>`;
  // both
  return `<div class="letter">${l.upper}</div><div class="lower">${l.lower}</div>`;
}

function renderLearn() {
  const caseToggle = `
    <div class="case-toggle">
      <button class="${caseMode==='both'?'active':''}" onclick="setCaseMode('both')">Both</button>
      <button class="${caseMode==='upper'?'active':''}" onclick="setCaseMode('upper')">Upper</button>
      <button class="${caseMode==='lower'?'active':''}" onclick="setCaseMode('lower')">Lower</button>
    </div>`;

  let cards = [];
  letters.forEach((l, i) => {
    cards.push(`
      <div class="card ${mastered.includes(l.id)?'mastered':''}" onclick="selected='${l.id}';render()">
        ${letterDisplay(l)}
        <div class="name">${l.name}</div>
      </div>`);
    if (selected === l.id) {
      const bigLetters = caseMode === 'upper' ? l.upper :
                         caseMode === 'lower' ? l.lower :
                         `${l.upper}<div style="font-size:2.2rem;color:#888;margin-top:.2rem">${l.lower}</div>`;
      cards.push(`<div class="detail detail-inline">
        <div class="detail-top">
          <div class="big">${bigLetters}</div>
          <div><h2>${l.name}</h2><div class="gn">${l.greekName}</div></div>
        </div>
        <div class="sound"><strong>${l.sound}</strong>${l.tip?`<br><em>${l.tip}</em>`:''}</div>
        <div><strong>Example</strong><div class="example">${l.example}</div><div>${l.meaning}</div></div>
        <div class="btn-row">
          <button class="btn-primary" onclick="speak('${l.id==='eta'?'eata':l.pronounce}')">Letter</button>
          <button class="btn-secondary" onclick="speakFull('${l.name}','${l.sound.replace(/“|”/g,'')}')">Full</button>
          <button class="btn-gold" onclick="toggleMastered('${l.id}')">${mastered.includes(l.id)?'Mastered ✓':'Mark mastered'}</button>
          <button class="btn-secondary" onclick="selected=null;render()">Close</button>
        </div>
      </div>`);
    }
  });

  return caseToggle + `<div class="grid">${cards.join('')}</div>`;
}

function renderFlash() {
  const l = letters[flashIdx];
  const shown = caseMode === 'upper' ? l.upper :
                caseMode === 'lower' ? l.lower :
                l.upper;
  return `<div style="text-align:center">
    <div class="flash-letter">${shown}${caseMode==='both' ? `<div style="font-size:3rem;color:#888;margin-top:.2rem">${l.lower}</div>` : ''}</div>
    ${flashShow ? `
      <h2>${l.name}</h2>
      <div class="gn" style="font-family:'Noto Serif',serif;font-size:1.2rem;color:#666">${l.greekName}</div>
      <div class="sound" style="text-align:left;margin:1rem 0"><strong>${l.sound}</strong><br>${l.tip||''}</div>
      <div class="example">${l.example} — ${l.meaning}</div>
    ` : '<p style="color:#888">Tap reveal to see the name and sound</p>'}
    <div class="btn-row" style="justify-content:center">
      <button class="btn-primary" onclick="flashShow=!flashShow;render()">${flashShow?'Hide':'Reveal'}</button>
      <button class="btn-secondary" onclick="speak('${l.pronounce}')">Letter</button>
      <button class="btn-secondary" onclick="speak('${l.name}')">Name</button>
      <button class="btn-secondary" onclick="flashIdx=(flashIdx+1)%letters.length;flashShow=false;render()">Next</button>
    </div>
    <p style="color:#888;margin-top:1rem">${flashIdx+1} / ${letters.length}</p>
  </div>`;
}

function startPractice() {
  practice.order = [...Array(letters.length).keys()].sort(() => Math.random() - 0.5);
  practice.i = 0;
  practice.show = false;
  renderPractice();
}

function renderPractice() {
  if (practice.i >= practice.order.length) {
    document.getElementById('main').innerHTML = `<div style="text-align:center;padding:2rem 0">
      <div class="quiz-letter">✓</div>
      <h2>Practice complete</h2>
      <p>You went through all ${letters.length} letters.</p>
      <div class="btn-row" style="justify-content:center">
        <button class="btn-primary" onclick="startPractice()">Practice again</button>
        <button class="btn-secondary" onclick="setView('learn')">Back</button>
      </div>
    </div>`;
    return;
  }

  const l = letters[practice.order[practice.i]];
  const shown = caseMode === 'upper' ? l.upper :
                caseMode === 'lower' ? l.lower :
                l.upper;

  document.getElementById('main').innerHTML = `<div style="text-align:center">
    <p style="color:#888;margin-bottom:.5rem">${practice.i + 1} of ${letters.length}</p>
    <div class="flash-letter">${shown}${caseMode==='both' ? `<div style="font-size:3rem;color:#888;margin-top:.2rem">${l.lower}</div>` : ''}</div>
    ${practice.show ? `
      <h2>${l.name}</h2>
      <div class="gn" style="font-family:'Noto Serif',serif;font-size:1.2rem;color:#666">${l.greekName}</div>
      <div class="sound" style="text-align:left;margin:1rem 0"><strong>${l.sound}</strong><br>${l.tip||''}</div>
      <div class="example">${l.example} — ${l.meaning}</div>
    ` : '<p style="color:#888">Tap reveal to see the name and sound</p>'}
    <div class="btn-row" style="justify-content:center">
      <button class="btn-primary" onclick="practice.show=!practice.show;renderPractice()">${practice.show?'Hide':'Reveal'}</button>
      <button class="btn-secondary" onclick="speak('${l.pronounce}')">Letter</button>
      <button class="btn-secondary" onclick="speakFull('${l.name}','${l.sound.replace(/“|”/g,'')}')">Full</button>
      <button class="btn-gold" onclick="practice.i++;practice.show=false;renderPractice()">Next</button>
    </div>
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
  const shown = caseMode === 'upper' ? correct.upper :
                caseMode === 'lower' ? correct.lower :
                correct.upper;
  const opts = [correct];
  while (opts.length < 4) {
    const r = letters[Math.floor(Math.random()*letters.length)];
    if (!opts.find(o=>o.id===r.id)) opts.push(r);
  }
  opts.sort(()=>Math.random()-.5);
  document.getElementById('main').innerHTML = `<div style="text-align:center">
    <p>Which letter is this?</p>
    <div class="quiz-letter">${shown}${caseMode==='both' ? `<div style="font-size:3rem;color:#888;margin-top:.15rem">${correct.lower}</div>` : ''}</div>
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
  const voices = ('speechSynthesis' in window) ? speechSynthesis.getVoices().filter(v => v.lang.startsWith('en')) : [];
  const voiceOptions = voices.map(v => 
    `<option value="${v.name}" ${v.name === preferredVoice ? 'selected' : ''}>${v.name}</option>`
  ).join('');

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
  <div class="note">Improper diphthongs (ᾳ ῃ ῳ) have a silent iota subscript.</div>

  <h3 style="margin:1.5rem 0 .6rem">Voice</h3>
  <p style="font-size:.9rem;color:#666;margin-bottom:.5rem">Choose a clearer voice for the Hear button (depends on your device).</p>
  <select id="voice-select" onchange="setVoice(this.value)" style="width:100%;padding:.7rem;border-radius:12px;border:1.5px solid var(--soft);font-size:1rem;background:white">
    <option value="">Auto (best available)</option>
    ${voiceOptions}
  </select>
  <button class="btn-secondary" style="margin-top:.6rem" onclick="speak('Alpha. a as in father')">Test voice</button>`;
}

function render() {
  const main = document.getElementById('main');
  if (view === 'learn') main.innerHTML = renderLearn();
  else if (view === 'flash') main.innerHTML = renderFlash();
  else if (view === 'practice') {
    if (!practice.order.length) startPractice();
    else renderPractice();
  }
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
