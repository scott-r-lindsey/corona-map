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

full.county.location['00'] = full.state.location['00'];

full.county.adCode = fs.readFileSync('../data/ad-code.html', 'utf8');
full.county.searchVals = searchVals;

full.state.adCode = fs.readFileSync('../data/ad-code.html', 'utf8');
full.state.searchVals = searchVals;

fs.writeFileSync(outputPath + 'full.json', JSON.stringify(full));

