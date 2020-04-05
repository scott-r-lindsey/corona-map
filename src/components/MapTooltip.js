
import React from "react";

const MapTooltip = (props) => {

  const {left, top, show, data} = props;

  const style = {
    position: 'absolute',
    left: left,
    top: top -15,
    display: show ? 'block' : 'none',
  };

  return (
    <div style={style} className={"map-tooltip"}>
      <div className={"map-tooltip-anchor"}>
        <div className={"map-tooltip-inner"}>
          { data.location }<br />
          confirmed: {data.axis ? data.axis.confirmed : '' }<br />
          deaths: {data.axis ? data.axis.deaths : '' }<br />
        </div>
      </div>
    </div>
  );
}

export default MapTooltip;

