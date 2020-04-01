#!/usr/bin/env node

const d3 = require('d3');
const fs = require('fs');
const path = require('path');

const { states, statesByAbbrev, statesByName } = require('./states');

const inputPath = '../data/COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/';
const outputPath = '../public/data/';

const stateData = {
  dates: [],
  states,
};

for (var stateId in stateData.states) {
  stateData.states[stateId] = {
    ...stateData.states[stateId],
    confirmed: [],
    deaths: [],
    recovered: [],
    active:[],
  };
}

(async () => {

  const files = fs.readdirSync(inputPath);
  const csvs = files.filter(item => item.match(/\.csv$/));
  //const csvs = ['03-27-2020.csv','03-28-2020.csv'];
  //const csvs = ['02-04-2020.csv'];

  let i=0;
  for (let filename of csvs) {
    console.log(filename);
    stateData.dates.push(Date.parse(path.basename(filename, '.csv')));

    for (var stateId in stateData.states) {
      stateData.states[stateId].confirmed.push(0);
      stateData.states[stateId].deaths.push(0);
      stateData.states[stateId].recovered.push(0);
      stateData.states[stateId].active.push(0);
    };

    const fileData = fs.readFileSync(inputPath + csvs[i], 'utf8');
    const fileParsed = d3.csvParse(fileData);

    fileParsed.forEach((d) => {

      if (fileParsed.columns.includes('FIPS')) {
        if ('US' == d.Country_Region){
          if (statesByName[d.Province_State]) {
            stateData.states[statesByName[d.Province_State]].confirmed[i] += Math.trunc(d.Confirmed);
            stateData.states[statesByName[d.Province_State]].deaths[i] += Math.trunc(d.Deaths);
            stateData.states[statesByName[d.Province_State]].recovered[i] += Math.trunc(d.Recovered);
            stateData.states[statesByName[d.Province_State]].active[i] += Math.trunc(d.Active);
          }
        }
      }
      else{
        if ('US' == d['Country/Region']){

          if (statesByName[d['Province/State']]) {
            stateData.states[statesByName[d['Province/State']]].confirmed[i] += Math.trunc(d.Confirmed);
            stateData.states[statesByName[d['Province/State']]].deaths[i] += Math.trunc(d.Deaths);
            stateData.states[statesByName[d['Province/State']]].recovered[i] += Math.trunc(d.Recovered);
            stateData.states[statesByName[d['Province/State']]].active[i] += Math.trunc(d.Active);
          }

          else if (d['Province/State'] && d['Province/State'].match(/.*, \w\w$/)){
            const abbrev = d['Province/State'].substring(-2,2);
            if (statesByAbbrev[abbrev]){
              stateData.states[statesByAbbrev[abbrev]].confirmed[i] += Math.trunc(d.Confirmed);
              stateData.states[statesByAbbrev[abbrev]].deaths[i] += Math.trunc(d.Deaths);
              stateData.states[statesByAbbrev[abbrev]].recovered[i] += Math.trunc(d.Recovered);
              stateData.states[statesByAbbrev[abbrev]].active[i] += Math.trunc(d.Active);
            }
          }
        }

      }
    });
    i++;
  }

  fs.writeFileSync(outputPath + 'latestfull.json', JSON.stringify(stateData));

})();
