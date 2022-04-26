import { TransactionContext } from "../context/TransactionContext";
import React, { useContext } from "react";
const Welcome = () => {

    const { connectWallet } = useContext(TransactionContext);
    const productsPage = () => {

    }

    return (
        <div className="flex w-full justify-left items-center">
            <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 px-4">
                <div className="flex flex-1 justify-start flex-col mf:mr-10">
                    <h1 className="text-3xl sm:text-5xl text-white py-1">
                    Discover, collect, and <br/> buy NFTs artworks <br/> from Kids
                    </h1>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                        Explore the NFTs world. Buy and sell NFTs artworks easily on Portus.
                    </p>
                    
                    <div className="flex flex-row">
                        <button
                            type="button"
                            onClick={connectWallet}
                            style={{height: '45px', width : '200px', marginRight: 10}}
                            className="flex flex-row justify-center items-center my-5 bg-[#FFFF] p-3 rounded-lg cursor-pointer hover:bg-[#CACACA]"
                        >
                            <p className="text-black text-base font-semibold">
                                Connect Wallet
                            </p>
                        </button>
                        <button
                            type="button"
                            onClick={productsPage}
                            style={{height: '45px', width : '200px'}}
                            className="flex flex-row justify-center items-center my-5 bg-[#FFFF] p-3 rounded-lg cursor-pointer hover:bg-[#CACACA]"
                        >
                            <p className="text-black text-base font-semibold">
                                Products
                            </p>
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Welcome;