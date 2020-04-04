import React from "react";
import LogChart from './LogChart.js';
import updateUrl from '../lib/mapUrl.js'
import { useParams, useHistory } from "react-router-dom";
import {getDataValue, getFormattedDate} from '../lib/getMapValue.js';

const LeftPanel = (props) => {

  const { location } = useParams();
  const { data } = props;
  const history = useHistory();
  const params = useParams();
  const { when } = params;
  const backToUsUrl = updateUrl(params, {location: 'united states'});

  const backToUs = event => {
    history.push(backToUsUrl);
    event.preventDefault();
  };

  const locationCaps = location.split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');

  return(
    <>
      <div className={"info-panel"}>
        <h1>{locationCaps}</h1>
        <em>
          {
            getFormattedDate(data, when, 'MMMM Do')
          }
        </em>

        { 'united states' === location ? null :
          <a
              href={backToUsUrl}
              className={"back-to-us"}
              alt="Back to US"
              title="Back to US"
              onClick={backToUs}
          >
            <img src="/img/us.svg" alt="Back to US" />
          </a>
        }

        <table>
          <thead>
            <tr>
              <th>Cases</th>
              <th>Deaths</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={"confirmed"}>
                { getDataValue(data, when, location, 'confirmed') }
              </td>
              <td className={"deaths"}>
                { getDataValue(data, when, location, 'deaths') }

              </td>
            </tr>
          </tbody>
        </table>

      </div>
      <LogChart location={location} data={data} />
    </>
  )
}

export default LeftPanel;

