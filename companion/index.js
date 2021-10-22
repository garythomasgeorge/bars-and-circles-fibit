/**** BEGIN KPAY IMPORTS - REQUIRED ****/
/*
 * If you want (a lot of) logging from the KiezelPay library,
 * replace "release" with "debug" in the import path below
 */
import * as kpay from './kpay/release/kpay_companion.js';
import * as kpay_common from '../common/kpay/kpay_common.js';
/**** END KPAY IMPORTS ****/


import { me }               from 'companion';
import { settingsStorage }  from 'settings';
import * as messaging       from 'messaging';
import * as weather         from '../lib/fitbit_weather/companion';

/**** KPAY INIT - REQUIRED ***/
kpay.initialize();

const KEYS_SETTINGS = [
  'backgroundColor',
  'distanceImperialUnit',
  'imperialUnit',
  'manualLocation',
  'weatherRefreshTime',
];

function sendValue(key, val) {
  if (val) {
    let computedVal;

    try { computedVal = JSON.parse(val); }
    catch { computedVal = val; }

    sendSettingData({
      key: key,
      value: computedVal,
    });
  }
}

function sendSettingData(data) {
  // If we have a MessageSocket, send the data to the device
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
    return;
  }

  console.log("No peerSocket connection");
}

// WEATHER
// -------
weather.setup({
  apiKey: 'a04e65764507c24de80b539832030597', //API Key Name = Default
  //bingMapKey: 'As2xOFxZwP4XEckfO5XKZ5u5qJHdD3QXUkq429Cs75Hect8Ksw3j35tN1CPshina',
  provider : weather.Providers.owm,
});