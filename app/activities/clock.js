import document         from 'document';
import {preferences}    from 'user-settings';
import * as util        from '../../common/utils';
import * as actions     from '../activityActions';
import { display } from "display";

//fitfont files
import { FitFont } from '../fitfont.js';


// Get a handle on the <text> element
//const myLabel = document.getElementById("myLabel");
const hours1Label = new FitFont({ 
        id:'hours1',               // id of your symbol in the index.gui, you can also give an element object e.g. id: document.getElementById('foo')
        font:'Azeret_Mono_150', // name of the generated font folder

        // Optional
        halign: 'start',            // horizontal alignment : start / middle / end
        valign: 'baseline',         // vertical alignment   : baseline / top / middle / bottom
        letterspacing: 0            // letterspacing...
});

const hours2Label = new FitFont({ 
        id:'hours2',               // id of your symbol in the index.gui, you can also give an element object e.g. id: document.getElementById('foo')
        font:'Azeret_Mono_150', // name of the generated font folder

        // Optional
        halign: 'start',            // horizontal alignment : start / middle / end
        valign: 'baseline',         // vertical alignment   : baseline / top / middle / bottom
        letterspacing: 0            // letterspacing...
});
const mins1Label = new FitFont({ 
        id:'mins1',               // id of your symbol in the index.gui, you can also give an element object e.g. id: document.getElementById('foo')
        font:'Azeret_Mono_150', // name of the generated font folder

        // Optional
        halign: 'start',            // horizontal alignment : start / middle / end
        valign: 'baseline',         // vertical alignment   : baseline / top / middle / bottom
        letterspacing: 0            // letterspacing...
});
const mins2Label = new FitFont({ 
        id:'mins2',               // id of your symbol in the index.gui, you can also give an element object e.g. id: document.getElementById('foo')
        font:'Azeret_Mono_150', // name of the generated font folder

        // Optional
        halign: 'start',            // horizontal alignment : start / middle / end
        valign: 'baseline',         // vertical alignment   : baseline / top / middle / bottom
        letterspacing: 0            // letterspacing...
});

const seperator = new FitFont({ 
        id:'seperator',               // id of your symbol in the index.gui, you can also give an element object e.g. id: document.getElementById('foo')
        font:'Azeret_Mono_130', // name of the generated font folder
});


export const clock = {
  activity: 0,
  initActivity: undefined,
  name: 'clock',
  
 
  update: function ({ evt } = {}) {
    if (!evt) return;
    
    const idSelector = 'metric' + this.metricNumber;
    const metric = document.getElementById(idSelector);
    
    
    let today = evt.date;
    let hours = today.getHours();
    const hoursDigits = undefined;
    const hours1 = undefined;
    const hours2 = undefined;
    if (preferences.clockDisplay === "12h") {
      // 12h format
      hours = hours % 12 || 12;

    } else {
      // 24h format
      hours = util.zeroPad(hours);
    }    
    hoursDigits = hours.toString().split('').map(Number);
    hours1 = hoursDigits[0].toString();
    hours2 = hoursDigits[1].toString();
    let mins = util.zeroPad(today.getMinutes());
    let minsDigits = mins.toString().split('').map(Number);
    let mins1 = minsDigits[0].toString();
    let mins2 = minsDigits[1].toString();

    // AOD Functionality for later. Enable the if loop when required 
    // if ((display.aodEnabled == true) && (display.aodActive == true)) {
    //   console.log(display.aodActive);
    //   console.log ("in AOD");
    // }
    // else if (display.aodActive == false) {
    //   //myLabel.text = `${hours}:${mins}`;
      hours1Label.text = `${hours1}`;
      hours2Label.text = `${hours2}`;
      seperator.text = `:`;
      mins1Label.text = `${mins1}`;
      mins2Label.text = `${mins2}`;
    // }
  }
  
}