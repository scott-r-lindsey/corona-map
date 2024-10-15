**Index.js**
================

### Overview

This is the main entry point of the Left Panel component in a React application. It imports various dependencies, defines the `LeftPanel` component, and exports it as the default export.

### Dependencies

The following dependencies are imported:

*   `React`: The main React library.
*   `LogChart`: A custom component for rendering logarithmic charts.
*   `updateUrl`: A utility function for updating URLs based on query parameters.
*   `useParams` and `useHistory`: Hooks from the `react-router-dom` library for managing URL parameters and history.
*   Various utility functions (`getFormattedDate`, `capitalizeLocation`, `getStateDataByName`) from the `lib` directory.

### LeftPanel Component

The `LeftPanel` component is defined as a functional component that takes in props. It uses the `useParams` hook to extract location and when parameters from the URL, and the `useHistory` hook to access the browser's history.

```javascript
/**
 * The Left Panel component.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.data - Data object containing COVID-19 data.
 * @param {number} props.adHeight - Ad height value for styling purposes.
 */
const LeftPanel = (props) => {
  const params = useParams();
  const { location, when } = params;
  const { data, adHeight } = props;

  const history = useHistory();
  const backToUsUrl = updateUrl(params, { location: 'united states' });
  const stateData = getStateDataByName(data, location);

  /**
   * Handles the click event for the "Back to US" link.
   *
   * @param {Event} event - The click event object.
   */
  const backToUs = (event) => {
    history.push(backToUsUrl);
    event.preventDefault();
  };

  /**
   * Capitalizes the location string using the `capitalizeLocation` function.
   *
   * @returns {string} The capitalized location string.
   */
  const locationCaps = capitalizeLocation(location);

  let hasData = false;

  // eslint-disable-next-line no-unused-vars
  for (let [axis, values] of Object.entries(stateData.series)) {
    if (values[values.length - 1] > 0) {
      hasData = true;
    }
  }

  /**
   * Returns a formatted date string using the `getFormattedDate` function.
   *
   * @param {string} date - The date to format.
   * @returns {string} The formatted date string.
   */
  const dateSpan = (when) => {
    return (
      <span>
        {getFormattedDate(data, when, 'MMMM Do')}
      </span>
    );
  }

  /**
   * Calculates the height difference for styling purposes.
   *
   * @param {number} adHeight - The ad height value.
   * @returns {string} The calculated height difference in pixels.
   */
  const heightDiff = adHeight ? ((adHeight - 0) + 270) + 'px' : '270px';

  return (
    <>
      <Logo />
      <div className="info-panel">
        <h1>{locationCaps}</h1>
        <em>
          Displaying {dateSpan('-' + (data.dates.length - 1))} until {dateSpan(when)}
        </em>

        {'united states' === location ? null : (
          <a
            href={backToUsUrl}
            className="back-to-us"
            alt="Back to US"
            title="Back to US"
            onClick={backToUs}
          >
            <img src="/img/us.svg" alt="Back to US" />
          </a>
        )}
        <Info data={data} location={location} />

      </div>
      <div className="scrollable-area" style={{ height: 'calc(100% - ' + heightDiff }}>
        {hasData ? (
          <LogChart data={data} stateData={stateData} />
        ) : (
          <>
            <div className={"log-chart"}>
              <div className={"no-data"}>
                <p>
                  No data for period
                </p>
              </div>
            </div>
            <div style={{ height: '20px' }} />
          </>
        )}
        <Text />
        <CopyFooter />
      </div>
    </>
  );
};

export default LeftPanel;

LeftPanel.propTypes = exact({
  data: PropTypes.object.isRequired,
  adHeight: PropTypes.number.isRequired,
});
```

### Prop Types

The `LeftPanel` component expects two props:

*   `data`: An object containing COVID-19 data.
*   `adHeight`: A number representing the ad height value.

These props are validated using the `PropTypes` library and its exact variants (`exact`).

### Key Logic

The following key logic is implemented in the `LeftPanel` component:

*   Updating URLs based on query parameters using the `updateUrl` function.
*   Extracting location and when parameters from the URL using the `useParams` hook.
*   Accessing the browser's history using the `useHistory` hook.
*   Capitalizing the location string using the `capitalizeLocation` function.
*   Checking if data is available by iterating over the `stateData.series` object and checking if any values are greater than 0.
*   Calculating the height difference for styling purposes using the `heightDiff` variable.
*   Rendering a formatted date string using the `dateSpan` function.
*   Handling the click event for the "Back to US" link by redirecting to the updated URL.