import { createContext, useContext, useState } from "react";

const DropdownContext = createContext();

export const DropdownProvider = ({ children }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <DropdownContext.Provider value={{ showDropdown, setShowDropdown }}>
      {children}
    </DropdownContext.Provider>
  );
};

export const useDropdown = () => useContext(DropdownContext);
