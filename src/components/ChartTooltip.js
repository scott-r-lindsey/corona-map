import React from 'react';
import moment from 'moment-es6';

const ChartTooltip = (props) => {
  const { point, data, colors } = props;

  return (
    <div className={"chart-tooltip"}>
      <strong>{ moment(point.data.time).format("MMMM Do") }</strong><br />
      <span style={{color: colors.confirmed}}>
        Confirmed: <b>{ data.confirmed[point.data.pos] }</b>
      </span><br />
      <span style={{color: colors.deaths}}>
        Deaths: <b>{ data.deaths[point.data.pos] }</b>
      </span>
    </div>
  )
}

export default ChartTooltip;
