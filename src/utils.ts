export const stripTags = (html: string): string => {
  if (typeof window === 'undefined') {
    return html.replace(/(<([^>]+)>)/gi, '');
  }

  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;

  return tmp.textContent || tmp.innerText;
};

export const toId = (text: string): string =>
  stripTags(text).toLowerCase().replace(/\(/g, '').replace(/\)/g, '').replace(/ /g, '-');

let observer: IntersectionObserver | undefined;

/**
 * get distance to viewport top
 * this doesnt use getBoundingClientRect bc it forces a reflow, but instead use the intersection api
 */
export const getDistance = (container: Element): string => {
  if (!observer) {
    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        entry.target.dataset.top = entry.boundingClientRect.top;
      }
      observer.disconnect();
    });
  }

  observer.observe(container as Element);

  return container.dataset.top || '1';
};
