#!/usr/bin/env node

const d3 = require('d3');
const fs = require('fs');

const { states, statesByName } = require('./states');

const inputPath = '../working/COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/';
const outputPath = '../public/data/';

const stateData = {
  dates: [],
  states,
};


/* latest per-state data */
const latestStateData = { ...stateData };

for (var stateId in latestStateData.states) {
  latestStateData.states[stateId] = {
    ...latestStateData.states[stateId],
    confirmed: 0,
    deaths: 0,
    recovered: 0,
    active:0
  };
}

(async () => {

  const files = fs.readdirSync(inputPath);
  const csvs = files.filter(item => item.match(/\.csv$/));
  const lastFile = fs.readFileSync(inputPath + csvs[csvs.length -1], 'utf8');
  const lastFileData = d3.csvParse(lastFile);

  lastFileData.forEach((d) => {
    if ('US' == d.Country_Region){
      if (statesByName[d.Province_State]) {

        latestStateData.states[statesByName[d.Province_State]].confirmed += Math.trunc(d.Confirmed);
        latestStateData.states[statesByName[d.Province_State]].deaths += Math.trunc(d.Deaths);
        latestStateData.states[statesByName[d.Province_State]].recovered += Math.trunc(d.Recovered);
        latestStateData.states[statesByName[d.Province_State]].active += Math.trunc(d.Active);
      }
    }
  });

  fs.writeFileSync(outputPath + 'latest.json', JSON.stringify(latestStateData));

})()



//console.log(byState);
//console.log(states);
//console.log(statesByName);
