import React from "react";

import {confirmedColor, deathColor, logColor} from '../../lib/colors.js'

const ChartLegend = (props) => {

  const {min, max } = props;

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
