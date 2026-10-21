/* Version 2: the same content as version 1, arranged for a CFO reading it the first time.
   1. "In one minute": the problem, what it does, what it is worth (live from the value calculator) and the ask.
   2. The "show more" buttons that value.js and workday.js render when window.PAGE asks for the compact layout:
      details stay one click away, and stay open across a language switch.
   3. A guide through the demo: a bouncing pointer shows the next click ("Start here", then "Now match"). Anyone who
      scrolls on to the result without clicking gets the sample data loaded and matched for them, so the chart is never
      empty. That never happens over the visitor's own upload, live call or API data. */
(() => {
  const lang = () => window.UI?.lang || document.documentElement.lang || 'de';
  const L = (en, de) => (lang() === 'de' ? de : en);
  const ph = n => `<i class="ph-light ph-${n}" aria-hidden="true"></i>`;

  // ------------------------------------------------------------------ in one minute
  const host = document.getElementById('brief');
  function brief() {
    if (!host) return;
    const V = window.BFValue, r = V?.calc(), rg = V?.range?.(), eur = V?.eur || (v => v);
    const cards = [
      ['warning-circle', L('The problem', 'Das Problem'), L('Scarce supply, scattered requests', 'Knappes Inventar, verstreute Anfragen'),
        L('Producers allocate supply and prices move every few weeks. Requests arrive by email, WhatsApp, phone and CRM, and are matched by hand.', 'Hersteller teilen Mengen zu, und die Preise ändern sich alle paar Wochen. Anfragen kommen per E-Mail, WhatsApp, Telefon und CRM und werden von Hand abgeglichen.'), null],
      ['arrows-merge', L('What it does', 'Was es tut'), L('Every request matched to stock', 'Jede Anfrage gegen den Bestand abgeglichen'),
        L('It reads each request, matches it against stock and inbound, and drafts the offer and the follow-up. A person approves everything that goes out.', 'Es liest jede Anfrage, gleicht sie mit Lager und Zulauf ab und entwirft Angebot und Nachfassen. Alles, was rausgeht, gibt ein Mensch frei.'), ['#how', L('Try it on sample data', 'Mit Beispieldaten testen')]],
      ['chart-line-up', L('What it could be worth · assumption', 'Was es bringen kann · Annahme'), r ? `${eur(r.cost + r.guide)}<small>${L('a year', 'pro Jahr')}</small>` : '',
        r ? `${L(`${eur(r.cost)} in hours saved and ${eur(r.guide)} from follow-ups and won-back customers, plus ${eur(r.margin)} margin kept per producer price round.`, `${eur(r.cost)} an gesparten Stunden und ${eur(r.guide)} aus Nachfassen und reaktivierten Kunden, dazu ${eur(r.margin)} gesicherte Marge je Preisrunde der Hersteller.`)} ${rg ? L(`Careful to optimistic: ${eur(rg[0].cost + rg[0].guide)} to ${eur(rg[1].cost + rg[1].guide)}. All assumptions, measured in the pilot.`, `Vorsichtig bis optimistisch: ${eur(rg[0].cost + rg[0].guide)} bis ${eur(rg[1].cost + rg[1].guide)}. Alles Annahmen, im Pilot gemessen.`) : ''}` : '', ['#value', L('Check the assumptions', 'Annahmen prüfen')], 'acc'],
      ['flag', L('The ask', 'Der Vorschlag'), L('A 30-day pilot', 'Ein 30-Tage-Pilot'),
        L('One grade family, one team, 30 days, measured in hours and margin. It reads from SAP, Biesterfeld CRM and the inbox, so nothing has to be replaced.', 'Eine Typenfamilie, ein Team, 30 Tage, gemessen in Stunden und Marge. Es liest aus SAP, dem Biesterfeld CRM und dem Postfach, also muss nichts ersetzt werden.'), ['#roadmap', L('See the plan', 'Plan ansehen')]],
    ];
    host.innerHTML = `<div class="wrap">
      <h2 class="h2 br-h">${L('The case in one minute.', 'Der Fall in einer Minute.')}</h2>
      <ol class="br-grid">${cards.map(([icon, k, t, d, link, cls], i) => `<li class="br-card ${cls || ''}" style="--i:${i}">
        <span class="br-top"><span class="br-n">${i + 1}</span>${ph(icon)}<small>${k}</small></span>
        <b>${t}</b><p>${d}</p>
        ${link ? `<a class="br-link" href="${link[0]}">${link[1]}${ph('arrow-down')}</a>` : ''}</li>`).join('')}</ol>
    </div>`;
  }

  // ------------------------------------------------------------------ show more
  const open = {};
  function set(b, on) {
    open[b.dataset.key] = on;
    b.nextElementSibling?.classList.toggle('open', on);
    b.setAttribute('aria-expanded', on);
    b.querySelector('span').textContent = on ? b.dataset.opened : b.dataset.closed;
  }
  document.addEventListener('click', e => { const b = e.target.closest('.pg-more-btn'); if (b) set(b, !open[b.dataset.key]); });
  const restore = () => document.querySelectorAll('.pg-more-btn').forEach(b => { if (open[b.dataset.key]) set(b, true); });

  // ------------------------------------------------------------------ guide through the demo
  const demo = () => window.UI?.demo;
  const ARROW = { left: 'arrow-left', up: 'arrow-up', down: 'arrow-down' }; // the arrow points at the button
  function nudge(el, text, dir) {
    if (!el) return;
    let n = el.querySelector(':scope > .nudge');
    if (!text) { n?.remove(); el.classList.remove('has-nudge'); return; }
    if (!n) { n = document.createElement('span'); n.className = 'nudge'; n.setAttribute('aria-hidden', 'true'); el.append(n); el.classList.add('has-nudge'); }
    n.dataset.dir = dir; n.innerHTML = `${ph(ARROW[dir])}<span>${text}</span>`;
  }
  function guide() {
    const d = demo(); if (!d) return;
    const stage = d.matched ? 'done' : d.loaded ? 'match' : 'start', start = stage === 'start' && L('Start here', 'Hier starten');
    nudge(document.getElementById('sample-all'), start, 'left');
    nudge(document.getElementById('sample-run'), start, 'down');
    nudge(document.getElementById('run'), stage === 'match' && L('Now match', 'Jetzt abgleichen'), 'up');
  }
  let auto = false;
  const result = document.getElementById('result');
  if (result) new IntersectionObserver(async ([e]) => {
    const d = demo(); if (!e.isIntersecting || auto || !d || d.matched || d.own) return;
    auto = true;
    if (!d.loaded) await d.loadSample();
    if (demo().matched) return; // the visitor clicked Match meanwhile
    d.run();
    result.querySelector('.chart-bar')?.insertAdjacentHTML('beforeend', `<span class="auto-note">${ph('sparkle')}<span data-auto>${autoText()}</span></span>`);
  }, { rootMargin: '0px 0px -25% 0px' }).observe(result);
  const autoText = () => `${L('Sample data, loaded for you.', 'Beispieldaten, für Sie geladen.')} <a href="#how">${L('Use your own export', 'Eigenen Export nutzen')}</a>`;

  brief(); guide();
  document.addEventListener('bf:value', () => brief());
  document.addEventListener('bf:loaded', guide);
  document.addEventListener('bf:matched', guide);
  window.UI?.onLang(() => requestAnimationFrame(() => { brief(); restore(); guide(); document.querySelectorAll('[data-auto]').forEach(x => { x.innerHTML = autoText(); }); }));
})();
