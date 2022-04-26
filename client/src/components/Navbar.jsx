import React from "react";

import logo from "../../images/logo-nav.png";

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = React.useState(false);
  
    return (
      <nav className="w-full flex md:justify-left justify-between items-left p-4">
        <div className="md:flex-[0.5] flex-initial justify-left items-left">
          <img src={logo} alt="logo" className="w-32 cursor-pointer" />
        </div>       
      </nav>
    );
  };
export default Navbar;