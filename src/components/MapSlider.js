import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';
import updateUrl from '../lib/mapUrl.js';
import { useParams, useHistory } from "react-router-dom";
import moment from 'moment-es6';

const MapSlider  = (props) => {

  const {data} = props;
  const params = useParams();
  const {when} = params;
  const history = useHistory();
  const chartDateFormat = 'MM/DD/YYYY';

  let timeoutId = null;

  const handleUrlUpdate = (pos) => {
    let when = pos === 0 ? 'now' : pos;
    history.push(updateUrl(params, {when}));
  }

  function SliderThumbComponent(props) {
    return (
      <span {...props}>
        <span style={{position:'relative'}}>
          <div className={'date-indicator'}>
            {moment(data.dates[props['aria-valuenow']-1]).format(chartDateFormat)}
          </div>
        </span>
      </span>
    );
  }

  function updateDate(event, pos){
    const when = ((-1 * data.dates.length) + pos);

    // prevent execution of previous setTimeout
    clearTimeout(timeoutId);
    // change width from the state object after 150 milliseconds
    timeoutId = setTimeout(() => handleUrlUpdate(when), 150);
  }

  const [sliderDefault] = useState(
    data.dates.length - -(when === 'now' ? 0: when )
  );

  return (

    <Slider
      ThumbComponent={SliderThumbComponent}
      min={1}
      color={'secondary'}
      max={data.dates.length}
      steps={null}
      aria-label="Date Displayed"
      onChange={updateDate}
      defaultValue={sliderDefault}
    />

  );
}

export default MapSlider;
