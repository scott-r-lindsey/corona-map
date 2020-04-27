import React, { useState } from 'react';
import MatSlider from '@material-ui/core/Slider';
import updateUrl from '../../lib/mapUrl.js';
import { useParams, useHistory } from "react-router-dom";
import moment from 'moment-es6';
import PropTypes from "prop-types";
import exact from 'prop-types-exact';

const Slider  = (props) => {

  const {data} = props;
  const params = useParams();
  const {when} = params;
  const history = useHistory();
  const chartDateFormat = 'MMM Do';

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

    <div className={"map-slider"}>
      <MatSlider
        ThumbComponent={SliderThumbComponent}
        min={1}
        color={'secondary'}
        max={data.dates.length}
        steps={null}
        aria-label="Date Displayed"
        onChange={updateDate}
        defaultValue={sliderDefault}
      />
    </div>

  );
}

export default Slider;

Slider.propTypes = exact({
  data: PropTypes.object.isRequired,
});
