import { NEN_TYPES } from '../algorithm/mazeGenerator.js';

export function buildAffinitySelector(container, onSelect) {
  container.innerHTML = '';
  let selected = NEN_TYPES[0];
  for (const type of NEN_TYPES) {
    const button = document.createElement('button');
    button.className = `affinity-btn${type === selected ? ' selected' : ''}`;
    button.textContent = type;
    button.addEventListener('click', () => {
      selected = type;
      for (const b of container.querySelectorAll('button')) b.classList.remove('selected');
      button.classList.add('selected');
      onSelect(type);
    });
    container.append(button);
  }
  onSelect(selected);
}
