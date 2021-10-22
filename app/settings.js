
let settings = {};
let onsettingschange;
let initMetric;
let resetMetrics;
let resetAllColors;
let lockUIChanged;

export function initialize(callback) {
  settings = loadSettings();
  onsettingschange = callback;
  onsettingschange(settings);
}

export function getData(key = '') {
  if (key.length > 0) return settings[key];
  return undefined;
}

export function update({ key, value }) {
  settings[key] = value;
}
