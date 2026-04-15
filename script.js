/* =============================================
   LIQUID SOAP — CHEMISTRY PROJECT
   JavaScript
   ============================================= */

/* ---- PRELOADER ---- */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
  }, 1600);
});

/* ---- FLOATING BUBBLES ---- */
(function createBubbles() {
  const container = document.getElementById('bgBubbles');
  const count = 22;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.classList.add('bg-bubble');
    const size = 30 + Math.random() * 120;
    el.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      animation-duration: ${10 + Math.random() * 18}s;
      animation-delay: ${-Math.random() * 20}s;
    `;
    container.appendChild(el);
  }
})();

/* ---- NAVBAR: scroll class + active link ---- */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);

  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});

/* ---- HAMBURGER ---- */
const hamburger = document.getElementById('hamburger');
const navLinksWrapper = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinksWrapper.classList.toggle('open');
  hamburger.textContent = navLinksWrapper.classList.contains('open') ? '✕' : '☰';
});
navLinksWrapper.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinksWrapper.classList.remove('open');
    hamburger.textContent = '☰';
  });
});

/* ---- DARK / LIGHT THEME TOGGLE ---- */
const themeToggle = document.getElementById('themeToggle');
let isDark = true;

themeToggle.addEventListener('click', () => {
  isDark = !isDark;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeToggle.textContent = isDark ? '🌙' : '☀️';
});

/* ---- SCROLL REVEAL ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---- VIDEO MODAL ---- */
const videoModal = document.getElementById('videoModal');
const videoFrame = document.getElementById('videoFrame');

function openVideo(url) {
  videoFrame.src = url + '?autoplay=1&rel=0';
  videoModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeVideo(e) {
  if (e.target === videoModal) closeVideoBtn();
}

function closeVideoBtn() {
  videoModal.classList.remove('active');
  videoFrame.src = '';
  document.body.style.overflow = '';
}

/* ---- ZOOM MODAL ---- */
const zoomModal = document.getElementById('zoomModal');
const zoomContent = document.getElementById('zoomContent');

function openZoom(type) {
  const src = type === 'pfd'
    ? document.getElementById('pfd-wrap').innerHTML
    : document.getElementById('bd-wrap').innerHTML;
  zoomContent.innerHTML = src;
  zoomModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeZoom(e) {
  if (e.target === zoomModal) {
    zoomModal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* Close modals with ESC key */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    videoModal.classList.remove('active');
    videoFrame.src = '';
    zoomModal.classList.remove('active');
    document.body.style.overflow = '';
  }
});

/* ---- QUIZ ---- */
const quizData = [
  {
    question: "What is the primary chemical reaction in soap making?",
    options: ["Neutralization", "Saponification", "Oxidation", "Hydrolysis"],
    answer: 1,
    explanation: "Saponification is the reaction between a fat/oil and an alkali (NaOH or KOH) to produce soap and glycerol."
  },
  {
    question: "What role does Castor Oil play in this liquid soap formulation?",
    options: [
      "It acts as a preservative",
      "It is the primary alkali agent",
      "It provides fatty acids — the base of the soap molecule",
      "It adjusts the pH only"
    ],
    answer: 2,
    explanation: "Castor oil contains ricinoleic acid — the fatty acid that undergoes saponification to form soap molecules, while also conditioning the skin."
  },
  {
    question: "Why is ethanol added to the mixture?",
    options: [
      "To make the soap smell nice",
      "To act as a co-solvent helping oil and alkali mix",
      "To reduce the pH of the solution",
      "To prevent bacterial growth only"
    ],
    answer: 1,
    explanation: "Ethanol is miscible with both the oil and the water-based alkali solution, acting as a bridge solvent that allows them to mix uniformly."
  },
  {
    question: "What is the purpose of adding Sodium Chloride (NaCl) to the soap mixture?",
    options: [
      "To start the saponification reaction",
      "To neutralize excess acid",
      "To increase viscosity and thicken the soap",
      "To add fragrance"
    ],
    answer: 2,
    explanation: "NaCl 'salts out' the soap — causing it to separate and increasing the viscosity of the final liquid soap product."
  },
  {
    question: "Which safety hazard is associated with Sodium Hydroxide (NaOH)?",
    options: [
      "It is radioactive",
      "It is highly flammable",
      "It is extremely caustic and can cause severe chemical burns",
      "It releases toxic carbon monoxide"
    ],
    answer: 2,
    explanation: "NaOH is a strong base that reacts violently with organic tissue. Always wear gloves and goggles when handling it."
  },
  {
    question: "What temperature range is recommended for heating the soap mixture?",
    options: ["20–30°C", "45–55°C", "60–70°C", "100–120°C"],
    answer: 2,
    explanation: "60–70°C provides enough energy to complete saponification without boiling off the ethanol or degrading the soap quality."
  }
];

let currentQ = 0;
let score = 0;
let answered = false;
let userAnswers = [];

function renderQuiz() {
  const quizArea = document.getElementById('quizArea');
  const progress = document.getElementById('quizProgress');
  const counter = document.getElementById('quizCounter');

  if (currentQ >= quizData.length) {
    showResult();
    return;
  }

  const q = quizData[currentQ];
  const pct = (currentQ / quizData.length) * 100;
  progress.style.width = pct + '%';
  counter.textContent = `Question ${currentQ + 1} of ${quizData.length}`;
  answered = false;

  quizArea.innerHTML = `
    <div class="quiz-question">
      <h3>${currentQ + 1}. ${q.question}</h3>
    </div>
    <div class="quiz-options">
      ${q.options.map((opt, i) => `
        <button class="quiz-option" onclick="selectAnswer(${i})" data-idx="${i}">
          <span style="color:var(--text-muted);margin-right:0.6rem;font-weight:700">${String.fromCharCode(65+i)}.</span>
          ${opt}
        </button>
      `).join('')}
    </div>
    <div id="quizFeedback"></div>
    <div class="quiz-nav">
      <button class="btn-primary" onclick="nextQuestion()" id="nextBtn" style="display:none">
        ${currentQ === quizData.length - 1 ? 'See Results 🎯' : 'Next Question →'}
      </button>
    </div>
  `;
}

function selectAnswer(idx) {
  if (answered) return;
  answered = true;
  userAnswers.push(idx);

  const q = quizData[currentQ];
  const options = document.querySelectorAll('.quiz-option');
  const feedback = document.getElementById('quizFeedback');
  const nextBtn = document.getElementById('nextBtn');

  options.forEach(opt => opt.classList.add('disabled'));

  options[idx].classList.add(idx === q.answer ? 'correct' : 'wrong');
  if (idx !== q.answer) {
    options[q.answer].classList.add('correct');
  }

  const isRight = idx === q.answer;
  if (isRight) score++;

  feedback.innerHTML = `
    <div class="quiz-feedback ${isRight ? 'feedback-correct' : 'feedback-wrong'}">
      ${isRight ? '✅ Correct!' : '❌ Incorrect.'} ${q.explanation}
    </div>
  `;

  nextBtn.style.display = 'inline-flex';
}

function nextQuestion() {
  currentQ++;
  renderQuiz();
}

function showResult() {
  document.getElementById('quizProgress').style.width = '100%';
  document.getElementById('quizCounter').textContent = 'Quiz Complete!';
  document.getElementById('quizArea').style.display = 'none';
  document.getElementById('quizResult').style.display = 'block';

  const pct = Math.round((score / quizData.length) * 100);
  let emoji, title, msg;

  if (pct === 100) {
    emoji = '🏆'; title = 'Perfect Score!';
    msg = 'Outstanding! You have mastered the chemistry of liquid soap.';
  } else if (pct >= 80) {
    emoji = '🎉'; title = 'Excellent!';
    msg = 'Great work! You have a strong understanding of the material.';
  } else if (pct >= 60) {
    emoji = '👍'; title = 'Good Job!';
    msg = 'You passed! Review the incorrect answers to strengthen your knowledge.';
  } else {
    emoji = '📚'; title = 'Keep Studying!';
    msg = 'Don\'t worry — review the procedure and chemicals sections and try again!';
  }

  document.getElementById('resultIcon').textContent = emoji;
  document.getElementById('resultTitle').textContent = title;
  document.getElementById('resultScore').innerHTML = `You scored <strong>${score} / ${quizData.length}</strong> (${pct}%)`;
  document.getElementById('resultMsg').textContent = msg;
}

function restartQuiz() {
  currentQ = 0;
  score = 0;
  answered = false;
  userAnswers = [];
  document.getElementById('quizArea').style.display = 'block';
  document.getElementById('quizResult').style.display = 'none';
  renderQuiz();
}

/* Start quiz */
renderQuiz();

/* ---- STAR RATING ---- */
const stars = document.querySelectorAll('.star');
const starLabel = document.getElementById('starLabel');
const starLabels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent!'];
let selectedRating = 0;

stars.forEach(star => {
  star.addEventListener('mouseover', () => {
    const val = parseInt(star.dataset.val);
    stars.forEach(s => s.classList.toggle('active', parseInt(s.dataset.val) <= val));
  });
  star.addEventListener('mouseleave', () => {
    stars.forEach(s => s.classList.toggle('active', parseInt(s.dataset.val) <= selectedRating));
  });
  star.addEventListener('click', () => {
    selectedRating = parseInt(star.dataset.val);
    starLabel.textContent = starLabels[selectedRating];
    stars.forEach(s => s.classList.toggle('active', parseInt(s.dataset.val) <= selectedRating));
  });
});

/* ---- FEEDBACK FORM ---- */
document.getElementById('feedbackForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = document.getElementById('submitText');
  btn.textContent = 'Sending... ✨';

  setTimeout(() => {
    this.style.display = 'none';
    document.querySelector('.star-rating').style.display = 'none';
    document.getElementById('successMsg').style.display = 'block';
  }, 1200);
});

function resetForm() {
  document.getElementById('feedbackForm').reset();
  document.getElementById('feedbackForm').style.display = 'block';
  document.querySelector('.star-rating').style.display = 'block';
  document.getElementById('successMsg').style.display = 'none';
  document.getElementById('submitText').textContent = 'Send Feedback ✉️';
  selectedRating = 0;
  stars.forEach(s => s.classList.remove('active'));
  starLabel.textContent = 'Click to rate';
}

/* ---- SMOOTH NAV CLICK CLOSE ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
    }
  });
});

/* =============================================
   ANIMATED REACTION LAB
   ============================================= */
const LAB_STEPS = 7;
let labStep = 0;

/* Build dots */
const labDotsEl = document.getElementById('labDots');
for (let i = 0; i < LAB_STEPS; i++) {
  const d = document.createElement('div');
  d.className = 'lab-dot' + (i === 0 ? ' active' : '');
  d.addEventListener('click', () => goToLabStep(i));
  labDotsEl.appendChild(d);
}

/* Tab clicks */
document.querySelectorAll('.lab-tab').forEach(tab => {
  tab.addEventListener('click', () => goToLabStep(parseInt(tab.dataset.step)));
});

function goToLabStep(n) {
  // hide current
  document.getElementById('scene-' + labStep).classList.remove('active');
  document.querySelectorAll('.lab-tab')[labStep].classList.remove('active');
  document.querySelectorAll('.lab-dot')[labStep].classList.remove('active');

  labStep = n;

  // show new
  document.getElementById('scene-' + labStep).classList.add('active');
  document.querySelectorAll('.lab-tab')[labStep].classList.add('active');
  document.querySelectorAll('.lab-dot')[labStep].classList.add('active');

  document.getElementById('labPrev').disabled = labStep === 0;
  document.getElementById('labNext').disabled = labStep === LAB_STEPS - 1;

  // Trigger step-specific animations
  triggerStepAnimations(labStep);
}

function labNext() { if (labStep < LAB_STEPS - 1) goToLabStep(labStep + 1); }
function labPrev() { if (labStep > 0) goToLabStep(labStep - 1); }

function triggerStepAnimations(step) {
  if (step === 1) spawnDrips();
  if (step === 2) spawnSaltParticles('saltP1'); spawnSaltParticles('saltP2');
  if (step === 3) restartGauge();
  if (step === 4) spawnSaltParticles('naclP');
  if (step === 6) spawnFinalBubbles(); spawnSaltParticles('saltP1');
}

function spawnDrips() {
  const container = document.getElementById('naohDrips');
  if (!container) return;
  container.innerHTML = '';
  let count = 0;
  const iv = setInterval(() => {
    if (count++ > 18 || document.getElementById('scene-1')?.classList.contains('active') === false) {
      clearInterval(iv); return;
    }
    const d = document.createElement('div');
    d.style.cssText = `
      position:absolute; width:6px; height:12px; border-radius:0 0 50% 50%;
      background:rgba(126,200,227,0.9); left:${20 + Math.random()*20}px;
      animation: filterDrop 0.9s ease-in forwards;
    `;
    container.appendChild(d);
    setTimeout(() => d.remove(), 900);
  }, 280);
}

function spawnSaltParticles(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < 10; i++) {
    const p = document.createElement('div');
    p.className = 'salt-particle';
    p.style.cssText = `
      left: ${10 + Math.random() * 40}px;
      animation-delay: ${Math.random() * 1.5}s;
      animation-duration: ${0.6 + Math.random() * 0.8}s;
      width: ${3 + Math.random()*3}px; height: ${3 + Math.random()*3}px;
    `;
    container.appendChild(p);
  }
}

function restartGauge() {
  const fill = document.getElementById('gaugeFill');
  if (!fill) return;
  fill.style.animation = 'none';
  fill.offsetHeight; // reflow
  fill.style.animation = 'tempRise 3s ease-out forwards';
}

function spawnFinalBubbles() {
  const container = document.getElementById('soapBubblesFinal');
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < 12; i++) {
    const b = document.createElement('div');
    b.className = 'soap-final-bub';
    const size = 15 + Math.random() * 40;
    b.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*80+10}%;
      bottom:${Math.random()*30}%;
      animation-duration:${3+Math.random()*4}s;
      animation-delay:${Math.random()*3}s;
    `;
    container.appendChild(b);
  }
}

/* Init first step */
document.getElementById('labPrev').disabled = true;
triggerStepAnimations(0);