// ============================================================
//  ChemCalc Pro — app.js
//  % p/p = (medida − agua_usuario − Col_C) / Col_B
//    Col_B = columna B del CSV | Col_C = columna C del CSV
// ============================================================

const CHEMICALS = [
  { name: "ACIDBRITE 9", a: 3.4841, b: 2.1568 },
  { name: "ACIFOAM", a: 4.0331, b: 1.7638 },
  { name: "ACIPLUSFOAM", a: 6.274, b: 1.89 },
  { name: "ALUWASH", a: 3.5413, b: 2.1157 },
  { name: "BASIC", a: 32.295, b: 3.8175 },
  { name: "BRELTAK", a: 42.036, b: 3.7614 },
  { name: "BRELTAK PLUS", a: 36.238, b: 4.2337 },
  { name: "BRIGHTWASH", a: 2.3319, b: 0.1418 },
  { name: "BRITESTAR", a: 15.293, b: 1.826 },
  { name: "BRUSPRAY ACID", a: 4.1549, b: 2.1283 },
  { name: "CAPTURE", a: 4.7071, b: 0.7258 },
  { name: "CIPTON", a: 11.678, b: 1.5323 },
  { name: "CLEANFOAM", a: 4.3975, b: 1.135 },
  { name: "CLENEBRITE", a: 15.029, b: 2.4416 },
  { name: "DELLADET", a: 0.8383, b: 0.1053 },
  { name: "DELTAFOAM", a: 0.9283, b: 0.0685 },
  { name: "DEOGEN", a: 5.1556, b: 0.4647 },
  { name: "DESCALE", a: 3.56, b: 3.06 },
  { name: "DIVERCLEAN SMS CHLOR", a: 2.199, b: null },
  { name: "DIVERFLOW OSA-N", a: 11.3, b: 0.35 },
  { name: "DIVERFLOW OSA-P", a: 3.18, b: 1.58 },
  { name: "DIVERFLOW SA", a: 2.7968, b: 0.2403 },
  { name: "DIVERFOAM SANIBRIGHT", a: 3.4186, b: null },
  { name: "DIVERSPRAY", a: 21.511, b: 3.3293 },
  { name: "DIVERWASH HD7", a: 0.6189, b: 0.229 },
  { name: "DIVOFLOW NBE", a: 9.3468, b: 1.254 },
  { name: "DIVOFLOW NTC", a: 7.5468, b: 0.6608 },
  { name: "DIVOS 110", a: 4.7543, b: 0.381 },
  { name: "DIVOS 116", a: 6.2529, b: 0.5114 },
  { name: "DIVOS 120 CL", a: 5.7877, b: 0.6986 },
  { name: "DIVOS 124", a: 14.957, b: 1.1952 },
  { name: "DIVOS 2", a: 18.499, b: 1.7944 },
  { name: "DIVOSAN BG", a: 28.498, b: 2.0633 },
  { name: "DIVOSAN DB", a: 7.025, b: 0.2304 },
  { name: "DIVOSAN MEZZO", a: 3.697, b: 0.4218 },
  { name: "DIVOSAN OMEGA", a: 6.204, b: 0.8564 },
  { name: "DIVOSAN SUREDIS", a: 1.2989, b: 1.2667 },
  { name: "DIVOSAN TC86", a: 6.796, b: 1.0266 },
  { name: "DIVOSAN TRACE", a: 12.25, b: -0.2875 },
  { name: "DIVOSTAR QUATTRO", a: 21.985, b: 2.4483 },
  { name: "ELEMENTAL", a: 10.55, b: 3.0111 },
  { name: "ENDUROCHLOR", a: 4.8302, b: 0.3892 },
  { name: "ENDUROCID", a: 2.4442, b: 2.5674 },
  { name: "ENDUROECO", a: 2.3192, b: 2.5197 },
  { name: "ENDUROFORCE", a: 10.038, b: 1.621 },
  { name: "ENDUROPLUS", a: 6.0929, b: 1.3098 },
  { name: "ENDUROSAFE", a: 1.8578, b: 0.6141 },
  { name: "ENDUROSUPER", a: 3.0421, b: 0.3043 },
  { name: "GLEAM", a: 8.9062, b: 1.6862 },
  { name: "HD PLUSFOAM", a: 18.64, b: 2.8 },
  { name: "HIGHSTAR", a: 19.926, b: 2.4918 },
  { name: "HYPOFOAM", a: 4.895, b: 1.1267 },
  { name: "JARCLEAN", a: 2.332, b: 0.3265 },
  { name: "MACH 5", a: 15.135, b: 1.615 },
  { name: "MULTICLEAN", a: 0.367, b: 0.1733 },
  { name: "PASCAL", a: 26.75, b: 2.3389 },
  { name: "POLYPRO", a: 2.4203, b: 0.3574 },
  { name: "POWERFOAM", a: 8.7036, b: 8.85 },
  { name: "POWERGEL", a: 9.1086, b: 0.6619 },
  { name: "PROFILE", a: 5.4104, b: 0.8564 },
  { name: "QUATTRO PLUS", a: 21.907, b: 2.2341 },
  { name: "RAPID WASH", a: 9.6212, b: 0.9246 },
  { name: "RECLAIM", a: 0.9272, b: 0.1697 },
  { name: "REDES", a: 2.7355, b: 0.8028 },
  { name: "RELEASE", a: 2.514, b: 1.1389 },
  { name: "SAFEFOAM", a: 0.622, b: 0.444 },
  { name: "SOLO", a: 9.2854, b: 0.6132 },
  { name: "SPECTAK BPC", a: 15.79, b: 1.8027 },
  { name: "SPECTAK G", a: 20.305, b: 3.9672 },
  { name: "SUPERDILAC", a: 21.088, b: 2.2453 },
  { name: "SUPERFOAM", a: 4.0425, b: -0.4967 },
  { name: "SUPERGEL", a: 2.275, b: 0.09 },
  { name: "ULTRACLEAN", a: 0.6728, b: null },
  { name: "ULTRAFOAM", a: 5.051, b: 0.305 },
  { name: "UNIFOAM", a: 6.4377, b: 0.5294 },
];

// ── DOM ───────────────────────────────────────────────────────
const searchInput = document.getElementById('search-input');
const searchClear = document.getElementById('search-clear');
const dropdown = document.getElementById('chem-dropdown');
const selectedChemEl = document.getElementById('selected-chem');
const selectedChemName = document.getElementById('selected-chem-name');
const selectedChemData = document.getElementById('selected-chem-data');
const clearSelBtn = document.getElementById('clear-selection');
const waterCondInput = document.getElementById('water-cond');
const measuredCondInput = document.getElementById('measured-cond');
const calcBtn = document.getElementById('calculate-btn');
const resultSection = document.getElementById('result-section');
const resultPlaceholder = document.getElementById('result-placeholder');
const resultContent = document.getElementById('result-content');
const resultChemName = document.getElementById('res-chem-name');
const resultValue = document.getElementById('res-value');
const resultFormula = document.getElementById('res-formula');
const resultInterp = document.getElementById('res-interp');
const resetBtn = document.getElementById('reset-btn');

let selectedChem = null;

// ── HELPERS ───────────────────────────────────────────────────
const fmt = (n) => n === null ? 'N/D' :
  Number(n).toLocaleString('es-ES', { maximumFractionDigits: 4 });

const parse = (s) => parseFloat(String(s).replace(',', '.'));

const escRx = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// ── DROPDOWN ──────────────────────────────────────────────────
function renderDropdown(filter = '') {
  const q = filter.trim().toLowerCase();
  const list = q ? CHEMICALS.filter(c => c.name.toLowerCase().includes(q)) : CHEMICALS;

  if (!list.length) {
    dropdown.innerHTML = '<div class="dd-empty">Sin resultados</div>';
    return;
  }

  dropdown.innerHTML = list.map(c => {
    const nameHtml = q
      ? c.name.replace(new RegExp(`(${escRx(q)})`, 'gi'), '<mark>$1</mark>')
      : c.name;
    const bLabel = c.b !== null ? `B=${fmt(c.b)}` : 'B=N/D';
    return `<div class="dd-item" data-name="${c.name}">
      <span class="dd-name">${nameHtml}</span>
      <span class="dd-meta">A=${fmt(c.a)} · ${bLabel}</span>
    </div>`;
  }).join('');

  dropdown.querySelectorAll('.dd-item').forEach(el => {
    el.addEventListener('mousedown', (e) => {
      e.preventDefault();
      selectChemical(CHEMICALS.find(c => c.name === el.dataset.name));
    });
  });
}

const openDD = () => { renderDropdown(searchInput.value); dropdown.classList.remove('hidden'); };
const closeDD = () => dropdown.classList.add('hidden');

function selectChemical(chem) {
  selectedChem = chem;
  selectedChemName.textContent = chem.name;
  selectedChemData.innerHTML = `
    <span class="pill-data">A = ${fmt(chem.a)}</span>
    <span class="pill-data ${chem.b === null ? 'pill-warn' : ''}">
      ${chem.b !== null ? `B = ${fmt(chem.b)}` : 'B = N/D'}
    </span>`;
  selectedChemEl.classList.remove('hidden');
  searchInput.value = '';
  searchClear.classList.add('hidden');
  closeDD();
  updateBtn();
  clearResult();
}

function clearSelection() {
  selectedChem = null;
  selectedChemEl.classList.add('hidden');
  updateBtn();
  clearResult();
}

// ── CALCULATE ─────────────────────────────────────────────────
function calculate() {
  clearErrors();

  if (!selectedChem) { showErr(searchInput, 'Selecciona un producto'); return; }

  const measuredRaw = measuredCondInput.value.trim();
  const waterRaw = waterCondInput.value.trim();

  if (!measuredRaw) { showErr(measuredCondInput, 'Introduce la conductividad medida'); return; }
  if (!waterRaw) { showErr(waterCondInput, 'Introduce la conductividad del agua'); return; }

  const measured = parse(measuredRaw);
  const water = parse(waterRaw);

  if (isNaN(measured) || measured < 0) { showErr(measuredCondInput, 'Valor no válido'); return; }
  if (isNaN(water) || water < 0) { showErr(waterCondInput, 'Valor no válido'); return; }

  const a = selectedChem.a;
  const csvB = selectedChem.b ?? 0;
  const net = measured - water - csvB;
  const conc = net / a;
  const isNeg = conc < 0;

  // Result display
  resultChemName.textContent = selectedChem.name;
  resultValue.textContent = isNeg ? '0.0000' : conc.toFixed(4);

  // Formula breakdown
  const bRow = selectedChem.b === null
    ? `<div class="formula-row"><span class="formula-label">Col. C (B del CSV)</span><span class="formula-val">N/D (= 0)</span></div>`
    : `<div class="formula-row"><span class="formula-label">Col. C del CSV (B)</span><span class="formula-val">− ${fmt(csvB)} mS/cm</span></div>`;

  resultFormula.innerHTML = `
    <div class="formula-row">
      <span class="formula-label">Conductividad medida</span>
      <span class="formula-val">${fmt(measured)} mS/cm</span>
    </div>
    <div class="formula-row">
      <span class="formula-label">Conductividad del agua</span>
      <span class="formula-val">− ${fmt(water)} mS/cm</span>
    </div>
    ${bRow}
    <div class="formula-row formula-row-net">
      <span class="formula-label">Conductividad neta</span>
      <span class="formula-val">${fmt(net)} mS/cm</span>
    </div>
    <div class="formula-row">
      <span class="formula-label">Col. B del CSV (A)</span>
      <span class="formula-val">÷ ${fmt(a)}</span>
    </div>
    <div class="formula-row formula-row-result">
      <span class="formula-label">% p/p</span>
      <span class="formula-val">${isNeg ? '0.0000' : conc.toFixed(4)} %</span>
    </div>`;

  // Interpretation
  const interp = isNeg
    ? { cls: 'interp-warn', msg: '⚠️ Conductividad menor que la base. Revisa la lectura.' }
    : conc < 0.1
      ? { cls: 'interp-low', msg: 'Concentración muy baja o cercana a cero.' }
      : conc <= 5
        ? { cls: 'interp-ok', msg: 'Concentración en rango habitual de trabajo.' }
        : conc <= 15
          ? { cls: 'interp-high', msg: '⚠️ Concentración elevada. Verifica la dilución.' }
          : { cls: 'interp-critical', msg: '🚨 Concentración muy alta. Revisa los valores.' };

  resultInterp.className = `result-interp ${interp.cls}`;
  resultInterp.textContent = interp.msg;
  resultInterp.classList.remove('hidden');

  resultPlaceholder.classList.add('hidden');
  resultContent.classList.remove('hidden');

  if (window.innerWidth < 900) {
    setTimeout(() => resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  }
}

function clearResult() {
  resultPlaceholder.classList.remove('hidden');
  resultContent.classList.add('hidden');
}

// ── ERRORS ────────────────────────────────────────────────────
function showErr(el, msg) {
  el.classList.add('input-error');
  const e = document.createElement('div');
  e.className = 'err-msg';
  e.textContent = '⚠ ' + msg;
  (el.closest('.input-wrap') || el.parentElement).after(e);
}

function clearErrors() {
  document.querySelectorAll('.input-error').forEach(e => e.classList.remove('input-error'));
  document.querySelectorAll('.err-msg').forEach(e => e.remove());
}

// ── BUTTON ────────────────────────────────────────────────────
function updateBtn() {
  calcBtn.disabled = !selectedChem
    || !waterCondInput.value.trim()
    || !measuredCondInput.value.trim();
}

// ── EVENTS ───────────────────────────────────────────────────
searchInput.addEventListener('input', () => {
  searchClear.classList.toggle('hidden', !searchInput.value);
  renderDropdown(searchInput.value);
  openDD();
});
searchInput.addEventListener('focus', openDD);
searchInput.addEventListener('blur', () => setTimeout(closeDD, 150));
searchInput.addEventListener('keydown', e => { if (e.key === 'Escape') { closeDD(); searchInput.blur(); } });

searchClear.addEventListener('click', () => {
  searchInput.value = '';
  searchClear.classList.add('hidden');
  renderDropdown();
  searchInput.focus();
});

clearSelBtn.addEventListener('click', clearSelection);

waterCondInput.addEventListener('input', () => { updateBtn(); clearErrors(); });
measuredCondInput.addEventListener('input', () => { updateBtn(); clearErrors(); });

calcBtn.addEventListener('click', calculate);

resetBtn.addEventListener('click', () => {
  clearResult();
  waterCondInput.value = measuredCondInput.value = '';
  clearErrors();
  updateBtn();
});

[waterCondInput, measuredCondInput].forEach(inp => {
  inp.addEventListener('keydown', e => { if (e.key === 'Enter' && !calcBtn.disabled) calculate(); });
});

document.addEventListener('click', e => {
  if (!e.target.closest('.search-group')) closeDD();
});

// ── INIT ─────────────────────────────────────────────────────
renderDropdown();
updateBtn();
