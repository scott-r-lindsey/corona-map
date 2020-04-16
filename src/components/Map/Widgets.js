import React from 'react';
import Scale from './Scale';
import QuantPicker from './QuantPicker';
import AxisPicker from './AxisPicker';
import { zeroColor, minColor, maxColor} from '../../lib/colors.js';

const Widgets = (props) => {

  const {max, zeroColor, colorScale, width} = props;

  return (
    <div className={"map-widget-shell"}>
      <div style={{float:'left', display:'inline-block'}}>
        <Scale {...{max, zeroColor, minColor, maxColor, colorScale}} />
        <div style={{display:'inline-block'}}>
          <QuantPicker />
          <AxisPicker />
        </div>
      </div>
    </div>
  );
}

export default Widgets;
