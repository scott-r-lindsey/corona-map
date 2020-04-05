
import moment from 'moment-es6';

export const getStateDataByName = (data, location) => {
  return Object.entries(data.states).filter(
    item => item[1].name.toLowerCase() === location
  )[0][1];
}
export const getDataValue = (data, when, location, axis) => {
  const offset = data.dates.length - -(when === 'now' ? -1: when );
  const stateData = getStateDataByName(data, location);

  return stateData[axis][offset];
}
export const getDate = (data, when) => {
  const offset = data.dates.length - -(when === 'now' ? -1: when );
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
      o => o[1][axis][days-1]
    ), 0);
}
export const getLocationDataForDay = (data, when, location) => {

  const stateData = getStateDataByName(data, location);

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

