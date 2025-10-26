'use client';

/**
 * HiveConsole — Terminal overlay with command execution
 * Open with backtick (~), close with Esc
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors, zIndex } from '@/lib/tokens';
import { commands, executeCommand } from '@/lib/console/commands';
import { registerConsoleCallback } from './LandingFooter';
import { useIsMobile } from '@/lib/hooks/useIsMobile';

interface HistoryEntry {
  input: string;
  output: string[];
}

export default function HiveConsole() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isBreathing, setIsBreathing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const consoleContainerRef = useRef<HTMLDivElement>(null);

  // Define handleClose early so it can be used in useEffect hooks
  const handleClose = useCallback(() => {
    setIsOpen(false);
    setInput('');

    // Restore focus
    if (previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, []);

  // Register callback for external console opening
  useEffect(() => {
    registerConsoleCallback((command?: string) => {
      previousFocusRef.current = document.activeElement as HTMLElement;
      setIsOpen(true);

      // If command provided, execute it
      if (command) {
        setInput(command);
        setTimeout(() => {
          // Trigger submit
          const form = inputRef.current?.closest('form');
          if (form) {
            form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
          }
        }, 100);
      }
    });
  }, []);

  // Listen for backtick to open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' && !isOpen) {
        e.preventDefault();
        previousFocusRef.current = document.activeElement as HTMLElement;
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Listen for custom console open events from LandingFooter
  useEffect(() => {
    const handleOpenConsole = (e: CustomEvent) => {
      previousFocusRef.current = document.activeElement as HTMLElement;
      setIsOpen(true);

      if (e.detail?.command) {
        setInput(e.detail.command);
        setTimeout(() => {
          const form = inputRef.current?.closest('form');
          if (form) {
            form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
          }
        }, 100);
      }
    };

    const handleCloseConsole = () => {
      handleClose();
    };

    window.addEventListener('open-console', handleOpenConsole as EventListener);
    window.addEventListener('close-console', handleCloseConsole as EventListener);
    return () => {
      window.removeEventListener('open-console', handleOpenConsole as EventListener);
      window.removeEventListener('close-console', handleCloseConsole as EventListener);
    };
  }, [handleClose]);

  // Focus trap
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Scroll to bottom when history updates
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const cmd = input.trim();
    setHistory((prev) => [...prev, { input: cmd, output: [] }]);
    setInput('');

    // Execute command
    const result = await executeCommand(cmd);

    // Trigger breath effect if requested
    if (result.breath) {
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!prefersReducedMotion) {
        setIsBreathing(true);
        setTimeout(() => setIsBreathing(false), 350);
      }
    }

    if (result.animated) {
      // Type out animated results
      setIsTyping(true);
      let currentOutput: string[] = [];

      for (const line of result.output) {
        currentOutput.push(line);
        setHistory((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].output = [...currentOutput];
          return updated;
        });

        // Brief delay between lines
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      setIsTyping(false);
    } else {
      // Instant output
      setHistory((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].output = result.output;
        return updated;
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
      return;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{
            zIndex: zIndex.modal,
            backgroundColor: `${colors.deepSpace}e6`,
            backdropFilter: 'blur(8px)',
          }}
          onClick={handleClose}
        >
          <motion.div
            ref={consoleContainerRef}
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-3xl h-[600px] border-2 rounded-lg flex flex-col overflow-hidden font-mono text-sm"
            style={{
              backgroundColor: colors.gunmetal,
              borderColor: colors.electricBlue,
              boxShadow: isBreathing
                ? `0 0 60px ${colors.electricBlue}60, inset 0 0 30px ${colors.electricBlue}10`
                : `0 0 40px ${colors.electricBlue}40`,
              transition: 'box-shadow 0.35s ease-out',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-2 border-b"
              style={{ borderColor: colors.graphite }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: colors.signalGreen }}
                />
                <span style={{ color: colors.electricBlue }}>
                  HIVE CONSOLE
                </span>
              </div>
              <button
                onClick={handleClose}
                className="text-xs px-2 py-1 rounded transition-all"
                style={{ color: colors.slateLight }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.neonPink;
                  e.currentTarget.style.backgroundColor = `${colors.neonPink}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = colors.slateLight;
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {isMobile ? '[X]' : '[ESC]'}
              </button>
            </div>

            {/* Output */}
            <div
              ref={outputRef}
              className="flex-1 overflow-y-auto p-4 space-y-3"
              style={{ color: colors.offWhite }}
            >
              {history.length === 0 && (
                <div className="space-y-2">
                  <div style={{ color: colors.electricBlue }}>
                    {'>'} Welcome to the HIVE CONSOLE
                  </div>
                  <div style={{ color: colors.slateLight }}>
                    Type <span style={{ color: colors.aurumGold }}>help</span> for a list of available commands.
                  </div>
                  <div style={{ color: colors.slateLight }}>
                    Press Esc to close.
                  </div>
                </div>
              )}
              {history.map((entry, i) => (
                <div key={i}>
                  <div style={{ color: colors.aurumGold }}>
                    {'>'} {entry.input}
                  </div>
                  {entry.output.map((line, j) => (
                    <div
                      key={j}
                      style={{
                        color: line.startsWith('>')
                          ? colors.electricBlue
                          : colors.slateLight,
                      }}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="border-t px-4 py-3 flex items-center gap-2"
              style={{ borderColor: colors.graphite }}
            >
              <span style={{ color: colors.aurumGold }}>{'>'}</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isTyping}
                className="flex-1 bg-transparent outline-none"
                style={{ color: colors.offWhite }}
                placeholder="type 'help' for commands..."
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                name="hive-console-command"
                id="hive-console-input"
              />
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
