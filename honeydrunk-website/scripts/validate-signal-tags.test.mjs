import assert from 'node:assert/strict';
import test from 'node:test';
import { readSignalCatalogs, validateSignalTags } from './validate-signal-tags.mjs';

test('all checked-in signal tags resolve or are preserved historical aliases', () => {
  assert.deepEqual(validateSignalTags(readSignalCatalogs()), []);
});

test('rejects the invented tags from the recent studio updates', () => {
  for (const tag of ['studio-update', 'packages', 'new-unregistered-tag']) {
    const catalogs = readSignalCatalogs();
    catalogs.signals[0].tags.push(tag);
    assert.ok(validateSignalTags(catalogs).some(error => error.includes(`unknown tag "${tag}"`)));
  }
});

test('accepts registered sector and entity names and IDs without a parallel tag list', () => {
  const catalogs = readSignalCatalogs();
  catalogs.signals[0].tags = ['Meta', 'HoneyDrunk.Studio', 'pocket-quests', 'game-prototype', catalogs.modules[0].name, catalogs.services[0].id];
  assert.deepEqual(validateSignalTags(catalogs), []);
});

test('historical aliases cannot be reused in a new signal', () => {
  const catalogs = readSignalCatalogs();
  for (const tag of ['Pulse', 'HoneyHub']) catalogs.signals[0].tags.push(tag);
  const errors = validateSignalTags(catalogs);
  assert.ok(errors.some(error => error.includes('unknown tag "Pulse"')));
  assert.ok(errors.some(error => error.includes('unknown tag "HoneyHub"')));
});

test('rejects two tags identifying the same registered entity', () => {
  const catalogs = readSignalCatalogs();
  catalogs.signals[0].tags.push('pocket-quests');
  assert.ok(validateSignalTags(catalogs).some(error => error.includes('duplicate tag reference "pocket-quests"')));
});

test('a historical entry cannot acquire another unregistered tag', () => {
  const catalogs = readSignalCatalogs();
  catalogs.signals.find(signal => signal.date === '2026-04-08').tags.push('packages');
  assert.ok(validateSignalTags(catalogs).some(error => error.includes('unknown tag "packages"')));
});

test('rejects invalid sectors, malformed tags and duplicates', () => {
  const catalogs = readSignalCatalogs();
  catalogs.signals[0].sector = 'unregistered-sector';
  catalogs.signals[0].tags = ['Meta', 'Meta', 42];
  const errors = validateSignalTags(catalogs);
  assert.equal(errors.length, 3);
  assert.ok(errors.some(error => error.includes('unknown sector')));
  assert.ok(errors.some(error => error.includes('duplicate tag')));
  assert.ok(errors.some(error => error.includes('unknown tag 42')));
  catalogs.signals[0].sector = 'Meta';
  catalogs.signals[0].tags = [];
  assert.match(validateSignalTags(catalogs)[0], /nonempty array/);
});
