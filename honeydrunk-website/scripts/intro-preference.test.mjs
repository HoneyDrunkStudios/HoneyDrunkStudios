import assert from 'node:assert/strict';
import { afterEach, beforeEach, test } from 'node:test';
import { completeIntro, getIntroPreference, getServerIntroPreference, resetIntro, subscribeToIntroPreference } from '../src/lib/introPreference.ts';

let values;
beforeEach(() => {
  values = new Map();
  const browser = new EventTarget();
  browser.sessionStorage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  };
  globalThis.window = browser;
  resetIntro();
});
afterEach(() => { delete globalThis.window; });

test('server snapshot leaves the intro undecided until hydration', () => {
  assert.equal(getServerIntroPreference(), null);
  assert.equal(getIntroPreference(), false);
});

test('completion persists and notifies the mounted home page', () => {
  let changes = 0;
  const unsubscribe = subscribeToIntroPreference(() => { changes++; });
  completeIntro();
  assert.equal(getIntroPreference(), true);
  assert.equal(values.get('hd.jacked_in'), 'true');
  assert.equal(changes, 1);
  unsubscribe();
});

test('reset notifies the current route and allows completing the intro again', () => {
  completeIntro();
  let changes = 0;
  const unsubscribe = subscribeToIntroPreference(() => { changes++; });
  resetIntro();
  assert.equal(getIntroPreference(), false);
  assert.equal(values.has('hd.jacked_in'), false);
  completeIntro();
  assert.equal(getIntroPreference(), true);
  assert.equal(changes, 2);
  unsubscribe();
});

test('unmounted subscribers receive neither local nor storage notifications', () => {
  let changes = 0;
  const unsubscribe = subscribeToIntroPreference(() => { changes++; });
  unsubscribe();
  completeIntro();
  window.dispatchEvent(new Event('storage'));
  assert.equal(changes, 0);
});

test('storage events re-read the browser preference', () => {
  let observed;
  const unsubscribe = subscribeToIntroPreference(() => { observed = getIntroPreference(); });
  values.set('hd.jacked_in', 'true');
  window.dispatchEvent(new Event('storage'));
  assert.equal(observed, true);
  unsubscribe();
});

test('blocked browser storage still permits completion and reset in memory', () => {
  Object.defineProperty(window, 'sessionStorage', { get: () => { throw new Error('blocked'); } });
  completeIntro();
  assert.equal(getIntroPreference(), true);
  resetIntro();
  assert.equal(getIntroPreference(), false);
});
