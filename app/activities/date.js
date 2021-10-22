import document         from 'document';
import {preferences}    from 'user-settings';
import * as util        from '../../common/utils';
import * as actions     from '../activityActions';
//fitfont files
import { FitFont } from '../fitfont.js';

export const date = {
  activity: 1,
  initActivity: undefined,
  name: 'date',
  
  update: function() {
    const idSelector = 'metric'+this.metricNumber;
    const metric = document.getElementById(idSelector);
    const today = new Date();
    const day = util.numberToDay(today.getDay());
    const month = util.numberToMonth(today.getMonth());
    const date = today.getDate();
    
    metric.text = `${month} ${date}, ${day}`;
  }
}