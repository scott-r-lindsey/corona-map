import React from 'react';
import Scale from './Scale';
import QuantPicker from './QuantPicker';
import AxisPicker from './AxisPicker';
import MapPicker from './MapPicker';
import { zeroColor } from '../../lib/colors';
import Search from './Search';
import PropTypes from "prop-types";
import exact from 'prop-types-exact';

const Widgets = (props) => {

  const {data, max, colorScale} = props;

  return (
    <>
      <Search data={data} />
      <div className={"map-widget-shell"}>
        <div style={{float:'left', display:'inline-block'}}>
          <Scale {...{max, zeroColor, colorScale}} />
          <div style={{display:'inline-block'}}>
            <QuantPicker />
            <AxisPicker />
            <MapPicker />
          </div>
        </div>
      </div>
    </>
  );
}

export default Widgets;

Widgets.propTypes = exact({
  max: PropTypes.number.isRequired,
  colorScale: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
});
