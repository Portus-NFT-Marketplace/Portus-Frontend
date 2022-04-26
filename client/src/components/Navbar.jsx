import React from "react";

import logo from "../../images/logo-nav.png";

const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = React.useState(false);
  
    return (
      <nav className="w-full flex md:justify-left items-left p-4">
        <div className="md:flex-initial justify-center items-left">
          <img src={logo} alt="logo" className="w-32 cursor-pointer" />
        </div>   

        <ul className="text-black md:flex hidden list-none flex-row justify-between items-center flex-initial">
          {["Home", "Products", "Resources", "About"].map((item, index) => (
            <NavBarItem key={item + index} title={item} />
          ))}
        </ul>    
      </nav>
    );
  };
export default Navbar;