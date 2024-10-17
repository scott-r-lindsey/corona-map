**AmznSearchAd.js**
=====================

A React component that embeds an Amazon search ad on a webpage.

**Overview**
------------

This component uses the `postscribe` library to dynamically insert HTML into the DOM, rendering an Amazon search ad with user-provided parameters. The ad is conditionedally displayed based on a global test flag.

**Imports**
------------

*   `React`, `useEffect`, and `useRef` from the React library
*   `postscribe` from the postscribe library for dynamic HTML insertion
*   `PropTypes` from the prop-types library for type checking
*   `exact` from the prop-types-exact library for exact prop types

**Component Definition**
-----------------------

### AmznSearchAd Component

```javascript
const AmznSearchAd = (props) => {
  // Destructure props to extract ad height and Amazon ad values
  const {adHeight, amznAdVals} = props;

  // Extract terms from the Amazon ad values object
  const terms = amznAdVals.terms;
  
  // Select a random search term from the array of terms
  const searchTerm = terms[Math.floor(Math.random() * terms.length)];

  // Create a reference to the DOM element where the ad will be rendered
  const divRef = useRef(null);

  /**
   * Effect hook that runs when the component mounts or updates.
   *
   * This effect conditionally inserts the Amazon ad HTML into the DOM based on the global test flag.
   */
  useEffect(() => {
    // Disable the ad during tests
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
        <script src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US"></script>
      `;
      
      // Check if the DOM element has already been rendered
      if (!divRef.current.innerHTML) {
        postscribe('#bottom-ad', html);
      } else {
        // Clear any existing ad HTML and re-insert it
        divRef.current.innerHTML = '';
        postscribe('#bottom-ad', html);
      }
    } else {
      // Do nothing when the test flag is set
    }
  });

  return (
    <div id={"bottom-ad"} className={"bottom-ad"} style={{height:adHeight+'px', width:'100%'}} ref={divRef}>
    </div>
  );
}
```

**PropTypes**
--------------

The component expects the following props:

*   `amznAdVals`: An object containing Amazon ad values (tracking ID, terms, etc.)
*   `adHeight`: The height of the ad in pixels

```javascript
AmznSearchAd.propTypes = exact({
  amznAdVals: PropTypes.object.isRequired,
  adHeight: PropTypes.number.isRequired,
});
```

**Usage**
---------

To use this component, import it and provide the required props:

```javascript
import React from 'react';
import AmznSearchAd from './AmznSearchAd';

const App = () => {
  const amznAdVals = {
    tracking_id: 'bookstash0e-20',
    terms: ['deep freezer'],
    linkid: '6a2183b51fcb19fa583b6a27113e7732'
  };

  return (
    <div>
      <AmznSearchAd adHeight={300} amznAdVals={amznAdVals} />
    </div>
  );
}
```

**Notes**
-------

*   The component uses the `postscribe` library to dynamically insert HTML into the DOM.
*   The ad is conditionally rendered based on a global test flag (`global.test`).
*   The component expects the `amznAdVals` prop to contain the required Amazon ad values (tracking ID, terms, etc.).