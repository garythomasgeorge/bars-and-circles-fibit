import document           from 'document';
import { me as appbit } from "appbit";
import { today, goals } from "user-activity";

import * as util            from '../../common/utils';
import * as actions         from '../activityActions';
import * as settings        from '../settings';


export const activeZoneMinutes = {
  active: true,
  initActivity: undefined,
  initialized: false,
  
  activity: 4,
  name: 'activeZoneMinutes',
  
  update: function() {
    const idSelector = 'metric' + this.metricNumber;
    const metric = document.getElementById(idSelector);
    const metricData = document.getElementById(idSelector+"Data");
    const metricDataPercent = document.getElementById(idSelector+"Percent");
    
    const aZMToday = undefined;
    const aZMGoal = undefined;
    
    if (appbit.permissions.granted("access_activity")) {
      aZMToday = today.adjusted.activeZoneMinutes.total;
      aZMGoal = goals.activeZoneMinutes.total;
    } 
    const aZMPercent = aZMCalculator(aZMToday, aZMGoal);
    metric.width = aZMPercent*1.5;
    metricData.text = ` ${aZMToday}`;
    metricDataPercent.text = `${Math.floor(aZMPercent)}%`;
  }
}

function aZMCalculator(aZMToday, aZMGoal){
  if ((aZMToday/aZMGoal)*100 < 100) {
    return (aZMToday/aZMGoal)*100 ;
  } else { 
    return 100;
  }
}