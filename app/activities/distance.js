import document           from 'document';
import { me as appbit } from "appbit";
import { today, goals } from "user-activity";

import * as util            from '../../common/utils';
import * as actions         from '../activityActions';
import * as settings        from '../settings';


export const distance = {
  active: true,
  initActivity: undefined,
  initialized: false,
  
  activity: 6,
  name: 'distance',
  
  update: function() {
    const idSelector = 'metric' + this.metricNumber;
    const metric = document.getElementById(idSelector);
    const metricData = document.getElementById(idSelector+"Data");
    const metricDataPercent = document.getElementById(idSelector+"Percent");
    
    const distanceToday = undefined;
    const distanceGoal = undefined;
    
    if (appbit.permissions.granted("access_activity")) {
      distanceToday = today.adjusted.distance;
      distanceGoal = goals.distance;
    }
    const distancePercent = distanceCalculator(distanceToday, distanceGoal);
    metric.width = distancePercent*1.5;
    metricData.text = ` ${(distanceToday*0.001).toFixed(2)}`; //mtrs to kms
    metricDataPercent.text = `${Math.floor(distancePercent)}%`;
  }
}

function distanceCalculator(distanceToday, distanceGoal){
  if ((distanceToday/distanceGoal)*100 < 100) {
    return (distanceToday/distanceGoal)*100 ;
  } else { 
    return 100;
  }
}