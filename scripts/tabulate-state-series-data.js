#!/usr/bin/env node

const d3 = require('d3');
const fs = require('fs');
const path = require('path');

const { states, statesByAbbrev, statesByName } = require('./states');

const inputPath = '../data/COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/';
const outputPath = '../public/data/';

const stateData = {
  dates: [],
  location: states,
};

for (var stateId in stateData.location) {
  stateData.location[stateId] = {
    ...stateData.location[stateId],
    series: {
      confirmed: [],
      deaths: [],
      recovered: [],
      active:[],
    },
  };
}

const appendStateData = (i, statedId, d) => {
  stateData.location[statedId].series.confirmed[i] += Math.trunc(d.Confirmed);
  stateData.location[statedId].series.deaths[i] += Math.trunc(d.Deaths);
  stateData.location[statedId].series.recovered[i] += Math.trunc(d.Recovered);
  stateData.location[statedId].series.active[i] += Math.trunc(d.Active);
}
const appendZeros = () => {
  for (var stateId in stateData.location) {
    stateData.location[stateId].series.confirmed.push(0);
    stateData.location[stateId].series.deaths.push(0);
    stateData.location[stateId].series.recovered.push(0);
    stateData.location[stateId].series.active.push(0);
  };
}

(async () => {

  const files = fs.readdirSync(inputPath);
  const csvs = files.filter(item => item.match(/\.csv$/));
  //const csvs = ['03-22-2020.csv','03-28-2020.csv'];
  //const csvs = ['03-22-2020.csv'];

  let i=0;
  for (let filename of csvs) {
    console.log(filename);

    stateData.dates.push(Date.parse(path.basename(filename, '.csv')));

    appendZeros();

    // trim strips BOM from 03-22-2020.csv
    const fileData = fs.readFileSync(inputPath + csvs[i], 'utf8').trim();
    const fileParsed = d3.csvParse(fileData);

    fileParsed.forEach((d) => {

      // later data starts with FIPS
      if (fileParsed.columns.includes('FIPS')) {
        if ('US' == d.Country_Region){

            appendStateData( i, '00', d);

          if (statesByName[d.Province_State]) {
            appendStateData( i, statesByName[d.Province_State], d);
          }
        }
      }
      // earlier data
      else{
        if ('US' == d['Country/Region']){

          appendStateData( i, '00', d);

          if (statesByName[d['Province/State']]) {
            appendStateData( i, statesByName[d['Province/State']], d);
          }

          else if (d['Province/State'] && d['Province/State'].match(/.*, \w\w$/)){
            const abbrev = d['Province/State'].substr(-2,2);

            if (statesByAbbrev[abbrev]){
              appendStateData( i, statesByAbbrev[abbrev], d);
            }
          }
        }
      }
    });

    // remove weird NE outlier
    if ('02-22-2020.csv' === filename){
      stateData.location[31].series.confirmed[i-1] = 0;
    }

    i++;
  }

  fs.writeFileSync(outputPath + 'state.json', JSON.stringify(stateData));
})();
