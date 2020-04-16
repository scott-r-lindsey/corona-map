import React, { useState } from 'react';
import Drawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { zeroColor, minColor, maxColor} from '../../../lib/colors.js';
import { getMaxValueForAxis, getTrimmedData } from '../../../lib/getMapValue.js';
import Map from '../../Map.js';
import MapSlider from '../../MapSlider.js';
import MobileAd from './MobileAd.js';
import AmznSearchAd from '../../Ad/AmznSearchAd.js';
import MobileInfo from './MobileInfo.js';
import Text from './Text.js';
import DrawerContent from './DrawerContent.js';
import { useParams } from "react-router-dom";
import MapWidgets from '../../Map/Widgets';

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
          <MapWidgets {...{max, zeroColor, minColor, maxColor, colorScale}} />
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
