
const states = {
  "01": { name: "Alabama"},
  "02": { name: "Alaska"},
  "04": { name: "Arizona"},
  "05": { name: "Arkansas"},
  "06": { name: "California"},
  "08": { name: "Colorado"},
  "09": { name: "Connecticut"},
  "10": { name: "Delaware"},
  "11": { name: "District of Columbia"},
  "12": { name: "Florida"},
  "13": { name: "Georgia"},
  "15": { name: "Hawaii"},
  "16": { name: "Idaho"},
  "17": { name: "Illinois"},
  "18": { name: "Indiana"},
  "19": { name: "Iowa"},
  "20": { name: "Kansas"},
  "21": { name: "Kentucky"},
  "22": { name: "Louisiana"},
  "23": { name: "Maine"},
  "24": { name: "Maryland"},
  "25": { name: "Massachusetts"},
  "26": { name: "Michigan"},
  "27": { name: "Minnesota"},
  "28": { name: "Mississippi"},
  "29": { name: "Missouri"},
  "30": { name: "Montana"},
  "31": { name: "Nebraska"},
  "32": { name: "Nevada"},
  "33": { name: "New Hampshire"},
  "34": { name: "New Jersey"},
  "35": { name: "New Mexico"},
  "36": { name: "New York"},
  "37": { name: "North Carolina"},
  "38": { name: "North Dakota"},
  "39": { name: "Ohio"},
  "40": { name: "Oklahoma"},
  "41": { name: "Oregon"},
  "42": { name: "Pennsylvania"},
  "44": { name: "Rhode Island"},
  "45": { name: "South Carolina"},
  "46": { name: "South Dakota"},
  "47": { name: "Tennessee"},
  "48": { name: "Texas"},
  "49": { name: "Utah"},
  "50": { name: "Vermont"},
  "51": { name: "Virginia"},
  "53": { name: "Washington"},
  "54": { name: "West Virginia"},
  "55": { name: "Wisconsin"},
  "56": { name: "Wyoming"},
  "60": { name: "American Samoa"},
  "66": { name: "Guam"},
  "69": { name: "Commonwealth of the Northern Mariana Islands"},
  "72": { name: "Puerto Rico"},
  "78": { name: "United States Virgin Islands"}
};

const statesByName = {

}

Object.keys(states).map(function(key, index) {
  statesByName[states[key].name] = key;
});

exports.statesByName = statesByName;
exports.states = states;

