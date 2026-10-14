import { WardTelemetry } from '../types';

export const INITIAL_WARDS: WardTelemetry[] = [
  {
    id: 'w-1',
    name: 'Sector 4 - Downtown Financial & Tech Hub',
    code: 'WRD-01',
    riskScore: 28,
    waterLevelCm: 14,
    waterThresholdCm: 60,
    gridLoadPct: 82,
    aqi: 68,
    trafficDelayIndex: 1.4,
    population: 340000,
    hospitalsCount: 4,
    shelterCapacityPct: 35,
    status: 'nominal',
    x: 48,
    y: 35,
  },
  {
    id: 'w-2',
    name: 'Ward 7 - Riverside Industrial & Rail Depot',
    code: 'WRD-02',
    riskScore: 84,
    waterLevelCm: 78,
    waterThresholdCm: 60,
    gridLoadPct: 94,
    aqi: 145,
    trafficDelayIndex: 3.8,
    population: 220000,
    hospitalsCount: 2,
    shelterCapacityPct: 88,
    status: 'critical',
    x: 25,
    y: 58,
  },
  {
    id: 'w-3',
    name: 'Ward 3 - North Hills Suburban & Hospital Zone',
    code: 'WRD-03',
    riskScore: 32,
    waterLevelCm: 8,
    waterThresholdCm: 50,
    gridLoadPct: 62,
    aqi: 45,
    trafficDelayIndex: 1.2,
    population: 185000,
    hospitalsCount: 5,
    shelterCapacityPct: 40,
    status: 'nominal',
    x: 32,
    y: 22,
  },
  {
    id: 'w-4',
    name: 'Ward 9 - East Delta Coastal Lowlands',
    code: 'WRD-04',
    riskScore: 92,
    waterLevelCm: 92,
    waterThresholdCm: 65,
    gridLoadPct: 89,
    aqi: 72,
    trafficDelayIndex: 3.2,
    population: 295000,
    hospitalsCount: 3,
    shelterCapacityPct: 92,
    status: 'critical',
    x: 75,
    y: 65,
  },
  {
    id: 'w-5',
    name: 'Ward 5 - University District & Innovation Park',
    code: 'WRD-05',
    riskScore: 45,
    waterLevelCm: 25,
    waterThresholdCm: 55,
    gridLoadPct: 71,
    aqi: 58,
    trafficDelayIndex: 1.8,
    population: 160000,
    hospitalsCount: 2,
    shelterCapacityPct: 50,
    status: 'advisory',
    x: 62,
    y: 28,
  },
  {
    id: 'w-6',
    name: 'Ward 11 - South Logistics & Freight Interchange',
    code: 'WRD-06',
    riskScore: 68,
    waterLevelCm: 48,
    waterThresholdCm: 50,
    gridLoadPct: 88,
    aqi: 110,
    trafficDelayIndex: 2.9,
    population: 210000,
    hospitalsCount: 1,
    shelterCapacityPct: 65,
    status: 'warning',
    x: 42,
    y: 75,
  },
];

export interface PresetScenario {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  imagePath: string;
  sensorTelemetry: {
    waterLevelCm: number;
    gridLoadPct: number;
    aqi: number;
    trafficDelayIndex: number;
    ambientTempC: number;
    windSpeedKmh: number;
  };
}

export const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'scenario-flood',
    title: 'Flash Flood & Metro Sump Inundation',
    category: 'Urban Flood & Water Hazard',
    location: 'Ward 7 - Riverside Lower Arterial & Underpass',
    description: 'Cloudburst precipitation triggered rapid 85cm stormwater pooling. Basement parking and subway egress flooded. 14 citizens stranded on elevated median with fast-flowing debris. Live electrical pole sparking nearby.',
    imagePath: '/src/assets/images/incident_urban_flood_1791955710622.jpg',
    sensorTelemetry: {
      waterLevelCm: 85,
      gridLoadPct: 96,
      aqi: 64,
      trafficDelayIndex: 4.2,
      ambientTempC: 24,
      windSpeedKmh: 42,
    },
  },
  {
    id: 'scenario-power',
    title: 'Substation Cascade Failure & Hazmat Arc',
    category: 'Energy Grid & Industrial Hazard',
    location: 'Ward 2 - High-Voltage Substation 14',
    description: 'Catastrophic phase imbalance caused transformer coolant rupture and electrical fire. Dense hydrocarbon smoke plume drifting northeast towards residential sector. 120,000 homes facing grid collapse.',
    imagePath: '/src/assets/images/incident_power_hazmat_1791955711655.jpg',
    sensorTelemetry: {
      waterLevelCm: 6,
      gridLoadPct: 142,
      aqi: 198,
      trafficDelayIndex: 2.4,
      ambientTempC: 38,
      windSpeedKmh: 18,
    },
  },
  {
    id: 'scenario-traffic',
    title: 'Arterial Gridlock & Critical Ambulance Blockage',
    category: 'Smart Transportation & Emergency Transit',
    location: 'Sector 4 - Grand Cross Arterial Interchange',
    description: 'Signal controller outage combined with peak commuter volume created a 4-kilometer standstill gridlock. 3 emergency ambulances carrying cardiac and trauma patients trapped with zero movement.',
    imagePath: '/src/assets/images/incident_traffic_gridlock_1791955712435.jpg',
    sensorTelemetry: {
      waterLevelCm: 12,
      gridLoadPct: 78,
      aqi: 88,
      trafficDelayIndex: 4.8,
      ambientTempC: 29,
      windSpeedKmh: 10,
    },
  },
];

export const JURY_SUGGESTED_QUESTIONS = [
  'How does Resilify AI fundamentally outperform legacy 911/112 municipal dispatch systems?',
  'How does the system ensure zero data loss and continue triaging during cellular or grid blackouts?',
  'Explain the exact multimodal architecture: how does Gemini 3.8 Flash ingest images, telemetry, and audio?',
  'How does this address UN Sustainable Development Goals (SDG 11, SDG 3, SDG 13) and civic ROI?',
  'What prevents hallucination in critical life-or-death emergency resource allocation?',
];
