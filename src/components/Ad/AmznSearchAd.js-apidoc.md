# Detailed Documentation for `AmznSearchAd.js`

## Overview
`AmznSearchAd.js` is a React functional component designed to display an Amazon search advertisement within a web application. This component dynamically injects a script to display an Amazon ad based on given search terms and configuration values. It utilizes the `postscribe` library to safely write the script into the DOM and ensures that ads are not displayed during testing.

## Imports
- **React**: Core library for building user interfaces.
  - `useEffect`: A hook that runs side effects in functional components.
  - `useRef`: A hook to create a reference to a DOM element.
- **postscribe**: A library for safe and asynchronous HTML writing to the DOM.
- **PropTypes**: A library for type-checking props in React components.
  - `exact`: A utility from `prop-types-exact` to ensure that the prop object matches the specified shape exactly.

## Component Definition

### `AmznSearchAd`
This is the main functional component in the file. It is designed to display an Amazon search ad based on provided properties.

#### Props
- `amznAdVals` (object, required): Contains the configuration values for the Amazon ad, such as tracking ID, link ID, and search terms.
- `adHeight` (number, required): Specifies the height of the ad in pixels.

#### Internal Variables
- `terms`: An array of search terms extracted from `amznAdVals`.
- `searchTerm`: A randomly selected search term from the `terms` array.
- `divRef`: A React reference to the `<div>` element where the ad script will be injected.

#### `useEffect` Hook
The `useEffect` hook is used to inject the Amazon ad script into the DOM when the component mounts. It ensures that the ad script is only injected if not in a testing environment (checked via `global.test`).

**Key Logic:**
1. **Ad Script Generation:**
   - Constructs an HTML string containing two script tags:
     - The first script initializes Amazon ad variables using values from `amznAdVals` and the `searchTerm`.
     - The second script fetches the Amazon ad script from their CDN.
2. **Ad Insertion:**
   - If the `divRef`'s current inner HTML is empty, it uses `postscribe` to write the ad script into the `div` with the ID `bottom-ad`.
   - If the `divRef` already contains content, it first clears the inner HTML before writing the new script.

#### Render Method
Returns a `div` element with:
- ID `bottom-ad`
- Class `bottom-ad`
- Inline style setting its height and width
- `ref` attribute assigned to `divRef` for direct DOM manipulation.

## Export
The component is exported as the default export of the module.

## PropType Validation
The component uses `exact` from `prop-types-exact` to strictly validate the shape of the props object. It ensures that:
- `amznAdVals` is an object and is required.
- `adHeight` is a number and is required.

## Sample Code
A commented section at the bottom of the file includes an example of the script used to configure and fetch the Amazon ad. This example demonstrates the structure of the script tags and the variables used.

```javascript
import React, { useEffect, useRef } from 'react';
import postscribe from 'postscribe';
import PropTypes from "prop-types";
import exact from 'prop-types-exact';

const AmznSearchAd = (props) => {
  const { adHeight, amznAdVals } = props;
  const terms = amznAdVals.terms;
  const searchTerm = terms[Math.floor(Math.random() * terms.length)];
  const divRef = useRef(null);

  useEffect(() => {
    // disable the ad during tests
    if (!global.test) {
      const html = `
        <script type="text/javascript">
          amzn_assoc_placement = "adunit0";
          amzn_assoc_tracking_id = "${amznAdVals.tracking_id}";
          amzn_assoc_ad_mode = "search";
          amzn_assoc_ad_type = "smart";
          amzn_assoc_marketplace = "amazon";
          amzn_assoc_region = "US";
          amzn_assoc_default_search_phrase = "${searchTerm}";
          amzn_assoc_default_category = "All";
          amzn_assoc_linkid = "${amznAdVals.linkid}";
          amzn_assoc_design = "in_content";
        </script>
        <script src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US"></script>`;

      if (!divRef.current.innerHTML){
        postscribe('#bottom-ad', html);
      }
      else{
        divRef.current.innerHTML = '';
        postscribe('#bottom-ad', html);
      }
    }
  });

  return (
    <div id={"bottom-ad"} className={"bottom-ad"} style={{ height: adHeight + 'px', width: '100%' }} ref={divRef}>
    </div>
  );
}

export default AmznSearchAd;

AmznSearchAd.propTypes = exact({
  amznAdVals: PropTypes.object.isRequired,
  adHeight: PropTypes.number.isRequired,
});

/*

// sample code

<script type="text/javascript">
amzn_assoc_placement = "adunit0";
amzn_assoc_tracking_id = "bookstash0e-20";
amzn_assoc_ad_mode = "search";
amzn_assoc_ad_type = "smart";
amzn_assoc_marketplace = "amazon";
amzn_assoc_region = "US";
amzn_assoc_default_search_phrase = "deep freezer";
amzn_assoc_default_category = "All";
amzn_assoc_linkid = "6a2183b51fcb19fa583b6a27113e7732";
amzn_assoc_design = "in_content";
amzn_assoc_title = "covid-search-ad";
</script>
<script src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US"></script>

*/
```

## Summary
This React component facilitates the integration of Amazon search ads into a web application by dynamically generating and injecting the necessary script. It uses hooks to manage side effects and references and includes prop type validation to ensure correct usage. The component also respects testing environments by disabling ad injection during tests.