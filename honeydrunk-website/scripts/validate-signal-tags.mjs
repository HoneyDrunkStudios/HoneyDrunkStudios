import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Preserve these exact historical entries. These aliases are not valid tags for
// new entries; the current feed resolves only catalog sector/entity IDs and names.
const historicalAliases = new Map([
  ['2026-04-08|Architecture Catalog Sync: Services Schema Updated', ['Pulse']],
  ['2025-11-22|Architectural Realignment: Kernel, Relationships, and the Transport Backbone', ['Pulse']],
  ['2025-11-13|HomeLab Lands — On‑Prem Grid Shard for Ops', ['Pulse']],
  ['2025-11-11|HoneyDrunk.Clarity Manifested — The Hive\'s Human Interface', ['Pulse', 'HoneyHub']],
  ['2025-11-10|Infrastructure Expansion — Collector, Notify, and Assets Join the Grid', ['Pulse']],
  ['2025-10-25|HoneyNet — Security Division Launch', ['Pulse']],
]);

export function readSignalCatalogs() {
  return Object.fromEntries(
    ['signals', 'sectors', 'nodes', 'modules', 'services'].map(name => [
      name,
      JSON.parse(readFileSync(new URL(`../data/schema/${name}.json`, import.meta.url), 'utf8')),
    ]),
  );
}

export function validateSignalTags({ signals, sectors, nodes, modules, services }) {
  const sectorIds = new Set(sectors.sectors.map(sector => sector.id));
  // Match app/signal/page.tsx; derive the allowlist from the existing catalogs.
  const allowedTags = new Map(
    [['sector', sectors.sectors], ['node', nodes], ['module', modules], ['service', services]]
      .flatMap(([kind, entries]) => entries.flatMap(entry => [
        [entry.id, `${kind}:${entry.id}`],
        [entry.name, `${kind}:${entry.id}`],
      ])),
  );
  const errors = [];
  for (const [index, signal] of signals.entries()) {
    const label = `signals[${index}] (${signal.date}: ${signal.title})`;
    if (!sectorIds.has(signal.sector)) errors.push(`${label}: unknown sector ${JSON.stringify(signal.sector)}`);
    if (!Array.isArray(signal.tags) || signal.tags.length === 0) {
      errors.push(`${label}: tags must be a nonempty array`);
      continue;
    }
    const preservedAliases = historicalAliases.get(`${signal.date}|${signal.title}`) ?? [];
    const seen = new Set();
    for (const tag of signal.tags) {
      if (typeof tag !== 'string' || (!allowedTags.has(tag) && !preservedAliases.includes(tag))) {
        errors.push(`${label}: unknown tag ${JSON.stringify(tag)}`);
      }
      const identity = allowedTags.get(tag) ?? tag;
      if (seen.has(identity)) errors.push(`${label}: duplicate tag reference ${JSON.stringify(tag)}`);
      seen.add(identity);
    }
  }
  return errors;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const catalogs = readSignalCatalogs();
  const errors = validateSignalTags(catalogs);
  if (errors.length) {
    console.error(errors.join('\n'));
    process.exitCode = 1;
  } else {
    console.log(`Validated tags and sectors for ${catalogs.signals.length} signal entries.`);
  }
}
