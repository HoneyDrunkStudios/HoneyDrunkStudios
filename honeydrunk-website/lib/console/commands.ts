/**
 * Hive Console — Command definitions and handlers
 * Local data-driven commands with typing animation support
 */

import { getNodes, getNodeStats } from '@/lib/nodes';
import { triggerGridPulse } from '@/components/GridPulse';
import {
  HIVE_BOOT_TIMESTAMP,
  formatUptime,
  getRandomFlavorLines,
  generateUptimeBar,
} from './config';

export interface CommandResult {
  output: string[];
  animated?: boolean; // If true, type out the result
  breath?: boolean; // If true, trigger visual breath effect
}

export type CommandHandler = (args: string[]) => CommandResult | Promise<CommandResult>;

/**
 * Command registry
 */
export const commands: Record<string, CommandHandler> = {
  help: () => ({
    output: [
      '> HIVE CONSOLE — Available Commands:',
      '',
      '  help              — List all commands',
      '  boot.honeycore    — Initialize kernel link',
      '  list.nodes        — Enumerate active projects',
      '  decrypt.archive   — Reveal vault fragment',
      '  trace.signal      — Ping the grid',
      '  uptime            — Check hive vital signs',
      '  status            — View grid status dashboard',
      '  run.snake         — Load recreational process',
      '  open.gallery      — Cycle visual feed',
      '  clear             — Clear console output',
      '',
      'Press Esc to close.',
    ],
  }),

  'boot.honeycore': () => ({
    output: [
      '> initializing kernel...',
      '> linking transport...',
      '> grid online.',
      '> hello, edge runner.',
      '',
      'Type "help" for available commands.',
    ],
    animated: true,
  }),

  'list.nodes': () => {
    const nodes = getNodes();
    const stats = getNodeStats();

    const output = [
      `> GRID STATUS: ${nodes.length} nodes tracked`,
      '',
      `  Live:     ${stats.live}`,
      `  Wiring:   ${stats.wiring}`,
      `  Awake:    ${stats.awake}`,
      `  Seed:     ${stats.seed}`,
      `  Archive:  ${stats.archived}`,
      '',
      '> ACTIVE NODES:',
      '',
    ];

    // List active nodes (not Seed or Archive)
    const activeNodes = nodes.filter(
      (n) => n.signal !== 'Seed' && n.signal !== 'Archive'
    );

    activeNodes.slice(0, 10).forEach((node) => {
      output.push(`  [${node.signal.toUpperCase().padEnd(7)}] ${node.name}`);
    });

    if (activeNodes.length > 10) {
      output.push('', `  ... and ${activeNodes.length - 10} more.`);
    }

    output.push('', '> Navigate to /grid for full view.');

    return { output };
  },

  'decrypt.archive': () => ({
    output: [
      '> decrypting...',
      '> vault fragment recovered.',
      '',
      '  → /echo',
      '',
      '> This path is under construction.',
    ],
    animated: true,
  }),

  'trace.signal': () => {
    // Trigger visual pulse
    triggerGridPulse();

    return {
      output: [
        '> pinging grid nodes...',
        '> [■■■■■■■■■■] 100%',
        '> signal trace complete.',
        '',
        '> All nodes responding. Grid stable.',
      ],
      animated: true,
    };
  },

  clear: () => ({
    output: [],
  }),

  'run.snake': () => {
    // Close console and open snake modal after a short delay
    if (typeof window !== 'undefined') {
      // Close console first
      const closeEvent = new CustomEvent('close-console');
      window.dispatchEvent(closeEvent);

      // Open snake modal after console closes
      setTimeout(() => {
        const openEvent = new CustomEvent('open-snake');
        window.dispatchEvent(openEvent);
      }, 300);
    }
    return {
      output: [
        '> loading recreational process...',
        '> snake.exe initialized.',
      ],
      animated: true,
    };
  },

  'open.gallery': () => {
    // Close console and open gallery modal after a short delay
    if (typeof window !== 'undefined') {
      // Close console first
      const closeEvent = new CustomEvent('close-console');
      window.dispatchEvent(closeEvent);

      // Open gallery modal after console closes
      setTimeout(() => {
        const openEvent = new CustomEvent('open-gallery');
        window.dispatchEvent(openEvent);
      }, 300);
    }
    return {
      output: [
        '> cycling visual feed...',
        '> gallery access granted.',
      ],
      animated: true,
    };
  },

  status: () => {
    // Navigate to status page
    if (typeof window !== 'undefined') {
      window.location.href = '/status';
    }
    return {
      output: [
        '> accessing grid status dashboard...',
        '> telemetry stream active.',
        '',
        '> redirecting to /status',
      ],
      animated: true,
    };
  },

  uptime: () => {
    const now = Date.now();
    const bootTime = HIVE_BOOT_TIMESTAMP;

    // Handle clock skew
    if (now < bootTime) {
      return {
        output: [
          '> uptime',
          'Telemetry desynced. Recalibrating…',
        ],
        breath: true,
      };
    }

    const duration = now - bootTime;
    const formattedDuration = formatUptime(duration);

    // Choose output style (80% A, 10% B, 10% C)
    const rand = Math.random();
    let output: string[];

    if (rand < 0.8) {
      // Style A — Cinematic Core Status
      const flavorLines = getRandomFlavorLines(2);
      output = [
        '> uptime',
        '[ HIVE TELEMETRY RESPONSE ]',
        `Grid continuity: ${formattedDuration}.`,
        flavorLines[0],
        flavorLines[1],
      ];
    } else if (rand < 0.9) {
      // Style B — Narrative Pulse
      output = [
        '> uptime',
        `The Hive has been awake for ${formattedDuration}.`,
        'No reboot. No silence. Only signal.',
      ];
    } else {
      // Style C — Retro Diagnostic
      const days = Math.floor(duration / (1000 * 60 * 60 * 24));
      const hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
      const uptimePercent = Math.min(99, Math.floor((duration / (1000 * 60 * 60 * 24 * 365)) * 100));
      const bar = generateUptimeBar(uptimePercent);
      const flavorLines = getRandomFlavorLines(1);

      output = [
        '> uptime',
        `[ ONLINE ${days}D:${hours.toString().padStart(2, '0')}H:${minutes.toString().padStart(2, '0')}M ]`,
        `heartbeat: ${bar} ${uptimePercent}%`,
        flavorLines[0].toLowerCase(),
      ];
    }

    return {
      output,
      breath: true,
    };
  },
};

/**
 * Execute a command
 */
export async function executeCommand(input: string): Promise<CommandResult> {
  const trimmed = input.trim();
  if (!trimmed) {
    return { output: [] };
  }

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  const handler = commands[cmd];
  if (!handler) {
    return {
      output: [`> unknown signal: "${cmd}". type "help" for available commands.`],
    };
  }

  return await handler(args);
}

/**
 * Get list of available commands
 */
export function getCommandNames(): string[] {
  return Object.keys(commands).filter((c) => c !== 'clear');
}
