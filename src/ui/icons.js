import { createIcons, icons } from 'lucide';

/**
 * Initializes and refreshes Lucide icons in the DOM with a rich, bold stroke weight.
 * Call this function whenever new elements containing data-lucide attributes are added to the DOM.
 */
export function refreshIcons() {
  createIcons({
    icons,
    attrs: {
      'stroke-width': 2.75,
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    }
  });
}

