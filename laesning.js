/* Læseflade: læsetid og "fortsæt hvor du slap".
   Positionen gemmes kun i læserens egen browser — den sendes ingen steder hen. */

(function () {
  var tekst = document.getElementById('laesetekst');
  if (!tekst) return;

  // ---- Læsetid. 225 ord i minuttet er et rimeligt gennemsnit for dansk skønlitteratur.
  var meta = document.getElementById('laesemeta');
  var ord = (tekst.innerText.trim().match(/\S+/g) || []).length;
  if (meta && ord > 150) {
    meta.textContent = meta.textContent + ' · ca. ' + Math.max(1, Math.round(ord / 225)) + ' min';
  }

  var aar = document.getElementById('aar-tekst');
  if (aar) aar.textContent = new Date().getFullYear();

  // ---- Gem position
  var NOEGLE = 'donorbarn:position';
  var kasse = document.getElementById('fortsaet');
  var gemt = null;

  try {
    var raa = localStorage.getItem(NOEGLE);
    if (raa) gemt = JSON.parse(raa);
  } catch (e) { /* privat tilstand — så er der bare ingen gemt position */ }

  function maksScroll() {
    return Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  }

  // Vis tilbuddet — men scroll ALDRIG af dig selv. Læseren trykker selv.
  if (gemt && typeof gemt.andel === 'number' && gemt.andel > 0.04 && gemt.andel < 0.97 && kasse) {
    var procent = Math.round(gemt.andel * 100);
    var label = document.getElementById('fortsaet-tekst');
    if (label) label.textContent = 'Du var nået ' + procent + ' % ned i teksten.';
    kasse.classList.add('vis');

    document.getElementById('fortsaet-ja').addEventListener('click', function () {
      window.scrollTo({ top: gemt.andel * maksScroll(), behavior: 'smooth' });
      kasse.classList.remove('vis');
    });
    document.getElementById('fortsaet-nej').addEventListener('click', function () {
      try { localStorage.removeItem(NOEGLE); } catch (e) {}
      kasse.classList.remove('vis');
    });
  }

  // Gem løbende, men ikke oftere end hvert halve sekund
  var vent;
  window.addEventListener('scroll', function () {
    clearTimeout(vent);
    vent = setTimeout(function () {
      var andel = window.scrollY / maksScroll();
      if (andel < 0.02) return;
      try {
        localStorage.setItem(NOEGLE, JSON.stringify({ andel: andel }));
      } catch (e) { /* ingen plads eller privat tilstand */ }
    }, 500);
  }, { passive: true });
})();
