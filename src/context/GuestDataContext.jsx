import { createContext, useContext, useState } from "react";

const GuestDataContext = createContext();

export function GuestDataProvider({ children }) {

  const [guestHistory, setGuestHistory] = useState([]);

  const addGuestRecord = (record) => {
    setGuestHistory((prev) => [
      {
        _id: "guest-" + Date.now(),
        uploadDate: new Date().toISOString(),
        ...record,
      },
      ...prev,
    ]);
  };

  const removeGuestRecord = (id) => {
    setGuestHistory((prev) => prev.filter((item) => item._id !== id));
  };

  const clearGuestData = () => {
    setGuestHistory([]);
  };

  return (
    <GuestDataContext.Provider
      value={{
        guestHistory,
        addGuestRecord,
        removeGuestRecord,
        clearGuestData,
      }}
    >
      {children}
    </GuestDataContext.Provider>
  );
}

export function useGuestData() {
  return useContext(GuestDataContext);
}