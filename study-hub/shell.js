(function () {
  'use strict';

  const STORAGE_KEY = 'sh-redesign-v2';

  const SUBJECTS = [
    {
      id: 'geometry',
      icon: '📐',
      label: 'Geometry',
      name: 'Geometry',
      accent: '#1d4ed8',
      accentSoft: '#eff6ff',
      accentInk: '#1e3a8a',
      items: [
        {
          id: 'ch9',
          title: 'Ch 9: Right Triangles & Trigonometry',
          src: './geometry/ch9-test/'
        },
        {
          id: 'ch7-8',
          title: 'Ch 7–8: Quadrilaterals & Similarity',
          src: './geometry/ch7-8-test/'
        },
        {
          id: 'ch7',
          title: 'Ch 7: Quadrilaterals & Polygons',
          src: './geometry/ch7/'
        },
        {
          id: 'ch5-6',
          title: 'Ch 5–6: Congruent Triangles',
          children: [
            {
              id: 'ch5-6-test',
              title: 'Practice Test (13 Q + Proofs)',
              src: './geometry/ch5-6-practice/'
            },
            {
              id: 'ch5-quiz',
              title: 'Section Quiz (5.1–6.3)',
              src: './geometry/ch5/'
            },
            {
              id: 'ch5-6-review',
              title: 'Review Sheet',
              src: './geometry/ch5-6-review/'
            }
          ]
        },
        {
          id: 'ch3-4',
          title: 'Ch 3–4: Parallel Lines & Transformations',
          src: './geometry/'
        }
      ]
    },
    {
      id: 'biology',
      icon: '🧬',
      label: 'Living Earth',
      name: 'Living Earth',
      accent: '#047857',
      accentSoft: '#ecfdf5',
      accentInk: '#065f46',
      items: [
        {
          id: 'unit4',
          title: 'Unit 4: DNA, Proteins & Biotechnology',
          children: [
            {
              id: 'unit4-learning',
              title: 'Learning',
              src: './biology/unit4-learning/'
            },
            {
              id: 'unit4-test',
              title: 'Unit 4 Test',
              src: './biology/unit4-test/'
            }
          ]
        },
        {
          id: 'unit3',
          title: 'Unit 3: Ecosystems (Matter & Energy)',
          children: [
            {
              id: 'unit3-labs',
              title: 'Labs & Practice',
              src: './biology/labs/'
            },
            {
              id: 'unit3-review',
              title: 'Review Sheet',
              src: './biology/unit3-review/'
            }
          ]
        },
        {
          id: 'unit2',
          title: 'Unit 2: Cells & Mitosis',
          src: './biology/'
        }
      ]
    },
    {
      id: 'chinese',
      icon: '🀄️',
      label: 'Chinese',
      name: 'Chinese',
      accent: '#15803d',
      accentSoft: '#f0fdf4',
      accentInk: '#166534',
      items: [
        {
          id: 'practice',
          title: 'All Lessons & Flashcards',
          src: './chinese/'
        },
        {
          id: 'l13',
          title: 'Lesson 13',
          children: [
            {
              id: 'l13-d1',
              title: 'Dialogue 1 · 上哪儿',
              src: './chinese/?lesson=l13-d1',
              lesson: 'l13-d1'
            },
            {
              id: 'l13-d2',
              title: 'Dialogue 2 · 问路',
              src: './chinese/?lesson=l13-d2',
              lesson: 'l13-d2'
            }
          ]
        },
        {
          id: 'l12',
          title: 'Lesson 12',
          children: [
            {
              id: 'l12-d1',
              title: 'Dialogue 1 · 饭馆',
              src: './chinese/?lesson=l12-d1',
              lesson: 'l12-d1'
            },
            {
              id: 'l12-d2',
              title: 'Dialogue 2 · 学生餐厅',
              src: './chinese/?lesson=l12-d2',
              lesson: 'l12-d2'
            }
          ]
        },
        {
          id: 'l11',
          title: 'Lesson 11',
          children: [
            {
              id: 'l11-d1',
              title: 'Dialogue 1 · 天气',
              src: './chinese/?lesson=l11-d1',
              lesson: 'l11-d1'
            },
            {
              id: 'l11-d2',
              title: 'Dialogue 2 · 四季',
              src: './chinese/?lesson=l11-d2',
              lesson: 'l11-d2'
            }
          ]
        }
      ]
    },
    {
      id: 'health',
      icon: '🥗',
      label: 'Health',
      name: 'Health',
      accent: '#0f766e',
      accentSoft: '#f0fdfa',
      accentInk: '#115e59',
      items: [
        {
          id: 'nutrition',
          title: 'Nutrition Test Practice',
          src: './health/'
        }
      ]
    }
  ];

  const ITEM_ALIASES = {
    'ch9-test': 'ch9',
    'ch7-8-test': 'ch7-8',
    'ch5-6': 'ch5-6-test',
    'ch5-6-practice': 'ch5-6-test',
    'ch5': 'ch5-quiz',
    'unit4': 'unit4-learning',
    'unit4-learning': 'unit4-learning',
    'unit4-test': 'unit4-test',
    'unit3': 'unit3-labs',
    'labs': 'unit3-labs',
    'cells-mitosis': 'unit2',
    'chinese-app': 'practice',
    'l13': 'l13-d1',
    'l12': 'l12-d1',
    'l11': 'l11-d1'
  };

  const $ = id => document.getElementById(id);
  const subjectSelect = $('subjectSelect');
  const brandIcon = $('brandIcon');
  const leftNav = $('leftNav');
  const navList = $('navList');
  const contentArea = $('contentArea');
  const menuBtn = $('menuBtn');
  const drawerClose = $('drawerClose');
  const backdrop = $('backdrop');

  let state = { subjectId: SUBJECTS[0].id, itemId: SUBJECTS[0].items[0].id };
  let activeObserver = null;

  function flattenItems(sub) {
    const out = [];
    sub.items.forEach(item => {
      if (item.children && item.children.length) {
        item.children.forEach(c => out.push({ ...c, parentId: item.id }));
      } else {
        out.push({ ...item, parentId: item.id });
      }
    });
    return out;
  }

  function resolveItemId(sub, rawId) {
    const flat = flattenItems(sub);
    const aliased = ITEM_ALIASES[rawId] || rawId;
    const found = flat.find(i => i.id === aliased);
    return found ? found.id : flat[0].id;
  }

  function loadInitialState() {
    const params = new URLSearchParams(window.location.search);
    const qSub = params.get('subject');
    const qItem = params.get('item');

    let saved = null;
    try {
      saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    } catch (e) {}

    const subId = qSub || (saved && saved.subjectId) || SUBJECTS[0].id;
    const sub = SUBJECTS.find(s => s.id === subId) || SUBJECTS[0];
    const rawItem = qItem || (saved && saved.subjectId === sub.id && saved.itemId) || flattenItems(sub)[0].id;
    state = { subjectId: sub.id, itemId: resolveItemId(sub, rawItem) };
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('subject', state.subjectId);
      url.searchParams.set('item', state.itemId);
      history.replaceState(null, '', url.toString());
    } catch (e) {}
  }

  function currentSubject() {
    return SUBJECTS.find(s => s.id === state.subjectId) || SUBJECTS[0];
  }

  function currentItem(sub) {
    const flat = flattenItems(sub);
    return flat.find(i => i.id === state.itemId) || flat[0];
  }

  function applyTheme(sub) {
    const root = document.documentElement.style;
    root.setProperty('--accent', sub.accent);
    root.setProperty('--accent-soft', sub.accentSoft);
    root.setProperty('--accent-ink', sub.accentInk);
    brandIcon.textContent = sub.icon;
  }

  function openDrawer() {
    leftNav.classList.add('open');
    backdrop.classList.add('open');
  }

  function closeDrawer() {
    leftNav.classList.remove('open');
    if (!rightPanel.classList.contains('open')) backdrop.classList.remove('open');
  }

  function renderDropdown() {
    subjectSelect.innerHTML = SUBJECTS.map(
      s => `<option value="${s.id}"${s.id === state.subjectId ? ' selected' : ''}>${s.icon} ${s.label}</option>`
    ).join('');
  }

  function renderNav(sub, activeItem) {
    navList.innerHTML = sub.items
      .map(item => {
        if (item.children && item.children.length) {
          const groupActive = item.children.some(c => c.id === activeItem.id);
          const firstChild = item.children[0];
          const subs = item.children
            .map(c => `<button type="button" class="sh-nav-subitem${c.id === activeItem.id ? ' active' : ''}" data-item="${c.id}">${c.title}</button>`)
            .join('');
          return `
            <div class="sh-nav-group">
              <button type="button" class="sh-nav-item${groupActive ? ' active' : ''}" data-item="${firstChild.id}">
                <div class="sh-nav-title">${item.title}</div>
              </button>
              <div class="sh-nav-sublist">${subs}</div>
            </div>`;
        }
        return `
          <button type="button" class="sh-nav-item${item.id === activeItem.id ? ' active' : ''}" data-item="${item.id}">
            <div class="sh-nav-title">${item.title}</div>
          </button>`;
      })
      .join('');

    navList.querySelectorAll('[data-item]').forEach(btn => {
      btn.addEventListener('click', () => {
        selectItem(btn.dataset.item);
        closeDrawer();
      });
    });
  }

  function cleanEmbeddedChrome(doc) {
    const hideSelectors = [
      'a.back',
      'header.top a.back',
      '.top a.back',
      'a[href="../unit3-review/"]',
      'a[href*="unit3-review"]'
    ];
    doc.querySelectorAll(hideSelectors.join(',')).forEach(a => {
      const prev = a.previousSibling;
      if (prev && prev.nodeType === 3) {
        prev.textContent = prev.textContent.replace(/\s*·\s*$/, '');
      }
      const next = a.nextSibling;
      if (next && next.nodeType === 3) {
        next.textContent = next.textContent.replace(/^\s*·\s*/, '');
      }
      a.remove();
    });

    doc.querySelectorAll('.sub, p.sub, .brand .sub').forEach(el => {
      let html = el.innerHTML
        .replace(/(\s*·\s*){2,}/g, ' · ')
        .replace(/(\s*·\s*)+$/g, '')
        .replace(/^(\s*·\s*)+/g, '')
        .trim();
      el.innerHTML = html;
      const text = (el.textContent || '').trim();
      if (text && !/[A-Za-z0-9]/.test(text)) {
        el.remove();
      }
    });
  }

  function autoOpenChineseLesson(doc, lessonId) {
    if (!lessonId) return;
    let tries = 0;
    const attempt = () => {
      const card = doc.querySelector(`.lesson-card[data-lesson="${lessonId}"]`);
      if (card) {
        card.click();
        return;
      }
      if (++tries < 30) setTimeout(attempt, 60);
    };
    attempt();
  }

  function attachFrameEnhancements(iframe, sub, item) {
    if (activeObserver) {
      activeObserver.disconnect();
      activeObserver = null;
    }

    const syncHeight = () => {
      try {
        const doc = iframe.contentDocument;
        if (!doc || !doc.body) return;
        const h = Math.max(420, doc.body.scrollHeight);
        const target = h + 16;
        const cur = parseInt(iframe.style.height, 10) || 0;
        if (Math.abs(target - cur) > 2) {
          iframe.style.height = target + 'px';
        }
      } catch (e) {}
    };

    iframe.addEventListener('load', () => {
      try {
        const doc = iframe.contentDocument;
        if (!doc) return;
        const style = doc.createElement('style');
        const hideHeader = {
          geometry: 'header.top, body > .top { display: none !important; }',
          biology: 'header.top, body > .top { display: none !important; }',
          health: '.top { display: none !important; }',
          chinese: 'html, body { max-width: none !important; margin: 0 !important; background: #f7f7f7 !important; } #app { max-width: 480px !important; margin: 0 auto !important; min-height: 640px !important; } .home .subtitle { display: none !important; }'
        }[sub.id] || '';
        style.textContent = `
          html, body { min-height: 0 !important; height: auto !important; }
          #sh-version { display: none !important; }
          ${hideHeader}
        `;
        doc.head.appendChild(style);
        cleanEmbeddedChrome(doc);
        if (sub.id === 'chinese' && item.lesson) {
          autoOpenChineseLesson(doc, item.lesson);
        }
        syncHeight();

        if (typeof ResizeObserver !== 'undefined' && doc.body) {
          activeObserver = new ResizeObserver(syncHeight);
          activeObserver.observe(doc.body);
        }
        setTimeout(syncHeight, 250);
        setTimeout(syncHeight, 800);
      } catch (e) {}
    });
  }

  function renderCenter(sub, item) {
    contentArea.innerHTML = `<div class="sh-frame-wrap"><iframe id="contentFrame" class="sh-frame" src="${item.src}" title="${item.title}"></iframe></div>`;
    attachFrameEnhancements($('contentFrame'), sub, item);
  }

  function renderAll() {
    const sub = currentSubject();
    const item = currentItem(sub);
    state = { subjectId: sub.id, itemId: item.id };
    saveState();
    applyTheme(sub);
    renderDropdown();
    renderNav(sub, item);
    renderCenter(sub, item);
  }

  function selectSubject(subjectId) {
    const sub = SUBJECTS.find(s => s.id === subjectId) || SUBJECTS[0];
    const first = flattenItems(sub)[0];
    state = { subjectId: sub.id, itemId: first.id };
    renderAll();
  }

  function selectItem(itemId) {
    const sub = currentSubject();
    const flat = flattenItems(sub);
    const item = flat.find(i => i.id === itemId) || flat[0];
    state = { subjectId: sub.id, itemId: item.id };
    saveState();
    renderNav(sub, item);
    renderCenter(sub, item);
  }

  /* ---------------------------------------------------------- Timer */
  const TIMER_KEY = 'sh-timer-v1';
  const PRESETS = [5, 10, 15, 20, 30, 45, 60];
  const rightPanel = $('rightPanel');
  const timerPanel = $('timerPanel');
  const timerDisplay = $('timerDisplay');
  const timerStatus = $('timerStatus');
  const timerPresets = $('timerPresets');
  const timerCustom = $('timerCustom');
  const timerStart = $('timerStart');
  const timerPause = $('timerPause');
  const timerReset = $('timerReset');
  const timerPill = $('timerPill');
  const timerPillTime = $('timerPillTime');
  const timerClose = $('timerClose');

  let timer = {
    durationMs: 15 * 60 * 1000,
    remainingMs: 15 * 60 * 1000,
    endAt: null,
    running: false,
    done: false,
    alerted: false
  };
  let timerTick = null;
  let audioCtx = null;

  function openTimerPanel() {
    closeDrawer();
    rightPanel.classList.add('open');
    backdrop.classList.add('open');
  }

  function closeTimerPanel() {
    rightPanel.classList.remove('open');
    if (!leftNav.classList.contains('open')) backdrop.classList.remove('open');
  }

  function saveTimer() {
    try { localStorage.setItem(TIMER_KEY, JSON.stringify(timer)); } catch (e) {}
  }

  function loadTimer() {
    try {
      const saved = JSON.parse(localStorage.getItem(TIMER_KEY) || 'null');
      if (saved && typeof saved.durationMs === 'number') {
        timer.durationMs = saved.durationMs;
        timer.remainingMs = saved.remainingMs;
        timer.endAt = saved.endAt || null;
        timer.running = !!saved.running;
        timer.done = !!saved.done;
        timer.alerted = !!saved.alerted;
        if (timer.running && timer.endAt) {
          timer.remainingMs = Math.max(0, timer.endAt - Date.now());
          if (timer.remainingMs <= 0) {
            timer.remainingMs = 0;
            timer.running = false;
            timer.done = true;
            timer.endAt = null;
          }
        }
      }
    } catch (e) {}
  }

  function formatTime(ms) {
    const s = Math.max(0, Math.ceil(ms / 1000));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return String(m).padStart(2, '0') + ':' + String(r).padStart(2, '0');
  }

  function durationMinutes() {
    return Math.round(timer.durationMs / 60000);
  }

  function ensureAudio() {
    if (audioCtx) return audioCtx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    try { audioCtx = new AC(); } catch (e) { return null; }
    return audioCtx;
  }

  function beep() {
    const ctx = ensureAudio();
    if (!ctx) return;
    const start = () => {
      const now = ctx.currentTime;
      [0, 0.22, 0.44].forEach(offset => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = 880;
        gain.gain.setValueAtTime(0.0001, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.18, now + offset + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.2);
      });
    };
    if (ctx.state === 'suspended') ctx.resume().then(start).catch(() => {});
    else start();
  }

  function renderTimer() {
    const label = formatTime(timer.remainingMs);
    timerDisplay.textContent = label;
    timerPillTime.textContent = label;

    timerPanel.classList.toggle('running', timer.running);
    timerPanel.classList.toggle('done', timer.done);
    rightPanel.classList.toggle('done', timer.done);
    timerPill.classList.toggle('running', timer.running);
    timerPill.classList.toggle('done', timer.done);

    if (timer.done) timerStatus.textContent = "Time's up";
    else if (timer.running) timerStatus.textContent = 'Running';
    else if (timer.remainingMs > 0 && timer.remainingMs < timer.durationMs) timerStatus.textContent = 'Paused';
    else timerStatus.textContent = 'Ready';

    const mins = durationMinutes();
    const isCustom = PRESETS.indexOf(mins) === -1;
    timerPresets.querySelectorAll('.sh-timer-preset').forEach(btn => {
      const on = !isCustom && +btn.dataset.min === mins;
      btn.classList.toggle('on', on);
      btn.disabled = timer.running;
    });
    if (!document.activeElement || document.activeElement !== timerCustom) {
      timerCustom.value = isCustom ? String(mins) : '';
    }
    timerCustom.disabled = timer.running;

    timerStart.disabled = timer.running;
    timerStart.textContent = (!timer.running && timer.remainingMs > 0 && timer.remainingMs < timer.durationMs) ? 'Resume' : 'Start';
    timerStart.classList.toggle('primary', !timer.running);
    timerPause.disabled = !timer.running;
    timerPause.classList.toggle('primary', timer.running);
  }

  function tickTimer() {
    if (timer.running && timer.endAt) {
      timer.remainingMs = Math.max(0, timer.endAt - Date.now());
      if (timer.remainingMs <= 0) {
        timer.remainingMs = 0;
        timer.running = false;
        timer.done = true;
        timer.endAt = null;
        saveTimer();
        stopTicker();
        renderTimer();
        if (!timer.alerted) {
          timer.alerted = true;
          saveTimer();
          beep();
        }
        return;
      }
    }
    renderTimer();
  }

  function startTicker() {
    if (timerTick) return;
    timerTick = setInterval(tickTimer, 200);
  }

  function stopTicker() {
    if (timerTick) { clearInterval(timerTick); timerTick = null; }
  }

  function setDurationMinutes(mins) {
    if (timer.running) return;
    mins = Math.round(Number(mins));
    if (!isFinite(mins) || mins < 1) return;
    if (mins > 180) mins = 180;
    timer.durationMs = mins * 60 * 1000;
    timer.remainingMs = timer.durationMs;
    timer.endAt = null;
    timer.done = false;
    timer.alerted = false;
    saveTimer();
    renderTimer();
  }

  function startTimer() {
    if (timer.running) return;
    if (timer.done || timer.remainingMs <= 0) {
      timer.remainingMs = timer.durationMs;
      timer.done = false;
      timer.alerted = false;
    }
    ensureAudio();
    timer.running = true;
    timer.done = false;
    timer.endAt = Date.now() + timer.remainingMs;
    saveTimer();
    startTicker();
    renderTimer();
  }

  function pauseTimer() {
    if (!timer.running) return;
    timer.remainingMs = Math.max(0, (timer.endAt || Date.now()) - Date.now());
    timer.running = false;
    timer.endAt = null;
    saveTimer();
    stopTicker();
    renderTimer();
  }

  function resetTimer() {
    timer.remainingMs = timer.durationMs;
    timer.running = false;
    timer.endAt = null;
    timer.done = false;
    timer.alerted = false;
    saveTimer();
    stopTicker();
    renderTimer();
  }

  function initTimer() {
    loadTimer();
    timerPresets.addEventListener('click', e => {
      const btn = e.target.closest('.sh-timer-preset');
      if (!btn || btn.disabled) return;
      setDurationMinutes(+btn.dataset.min);
    });
    const applyCustom = () => {
      if (timer.running) return;
      const v = timerCustom.value.trim();
      if (v === '') return;
      setDurationMinutes(v);
    };
    timerCustom.addEventListener('change', applyCustom);
    timerCustom.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); applyCustom(); timerCustom.blur(); }
    });
    timerStart.addEventListener('click', startTimer);
    timerPause.addEventListener('click', pauseTimer);
    timerReset.addEventListener('click', resetTimer);
    timerPill.addEventListener('click', openTimerPanel);
    timerClose.addEventListener('click', closeTimerPanel);
    renderTimer();
    if (timer.running) startTicker();
    if (timer.done && !timer.alerted) {
      timer.alerted = true;
      saveTimer();
      beep();
    }
  }

  subjectSelect.addEventListener('change', e => selectSubject(e.target.value));
  menuBtn.addEventListener('click', () => { closeTimerPanel(); openDrawer(); });
  drawerClose.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', () => { closeDrawer(); closeTimerPanel(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeDrawer(); closeTimerPanel(); }
  });

  loadInitialState();
  renderAll();
  initTimer();
})();
