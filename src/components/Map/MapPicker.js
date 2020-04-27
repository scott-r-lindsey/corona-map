import React from 'react'
import { useParams, useHistory } from "react-router-dom";
import updateUrl from '../../lib/mapUrl';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const MapPicker = () => {

  const params = useParams();
  const history = useHistory();

  const { mode } = params;

  const axes = [
    {
      name: 'COVID-US',
      display:'states',
    },
    {
      name: 'COVID-COUNTY',
      display:'counties',
    },
  ];

  const handleChange = (event, newValue) => {
    history.push(updateUrl(params, {mode: newValue, when: 'now'}));
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <div className={"map-map-picker map-picker"}>

      <Tabs
        orientation="vertical"
        onChange={handleChange}
        aria-label="Choose Map Map"
        value={mode}
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

export default MapPicker;
