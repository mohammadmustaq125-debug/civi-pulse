import React, { useState } from 'react';
import { WardTelemetry } from '../types';
import {
  ShieldAlert,
  Activity,
  Zap,
  Waves,
  Wind,
  Truck,
  Building2,
  Radio,
  Clock,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';

interface LiveOperationsMapProps {
  wards: WardTelemetry[];
  onSelectWard: (ward: WardTelemetry) => void;
  selectedWard: WardTelemetry | null;
  onOpenTriageForWard: (ward: WardTelemetry) => void;
}

export const LiveOperationsMap: React.FC<LiveOperationsMapProps> = ({
  wards,
  onSelectWard,
  selectedWard,
  onOpenTriageForWard,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'flood' | 'grid' | 'traffic'>('all');
  const [activeNotification, setActiveNotification] = useState<string | null>(null);

  const activeWard = selectedWard || wards[1] || wards[0];

  const handleTriggerActuator = (subsystem: string, action: string) => {
    setActiveNotification(`${subsystem}: ${action}`);
    setTimeout(() => setActiveNotification(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Editorial Overview Strip with Command Center Banner */}
      <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl">
        <div className="relative h-64 md:h-72 w-full">
          <img
            src="/src/assets/images/hero_command_center_1791955709401.jpg"
            alt="Municipal Emergency Operations Command Center"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover brightness-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent flex flex-col justify-end p-6 md:p-8">
            <div className="flex items-center gap-2 text-xs font-medium text-cyan-400 mb-2">
              <span>Metropolitan Autonomous Grid</span>
              <span aria-hidden="true">·</span>
              <span>Gemini 3.8 Flash Neural Core</span>
              <span aria-hidden="true">·</span>
              <span>Sensor Frequency 200ms</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight max-w-2xl text-balance">
              Autonomous Municipal Crisis & Emergency Resilience Grid
            </h1>
            <p className="text-sm md:text-base text-slate-300 mt-2 max-w-3xl">
              Continuous multimodal ingestion of civic sensor telemetry, citizen distress feeds, and urban infrastructure nodes. Instant autonomous triage, traffic signal preemption, and disaster mitigation.
            </p>
          </div>
        </div>

        {/* Real-time KPI Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800 border-t border-slate-800 bg-slate-950/90 py-3 px-4">
          <div className="px-3 py-2">
            <div className="text-xs text-slate-400">Average Triage Latency</div>
            <div className="text-xl font-bold text-cyan-400 font-mono tabular-nums mt-0.5">
              1.24s <span className="text-xs font-normal text-slate-500">vs 14m legacy</span>
            </div>
          </div>
          <div className="px-3 py-2">
            <div className="text-xs text-slate-400">Active Sensor Nodes</div>
            <div className="text-xl font-bold text-white font-mono tabular-nums mt-0.5">
              4,820 <span className="text-xs font-normal text-emerald-400">99.8% Online</span>
            </div>
          </div>
          <div className="px-3 py-2">
            <div className="text-xs text-slate-400">Autonomous Actions Today</div>
            <div className="text-xl font-bold text-emerald-400 font-mono tabular-nums mt-0.5">
              184 <span className="text-xs font-normal text-slate-500">Zero-Human Delay</span>
            </div>
          </div>
          <div className="px-3 py-2">
            <div className="text-xs text-slate-400">Estimated Casualties Averted</div>
            <div className="text-xl font-bold text-white font-mono tabular-nums mt-0.5">
              34 <span className="text-xs font-normal text-cyan-400">Model Forecast</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actuator Notification Banner */}
      {activeNotification && (
        <div className="flex items-center gap-3 p-3.5 rounded-lg border border-cyan-500/30 bg-cyan-950/40 text-cyan-200 text-sm animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
          <span className="font-semibold text-white">Autonomous Actuator Triggered:</span>
          <span>{activeNotification}</span>
        </div>
      )}

      {/* Main Grid: Interactive Map + Ward Telemetry Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Digital Twin Vector Map */}
        <div className="lg:col-span-8 rounded-xl border border-slate-800 bg-slate-900/90 p-5 space-y-4 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-base font-semibold text-white">
                Metropolitan Geospatial Digital Twin
              </h2>
              <div className="text-xs text-slate-400">
                Click any ward node to inspect real-time sensor streams and autonomous actuator controls
              </div>
            </div>

            {/* Segmented Filter Control */}
            <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800">
              <button
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  filterMode === 'all' ? 'bg-slate-800 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                All Hazards
              </button>
              <button
                onClick={() => setFilterMode('flood')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  filterMode === 'flood' ? 'bg-blue-900/60 text-blue-200 border border-blue-700/50' : 'text-slate-400 hover:text-white'
                }`}
              >
                Hydrology
              </button>
              <button
                onClick={() => setFilterMode('grid')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  filterMode === 'grid' ? 'bg-amber-900/60 text-amber-200 border border-amber-700/50' : 'text-slate-400 hover:text-white'
                }`}
              >
                Power Grid
              </button>
              <button
                onClick={() => setFilterMode('traffic')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  filterMode === 'traffic' ? 'bg-rose-900/60 text-rose-200 border border-rose-700/50' : 'text-slate-400 hover:text-white'
                }`}
              >
                Arterials
              </button>
            </div>
          </div>

          {/* Interactive SVG City Canvas */}
          <div className="relative w-full aspect-16/10 bg-slate-950 rounded-lg border border-slate-800/80 overflow-hidden">
            {/* Grid background lines */}
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(51, 65, 85, 0.25)" strokeWidth="0.3" />
                </pattern>
                {/* River Gradient */}
                <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.7" />
                </linearGradient>
              </defs>

              <rect width="100" height="100" fill="url(#grid)" />

              {/* Natural River Course */}
              <path
                d="M 0,30 Q 35,45 50,70 T 100,85"
                fill="none"
                stroke="url(#riverGrad)"
                strokeWidth="7"
                strokeLinecap="round"
              />

              {/* Major Highway Arterials */}
              <path d="M 15,0 L 85,100" fill="none" stroke="rgba(71, 85, 105, 0.5)" strokeWidth="1.2" strokeDasharray="2,2" />
              <path d="M 0,55 L 100,45" fill="none" stroke="rgba(71, 85, 105, 0.5)" strokeWidth="1.2" />
              <path d="M 45,0 L 55,100" fill="none" stroke="rgba(71, 85, 105, 0.5)" strokeWidth="1.5" />

              {/* Flood Risk Heat Area */}
              {(filterMode === 'all' || filterMode === 'flood') && (
                <circle cx="25" cy="58" r="14" fill="#0284c7" fillOpacity="0.25" className="animate-pulse" />
              )}
              {(filterMode === 'all' || filterMode === 'flood') && (
                <circle cx="75" cy="65" r="12" fill="#0284c7" fillOpacity="0.2" />
              )}

              {/* Power Grid Stress Zone */}
              {(filterMode === 'all' || filterMode === 'grid') && (
                <circle cx="25" cy="58" r="8" fill="#d97706" fillOpacity="0.2" />
              )}

              {/* Arterial Traffic Congestion Line */}
              {(filterMode === 'all' || filterMode === 'traffic') && (
                <path d="M 40,30 L 60,40" fill="none" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" />
              )}
            </svg>

            {/* Ward Interactive Nodes */}
            {wards.map((w) => {
              const isSelected = activeWard.id === w.id;
              const isCritical = w.status === 'critical';
              const isWarning = w.status === 'warning';

              return (
                <div
                  key={w.id}
                  onClick={() => onSelectWard(w)}
                  style={{ left: `${w.x}%`, top: `${w.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 z-10 ${
                    isSelected ? 'scale-125 z-20' : 'hover:scale-110'
                  }`}
                >
                  <div
                    className={`relative flex items-center justify-center w-8 h-8 rounded-full border-2 shadow-lg ${
                      isCritical
                        ? 'bg-rose-950 border-rose-500 text-rose-300 shadow-rose-900/50'
                        : isWarning
                        ? 'bg-amber-950 border-amber-500 text-amber-300 shadow-amber-900/50'
                        : 'bg-slate-900 border-cyan-500 text-cyan-300 shadow-cyan-900/50'
                    } ${isSelected ? 'ring-4 ring-cyan-400/30' : ''}`}
                  >
                    <span className="text-[10px] font-mono font-bold">{w.code.replace('WRD-', '')}</span>
                  </div>

                  {/* Ward Micro Label */}
                  <div className="absolute top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded bg-slate-950/90 border border-slate-800 text-[10px] text-slate-300 font-medium pointer-events-none">
                    {w.name.split('-')[0].trim()}
                  </div>
                </div>
              );
            })}

            {/* Legend Overlay */}
            <div className="absolute bottom-3 left-3 p-2 rounded-lg bg-slate-950/90 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span>P1 Critical Inundation / Grid Hazard</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>P2 Elevated Warning Corridor</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                <span>P3 Nominal Autonomous Monitoring</span>
              </div>
            </div>
          </div>

          {/* Autonomous Municipal Actuators Controls */}
          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Autonomous Municipal Actuators (Click to Test Real Intervention)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={() =>
                  handleTriggerActuator(
                    'Traffic Preemption',
                    'Green corridor locked on Arterial 4 for inbound ALS Ambulances'
                  )
                }
                className="flex items-center justify-between p-2.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 transition-colors cursor-pointer text-left"
              >
                <span className="font-medium">Pre-empt Signal Corridor</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              </button>

              <button
                onClick={() =>
                  handleTriggerActuator(
                    'Water Utility',
                    'Stormwater bypass sluice gates opened at Riverside Drainage Sector 2'
                  )
                }
                className="flex items-center justify-between p-2.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 transition-colors cursor-pointer text-left"
              >
                <span className="font-medium">Trigger Sluice Drain Bypass</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              </button>

              <button
                onClick={() =>
                  handleTriggerActuator(
                    'Microgrid Protection',
                    'Isolated Substation 14 step-down feeder to prevent electrocution in flooded zone'
                  )
                }
                className="flex items-center justify-between p-2.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 transition-colors cursor-pointer text-left"
              >
                <span className="font-medium">Isolate Flood Substation</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Ward Telemetry Inspector */}
        <div className="lg:col-span-4 rounded-xl border border-slate-800 bg-slate-900 p-5 space-y-5 shadow-lg">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Ward Telemetry Inspector</span>
              <span className="font-mono text-cyan-400">{activeWard.code}</span>
            </div>
            <h3 className="text-lg font-bold text-white">{activeWard.name}</h3>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
              <span>Population: {(activeWard.population / 1000).toFixed(0)}k</span>
              <span aria-hidden="true">·</span>
              <span>Hospitals: {activeWard.hospitalsCount}</span>
              <span aria-hidden="true">·</span>
              <span
                className={`font-semibold ${
                  activeWard.status === 'critical'
                    ? 'text-rose-400'
                    : activeWard.status === 'warning'
                    ? 'text-amber-400'
                    : 'text-emerald-400'
                }`}
              >
                {activeWard.status.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Telemetry Metric Bars */}
          <div className="space-y-3.5 pt-2 border-t border-slate-800 text-sm">
            {/* Water Level */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Waves className="w-3.5 h-3.5 text-blue-400" />
                  Stormwater Depth
                </span>
                <span className="font-mono font-medium text-white tabular-nums">
                  {activeWard.waterLevelCm} cm{' '}
                  <span className="text-slate-500 font-normal">/ {activeWard.waterThresholdCm} cm threshold</span>
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    activeWard.waterLevelCm >= activeWard.waterThresholdCm ? 'bg-rose-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${Math.min(100, (activeWard.waterLevelCm / activeWard.waterThresholdCm) * 100)}%` }}
                />
              </div>
            </div>

            {/* Grid Load */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Electrical Transformer Strain
                </span>
                <span className="font-mono font-medium text-white tabular-nums">
                  {activeWard.gridLoadPct}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    activeWard.gridLoadPct > 90 ? 'bg-rose-500' : activeWard.gridLoadPct > 75 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(100, activeWard.gridLoadPct)}%` }}
                />
              </div>
            </div>

            {/* Traffic Congestion */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Truck className="w-3.5 h-3.5 text-rose-400" />
                  Arterial Congestion Index
                </span>
                <span className="font-mono font-medium text-white tabular-nums">
                  {activeWard.trafficDelayIndex}x delay
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                <div
                  className="h-full bg-rose-500 transition-all duration-300"
                  style={{ width: `${Math.min(100, (activeWard.trafficDelayIndex / 4) * 100)}%` }}
                />
              </div>
            </div>

            {/* AQI */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Wind className="w-3.5 h-3.5 text-cyan-400" />
                  Air Quality Index (AQI)
                </span>
                <span className="font-mono font-medium text-white tabular-nums">
                  {activeWard.aqi} AQI
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    activeWard.aqi > 150 ? 'bg-purple-500' : activeWard.aqi > 100 ? 'bg-rose-500' : 'bg-cyan-500'
                  }`}
                  style={{ width: `${Math.min(100, (activeWard.aqi / 200) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Ward Action Trigger */}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <button
              onClick={() => onOpenTriageForWard(activeWard)}
              className="w-full py-2.5 px-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4" />
              Launch Gemini Multimodal Triage for {activeWard.code}
            </button>
            <div className="text-[11px] text-center text-slate-400">
              Dispatches emergency resources & generates real-time citizen survival guide
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
