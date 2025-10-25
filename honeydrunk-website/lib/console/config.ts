/**
 * Hive Console Configuration
 * Boot timestamp and flavor text pools
 */

// Fixed Hive Boot timestamp (UTC)
// October 16, 2025 at 8:00 PM EDT (which is October 17, 2025 00:00 UTC)
export const HIVE_BOOT_TIMESTAMP = new Date('2025-10-17T00:00:00Z').getTime();

// Flavor lines for uptime telemetry
export const UPTIME_FLAVOR_LINES = [
  'Neural temperature: stable.',
  'Signal latency: imperceptible.',
  'Dream cycles: uninterrupted.',
  'Grid integrity: 99.99%.',
  'Synapse load: nominal.',
  'Operator presence: detected.',
  'Echo channels: clear.',
  'Pulse coherence: 98%.',
  'Entropy levels: within tolerance.',
] as const;

/**
 * Get random flavor lines (no repeats)
 */
export function getRandomFlavorLines(count: number = 2): string[] {
  const shuffled = [...UPTIME_FLAVOR_LINES].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Format uptime duration
 */
export function formatUptime(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const parts: string[] = [];

  if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`);
  if (hours % 24 > 0) parts.push(`${hours % 24} hour${hours % 24 !== 1 ? 's' : ''}`);
  if (minutes % 60 > 0) parts.push(`${minutes % 60} minute${minutes % 60 !== 1 ? 's' : ''}`);

  const seconds = totalSeconds % 60;
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds} second${seconds !== 1 ? 's' : ''}`);

  return parts.join(', ');
}

/**
 * Generate uptime bar visualization
 */
export function generateUptimeBar(percentage: number): string {
  const filled = Math.floor(percentage / 10);
  const empty = 10 - filled;
  return '█'.repeat(filled) + '▒'.repeat(empty);
}

/**
 * Calculate realistic uptime percentage for a service
 * Uses deterministic random based on service name for consistency
 */
export function calculateServiceUptime(serviceName: string, currentTime: number): number {
  // Seed based on service name for consistent variation per service
  const seed = serviceName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  // Days since boot
  const daysSinceBoot = Math.floor((currentTime - HIVE_BOOT_TIMESTAMP) / (1000 * 60 * 60 * 24));

  // Base uptime starts at 100%
  let uptime = 100;

  // Slight degradation over time (very small)
  // Different services degrade at different rates based on their seed
  const degradationRate = 0.0001 + (seed % 10) * 0.00001;
  uptime -= daysSinceBoot * degradationRate;

  // Add tiny random-looking variation based on current day (but deterministic)
  const dayVariation = ((seed + daysSinceBoot) % 100) * 0.001;
  uptime -= dayVariation;

  // Clamp between 99.0 and 100
  return Math.max(99.0, Math.min(100, Number(uptime.toFixed(1))));
}

/**
 * Determine if a service should show as degraded (rarely)
 * Based on deterministic "random" check
 */
export function calculateServiceStatus(serviceName: string, currentTime: number): 'operational' | 'degraded' | 'outage' {
  const seed = serviceName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hoursSinceBoot = Math.floor((currentTime - HIVE_BOOT_TIMESTAMP) / (1000 * 60 * 60));

  // Very rarely show degraded (about 2% of the time, varies by service)
  const degradedThreshold = (seed % 50) / 1000; // 0-0.05
  const currentValue = ((seed + hoursSinceBoot) % 1000) / 1000; // 0-1

  if (currentValue < degradedThreshold) {
    return 'degraded';
  }

  return 'operational';
}

/**
 * Calculate realistic response time (8-20ms)
 */
export function calculateResponseTime(currentTime: number): number {
  const hoursSinceBoot = Math.floor((currentTime - HIVE_BOOT_TIMESTAMP) / (1000 * 60 * 60));
  // Varies between 8-20ms based on "time of day"
  const base = 8 + ((hoursSinceBoot % 24) / 2);
  return Math.round(base);
}
