import React from "react";



const Footer = () => (
  <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
    <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
      <div className="flex flex-[0.5] justify-center items-center">
      </div>
    </div>

    <div className="flex justify-center items-center flex-col mt-2">
      <p className="text-white text-sm text-center">NFTs online marketplace from children arts</p>
      <p className="text-white text-sm text-center font-medium mt-2">Portus</p>
    </div>

    <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />

    <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
      <p className="text-white text-left text-xs">@first demo</p>
      <p className="text-white text-right text-xs">Saruj, Pitchapa</p>
    </div>
  </div>
);

export default Footer;