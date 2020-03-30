import React from 'react';

function Scale(props) {

  const {max, zeroColor, colorScale} = props;

  const logmidpoints = (min, max, steps) => {
      const points = [];
      const logmax = Math.log(max);
      const logmin = Math.log(min);
      for (let v = logmin; v <= logmax; v += (logmax-logmin) / steps) {
          points.push(Math.exp(v));
      }
      return points;
  }

  const points = logmidpoints(1, max, 5);
  const r = points.map((val) => { return Math.round(val) });

  return(
    <div className={"scale-diagram"}>
      <div style={{backgroundColor: zeroColor}}>0</div>
      <div style={{backgroundColor: colorScale(r[1])}}>{r[1]}</div>
      <div style={{backgroundColor: colorScale(r[2])}}>{r[2]}</div>
      <div style={{backgroundColor: colorScale(r[3])}}>{r[3]}</div>
      <div style={{backgroundColor: colorScale(r[4])}}>{r[4]}</div>
      <div style={{backgroundColor: colorScale(max)}}>{max}</div>
    </div>
  );

}

export default Scale;
