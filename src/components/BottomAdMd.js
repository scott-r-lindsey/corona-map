import React from 'react';
import BottomAd from './BottomAd.js';

const BottomAdMd = (props) => {

  const {adHeight, ad} = props;

  return (
    <div className={"bottom-ad-md"}>
      <BottomAd adHeight={adHeight} ad={ad} />
    </div>
  );
}

export default BottomAdMd;
