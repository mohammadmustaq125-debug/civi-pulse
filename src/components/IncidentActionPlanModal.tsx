import React, { useState } from 'react';
import { IncidentActionPlan } from '../types';
import {
  FileText,
  Copy,
  Check,
  Printer,
  Shield,
  Users,
  Clock,
  AlertCircle,
  RefreshCw,
  Loader2,
} from 'lucide-react';

export const IncidentActionPlanView: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [incidentType, setIncidentType] = useState('Urban Monsoon Cloudburst & Flash Surge');
  const [ward, setWard] = useState('Ward 7 Riverside & Ward 9 East Delta');
  const [iap, setIap] = useState<IncidentActionPlan>({
    incidentName: 'OPERATION DELTA GUARDIAN',
    operationalPeriod: 'Operational Period 01 (0000 - 0600 HRS)',
    strategicObjectives: [
      'Maintain continuous life-safety containment across low-lying underpasses and subterranean transit egresses.',
      'Enforce automated traffic signal preemption to guarantee unobstructed corridor for Advanced Life Support units.',
      'Isolate all flood-threatened high-voltage distribution substations before transformer water intrusion exceeds 50cm.',
      'Establish primary triage shelter and medical surge receiving center at Sector 4 Civic Complex.',
    ],
    commandStaff: {
      incidentCommander: 'Dr. Evelyn Vance (Chief Resilience Officer)',
      safetyOfficer: 'Capt. Marcus Thorne (Municipal Hazmat Command)',
      operationsChief: 'Cmdr. Sarah Chen (Unified Dispatch & EMS)',
      logisticsLead: 'Devon Patel (Public Utilities & Telecom Grid)',
    },
    criticalResourceDemands: [
      {
        branch: 'Emergency Medical Services (EMS)',
        requirement: '6 Advanced Life Support Ambulances + 2 Mobile Triage Pods',
        priority: 'CRITICAL',
      },
      {
        branch: 'Search & Water Rescue',
        requirement: '4 Inflatable Rapid Rescue Boats + 2 Amphibious Extrication Vehicles',
        priority: 'HIGH',
      },
      {
        branch: 'Public Works & Stormwater',
        requirement: '3 High-Capacity Mobile Sump Siphon Rigs (10,000 gpm)',
        priority: 'HIGH',
      },
      {
        branch: 'Autonomous UAV Recon',
        requirement: '4 Thermal Imaging Drone Quads on 15-minute perimeter patrol',
        priority: 'ROUTINE',
      },
    ],
    keyMilestones: [
      { hourOffset: 'T+00:30', target: 'Complete secondary citizen sweep along flooded underpasses' },
      { hourOffset: 'T+01:30', target: 'Full isolation and phase rerouting of Substation 14' },
      { hourOffset: 'T+03:00', target: 'Activation of secondary stormwater overflow reservoir gates' },
      { hourOffset: 'T+05:00', target: 'Preliminary structural inspection of arterial flyover pillars' },
    ],
    safetyMessage:
      'ALL UNITS: Severe electrocution hazard present in standing water deeper than 30cm. Do not enter submerged areas without insulated boots and live-wire voltage probe verification. Wear high-visibility flotation gear at all times.',
  });

  const handleGenerateIap = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/generate-iap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          incidentType,
          ward,
          incidentSummary:
            'Rapid inundation affecting civilian traffic and high voltage grid feeders with over 15 trapped residents reported.',
        }),
      });
      const json = await res.json();
      if (json.data) {
        setIap(json.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    const text = `INCIDENT ACTION PLAN (IAP) - RESILIFY AI
INCIDENT: ${iap.incidentName}
OPERATIONAL PERIOD: ${iap.operationalPeriod}

COMMAND STAFF:
- Incident Commander: ${iap.commandStaff.incidentCommander}
- Operations Chief: ${iap.commandStaff.operationsChief}
- Safety Officer: ${iap.commandStaff.safetyOfficer}
- Logistics Lead: ${iap.commandStaff.logisticsLead}

STRATEGIC OBJECTIVES:
${iap.strategicObjectives.map((obj, i) => `${i + 1}. ${obj}`).join('\n')}

SAFETY MESSAGE:
${iap.safetyMessage}
    `;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 rounded-xl border border-slate-800 bg-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-medium text-cyan-400 mb-1">
            FEMA / NDMA Unified Incident Command Protocol
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Automated Incident Action Plan (IAP) Generator
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl">
            Generates standardized operational briefings, chain of command allocations, safety directives, and tactical milestones ready for municipal emergency directors.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs text-white font-medium flex items-center gap-2 transition-all cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            {copied ? 'Copied IAP' : 'Copy Text'}
          </button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs text-white font-medium flex items-center gap-2 transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-slate-400" />
            Print IAP
          </button>
        </div>
      </div>

      {/* Generator Trigger Bar */}
      <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 min-w-[300px]">
          <input
            type="text"
            value={incidentType}
            onChange={(e) => setIncidentType(e.target.value)}
            className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
            placeholder="Incident Category"
          />
          <input
            type="text"
            value={ward}
            onChange={(e) => setWard(e.target.value)}
            className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
            placeholder="Operational Zone"
          />
        </div>

        <button
          onClick={handleGenerateIap}
          disabled={isLoading}
          className="px-5 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Synthesizing ICS Plan...
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4" />
              Generate Gemini Action Plan
            </>
          )}
        </button>
      </div>

      {/* Official IAP Document View */}
      <div className="rounded-xl border border-slate-700 bg-slate-900 p-6 md:p-8 space-y-6 shadow-2xl font-sans">
        {/* Document Header */}
        <div className="border-b-2 border-slate-700 pb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-cyan-400">
              MUNICIPAL EMERGENCY OPERATIONS CENTER · ICS FORM 202/204
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight mt-1">
              {iap.incidentName}
            </h1>
            <div className="text-xs text-slate-400 mt-1 font-mono">
              {iap.operationalPeriod} · Generated via Resilify AI Neural Engine
            </div>
          </div>
          <div className="px-3 py-1.5 rounded bg-slate-950 border border-slate-700 text-xs font-mono text-cyan-300">
            SECURITY LEVEL: UNRESTRICTED PUBLIC SAFETY
          </div>
        </div>

        {/* Strategic Objectives */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            1.0 Incident Operational Objectives
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {iap.strategicObjectives.map((obj, i) => (
              <div
                key={i}
                className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 leading-relaxed"
              >
                <span className="font-mono text-cyan-400 font-bold mr-2">1.{i + 1}</span>
                {obj}
              </div>
            ))}
          </div>
        </div>

        {/* Command Staff ICS Structure */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Users className="w-4 h-4 text-cyan-400" />
            2.0 Unified Command Staff Assignment
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">Incident Commander</div>
              <div className="text-xs font-bold text-white mt-1">
                {iap.commandStaff.incidentCommander}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">Safety Officer</div>
              <div className="text-xs font-bold text-amber-300 mt-1">
                {iap.commandStaff.safetyOfficer}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">Operations Chief</div>
              <div className="text-xs font-bold text-cyan-300 mt-1">
                {iap.commandStaff.operationsChief}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">Logistics Lead</div>
              <div className="text-xs font-bold text-white mt-1">
                {iap.commandStaff.logisticsLead}
              </div>
            </div>
          </div>
        </div>

        {/* Critical Resource Allocation */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            3.0 Resource Requisition & Branch Allocation
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 rounded-lg overflow-hidden">
              <thead className="bg-slate-950 text-slate-400 font-mono text-[11px]">
                <tr>
                  <th className="py-2.5 px-3">Branch</th>
                  <th className="py-2.5 px-3">Resource Demand & Equipment</th>
                  <th className="py-2.5 px-3 text-right">Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-950/50">
                {iap.criticalResourceDemands.map((res, i) => (
                  <tr key={i} className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-3 font-semibold text-white">{res.branch}</td>
                    <td className="py-2.5 px-3 text-slate-300">{res.requirement}</td>
                    <td className="py-2.5 px-3 text-right">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                          res.priority === 'CRITICAL'
                            ? 'bg-rose-950 text-rose-300 border border-rose-800'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {res.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tactical Milestones & Safety Message */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              Operational Milestones
            </div>
            <div className="space-y-2 pt-1">
              {iap.keyMilestones.map((m, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <span className="font-mono text-cyan-400 font-semibold shrink-0">
                    {m.hourOffset}
                  </span>
                  <span>{m.target}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/50 space-y-2">
            <div className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              Safety Directive to Responders
            </div>
            <p className="text-xs text-rose-200 leading-relaxed pt-1">
              {iap.safetyMessage}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
