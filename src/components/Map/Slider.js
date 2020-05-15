import React, { useState } from 'react';
import MatSlider from '@material-ui/core/Slider';
import updateUrl from '../../lib/mapUrl';
import { useParams, useHistory } from "react-router-dom";
import moment from 'moment-es6';
import PropTypes from "prop-types";
import exact from 'prop-types-exact';
import { parseWhen } from '../../lib/getMapValue'

const Slider  = (props) => {

  const {data} = props;
  const params = useParams();
  const {when} = params;
  const history = useHistory();
  const chartDateFormat = 'MMM Do';

  let timeoutId = null;

  const handleUrlUpdate = (pos) => {

    // First pos formated like "-11410,114" (if the len in 114 and pos is 10).
    // Not sure why the pos is formatted this way, maybe a bug in material ui.
    const negLen = '-' + data.dates.length.toString();
    let min
    let max
    let when

    if (pos.startsWith(negLen)){
      [min, max] = pos.split(',')

      if (min.startsWith(negLen)){
        min = min.substring(negLen.length);
      }
    }

    min = (Number.parseInt(min, 10) -1).toString();
    max = (Number.parseInt(max, 10) -1).toString();

    if ('0' === min && (data.dates.length -1).toString() === max){
      when = 'now';
    } else {
      when = `${min}-${max}`
    }

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

  const [min, max] = parseWhen(data, when);

  const [sliderDefault] = useState(
    //data.dates.length - -(when === 'now' ? 0: when )

    [min+1, max+1]
  );

  return (

    <div className={"map-slider"}>
      <MatSlider
        ThumbComponent={SliderThumbComponent}
        min={1}
        max={data.dates.length}
        color={'secondary'}
        steps={null}
        //aria-label="Date Displayed"
        onChange={updateDate}
        //defaultValue={[0, data.dates.length]}
        defaultValue={sliderDefault}
      />
    </div>

  );
}

export default Slider;

Slider.propTypes = exact({
  data: PropTypes.object.isRequired,
});
