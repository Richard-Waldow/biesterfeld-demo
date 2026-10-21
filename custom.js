/* Version 4: #custom, right after the product demo. What you just tried is the base product; every solution is
   customised. Drawn as a sum: base product + customisation = your solution, then how the customisation happens. */
(() => {
  const host = document.getElementById('custom'); if (!host) return;
  const lang = () => window.UI?.lang || document.documentElement.lang || 'de';
  const L = (en, de) => (lang() === 'de' ? de : en);
  const ph = n => `<i class="ph-light ph-${n}" aria-hidden="true"></i>`;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const BASE = () => [L('My workday', 'Mein Arbeitstag'), L('Offers & price scales', 'Angebote & Preisstaffeln'), L('Orders', 'Aufträge'), 'Demand Match', L('Pushed products', 'Push-Produkte'), L('Scarce supply', 'Knappes Inventar'), 'Check-ins', L('Pipeline planning', 'Pipeline-Planung'), 'Biesterfeld GPT'];
  const CUSTOM = () => [
    ['flow-arrow', L('Your processes & rules', 'Ihre Prozesse & Regeln'), L('Approval steps, price floors, allocation rules, escalations: the way Biesterfeld works, not the way a tool wants it.', 'Freigabestufen, Preisuntergrenzen, Allokationsregeln, Eskalationen: so wie Biesterfeld arbeitet, nicht wie ein Tool es will.')],
    ['plugs-connected', L('Your systems & data', 'Ihre Systeme & Daten'), L('SAP S/4HANA, Biesterfeld CRM, Salesforce, B GPT, customer portals. Connected read-only, nothing migrated.', 'SAP S/4HANA, Biesterfeld CRM, Salesforce, B GPT, Kundenportale. Lesend angebunden, nichts migriert.')],
    ['users-three', L('Your roles & screens', 'Ihre Rollen & Oberflächen'), L('Inside sales, field sales, product management, leadership; each sees what they need, in the language of their company.', 'Innendienst, Außendienst, Produktmanagement, Leitung: Jeder sieht, was er braucht, in der Sprache seiner Gesellschaft.')],
    ['squares-four', L('Modules on request', 'Module nach Bedarf'), L('For example leadership KPIs, demand planning, own telephony with call notes. You only get what you use.', 'Zum Beispiel Leitungs-Kennzahlen, Bedarfsplanung, eigene Telefonie mit Gesprächsnotizen. Sie bekommen nur, was Sie nutzen.')],
  ];
  const STEPS = () => [
    [L('Map it together', 'Gemeinsam aufnehmen'), L('How your teams work today: requests, approvals, systems, exceptions.', 'Wie Ihre Teams heute arbeiten: Anfragen, Freigaben, Systeme, Ausnahmen.')],
    [L('Adapt and test', 'Anpassen und testen'), L('Built to your rules and tried in the pilot with one team.', 'Nach Ihren Regeln gebaut und im Pilot mit einem Team erprobt.')],
    [L('Roll out and extend', 'Ausrollen und erweitern'), L('More teams, more companies, new modules when you need them.', 'Mehr Teams, mehr Gesellschaften, neue Module, wenn Sie sie brauchen.')],
  ];

  function render() {
    host.innerHTML = `<div class="wrap">
      <p class="ly-eyebrow reveal">${ph('puzzle-piece')}${L('Base product + customised solution', 'Basisprodukt + individuelle Lösung')}</p>
      <h2 class="h2 cu-h reveal">${L('What you have just seen is the base product. <em>Your solution is built for you.</em>', 'Was Sie gerade gesehen haben, ist das Basisprodukt. <em>Ihre Lösung bauen wir individuell.</em>')}</h2>
      <p class="ly-lead reveal">${L('Every distributor works differently. So we customise everything: processes, rules, systems, screens and modules.', 'Jedes Handelshaus arbeitet anders. Deshalb passen wir alles an: Prozesse, Regeln, Systeme, Oberflächen und Module.')}</p>
      <div class="cu-sum reveal">
        <div class="cu-base"><small>${L('Base product', 'Basisprodukt')}</small><b>${L('Ready from day one', 'Ab dem ersten Tag bereit')}</b>
          <ul>${BASE().map(x => `<li>${x}</li>`).join('')}</ul></div>
        <span class="cu-op" aria-hidden="true">+</span>
        <div class="cu-cust"><small>${L('Customised for Biesterfeld', 'Individuell für Biesterfeld')}</small>
          <ol>${CUSTOM().map(([ic, t, d]) => `<li>${ph(ic)}<div><b>${t}</b><p>${d}</p></div></li>`).join('')}</ol></div>
        <span class="cu-op" aria-hidden="true">=</span>
        <div class="cu-res">${ph('seal-check')}<b>${L('Your solution', 'Ihre Lösung')}</b><p>${L('Fits your processes, runs on your systems, grows with you.', 'Passt zu Ihren Prozessen, läuft auf Ihren Systemen, wächst mit Ihnen.')}</p></div>
      </div>
      <ol class="cu-steps reveal">${STEPS().map(([t, d], i) => `<li><span>${String(i + 1).padStart(2, '0')}</span><b>${t}</b><p>${d}</p></li>`).join('')}</ol>
    </div>`;
  }
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.05 });
  render(); host.querySelectorAll('.reveal').forEach(el => (reduced ? el.classList.add('in') : io.observe(el)));
  window.UI?.onLang(() => { render(); host.querySelectorAll('.reveal').forEach(el => el.classList.add('in')); });
})();
