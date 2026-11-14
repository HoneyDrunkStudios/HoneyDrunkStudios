const storageKey = 'hd.jacked_in';
const changeEvent = 'honeydrunk:intro-preference';
let volatilePreference = false;

export function getIntroPreference(): boolean {
  try {
    return window.sessionStorage.getItem(storageKey) === 'true';
  } catch {
    return volatilePreference;
  }
}

export function getServerIntroPreference(): null {
  return null;
}

export function subscribeToIntroPreference(notify: () => void): () => void {
  window.addEventListener('storage', notify);
  window.addEventListener(changeEvent, notify);
  return () => {
    window.removeEventListener('storage', notify);
    window.removeEventListener(changeEvent, notify);
  };
}

function updateIntroPreference(completed: boolean): void {
  volatilePreference = completed;
  try {
    if (completed) {
      window.sessionStorage.setItem(storageKey, 'true');
    } else {
      window.sessionStorage.removeItem(storageKey);
    }
  } catch {
    // Keep the intro usable when browser storage is unavailable.
  }
  window.dispatchEvent(new Event(changeEvent));
}

export const completeIntro = () => updateIntroPreference(true);
export const resetIntro = () => updateIntroPreference(false);
