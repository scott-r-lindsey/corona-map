import React from "react";
import moment from 'moment-es6'; 

const ChartFloat = (props) => {

  const {point, data } = props;

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
                  { data.series.confirmed[point.data.pos] }
                </td>
              </tr>
              <tr>
                <td>
                  Deaths:
                </td>
                <td className={"deaths"}>
                  { data.series.deaths[point.data.pos] }
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
