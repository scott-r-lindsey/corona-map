import React, {useRef} from 'react';
import CloseIcon from '@material-ui/icons/Close';

const MobileAd = (props) => {

  const {adWidth, adHeight} = props;
  const adShellRef = useRef(null);
  const dismissRef = useRef(null);

  const handleDismissClick = () => {
    adShellRef.current.style.display = 'none';
    dismissRef.current.style.display = 'none';
  }

  return (
    <>
      <div className={"mobile-ad-dismiss"} onClick={handleDismissClick} ref={dismissRef}>
        <CloseIcon color={"primary"} />
      </div>
      <div className={"mobile-ad"} style={{color: 'white', height:adHeight+'px', width: adWidth+'px'}} ref={adShellRef}>
        { props.children }
      </div>
    </>
  );
}

export default MobileAd;
