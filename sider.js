/* Fælles opførsel for alle sider på estridpagels.dk */

// Årstal i sidefoden
(function () {
  var aar = document.getElementById('aar');
  if (aar) aar.textContent = new Date().getFullYear();
})();

// Kvittering efter afsendt formular — Web3Forms sender retur med ?tak=1
(function () {
  var el = document.getElementById('status');
  if (!el) return;
  if (new URLSearchParams(location.search).has('tak')) {
    el.textContent = 'Tak for din besked — jeg vender tilbage, når jeg kan.';
    el.hidden = false;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
})();

// Lys / mørk. Valget huskes, så siden ikke skifter tilbage ved genindlæsning.
(function () {
  var rod = document.documentElement;
  var knap = document.getElementById('tema');
  if (!knap) return;

  function nuvaerende() {
    var sat = rod.getAttribute('data-theme');
    if (sat) return sat;
    return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  knap.addEventListener('click', function () {
    var ny = nuvaerende() === 'dark' ? 'light' : 'dark';
    rod.setAttribute('data-theme', ny);
    try { localStorage.setItem('tema', ny); } catch (e) { /* privat tilstand */ }
  });
})();
