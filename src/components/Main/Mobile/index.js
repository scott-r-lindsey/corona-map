import React, { useState } from 'react';
import Drawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

import { zeroColor, minColor, maxColor} from '../../../lib/colors.js';
import { getMaxValueForAxis } from '../../../lib/getMapValue.js';
import Scale from '../../Scale.js';
import AxisPicker from '../../AxisPicker.js';
import Map from '../../Map.js';
import MapSlider from '../../MapSlider.js';
import MobileAd from './MobileAd.js';
import MobileInfo from './MobileInfo.js';


const MobileMain = (props) => {

  const {data, axis, when, location, colorScale} = props;
  const [drawerOpen, setDrawerOpen] = useState(false);


  const handleMenuClick = () => {
    setDrawerOpen(drawerOpen ? false : true);
  }

  const max = getMaxValueForAxis(data, axis);

  const handleMenuDrawerClose = () => {
    setDrawerOpen(false);
  }
  const handleMenuDrawerOpen = () => {
  }

  return (

    <>
      <Drawer
        anchor={"right"}
        open={drawerOpen}
        onClose={handleMenuDrawerClose}
        onOpen={handleMenuDrawerOpen}
      >
        <div>hello-this-is-some-text</div>
      </Drawer>
      <div className={"m-main-panel"}>
        <IconButton
          aria-label="menu"
          onClick={handleMenuClick}
          className={"menu-button"}
        >
          <MenuIcon />
        </IconButton>
        <MobileInfo data={data} />
        <div className={"map-shell"}>
          <Scale {...{max, zeroColor, minColor, maxColor, colorScale}} />
          <AxisPicker />
          <Map when={when} axis={axis} data={data} colorScale={colorScale} />
          <MapSlider data={data} />
        </div>
      </div>
      <MobileAd />
    </>
  )
}

export default MobileMain;
