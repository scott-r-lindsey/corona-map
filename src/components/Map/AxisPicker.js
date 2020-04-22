import React from 'react'
import { useParams, useHistory } from "react-router-dom";
import updateUrl from '../../lib/mapUrl.js';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const AxisPicker = () => {

  const params = useParams();
  const history = useHistory();

  const { axis } = params;

  const axes = [
    {
      name: 'confirmed',
      display:'cases',
    },
    {
      name: 'deaths',
      display:'deaths',
    },
  ];

  const handleChange = (event, newValue) => {
    history.push(updateUrl(params, {axis: newValue}));
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <div className={"map-axis-picker map-picker"}>

      <Tabs
        orientation="vertical"
        onChange={handleChange}
        aria-label="Choose Map Axis"
        value={axis}
      >
        {
          axes.map((val, index) => {
            return (
              <Tab key={val.name} value={val.name} label={val.display} {...a11yProps(index)} />
            )
          })
        }

      </Tabs>
    </div>
  );

}

export default AxisPicker;
