import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./Navigation/Navigation";
import authContext from "./components/auth/authContext";
import authStorage from "./components/auth/securStor";

export default function App() {
  const [user, setUser] = useState();
  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) {
      setUser(user);
    }
  };
  return (
    <authContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </authContext.Provider>
  );
}
