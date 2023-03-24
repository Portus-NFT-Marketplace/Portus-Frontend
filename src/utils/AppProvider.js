import React, { createContext, useState } from 'react';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [userAddress, setUserAddress] = useState(null);

  return (
    <AppContext.Provider value={{ userAddress, setUserAddress }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;