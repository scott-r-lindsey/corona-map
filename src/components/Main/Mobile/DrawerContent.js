import React from "react";
import Logo from '../../Logo.js';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const DrawerContent = (props) => {

  return (
    <div className={"drawer-content"}>
      <Logo />


      <MenuList>
        <MenuItem>About</MenuItem>
        <MenuItem>Privacy</MenuItem>
        <MenuItem>Terms of Service</MenuItem>
      </MenuList>


    </div>

  );

}
export default DrawerContent;
