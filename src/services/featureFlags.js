const FEATURE_FLAGS = {
  free: {
    boardMode: true,
    cloudSave: false,
    // Generation / upload / monitor are gated by the date-driven phase
    // schedule (UNLOCK_DATES) — the free plan no longer hard-blocks them,
    // so the day-by-day unlock demo works. Subscription tiers add value
    // (cloud, more projects, no ads) rather than gating core code/upload.
    micropythonGen: true,
    arduinoGen: true,
    serialMonitor: true,
    compileUpload: true,
    exportCode: true,
    maxLocalProjects: 3,
    showAds: true,
  },
  maker: {
    boardMode: true,
    cloudSave: true,
    micropythonGen: true,
    arduinoGen: true,
    serialMonitor: true,
    compileUpload: true,
    exportCode: true,
    maxCloudProjects: 10,
    showAds: false,
  },
  pro: {
    boardMode: true,
    cloudSave: true,
    micropythonGen: true,
    arduinoGen: true,
    serialMonitor: true,
    compileUpload: true,
    exportCode: true,
    maxCloudProjects: Infinity,
    showAds: false,
    teamManagement: true,
    teacherDashboard: true,
    customBlocks: true,
    apiAccess: true,
  },
};

let currentPlan = 'free';

export function getPlan() {
  return currentPlan;
}

export function setPlan(plan) {
  if (FEATURE_FLAGS[plan]) {
    currentPlan = plan;
  }
}

export function isFeatureEnabled(feature) {
  return FEATURE_FLAGS[currentPlan]?.[feature] === true;
}

export function getFeatureFlags() {
  return { ...FEATURE_FLAGS[currentPlan] };
}

export function getAllPlans() {
  return Object.keys(FEATURE_FLAGS);
}
