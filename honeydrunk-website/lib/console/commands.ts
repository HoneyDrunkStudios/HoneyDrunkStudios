/**
 * Hive Console — Command definitions and handlers
 * Local data-driven commands with typing animation support
 */

import { getNodes, getNodeStats } from '@/lib/nodes';
import { triggerGridPulse } from '@/components/GridPulse';

export interface CommandResult {
  output: string[];
  animated?: boolean; // If true, type out the result
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
      '  enter.playground  — Access simulation bay',
      '  run.playground    — Enter sandbox environment',
      '  clear             — Clear console output',
      '',
      'Navigate with ↑/↓. Press Esc to close.',
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

  'enter.playground': () => {
    // Navigate to playground
    if (typeof window !== 'undefined') {
      window.location.href = '/playground';
    }
    return {
      output: [
        '> routing signal to simulation bay...',
        '> access granted.',
        '',
        '> redirecting to /playground',
      ],
      animated: true,
    };
  },

  'run.playground': () => {
    // Navigate to playground (alias)
    if (typeof window !== 'undefined') {
      window.location.href = '/playground';
    }
    return {
      output: [
        '> routing signal to simulation bay...',
        '> access granted.',
        '',
        '> redirecting to /playground',
      ],
      animated: true,
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
