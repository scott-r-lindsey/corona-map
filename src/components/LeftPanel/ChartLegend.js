import React from "react";
import PropTypes from "prop-types";
import exact from 'prop-types-exact';

import {confirmedColor, deathColor, logColor} from '../../lib/colors'

const ChartLegend = (props) => {

  const {min, max} = props;

  return (
    <div className={"chart-legend"}>
      <div className={"tick-label min"}>
        {min}
      </div>
      <div className={"tick-label max"}>
        {max}
      </div>
      <div className={"middle"}>
        <div className={"dot"} style={{backgroundColor:confirmedColor}} />
        Confirmed
        <div className={"dot"} style={{backgroundColor:deathColor}} />
        Deaths
        <div className={"dot"} style={{backgroundColor:logColor}} />
        Exponent
      </div>

    </div>
  );

}
export default ChartLegend;

ChartLegend.propTypes = exact({
  min: PropTypes.string.isRequired,
  max: PropTypes.string.isRequired,
});
