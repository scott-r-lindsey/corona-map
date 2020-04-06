import React from "react";
import LogChart from './LogChart.js';
import updateUrl from '../../lib/mapUrl.js'
import { useParams, useHistory } from "react-router-dom";
import {getFormattedDate} from '../../lib/getMapValue.js';
import Logo from '../Logo.js';
import Info from './Info.js';
import {getStateDataByName} from '../../lib/getMapValue.js';

const LeftPanel = (props) => {

  const { location } = useParams();
  const { data } = props;
  const history = useHistory();
  const params = useParams();
  const { when } = params;
  const backToUsUrl = updateUrl(params, {location: 'united states'});
  const stateData = getStateDataByName(data, location);

  const backToUs = event => {
    history.push(backToUsUrl);
    event.preventDefault();
  };

  const locationCaps = location.split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ') + (location === 'united states' ? ' of America' : '');

  let hasData = false;

  // eslint-disable-next-line no-unused-vars
  for (let [axis, values] of Object.entries(stateData.series)){
    if (values[values.length-1] > 0){
      hasData = true;
    }
  }

  const dateSpan = (when) => {
    return (
      <span>
        {
          getFormattedDate(data, when, 'MMMM Do')
        }
      </span>
    );
  }

  return(
    <>
      <Logo />
      <div className={"info-panel"}>
        <h1>{locationCaps}</h1>
        <em>
          Displaying {dateSpan('-'+(data.dates.length-1))} until {dateSpan(when)}
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
        <Info data={data} location={location} />

      </div>
      { hasData ?
        <LogChart location={location} data={data} stateData={stateData} /> :
        <div className={"log-chart"}>
          <div className={"no-data"}>
            <p>
              No data for period
            </p>
          </div>
        </div>
      }
    </>
  )
}

export default LeftPanel;

