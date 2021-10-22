/**** BEGIN KPAY IMPORTS - REQUIRED ****/
/*
 * If you want (a lot of) logging from the KPay library,
 * replace "release" with "debug" in the import paths for
 * ALL KPAY IMPORTS below
 *    ==> DO NOT MIX RELEASE AND DEBUG IMPORTS!
 */
// required imports
import * as kpay from './kpay/release/kpay.js';
import * as kpay_common from '../common/kpay/kpay_common.js';

/* Choose which type of "companion => phone communications" you want to use:
 *   - file transfer: is more reliable, uses more memory
 *          ==> import './kpay/release/kpay_filetransfer.js';
 *   - normal messaging: less reliable then file transfer, might cause frustration with the user if messaging fails, but uses less memory
 *          ==> import './kpay/release/kpay_messaging.js';
 * If you do not run into memory issues with your app or clockface, we recommend you use the file transfer communications
 */
import './kpay/release/kpay_filetransfer.js';
//import './kpay/release/kpay_messaging.js';

// optional imports, remove if not needed to save memory
import './kpay/release/kpay_dialogs.js';			// remove if you handle KPay dialogs yourself

// remove this is you want to choose yourself when the purchase starts,
// leave it in if you want the purchase to start automatically (either after a long trial or immediately at startup of the app)
// If you want the purchase to start immediately after install, just set the trial time to 0 in the product settings in your kpay account
import './kpay/release/kpay_time_trial.js';
/**** END KPAY IMPORTS ****/


import clock                  from "clock";
import * as document          from "document";
import { preferences }        from "user-settings";
import { display }            from "display";
import * as data              from './data';
import * as touch             from './touchEvents';
import { HeartRateSensor }    from 'heart-rate';
import { BodyPresenceSensor}  from "body-presence";


/**** KPAY INIT - REQUIRED ***/
kpay.initialize();

// Set AOD allowed to true, commented for initial release
//display.aodAllowed = true;

// Update the clock every minute
clock.granularity = "minutes";
const hrm = new HeartRateSensor();
const body = new BodyPresenceSensor();
hrm.start();
body.start();
data.initialize();

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  data.updateAll({hrm, evt});
}
                       

display.addEventListener("change", function () {
  if (this.on) {
    hrm.start();
    data.initMetric({ activityName: 'weather'});
    return;
  }
    hrm.stop();
    body.stop();
});
if ((display.aodEnabled == true) && (display.aodActive == true)) {
  hrm.stop();
  body.stop();
}

let hrArea = document.getElementById("heartRateData");
let hrText = document.getElementById("metric7");
let weatherInfo = document.getElementById("weatherData");
let colorButton = document.getElementById("colorChangeButton");
let weatherHRButton = document.getElementById("weatherHRChangeButton");
let heartIcon = document.getElementById("heartIcon");

//change color of screen on Left hand top circle touch
colorButton.addEventListener("mousedown", (evt) => {
  let bgImage = document.getElementById('bgImage');
  let hr1 = document.getElementById('hours1');
  let hr2 = document.getElementById('hours2');
  let mi1 = document.getElementById('mins1');
  let mi2 = document.getElementById('mins2');
  touch.changeColor(bgImage, hr1, hr2, mi1, mi2, evt);
})

//check for button touch and update values
weatherHRButton.addEventListener("mousedown", (evt) => {
    switch (weatherInfo.style.display){
      case("inline"):
        weatherInfo.style.display = "none";
        hrArea.style.display = "inline"; 
        heartIcon.style.display = "inline";
        hrText.style.display = "inline";
        hrText.text = `${hrm.heartRate}`;
        break;
      case("none"):
        weatherInfo.style.display = "inline";
        hrArea.style.display = "none"
        heartIcon.style.display = "none"; 
        break;
      default:
        weatherInfo.style.display = "inline";
        hrArea.style.display = "none"; 
        break;
    }
})






//body Presence check to stop and start

