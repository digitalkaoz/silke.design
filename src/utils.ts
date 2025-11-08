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

export const getDistance = (container: Element): number => {
  if (!container) {
    return 1;
  }
  const currentScroller = container.nextSibling;
  if (!currentScroller) {
    return 1;
  }

  if (!observer) {
    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        entry.target.dataset.top = entry.boundingClientRect.top / window.innerHeight;
      }
      observer.disconnect();
    });
  }

  observer.observe(currentScroller as Element);

  return currentScroller.dataset.top || 1;
  return (currentScroller as Element).getBoundingClientRect().top / window.innerHeight;
};
