
import React from "react";
import {capitalizeLocation} from '../../lib/getMapValue';
import moment from 'moment-es6';
import PropTypes from "prop-types";
import exact from 'prop-types-exact';

const MapTooltip = (props) => {

  const {left, top, show, data } = props;

  const style = {
    position: 'absolute',
    left: left,
    top: top -15,
    display: show ? 'block' : 'none',
  };
  const roundFour = (val) => Math.trunc(val * 1000)/1000;

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
                      Total Cases:
                    </td>
                    <td className={"confirmed"}>
                      {data.axis ? data.axis.confirmed.toLocaleString() : '' }
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Total Deaths:
                    </td>
                    <td className={"deaths"}>
                      {data.axis ? data.axis.deaths.toLocaleString() : '' }<br />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                        <hr />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Cases/1000:
                    </td>
                    <td className={"confirmed"}>
                      {data.axis ? roundFour(data.axis.confirmedPercap) : '' }
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Deaths/1000:
                    </td>
                    <td className={"deaths"}>
                      {data.axis ? roundFour(data.axis.deathsPercap) : '' }<br />
                    </td>
                  </tr>

                  <tr>
                    <td colSpan={2}>
                      <span className={"pop"}>Pop. { data.pop.toLocaleString() }</span>
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

MapTooltip.propTypes = exact({
  data: PropTypes.object.isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  show: PropTypes.bool.isRequired,
});
