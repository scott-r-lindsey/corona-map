import React from "react";
import moment from 'moment-es6';
import PropTypes from "prop-types";
import exact from 'prop-types-exact';

const ChartFloat = (props) => {

  const {point, data} = props;

  return (
    <>
      { point ?
        <div className="chart-float">

          <strong>{ moment(point.data.time).format("MMMM Do") }</strong>

          <table>
            <tbody>
              <tr>
                <td>
                  Confirmed:
                </td>
                <td className={"confirmed"}>
                  { data.series.confirmed[point.data.pos].toLocaleString() }
                </td>
              </tr>
              <tr>
                <td>
                  Deaths:
                </td>
                <td className={"deaths"}>
                  { data.series.deaths[point.data.pos].toLocaleString() }
                </td>
              </tr>
            </tbody>
          </table>
        </div> :
        null
      }
    </>
  );
}
export default ChartFloat;


ChartFloat.propTypes = exact({
  data: PropTypes.object.isRequired,
  point: PropTypes.object,
});
