#!/usr/bin/env node

const d3 = require('d3');
const fs = require('fs');
const path = require('path');

const { states, statesByAbbrev, statesByName } = require('./states');
const searchVals = require('../data/search-ad-vals.json');

const inputPath = '../data/COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/';
const outputPath = '../public/data/';

const stateData = {
  dates: [],
  states,
};


for (var stateId in stateData.states) {
  stateData.states[stateId] = {
    ...stateData.states[stateId],
    series: {
      confirmed: [],
      deaths: [],
      recovered: [],
      active:[],
    },
  };
}

const appendStateData = (i, statedId, d) => {
  stateData.states[statedId].series.confirmed[i] += Math.trunc(d.Confirmed);
  stateData.states[statedId].series.deaths[i] += Math.trunc(d.Deaths);
  stateData.states[statedId].series.recovered[i] += Math.trunc(d.Recovered);
  stateData.states[statedId].series.active[i] += Math.trunc(d.Active);
}
const appendZeros = () => {
  for (var stateId in stateData.states) {
    stateData.states[stateId].series.confirmed.push(0);
    stateData.states[stateId].series.deaths.push(0);
    stateData.states[stateId].series.recovered.push(0);
    stateData.states[stateId].series.active.push(0);
  };
}

  function stringToHex(str) {

  //converting string into buffer
   let bufStr = Buffer.from(str, 'utf8');

  //with buffer, you can convert it into hex with following code
   return bufStr.toString('hex');

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
    i++;
  }

  stateData.adCode = fs.readFileSync('../data/ad-code.html', 'utf8');
  stateData.searchVals = searchVals;

  fs.writeFileSync(outputPath + 'latestfull.json', JSON.stringify(stateData));

})();
