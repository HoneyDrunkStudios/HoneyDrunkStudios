'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import LandingFooter from '@/components/LandingFooter';
import NeonGridCanvas from '@/components/NeonGridCanvas';
import { colors } from '@/lib/tokens';
import {
  HIVE_BOOT_TIMESTAMP,
  formatUptime,
  generateUptimeBar,
  calculateServiceUptime,
  calculateServiceStatus,
  calculateResponseTime,
} from '@/lib/console/config';

type ServiceStatus = 'operational' | 'degraded' | 'outage';

interface Service {
  name: string;
  description: string;
}

const SERVICE_DEFINITIONS: Service[] = [
  {
    name: 'The Grid',
    description: 'Core infrastructure and website',
  },
  {
    name: 'Node Network',
    description: 'Project and service discovery',
  },
  {
    name: 'HivePlay',
    description: 'Interactive playground environment',
  },
  {
    name: 'Signal Relay',
    description: 'Real-time telemetry and monitoring',
  },
  {
    name: 'Archive Vault',
    description: 'Data persistence and backup systems',
  },
];

const getStatusColor = (status: ServiceStatus): string => {
  switch (status) {
    case 'operational':
      return colors.signalGreen;
    case 'degraded':
      return colors.aurumGold;
    case 'outage':
      return colors.pulseRed;
  }
};

const getStatusLabel = (status: ServiceStatus): string => {
  switch (status) {
    case 'operational':
      return 'ONLINE';
    case 'degraded':
      return 'DEGRADED';
    case 'outage':
      return 'OFFLINE';
  }
};

export default function StatusPage() {
  const [currentTime, setCurrentTime] = useState<number>(Date.now());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return null;
  }

  const uptime = currentTime - HIVE_BOOT_TIMESTAMP;
  const formattedUptime = formatUptime(uptime);

  // Calculate realistic uptime percentage (starts at ~99.9%, very slowly degrades)
  const daysSinceBoot = Math.floor(uptime / (1000 * 60 * 60 * 24));
  const degradation = daysSinceBoot * 0.001; // Degrades 0.1% every 100 days
  const uptimePercent = Math.max(99.0, Math.min(99.9, Number((99.9 - degradation).toFixed(1))));

  // Calculate dynamic service statuses
  const services = SERVICE_DEFINITIONS.map((service) => ({
    ...service,
    status: calculateServiceStatus(service.name, currentTime),
    uptime: calculateServiceUptime(service.name, currentTime),
  }));

  // Calculate overall status
  const hasOutage = services.some((s) => s.status === 'outage');
  const hasDegraded = services.some((s) => s.status === 'degraded');
  const overallStatus: ServiceStatus = hasOutage ? 'outage' : hasDegraded ? 'degraded' : 'operational';
  const overallColor = getStatusColor(overallStatus);

  // Calculate dynamic telemetry
  const responseTime = calculateResponseTime(currentTime);

  return (
    <div
      className="relative min-h-screen"
      style={{ backgroundColor: colors.deepSpace, color: colors.offWhite }}
    >
      {/* Background */}
      <div className="fixed inset-0">
        <NeonGridCanvas particleCount={100} enableMotion={true} />
      </div>

      {/* Header */}
      <Header />

      {/* Content */}
      <div className="relative z-10 pt-20 md:pt-32 px-4 md:px-8 lg:px-16 pb-16">
        <div className="max-w-5xl mx-auto space-y-8 md:space-y-12">
          {/* Page Title */}
          <header className="space-y-3 md:space-y-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold py-2 md:py-4 holographic-text">
              Grid Status
            </h1>
            <p className="text-base md:text-lg" style={{ color: colors.slateLight }}>
              Real-time telemetry from the HoneyDrunk Grid.
            </p>
          </header>

          {/* Overall Status Banner */}
          <section
            className="p-6 md:p-8 rounded-lg border-2"
            style={{
              backgroundColor: `${colors.gunmetal}80`,
              borderColor: overallColor,
              boxShadow: `0 0 30px ${overallColor}20`,
            }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div
                  className="w-4 h-4 rounded-full animate-pulse"
                  style={{
                    backgroundColor: overallColor,
                    boxShadow: `0 0 20px ${overallColor}`,
                  }}
                />
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold">
                    All Systems{' '}
                    <span style={{ color: overallColor }}>
                      {getStatusLabel(overallStatus)}
                    </span>
                  </h2>
                  <p className="text-sm md:text-base" style={{ color: colors.slateLight }}>
                    Grid continuity: {formattedUptime}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div
                  className="text-4xl md:text-5xl font-display font-bold"
                  style={{ color: colors.aurumGold }}
                >
                  {uptimePercent}%
                </div>
                <div className="text-xs md:text-sm" style={{ color: colors.slateLight }}>
                  Uptime
                </div>
              </div>
            </div>
          </section>

          {/* Service Status Grid */}
          <section className="space-y-4 md:space-y-6">
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-display font-bold"
              style={{ color: colors.electricBlue }}
            >
              Node Status
            </h2>

            <div className="grid gap-4">
              {services.map((service) => {
                const statusColor = getStatusColor(service.status);
                const statusLabel = getStatusLabel(service.status);
                const uptimeBar = generateUptimeBar(service.uptime);

                return (
                  <div
                    key={service.name}
                    className="p-5 md:p-6 rounded-lg border"
                    style={{
                      backgroundColor: `${colors.gunmetal}60`,
                      borderColor: `${statusColor}30`,
                    }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: statusColor,
                            boxShadow: `0 0 12px ${statusColor}`,
                            animation: service.status === 'operational' ? 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none',
                          }}
                        />
                        <div>
                          <h3 className="text-lg md:text-xl font-display font-bold">
                            {service.name}
                          </h3>
                          <p className="text-xs md:text-sm" style={{ color: colors.slateLight }}>
                            {service.description}
                          </p>
                        </div>
                      </div>
                      <div
                        className="font-mono font-bold text-sm"
                        style={{
                          color: statusColor,
                          textShadow: `0 0 10px ${statusColor}60`,
                        }}
                      >
                        {statusLabel}
                      </div>
                    </div>

                    {/* Uptime bar */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <div
                          className="font-mono text-xs md:text-sm"
                          style={{ color: colors.slateLight }}
                        >
                          {uptimeBar}
                        </div>
                      </div>
                      <div
                        className="font-mono font-bold text-sm"
                        style={{ color: colors.aurumGold }}
                      >
                        {service.uptime}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* System Metrics */}
          <section className="space-y-4 md:space-y-6">
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-display font-bold"
              style={{ color: colors.violetFlux }}
            >
              Telemetry
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className="p-5 md:p-6 rounded-lg border"
                style={{
                  backgroundColor: `${colors.gunmetal}60`,
                  borderColor: `${colors.signalGreen}30`,
                }}
              >
                <div className="text-xs uppercase tracking-wider mb-2" style={{ color: colors.slateLight }}>
                  Response Time
                </div>
                <div className="text-3xl md:text-4xl font-display font-bold" style={{ color: colors.signalGreen }}>
                  {responseTime}ms
                </div>
                <div className="text-xs mt-1" style={{ color: colors.slateLight }}>
                  Average latency
                </div>
              </div>

              <div
                className="p-5 md:p-6 rounded-lg border"
                style={{
                  backgroundColor: `${colors.gunmetal}60`,
                  borderColor: `${colors.electricBlue}30`,
                }}
              >
                <div className="text-xs uppercase tracking-wider mb-2" style={{ color: colors.slateLight }}>
                  Active Nodes
                </div>
                <div className="text-3xl md:text-4xl font-display font-bold" style={{ color: colors.electricBlue }}>
                  {services.filter(s => s.status === 'operational').length}/{services.length}
                </div>
                <div className="text-xs mt-1" style={{ color: colors.slateLight }}>
                  Services online
                </div>
              </div>

              <div
                className="p-5 md:p-6 rounded-lg border"
                style={{
                  backgroundColor: `${colors.gunmetal}60`,
                  borderColor: `${colors.aurumGold}30`,
                }}
              >
                <div className="text-xs uppercase tracking-wider mb-2" style={{ color: colors.slateLight }}>
                  Incidents
                </div>
                <div className="text-3xl md:text-4xl font-display font-bold" style={{ color: colors.aurumGold }}>
                  0
                </div>
                <div className="text-xs mt-1" style={{ color: colors.slateLight }}>
                  Last 30 days
                </div>
              </div>
            </div>
          </section>

          {/* Status History */}
          <section className="space-y-4 md:space-y-6">
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-display font-bold"
              style={{ color: colors.neonPink }}
            >
              Recent Activity
            </h2>

            <div
              className="p-6 md:p-8 rounded-lg border"
              style={{
                backgroundColor: `${colors.gunmetal}60`,
                borderColor: `${colors.slateLight}30`,
              }}
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-24 text-xs font-mono" style={{ color: colors.slateLight }}>
                    {new Date().toLocaleDateString()}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold mb-1" style={{ color: colors.signalGreen }}>
                      All Systems Operational
                    </div>
                    <div className="text-sm" style={{ color: colors.slateLight }}>
                      Grid operating at optimal capacity. No incidents reported.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Info Footer */}
          <section
            className="p-6 rounded-lg border text-center"
            style={{
              backgroundColor: `${colors.gunmetal}40`,
              borderColor: `${colors.slateLight}20`,
            }}
          >
            <p className="text-sm" style={{ color: colors.slateLight }}>
              Experiencing issues? Check the{' '}
              <span className="font-mono" style={{ color: colors.electricBlue }}>uptime</span>{' '}
              command in the Hive Console or contact support.
            </p>
          </section>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <LandingFooter />
      </div>
    </div>
  );
}
