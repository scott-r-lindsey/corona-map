
import moment from 'moment-es6';

export const deepClone = (parent) => {
  return JSON.parse(JSON.stringify(parent))
}
export const getStateDataByName = (data, location) => {
  return Object.entries(data.states).filter(
    item => item[1].name.toLowerCase() === location
  )[0][1];
}
export const getDataValue = (data, when, location, axis, addl = 0) => {
  const offset = (data.dates.length +addl) - -(when === 'now' ? -1: when );
  const stateData = getStateDataByName(data, location);

  return stateData.series[axis][offset];
}
export const getDate = (data, when) => {
  const offset = (data.dates.length-1) - -(when === 'now' ? 0: when );

  return data.dates[offset];
}
export const getFormattedDate = (data, when, format) => {
  return moment(getDate(data, when)).format(format);
}
export const getMaxValueForAxis = (data, axis) => {

  const days = data.dates.length;

  return Math.max(
    ...Object.entries(data.states)
    .filter(o => !o[1].rollup)
    .map(
      o => o[1].series[axis][days-1]
    ), 0);
}
export const getLocationDataForDay = (data, when, location) => {

  return {
    location: location,
    date: getDate(data, when),
    axis: {
      confirmed: getDataValue(data, when, location, 'confirmed'),
      deaths: getDataValue(data, when, location, 'deaths'),
      recovered: getDataValue(data, when, location, 'recovered'),
      active: getDataValue(data, when, location, 'active'),
    }
  };
}
export const getTrimmedData = (data, when) => {

  const max = (data.dates.length-1) - -(when === 'now' ? 0: when );
  const min = 0;

  const trimArray = (item, index) => {
    return  ((index > min) && (index <= max))
  }

  const trimmed = deepClone(data);
  trimmed.dates = data.dates.filter(trimArray);

  // eslint-disable-next-line no-unused-vars
  for (let [id, state] of Object.entries(trimmed.states)){
    for (let [axis, values] of Object.entries(state.series)){
      state.series[axis] = values.filter(trimArray);
    }
  }

  trimmed.raw = data;

  return trimmed;

 // console.log(ret);

}

export const parseWhen = (when) => {
  // now
  // all
  // x-x/getMaxValueForAxis

}
export const capitalizeLocation = (location) => {
  return location.split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ') + (location === 'united states' ? ' of America' : '');
}

export const abbreviateNumber = (num, fixed) => {
  if (num === null) { return null; }
  if (num === 0) { return '0'; }
  fixed = (!fixed || fixed < 0) ? 0 : fixed;
  var b = (num).toPrecision(2).split("e"),
      k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
      c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3) ).toFixed(1 + fixed), // divide by power
      d = c < 0 ? c : Math.abs(c),
      e = d + ['', 'K', 'M', 'B', 'T'][k];
  return e;
}
