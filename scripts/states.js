
const states = {
  "00": { name: "United States", abbrev: "US", rollup: true, pop: 331814684},
  "01": { name: "Alabama", abbrev: "AL", pop: 4903185},
  "02": { name: "Alaska", abbrev: "AK", pop: 731545},
  "04": { name: "Arizona", abbrev: "AZ", pop: 7278717},
  "05": { name: "Arkansas", abbrev: "AR", pop: 3017825},
  "06": { name: "California", abbrev: "CA", pop: 39512223},
  "08": { name: "Colorado", abbrev: "CO", pop: 5758736},
  "09": { name: "Connecticut", abbrev: "CT", pop: 3565287},
  "10": { name: "Delaware", abbrev: "DE", pop: 973764},
  "11": { name: "District of Columbia", abbrev: "DC", pop: 705749},
  "12": { name: "Florida", abbrev: "FL", pop: 21477737},
  "13": { name: "Georgia", abbrev: "GA", pop: 10617423},
  "15": { name: "Hawaii", abbrev: "HI", pop: 1415872},
  "16": { name: "Idaho", abbrev: "ID", pop: 1787065},
  "17": { name: "Illinois", abbrev: "IL", pop: 12671821},
  "18": { name: "Indiana", abbrev: "IN", pop: 6732219},
  "19": { name: "Iowa", abbrev: "IA", pop: 3155070},
  "20": { name: "Kansas", abbrev: "KS", pop: 2913314},
  "21": { name: "Kentucky", abbrev: "KY", pop: 4467673},
  "22": { name: "Louisiana", abbrev: "KA", pop: 4648794},
  "23": { name: "Maine", abbrev: "ME", pop: 1344212},
  "24": { name: "Maryland", abbrev: "MD", pop: 6045680},
  "25": { name: "Massachusetts", abbrev: "MA", pop: 6949503},
  "26": { name: "Michigan", abbrev: "MI", pop: 9986857},
  "27": { name: "Minnesota", abbrev: "MN", pop: 5639632},
  "28": { name: "Mississippi", abbrev: "MS", pop: 2976149},
  "29": { name: "Missouri", abbrev: "MO", pop: 6137428},
  "30": { name: "Montana", abbrev: "MT", pop: 1068778},
  "31": { name: "Nebraska", abbrev: "NE", pop: 1934408},
  "32": { name: "Nevada", abbrev: "NV", pop: 3080156},
  "33": { name: "New Hampshire", abbrev: "NH", pop: 1359711},
  "34": { name: "New Jersey", abbrev: "NJ", pop: 8882190},
  "35": { name: "New Mexico", abbrev: "NM", pop: 2096829},
  "36": { name: "New York", abbrev: "NY", pop: 19453561  },
  "37": { name: "North Carolina", abbrev: "NC", pop: 10488084},
  "38": { name: "North Dakota", abbrev: "ND", pop: 762062},
  "39": { name: "Ohio", abbrev: "OH", pop: 11689100},
  "40": { name: "Oklahoma", abbrev: "OK", pop: 3956971},
  "41": { name: "Oregon", abbrev: "OR", pop: 4217737},
  "42": { name: "Pennsylvania", abbrev:"PA", pop: 12801989},
  "44": { name: "Rhode Island", abbrev: "RI", pop: 1059361},
  "45": { name: "South Carolina", abbrev: "SC", pop: 5148714},
  "46": { name: "South Dakota", abbrev: "SD", pop: 884659},
  "47": { name: "Tennessee", abbrev: "TN", pop: 6833174},
  "48": { name: "Texas", abbrev: "TX", pop: 28995881},
  "49": { name: "Utah", abbrev: "UT", pop: 3205958},
  "50": { name: "Vermont", abbrev: "VT", pop: 623989},
  "51": { name: "Virginia", abbrev: "VA", pop: 8535519},
  "53": { name: "Washington", abbrev: "WA", pop: 7614893},
  "54": { name: "West Virginia", abbrev: "WV", pop: 1792147},
  "55": { name: "Wisconsin", abbrev: "WI", pop: 5822434},
  "56": { name: "Wyoming", abbrev: "WY", pop: 578759},
  "60": { name: "American Samoa", abbrev: "AS", pop: 55641},
  "66": { name: "Guam", abbrev: "GU", pop: 165718},
  "69": { name: "Commonwealth of the Northern Mariana Islands", abbrev: "MP", pop: 55194},
  "72": { name: "Puerto Rico", abbrev: "PR", pop: 3193694},
  "78": { name: "United States Virgin Islands", abbrev: "VI", pop: 104914}
};

const statesByName = { }
const statesByAbbrev = { }

Object.keys(states).map(function(key, index) {
  statesByName[states[key].name] = key;
});
Object.keys(states).map(function(key, index) {
  statesByAbbrev[states[key].abbrev] = key
});

exports.states = states;
exports.statesByName = statesByName;
exports.statesByAbbrev = statesByAbbrev;
