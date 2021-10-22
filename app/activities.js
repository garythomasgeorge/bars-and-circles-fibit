import { activeZoneMinutes }  from './activities/activeZoneMinutes';
// import { batteryLevel }   from './activities/batteryLevel';
import { calories }       from './activities/calories';
import { clock }          from './activities/clock';
import { date }           from './activities/date';
import { distance }       from './activities/distance';
// import { elevationGain }  from './activities/elevationGain';
import { heartRate }       from './activities/heartRate';
import { steps }          from './activities/steps';
import { weather }        from './activities/weather';

/** All activities displayable on screen. */
export const activities = [
  clock,
  date,
  // elevationGain,
  weather,
  steps,
  activeZoneMinutes,
  calories,
  distance,
  heartRate,
  // batteryLevel,
]