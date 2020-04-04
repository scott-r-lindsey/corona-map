
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

