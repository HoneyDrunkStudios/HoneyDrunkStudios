const changeEvent = 'honeydrunk:grid-query';

export const getGridQuery = (): string => window.location.search.slice(1);

export function subscribeToGridQuery(notify: () => void): () => void {
  window.addEventListener('popstate', notify);
  window.addEventListener(changeEvent, notify);
  return () => {
    window.removeEventListener('popstate', notify);
    window.removeEventListener(changeEvent, notify);
  };
}

export function updateGridFilters(updates: Record<string, string>): void {
  const params = new URLSearchParams(getGridQuery());
  for (const [key, value] of Object.entries(updates)) {
    if (value) params.set(key, value);
    else params.delete(key);
  }
  const query = params.toString();
  window.history.replaceState(null, '', query ? `/grid?${query}` : '/grid');
  // Next's search-parameter updates are transitions. The controlled search
  // input needs a synchronous snapshot to preserve the caret while editing.
  window.dispatchEvent(new Event(changeEvent));
}
