import React from 'react';

const BottomAd = (props) => {

  const {adHeight, ad} = props;

  return (
    <div className={"bottom-ad"} style={{color: 'white', height:adHeight+'px', width: '100%' }}>
      { ad }
    </div>
  );
}

export default BottomAd;
