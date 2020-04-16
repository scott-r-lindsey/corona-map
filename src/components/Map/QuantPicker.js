import React from 'react'
import { useParams, useHistory } from "react-router-dom";

import updateUrl from '../../lib/mapUrl.js';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const QuantPicker = (props) => {

  const params = useParams();
  const history = useHistory();

  const { quant } = params;

  const quants = [
    {
      name: 'total',
      display:'total',
    },
    {
      name: 'percap',
      display:'per/cap',
    },
/*
    {
      name: 'change',
      display:'change',
    },
*/
  ];

  const handleChange = (event, newValue) => {
    history.push(updateUrl(params, {quant: newValue}));
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <div className={"map-quant-picker map-picker"}>

      <Tabs
        orientation="vertical"
        onChange={handleChange}
        aria-label="Choose Map Quant"
        value={quant}
      >
        {
          quants.map((val, index) => {
            return (
              <Tab key={val.name} value={val.name} label={val.display} {...a11yProps(index)} />
            )
          })
        }

      </Tabs>
    </div>
  );

}

export default QuantPicker;
