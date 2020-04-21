
const { states, statesByAbbrev, statesByName, abbrevByFips } = require('./states');
const counties = require('./counties.json');

for (let fips in counties) {
  counties[fips].stfips = statesByName[counties[fips].state];
  counties[fips].abbrev = abbrevByFips[counties[fips].stfips];
  counties[fips].name = counties[fips].county + ', ' + abbrevByFips[counties[fips].stfips];
}

exports.counties = counties;

