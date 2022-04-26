import React, { useEffect, useState } from "react";

export const TransactionContext = React.createContext();

const { ethereum } = window;



export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");


  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_requestAccounts", });

      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };


  return (
    <TransactionContext.Provider
      value={{
        connectWallet
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
