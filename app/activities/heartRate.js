import * as document          from "document";
import { HeartRateSensor }    from "heart-rate";
import { BodyPresenceSensor } from "body-presence";
import { me as appbit }       from "appbit";

export const heartRate = {
  active: true,
  initActivity: undefined,
  initialized: false,
  name: 'heartRate',
  hrm: undefined,
  
  update: function ({ hrm } = {}) {
    if(!hrm) return;
    this.hrm = hrm;
    
    const idSelector = 'metric' + this.metricNumber;
    const metric = document.getElementById(idSelector);
    const hrmValue=0;
    
    if (HeartRateSensor && appbit.permissions.granted("access_heart_rate")) {
        hrm.addEventListener("reading", () => {
          // heartRate = hrm.readings.heartRate[hrm.readings.heartRate.length-1];
          hrmValue = hrm.heartRate;
        });
        
        // heart rate body detect and then only run else stop
        if (BodyPresenceSensor) {
          const body = new BodyPresenceSensor();
          body.addEventListener("reading", () => {
            if (!body.present) {
              hrm.stop();
            } else {
              hrm.start();
            }
          });
          body.start();
        }
        else {
           console.log("This device does NOT have a HeartRateSensor or permission not granted");
        }

    }
  }
}