import { steps } from './steps.js';

// Flüchtiger Zustand: keine Cookies, kein Local Storage, keine Übermittlung.
const answers = new Map();
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
  const found = steps.findIndex(step => step.id === id);
  const index = found >= 0 ? found : 0;
  const step = steps[index];
  if (id !== step.id) history.replaceState(null, '', `#${step.id}`);
  document.title = `${step.title} – Research-Prototyp`;
  links.replaceChildren(...steps.map((item, position) => {
    const li = element('li');
    const link = element('a', `${position + 1}. ${item.title}`, { href: `#${item.id}` });
    if (position === index) link.setAttribute('aria-current', 'step');
    li.append(link);
    return li;
  }));
  content.replaceChildren();
  content.append(element('p', `Schritt ${index + 1} von ${steps.length}`));
  const heading = element('h1', step.title, { tabindex: '-1' });
  content.append(heading, element('p', step.description));
  if (step.body) content.append(element('p', step.body));

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
    route(steps[0].id);
  }));
  content.append(navigation);
  heading.focus();
}

window.addEventListener('hashchange', render);
render();
