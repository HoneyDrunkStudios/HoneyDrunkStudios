import assert from 'node:assert/strict';
import { afterEach, beforeEach, test } from 'node:test';
import { getGridQuery, subscribeToGridQuery, updateGridFilters } from '../src/lib/gridQuery.ts';

beforeEach(() => {
  const browser = new EventTarget();
  browser.location = new URL('https://example.test/grid?node=kernel');
  browser.history = { replaceState: (_state, _title, path) => {
    browser.location = new URL(path, browser.location);
  } };
  globalThis.window = browser;
});
afterEach(() => { delete globalThis.window; });

test('each edit is visible to subscribers before the input handler returns', () => {
  const observed = [];
  const unsubscribe = subscribeToGridQuery(() => observed.push(getGridQuery()));
  for (const search of ['Kernel', 'Kxernel', 'Kxyernel', 'Kernel']) {
    updateGridFilters({ search });
    assert.equal(new URLSearchParams(observed.at(-1)).get('search'), search);
  }
  assert.equal(observed.length, 4);
  unsubscribe();
});

test('successive filters merge into the latest URL and preserve the selected node', () => {
  updateGridFilters({ search: 'Kernel' });
  updateGridFilters({ sectors: 'Core', signals: 'Live' });
  assert.deepEqual(Object.fromEntries(new URLSearchParams(getGridQuery())), {
    node: 'kernel', search: 'Kernel', sectors: 'Core', signals: 'Live',
  });
  updateGridFilters({ search: '', sectors: '', signals: '' });
  assert.equal(getGridQuery(), 'node=kernel');
});

test('back and forward notifications expose removed and restored filters', () => {
  const observed = [];
  const unsubscribe = subscribeToGridQuery(() => observed.push(getGridQuery()));
  window.location = new URL('https://example.test/grid');
  window.dispatchEvent(new Event('popstate'));
  window.location = new URL('https://example.test/grid?sectors=Core');
  window.dispatchEvent(new Event('popstate'));
  assert.deepEqual(observed, ['', 'sectors=Core']);
  unsubscribe();
  updateGridFilters({ search: 'ignored after unsubscribe' });
  window.dispatchEvent(new Event('popstate'));
  assert.equal(observed.length, 2);
});
