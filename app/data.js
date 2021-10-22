import * as settings    from './settings';
import * as permissions from './permissions';
import * as util        from '../common/utils';
import { metrics }      from './metrics';
import { preferences }  from "user-settings";
import { display }      from "display";
import * as settings    from './settings';
import { activities }   from './activities';
import { HeartRateSensor } from "heart-rate";
import document         from 'document';

//fitfont files
import { FitFont } from './fitfont.js';



const hrm = new HeartRateSensor();
export function initialize(){
  //initialize metrics
  metrics.map((metric) => {
    
    initActivity({ metric });
    metric.initActivity = initActivity;
  })
  //set bg image if not available
  let bgImage = document.getElementById("bgImage");
  bgImage.href = "images/clockface_bg.png";
}


export function updateAll(params) {
  let datamap = metrics.map(metric => metric.update(params));
}

export function initMetric({ activityName, useFreshData }) {
  metrics
    .filter((metric) => metric.name === activityName)
    .map((metric) => {
      metric.initialized = false;
      metric.useFreshData = useFreshData;
    });
}


function initActivity({metric, asked}){
  const activity = activities[metric.activity];
  metric.active               = activity.active;
  metric.initialized          = activity.initialized
  metric.name                 = activity.name;
  metric.update               = activity.update;
}

