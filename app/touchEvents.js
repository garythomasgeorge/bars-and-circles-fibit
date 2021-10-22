import * as document from "document";
import * as permissions from './permissions';

//heart rate import
import { me as appbit } from "appbit";
import { HeartRateSensor } from "heart-rate";
import { BodyPresenceSensor } from "body-presence";


let i = 0;
export function changeColor(bgImage, hr1, hr2, mi1, mi2, evt) {
  //cycle color and bg
  cycleStyles(bgImage, hr1, hr2, mi1, mi2, evt);
  i++;
} 

function cycleStyles(bgImage, hr1, hr2, mi1, mi2, evt){
    let bgPaths = ["images/clockface_bg.png", "images/clockface_bg2.png"]; 
    switch (bgImage.href){
      case ('images/clockface_bg.png'):
          bgImage.href = "images/clockface_bg2.png";
          hr1.style.fill = "#1B9CFC";
          hr2.style.fill = "#D6A2E8";
          mi1.style.fill = "#1B9CFC";
          mi2.style.fill = "#D6A2E8";
          break;
      case ("images/clockface_bg2.png"):
          bgImage.href = "images/clockface_bg.png";
          hr1.style.fill = "#F1C40F";
          hr2.style.fill = "#E67E22";
          mi1.style.fill = "#F1C40F";
          mi2.style.fill = "#E67E22";
          break;
      }
}
