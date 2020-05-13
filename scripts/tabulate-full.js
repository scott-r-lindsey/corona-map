#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const state = require('../public/data/state.json');
const county = require('../public/data/county.json');
const outputPath = '../public/data/';
const searchVals = require('../data/search-ad-vals.json');

const full = {
  state,
  county
};


// copy and fix US data for county context
const USData = JSON.parse(JSON.stringify(full.state.location['00']));

for (let[axes, values] of Object.entries(USData.series)){
  USData.series[axes] = values.slice(county.dates.length *-1);
}
full.county.location['00'] = USData;





full.county.adCode = fs.readFileSync('../data/ad-code.html', 'utf8');
full.county.searchVals = searchVals;

full.state.adCode = fs.readFileSync('../data/ad-code.html', 'utf8');
full.state.searchVals = searchVals;

fs.writeFileSync(outputPath + 'full.json', JSON.stringify(full));

