import React, { useState } from 'react';
import Drawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { getMaxValueForAxis, getTrimmedData } from '../../../lib/getMapValue';
import Map from '../../Map/';
import MapSlider from '../../Map/Slider';
import MobileAd from './MobileAd';
import AmznSearchAd from '../../Ad/AmznSearchAd';
import MobileInfo from './MobileInfo';
import Text from './Text';
import DrawerContent from './DrawerContent';
import { useParams } from "react-router-dom";
import MapWidgets from '../../Map/Widgets';
import PropTypes from "prop-types";
import exact from 'prop-types-exact';

const MobileMain = (props) => {

  const {data, axis, when, colorScale} = props;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {quant} = useParams();

  const handleMenuClick = () => {
    setDrawerOpen(drawerOpen ? false : true);
  }

  const max = getMaxValueForAxis(data, `${axis}-${quant}`);
  const trimmedData = getTrimmedData(data, when);

  const handleMenuDrawerClose = () => {
    setDrawerOpen(false);
  }
  const handleMenuDrawerOpen = () => {
  }

  return (
    <>
      <Drawer
        className={"m-right-drawer"}
        anchor={"right"}
        open={drawerOpen}
        onClose={handleMenuDrawerClose}
        onOpen={handleMenuDrawerOpen}
      >
        <DrawerContent />
      </Drawer>
      <div className={"m-main-panel"}>
        <IconButton
          aria-label="menu"
          onClick={handleMenuClick}
          className={"menu-button"}
        >
          <MenuIcon />
        </IconButton>
        <MobileInfo data={trimmedData} />
        <div className={"map-shell"}>
          <MapWidgets
            {...{max, colorScale}}
            data={trimmedData}
          />
          <Map when={when} axis={`${axis}-${quant}`} data={data} colorScale={colorScale} />
          <MapSlider data={data} />
        </div>
        <Text />
      </div>
      <MobileAd adHeight={154}>
        <AmznSearchAd adHeight={154} amznAdVals={data.searchVals} />
      </MobileAd>
    </>
  )
}

export default MobileMain;

MobileMain.propTypes = exact({
  data: PropTypes.object.isRequired,
  axis: PropTypes.string.isRequired,
  when: PropTypes.string.isRequired,
  colorScale: PropTypes.func.isRequired,
});
