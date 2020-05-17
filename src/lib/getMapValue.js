
import moment from 'moment-es6';

export const getLocationFips = (data) => {
  // mat ui autocomplete fodder
  const locations = [];

  for (let [fips, location] of Object.entries(data.location)){
    locations.push(
      {
        title: location.name,
        fips: fips
      }
    );
  }

  const filtered = locations.filter(
    (value) => !value.fips.match(/^\d\d000$/)
  );

  filtered.sort((a,b) => (a.fips > b.fips) ? 1 : -1)

  return filtered;
}
export const deepClone = (parent) => {
  return JSON.parse(JSON.stringify(parent))
}
export const getStateDataByName = (data, location) => {

  return Object.entries(data.location).filter(
    item => item[1].name.toLowerCase() === location
  )[0][1];
}

export const getDataValue = (data, when, location, axis, addl = 0) => {

  const [, max] = parseWhen(data, when, addl);
  const stateData = getStateDataByName(data, location);
  return stateData.series[axis][max];
}

export const getDataValueById = (data, when, id, axis, addl = 0) => {

  const [, max] = parseWhen(data, when, addl);
  const stateData = data.location[id];
  return stateData.series[axis][max];
}

export const getDate = (data, when) => {

  const [, max] = parseWhen(data, when);
  return data.dates[max];
}

export const getFormattedDate = (data, when, format) => {
  return moment(getDate(data, when)).format(format);
}
export const getPop = (data, location) => {
  return getStateDataByName(data, location)['pop'];
}
export const getMaxValueForAxis = (data, axis) => {

  const days = data.dates.length;

  return Math.max(
    ...Object.entries(data.location)
    .filter(o => !o[1].rollup)
    .map(
      o => o[1].series[axis][days-1]
    ), 0);
}

export const getLocationDataForDay = (data, when, location) => {

  return {
    location: location,
    pop: getPop(data, location),
    date: getDate(data, when),
    axis: {
      confirmed: getDataValue(data, when, location, 'confirmed'),
      deaths: getDataValue(data, when, location, 'deaths'),
      confirmedPercap: getDataValue(data, when, location, 'confirmed-percap'),
      deathsPercap: getDataValue(data, when, location, 'deaths-percap'),
    }
  };
}

export const getLocationDataForDayById = (data, when, id) => {
  return {
    location: data.location[id].name.toLowerCase(),
    pop: data.location[id].pop,
    date: getDate(data, when),
    axis:{
      confirmed: getDataValueById(data, when, id, 'confirmed'),
      deaths: getDataValueById(data, when, id, 'deaths'),
      confirmedPercap: getDataValueById(data, when, id, 'confirmed-percap'),
      deathsPercap: getDataValueById(data, when, id, 'deaths-percap'),
    }
  };
}

export const getTrimmedData = (sourceData, when) => {

  const data = deepClone(sourceData);
  const [min, max] = parseWhen(data, when);

  if (min >= max){
    return {
      ...data,
      raw: data
    };
  }

  const trimArray = (item, index) => {
    return  ((index >= min) && (index <= max))
  }

  const trimmed = deepClone(data);
  trimmed.dates = data.dates.filter(trimArray);

  // eslint-disable-next-line no-unused-vars
  for (let [id, state] of Object.entries(trimmed.location)){
    for (let [axis, values] of Object.entries(state.series)){
      state.series[axis] = values.filter(trimArray);
    }
  }

  trimmed.raw = data;

  return trimmed;
}

// returns initial min pos, max pos
export const parseWhen = (data, when, addl = 0) => {

  let found;

  if (when.startsWith('-')){
    return [0 + addl, data.dates.length - -(when) -1 + addl];
  }
  // eslint-disable-next-line no-cond-assign
  else if (found = when.match(/^(\d+)-(\d+)$/)){
    return [
      Number.parseInt(found[1]) + addl,
      Number.parseInt(found[2]) + addl
    ];
  }

  // "now"
  return [0 + addl, data.dates.length-1 + addl];
}

export const capitalizeLocation = (location) => {
  let prov =  location.split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ') + (location === 'united states' ? ' of America' : '');

  if (prov.match(/, ..$/)){
    prov = prov.replace(/.$/, c => c.toUpperCase());
  }
  return prov;
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

export const embellishData = (data) => {

  const axes = ['confirmed', 'deaths'];

  for (const locationId in data.location) {
    axes.forEach(axis => {
      // total
      data.location[locationId].series[`${axis}-total`] = data.location[locationId].series[axis];
      data.location[locationId].series[`${axis}-change`] = [];

      // percap
      let pop = data.location[locationId].pop;
      data.location[locationId].series[`${axis}-percap`] =
        data.location[locationId].series[axis].map(count => (count / pop) *1000);

      // change
      data.location[locationId].series[`${axis}-change`] =
        data.location[locationId].series[axis].map((count, index) => {
          return (index === 0 ? 0 :
            count - data.location[locationId].series[axis][index -1]);
        }
      );
    });
  }

  return data;
}
