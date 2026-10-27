import { steps } from './steps.js';

// Flüchtiger Zustand: keine Cookies, kein Local Storage, keine Übermittlung.
const answers = new Map();
let activePromise = 0;
let checkPage = 0;
const checkAnswers = [];
const content = document.querySelector('#content');
const links = document.querySelector('#step-links');

function element(tag, text, attributes = {}) {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  for (const [name, value] of Object.entries(attributes)) node.setAttribute(name, value);
  return node;
}

function button(label, onClick) {
  const node = element('button', label, { type: 'button' });
  node.addEventListener('click', onClick);
  return node;
}

function route(id) {
  window.location.hash = id;
}

function render() {
  const id = window.location.hash.slice(1);
  const [stepId, variantId = 'a', cardId] = id.split('/');
  const found = steps.findIndex(step => step.id === stepId);
  const index = found >= 0 ? found : 0;
  const step = steps[index];
  if (found < 0 || (step.type !== 'entry' && id !== step.id)) history.replaceState(null, '', `#${step.id}`);
  document.title = `${step.title} – Research-Prototyp`;
  links.replaceChildren(...steps.map((item, position) => {
    const li = element('li');
    const link = element('a', undefined, { href: `#${item.id}` });
    link.append(
      element('span', String(position + 1), { class: 'step-number' }),
      element('span', item.title, { class: 'step-title' })
    );
    if (position === index) link.setAttribute('aria-current', 'step');
    li.append(link);
    return li;
  }));
  content.replaceChildren();
  content.classList.remove('compact-entry', 'uniform-entry');
  if (!['promises', 'entry', 'selfcheck'].includes(step.type)) content.append(element('p', `Schritt ${index + 1} von ${steps.length}`));
  const heading = element('h1', step.title, { tabindex: '-1' });
  if (['promises', 'entry', 'selfcheck'].includes(step.type)) heading.className = 'visually-hidden';
  content.append(heading);
  if (step.description) content.append(element('p', step.description));
  if (step.body) content.append(element('p', step.body));

  if (step.type === 'promises') {
    const controls = element('div', undefined, { class: 'promise-controls', role: 'group', 'aria-label': 'Nutzungsversprechen auswählen' });
    const preview = element('section', undefined, { class: 'promise-preview', 'aria-live': 'polite', 'aria-atomic': 'true' });
    const buttons = step.variants.map((variant, position) => {
      const control = button(String.fromCharCode(65 + position), () => {
        activePromise = position;
        updatePromise();
      });
      control.setAttribute('aria-controls', 'promise-preview');
      return control;
    });
    function updatePromise() {
      buttons.forEach((control, position) => control.setAttribute('aria-pressed', String(position === activePromise)));
      const variant = step.variants[activePromise];
      preview.replaceChildren(element('h2', variant.title), element('p', variant.subtitle));
    }
    preview.id = 'promise-preview';
    controls.append(...buttons);
    content.append(controls, preview);
    updatePromise();
  }

  if (step.type === 'entry') {
    const variantIndex = Math.max(0, ['a', 'b', 'c'].indexOf(variantId));
    const variant = step.variants[variantIndex];
    if (variant.compact) content.classList.add('uniform-entry');
    const variantKey = ['a', 'b', 'c'][variantIndex];
    const base = `${step.id}/${variantKey}`;
    const controls = element('div', undefined, { class: 'promise-controls', role: 'group', 'aria-label': 'Einstiegsvariante auswählen' });
    step.variants.forEach((item, position) => {
      const control = button(String.fromCharCode(65 + position), () => route(`${step.id}/${['a', 'b', 'c'][position]}`));
      control.setAttribute('aria-pressed', String(position === variantIndex));
      controls.append(control);
    });
    content.append(controls);
    const panel = element('section', undefined, { class: 'entry-panel' });
    const card = variant.cards.find(item => item.id === cardId);
    if ((variant.groups || variant.compact) && !card) content.classList.add('compact-entry');
    else content.classList.remove('compact-entry', 'uniform-entry');
    if (card) {
      panel.append(button('← Zurück zur Übersicht', () => route(base)));
      panel.append(element('h2', card.title), element('p', card.detail));
      const list = element('ul', undefined, { class: 'entry-options' });
      card.items.forEach(text => list.append(element('li', text)));
      panel.append(list);
    } else {
      panel.append(element('h2', variant.title));
      if (variant.subtitle) panel.append(element('p', variant.subtitle));
      const groups = variant.groups || [{ id: null }];
      groups.forEach(group => {
        const section = element('section', undefined, { class: 'entry-group' });
        if (group.title) section.append(element('h3', group.title));
        const grid = element('div', undefined, { class: 'entry-grid' });
        variant.cards.filter(item => !group.id || item.group === group.id).forEach(item => {
          const link = element('a', undefined, { class: 'entry-card', href: `#${base}/${item.id}` });
          link.append(element(group.title ? 'h4' : 'h3', item.title));
          if (item.text) link.append(element('p', item.text));
          link.append(element('span', '→', { class: 'entry-card-action', 'aria-hidden': 'true' }));
          grid.append(link);
        });
        section.append(grid);
        panel.append(section);
      });
    }
    content.append(panel);
  }

  if (step.type === 'selfcheck') {
    heading.classList.remove('visually-hidden');
    const panel = element('section', undefined, { class: 'selfcheck' });
    content.append(panel);
    function drawCheck(focus = false) {
      panel.replaceChildren();
      if (checkPage === step.questions.length) {
        const title = element('h2', 'Danke, dass du dir Zeit genommen hast.', { tabindex: '-1' });
        panel.append(title, element('p', 'Nimm deine Antworten als Anlass, darauf zu achten, was dir gerade guttun könnte.'));
        const list = element('ul');
        ['Plane im Alltag Zeit für Erholung und Dinge ein, die dir guttun.',
          'Sprich mit einer vertrauten Person darüber, wie es dir geht.',
          'Wenn du dir Unterstützung wünschst, kannst du dich über Beratungsangebote informieren.']
          .forEach(text => list.append(element('li', text)));
        panel.append(list, element('p', 'Prototyp: Diese Hinweise sind allgemein und werden nicht aus deinen Antworten berechnet. Der Check stellt keine Diagnose.', { class: 'check-note' }));
        const actions = element('div', undefined, { class: 'check-actions' });
        actions.append(button('Zurück zu meinen Antworten', () => { checkPage--; drawCheck(true); }), button('Erneut ausfüllen', () => {
          checkAnswers.length = 0; checkPage = 0; drawCheck(true);
        }));
        panel.append(actions);
        if (focus) title.focus();
        return;
      }
      const progress = element('p', `Frage ${checkPage + 1} von ${step.questions.length}`, { class: 'check-progress' });
      const meter = element('progress', undefined, { max: String(step.questions.length), value: String(checkPage + 1), 'aria-label': 'Fortschritt im Selbstcheck' });
      const prompt = element('h2', `Denk an die letzten vier Wochen. ${step.questions[checkPage]}`, { tabindex: '-1' });
      panel.append(progress, meter, prompt);
      const form = element('form');
      const fieldset = element('fieldset', undefined, { class: 'check-options' });
      fieldset.append(element('legend', 'Wie häufig trifft das zu?'));
      const next = element('button', checkPage === step.questions.length - 1 ? 'Abschliessen' : 'Nächste Frage', { type: 'submit' });
      next.disabled = checkAnswers[checkPage] === undefined;
      step.options.forEach((option, position) => {
        const label = element('label');
        const input = element('input', undefined, { type: 'radio', name: 'check-answer', value: String(position), required: '' });
        input.checked = checkAnswers[checkPage] === position;
        input.addEventListener('change', () => { checkAnswers[checkPage] = position; next.disabled = false; });
        label.append(input, element('span', option));
        fieldset.append(label);
      });
      const actions = element('div', undefined, { class: 'check-actions' });
      if (checkPage > 0) actions.append(button('Zurück', () => { checkPage--; drawCheck(true); }));
      actions.append(next);
      form.append(fieldset, actions);
      form.addEventListener('submit', event => {
        event.preventDefault();
        if (checkAnswers[checkPage] === undefined) return;
        checkPage++; drawCheck(true);
      });
      panel.append(form);
      if (focus) prompt.focus();
    }
    drawCheck();
  }

  const status = element('p', '', { role: 'status' });
  function select(value) {
    answers.set(step.id, value);
    status.textContent = `Ausgewählt: ${value.label}`;
  }

  if (step.type === 'choice') {
    const fieldset = element('fieldset');
    fieldset.append(element('legend', 'Bitte eine Option auswählen'));
    for (const option of step.options) {
      const label = element('label');
      const input = element('input', undefined, {
        type: 'radio', name: step.id, value: option.id
      });
      input.checked = answers.get(step.id)?.id === option.id;
      input.addEventListener('change', () => select(option));
      label.append(input, document.createTextNode(` ${option.label}`));
      fieldset.append(label);
    }
    content.append(fieldset);
  }

  if (step.type === 'tree') {
    const tree = element('div');
    function branch(nodes, parent = []) {
      const list = element('ul');
      for (const node of nodes) {
        const li = element('li');
        const path = [...parent, node.label];
        if (node.children) {
          const details = element('details');
          details.append(element('summary', node.label), branch(node.children, path));
          li.append(details);
        } else {
          li.append(button(node.label, () => select({ id: node.id, label: path.join(' → ') })));
        }
        list.append(li);
      }
      return list;
    }
    tree.append(branch(step.tree));
    content.append(tree);
  }
  if (answers.has(step.id)) status.textContent = `Ausgewählt: ${answers.get(step.id).label}`;
  content.append(status);

  const navigation = element('nav', undefined, { 'aria-label': 'Schrittnavigation' });
  if (index > 0) navigation.append(button('Zurück', () => route(steps[index - 1].id)));
  if (index < steps.length - 1) navigation.append(button('Weiter', () => route(steps[index + 1].id)));
  if (step.type === 'complete') navigation.append(button('Neu starten', () => {
    answers.clear();
    activePromise = 0;
    checkPage = 0;
    checkAnswers.length = 0;
    route(steps[0].id);
  }));
  if (!['promises', 'entry', 'selfcheck'].includes(step.type)) content.append(navigation);
  heading.focus();
}

window.addEventListener('hashchange', render);
render();
