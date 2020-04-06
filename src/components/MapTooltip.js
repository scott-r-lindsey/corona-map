
import React from "react";
import {capitalizeLocation} from '../lib/getMapValue.js';
import moment from 'moment-es6';

const MapTooltip = (props) => {

  const {left, top, show, data } = props;

  const style = {
    position: 'absolute',
    left: left,
    top: top -15,
    display: show ? 'block' : 'none',
  };

  return (
    <>
      { data.location ?
        <div style={style} className={"map-tooltip"}>
          <div className={"map-tooltip-anchor"}>
            <div className={"map-tooltip-inner"}>
              <strong>{ capitalizeLocation(data.location) }</strong>
              <table>
                <tbody>
                  <tr>
                    <td>
                      Confirmed:
                    </td>
                    <td className={"confirmed"}>
                      {data.axis ? data.axis.confirmed : '' }
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Deaths:
                    </td>
                    <td className={"deaths"}>
                      {data.axis ? data.axis.deaths : '' }<br />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className={"when"}>
                <span>as of</span> { data.location ?
                  moment(data.date).format('MMMM Do') : null
                }
              </div>
            </div>
          </div>
        </div> :
        <div></div>
      }
    </>
  );
}

export default MapTooltip;

