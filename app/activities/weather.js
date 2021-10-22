import { me as companion } from "companion";
import { me as appbit }   from "appbit";
import weather            from "weather";

import document           from 'document';
import * as api           from '../../lib/fitbit_weather/app';
//import * as colors        from '../../common/colors';
import * as settings      from '../settings';
import * as util          from '../../common/utils';
import * as actions       from '../activityActions';
import { units }          from "user-settings";

  
export const weather = {
  active: true,
  initActivity: undefined,
  initialized: false,
  name: 'weather',
  useFreshData: false, // set to true to not use cache
  
            
  update: function({evt}) {
    const idSelector = 'metric' + this.metricNumber;
    const metric = document.getElementById(idSelector);
    const weatherDesc = document.getElementById('weatherDesc');
    const weatherDesc2 = document.getElementById('weatherDesc2');
    const weatherDesc3 = document.getElementById('weatherDesc3');
    const location = document.getElementById('location');
    const unit = units.temperature;
    const isPermitted = ((appbit.permissions.granted("access_internet")) && (appbit.permissions.granted("access_location"))) ? true : false;
    
    if (isPermitted) {
      let refreshTime = 30 * 60 * 1000;
      api.fetch(refreshTime)
      .then((data) => {
        if (!this.active) { return; }
        const format = this.format;
        metric.text = `${getWeather({ data, unit })}`;
        const weatherData = data.description.splitWords();
        const weatherWordCount = data.description.countWords();
        weatherDesc.text = `${weatherData[0]}`;
        weatherData[1]!=undefined ? weatherDesc2.text = `${weatherData[1]}` : weatherDesc2.text = ``;
        weatherData[2]!=undefined ? weatherDesc3.text = `${weatherData[2]}` : weatherDesc3.text = ``;
        if ((data.description.length > 9) && (weatherWordCount >= 2)) {
           weatherDesc.style.fontSize = 12;
           weatherDesc2.style.fontSize  = 12;
           weatherDesc3.style.fontSize  = 12;
        } 
       })
      .catch(error => {
        metric.text = `error`;
        console.log(JSON.stringify(error));
      });
    }
    else {
        metric.text = `--`
        weatherDesc.text = 'no';
        weatherDesc2.text = 'permission';
        weatherDesc3.text = ``;
    }
      
  }
};
    
function getWeather({data, unit}) {
  return (unit == 'F') ? `${Math.floor(data.temperatureF)} °F` : `${Math.floor(data.temperatureC)} °C`;
}

function getWeatherLoc({data}){
  //add dynamic font size to fit data
  return (data.location);
}


if (!String.prototype.countWords) {
  String.prototype.countWords = function() {
    return this.length && this.split(/\s+\b/).length || 0;
  };
}
if (!String.prototype.splitWords) {
  String.prototype.splitWords = function() {
    return this.split(" ");
  };
}

