/* Version 4: #proof, before the pilot. Already in daily use with 11 account executives at a B2B distributor, and
   what an account executive says it changes: less mental load for organising, more for the customer.
   The quotes are an account executive's own words from a feedback call on 2026-10-20, translated and shortened.
   Each quote links to the place in the product that does it. The quotes run in one line that scrolls by itself
   (the set is there twice, so the loop has no seam) and stops while pointed at. */
(() => {
  const host = document.getElementById('proof'); if (!host) return;
  const lang = () => window.UI?.lang || document.documentElement.lang || 'de';
  const L = (en, de) => (lang() === 'de' ? de : en);
  const ph = n => `<i class="ph-light ph-${n}" aria-hidden="true"></i>`;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // [theme, icon, quote, where it lives in the product, the product page it opens]
  const QUOTES = () => [
    [L('Prioritising', 'Priorisieren'), 'list-checks',
      L('As an AE you are sometimes overwhelmed by the number of tasks and find it very hard to prioritise. Having everything ranked and split by the type of task is very important.', 'Als AE ist man manchmal überwältigt von der Menge an Aufgaben und kann kaum priorisieren. Dass alles nach Priorität gerankt und nach Art der Aufgabe sortiert ist, ist sehr wichtig.'),
      L('My workday', 'Mein Arbeitstag'), { page: 'today' }],
    [L('Less overhead', 'Weniger Overhead'), 'brain',
      L('Every task is registered when it is done and simply disappears from the list. That reduces overhead and gives clarity, so I can focus on preparing the next pitch and selling as much as possible. Anything that adds to the mental workload makes exactly that harder.', 'Jede Aufgabe wird erfasst, sobald sie erledigt ist, und verschwindet einfach von der Liste. Das reduziert Overhead und gibt Klarheit im Kopf, sodass ich mich auf das nächste Gespräch konzentrieren und so viel wie möglich verkaufen kann. Alles, was die mentale Last erhöht, macht genau das schwerer.'),
      L('Done tasks leave the list', 'Erledigtes verschwindet'), { page: 'today' }],
    [L('Buying rhythm', 'Kaufrhythmus'), 'chart-line',
      L('AEs sell less than they could when they do not know the buying rhythm of their customer and when they need something. The tool tells me when to call; my knowledge of the person tells me how.', 'AEs verkaufen weniger, als sie könnten, wenn sie den Kaufrhythmus ihrer Kunden nicht kennen und nicht wissen, wann sie etwas brauchen. Das Tool sagt mir, wann ich anrufen soll; mein Wissen über den Menschen sagt mir, wie.'),
      'Demand Match', { page: 'outbound' }],
    [L('Data sheets', 'Datenblätter'), 'file-pdf',
      L('The right data sheet is attached to the offer automatically. No more clicking through product pages in the CRM or googling the sheet because nobody uploaded it. On its own it is small, but dozens of times a day it adds up to a lot of time and mental bandwidth.', 'Das richtige Datenblatt hängt automatisch am Angebot. Kein Durchklicken der Produktseiten im CRM mehr, kein Googeln, weil es niemand hochgeladen hat. Einzeln ist das klein, aber dutzende Male am Tag summiert es sich zu viel Zeit und Kopf.'),
      L('Offers', 'Angebote'), { page: 'pq-create' }],
  ];

  function render() {
    host.innerHTML = `<div class="wrap">
      <div class="pf-head">
        <div class="pf-stat reveal"><b>11</b><span>${L('account executives use it every day', 'Account Executives arbeiten täglich damit')}</span><small>${L('at a B2B distributor', 'bei einem B2B-Großhändler')}</small></div>
        <div class="pf-txt reveal">
          <p class="ly-eyebrow">${ph('quotes')}${L('Already in use', 'Bereits im Einsatz')}</p>
          <h2 class="h2 pf-h">${L('Less mental load for organising. <em>More for the customer.</em>', 'Weniger Kopf für Organisation. <em>Mehr für den Kunden.</em>')}</h2>
          <p class="ly-lead">${L('What account executives notice first is not a feature. It is that they stop carrying the day in their head: what is next, what is done, who needs something when.', 'Was Account Executives zuerst merken, ist keine Funktion. Es ist, dass sie den Tag nicht mehr im Kopf tragen müssen: was als Nächstes kommt, was erledigt ist, wer wann etwas braucht.')}</p>
        </div>
      </div>
      <div class="pf-car reveal" aria-label="${L('Quotes from account executives', 'Stimmen von Account Executives')}"><div class="pf-track">${[false, true].map(dup => QUOTES().map(([t, ic, q, where, open]) => `<figure class="pf-q"${dup ? ' aria-hidden="true"' : ''}>
        <span class="pf-tag">${ph(ic)}${t}</span>
        <blockquote>${q}</blockquote>
        <figcaption><span class="pf-who"><i>${ph('user')}</i><span><b>Account Executive</b><small>${L('B2B distributor', 'B2B-Großhändler')}</small></span></span>
          <button class="pf-open"${dup ? ' tabindex="-1"' : ''} data-open='${JSON.stringify(open)}'>${L('In the product', 'Im Produkt')}: ${where}${ph('arrow-up-right')}</button></figcaption>
      </figure>`).join('')).join('')}</div></div>
    </div>`;
  }
  host.addEventListener('click', e => { const b = e.target.closest('[data-open]'); if (b) document.dispatchEvent(new CustomEvent('bf:open', { detail: JSON.parse(b.dataset.open) })); });
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.05 });
  render(); host.querySelectorAll('.reveal').forEach(el => (reduced ? el.classList.add('in') : io.observe(el)));
  window.UI?.onLang(() => { render(); host.querySelectorAll('.reveal').forEach(el => el.classList.add('in')); });
})();
