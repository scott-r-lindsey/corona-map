import React, {useRef} from 'react';
import AmazonAd from '../../AmazonAd.js';
import CloseIcon from '@material-ui/icons/Close';

const MobileAd = (props) => {

  const {adWidth, adHeight, ad} = props;
  const adShellRef = useRef(null);

  const handleDismissClick = () => {
    adShellRef.current.style.display = 'none';
  }

  return (
    <div className={"mobile-ad"} style={{color: 'white', height:adHeight+'px', width: adWidth+'px'}} ref={adShellRef}>
      <div className={"mobile-ad-dismiss"} onClick={handleDismissClick}>
        <CloseIcon color={"primary"} />
      </div>
      <AmazonAd adHeight={adHeight} ad={ad} />
    </div>
  );
}

export default MobileAd;
