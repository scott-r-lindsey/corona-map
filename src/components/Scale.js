import React from 'react';

import logmidpoints from '../lib/logmidpoints.js';
import withWidth from '@material-ui/core/withWidth';
import {abbreviateNumber} from '../lib/getMapValue.js';


function Scale(props) {

  const {max, zeroColor, colorScale, width} = props;

  const mobile = /xs/.test(width);
  const points = mobile ? 2 : 4;

  const values = logmidpoints(1, max, points)
    .map((val) => { return Math.round(val) });

  values.unshift(0);

  return(
    <div className={"map-scale"}>
      {
        values.map((v) => {
            return (
              (v) === 0 ?
              <div key={v} style={{backgroundColor: zeroColor}}>0</div> :
              <div key={v} style={{backgroundColor: colorScale(v)}}>
                { mobile ? abbreviateNumber(v) : v }
              </div>
            )
          }
        )
      }
    </div>
  );
}

export default withWidth()(Scale);
