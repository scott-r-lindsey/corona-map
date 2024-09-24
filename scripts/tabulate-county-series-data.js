#!/usr/bin/env node

const d3 = require('d3');
const fs = require('fs');
const path = require('path');

const inputPath = '../data/COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/';
const outputPath = '../public/data/';

const { counties } = require('./counties.js');
Object.keys(counties).map((fips, i) => {
  counties[fips].series = {};
  counties[fips].series.confirmed = [];
  counties[fips].series.deaths = [];
});

/*
  {
    dates: [],
    counties: {
      '00000': {
        name: 'Some County, ST',
        state: 'ST',
        pop: 1234,
        series: {
          confirmed: [],
          deaths: [],
        }
      }
    }
  }
*/

const countyData = {
  dates: [],
  location: counties
};

appendZeroes = () => {
  Object.keys(counties).map((fips, i) => {
    countyData.location[fips].series.confirmed.push(0)
    countyData.location[fips].series.deaths.push(0)
  });
}

(async () => {

  const files = fs.readdirSync(inputPath);
  const csvs = files.filter(item => item.match(/\.csv$/));
  //const csvs = ['04-18-2020.csv'];

  const seenFips = {};

  let i=0;
  for (let filename of csvs) {

    // trim strips BOM from 03-22-2020.csv
    const fileData = fs.readFileSync(inputPath + filename, 'utf8').trim();
    const fileParsed = d3.csvParse(fileData);

    if (!fileParsed.columns.includes('FIPS')) {
      console.log(`No fips in ${filename}, skipping`);
      continue;
    }

    console.log(filename);

    countyData.dates.push(Date.parse(path.basename(filename, '.csv')));
    appendZeroes();

    fileParsed.forEach((d) => {

      // skip non-counties
      if (d['FIPS']){

        const fips = d['FIPS'].padStart(5, '0');

        if (undefined !== countyData.location[fips]){
          countyData.location[fips].series.confirmed[i] = Math.trunc(d.Confirmed);
          countyData.location[fips].series.deaths[i] = Math.trunc(d.Deaths);
        }
      }

    });

    i++;
  }

  fs.writeFileSync(outputPath + 'county.json', JSON.stringify(countyData));

})();
