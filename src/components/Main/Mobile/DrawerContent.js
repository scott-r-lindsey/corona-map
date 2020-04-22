import React from "react";
import Logo from '../../Logo.js';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const DrawerContent = () => {

  return (
    <div className={"drawer-content"}>
      <Logo />

      <MenuList>
        <MenuItem>
          <a href="/blog/2020/04/12/about/">About</a>
        </MenuItem>
        <MenuItem>
          <a href="/blog/privacy-policy/">Privacy Policy</a>
        </MenuItem>
        <MenuItem>
          <a href="/blog/terms-of-service/">Terms of Service</a>
        </MenuItem>
      </MenuList>


      <div className={"footer"}>
        Copyright &copy; Scott Lindsey
      </div>

    </div>

  );

}
export default DrawerContent;
