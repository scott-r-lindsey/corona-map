import React, {useRef} from 'react';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from "prop-types";
import exact from 'prop-types-exact';

const MobileAd = (props) => {

  const {adHeight} = props;
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
      <div className={"mobile-ad"} style={{color: 'white', height:adHeight+'px'}} ref={adShellRef}>
        { props.children }
      </div>
    </>
  );
}

export default MobileAd;

MobileAd.propTypes = exact({
  adHeight: PropTypes.number.isRequired,
  children: PropTypes.element.isRequired
});
