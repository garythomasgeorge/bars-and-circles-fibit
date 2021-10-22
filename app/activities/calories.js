import document           from 'document';
import { me as appbit } from "appbit";
import { today, goals } from "user-activity";

import * as util            from '../../common/utils';
import * as actions         from '../activityActions';
import * as settings        from '../settings';


export const calories = {
  active: true,
  initActivity: undefined,
  initialized: false,
  
  activity: 5,
  name: 'calories',
  
  update: function() {
    const idSelector = 'metric' + this.metricNumber;
    const metric = document.getElementById(idSelector);
    const metricData = document.getElementById(idSelector+"Data");
    const metricDataPercent = document.getElementById(idSelector+"Percent");
    
    const calsToday = undefined;
    const calsGoal = undefined;
    
    if (appbit.permissions.granted("access_activity")) {
      calsToday = today.adjusted.calories;
      calsGoal = goals.calories;
    }
    
    const calsPercent = calsCalculator(calsToday, calsGoal);
    metric.width = calsPercent*1.5;
    metricData.text = ` ${calsToday}`;
    metricDataPercent.text = `${Math.floor(calsPercent)}%`;
  }
}

function calsCalculator(calsToday, calsGoal){
  if ((calsToday/calsGoal)*100 < 100) {
    return (calsToday/calsGoal)*100 ;
  } else { 
    return 100;
  }
}