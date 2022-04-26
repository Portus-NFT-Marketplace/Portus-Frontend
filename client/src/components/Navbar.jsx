import React from "react";

import logo from "../../images/logo-nav.png";

const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const SearchBar = () => (
    <div className="flex justify-end"> 
        <form action="/" method="get" style={{float: "right"}}>
            <label htmlFor="header-search">
            </label>
            <input
                type="text"
                id="header-search"
                style={{height: '35px', width: '300px', textAlign: "center"}}
                placeholder="Find the art that will be your portus"
                name="s" 
            />
            <button type="submit">🗝️</button>
        </form>
    </div>

);

const Navbar = () => {
  
    return (
      <nav className="w-full flex md:items-center p-4" ห>
        <div className="md:flex-initial justify-center items-left">
          <img src={logo} alt="logo" className="w-32 cursor-pointer" />
        </div>   
        <div>
            <ul className="text-black md:flex hidden list-none flex-row justify-center justify-between items-center flex-initial">
            {["Home", "Products", "Resources", "About"].map((item, index) => (
                <NavBarItem key={item + index} title={item} />
            ))}
            </ul>
        </div>

        <div>        
            <SearchBar/>  
        </div>
      </nav>
    );
  };
export default Navbar;