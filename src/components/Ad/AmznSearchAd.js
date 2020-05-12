import React, {useEffect, useRef} from 'react';
import postscribe from 'postscribe';
import PropTypes from "prop-types";
import exact from 'prop-types-exact';

const AmznSearchAd = (props) => {

  const {adHeight, amznAdVals} = props;

  const terms = amznAdVals.terms
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
    else{
      // console.log('ads were skipped');
    }

  });

  return (
    <div id={"bottom-ad"} className={"bottom-ad"} style={{ height:adHeight+'px', width: '100%' }} ref={divRef}>
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
