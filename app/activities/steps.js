import document           from 'document';
import { me as appbit } from "appbit";
import { today, goals } from "user-activity";

import * as util            from '../../common/utils';
import * as actions         from '../activityActions';
import * as settings        from '../settings';


export const steps = {
  active: true,
  initActivity: undefined,
  initialized: false,
  
  activity: 3,
  name: 'steps',
  
  update: function() {
    const idSelector = 'metric' + this.metricNumber;
    const metric = document.getElementById(idSelector);
    const metricData = document.getElementById(idSelector+"Data");
    const metricDataPercent = document.getElementById(idSelector+"Percent");
    
    const stepsToday = undefined;
    const stepsGoal = undefined;
    if (appbit.permissions.granted("access_activity")) {
      stepsToday = today.adjusted.steps;
      stepsGoal = goals.steps;
    }
    const stepsPercent = stepsCalculator(stepsToday, stepsGoal);
    metric.width = stepsPercent*1.5;
    metricData.text = ` ${stepsToday}`;
    metricDataPercent.text = `${Math.floor(stepsPercent)}%`;
  }
}

function stepsCalculator (stepsToday, stepsGoal){
  if ((stepsToday/stepsGoal)*100 < 100) {
    return (stepsToday/stepsGoal)*100 ;
  } else { 
    return 100;}
 }