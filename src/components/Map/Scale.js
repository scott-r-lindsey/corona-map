import React from 'react';
import logmidpoints from '../../lib/logmidpoints.js';
import withWidth from '@material-ui/core/withWidth';
import {abbreviateNumber} from '../../lib/getMapValue.js';
import { useParams } from "react-router-dom";

function Scale(props) {

  const {max, zeroColor, colorScale, width} = props;

  const mobile = /xs/.test(width);
  const points = mobile ? 3 : 4;
  const {quant} = useParams();

  const round = (i) => quant === 'total' ? Math.round(i) : i;
  const roundFour = (val) => Math.round(val * 100)/100;
  const roundEight = (val) => Math.round(val * 100000)/100;

  let min;
  if ('total' === quant){
    min = 1;
  }
  else if ('percap' === quant){
    min = .00001;
  }
  else{
  }

  const formatScaleNumber = (val) => {

    if ('percap' === quant){
      if (val < 0.01){
        return roundEight(val) + '/M';
      }
      else{
        return roundFour(val) + '/K';
      }

    }
    else if ('total' === quant) {
      if (mobile){
        return abbreviateNumber(val);
      }
    }
    return val;
  }

  const values = logmidpoints(min, max, points)
    .map((val) => { return round(val) });

  values.unshift(0);

  return(
    <div className={"map-scale"}>
      {
        values.map((v) => {
            return (
              (v) === 0 ?
              <div key={v} style={{backgroundColor: zeroColor}}>0</div> :
              <div key={v} style={{backgroundColor: colorScale(v)}}>
                { formatScaleNumber(v) }
              </div>
            )
          }
        )
      }
    </div>
  );
}

export default withWidth()(Scale);
