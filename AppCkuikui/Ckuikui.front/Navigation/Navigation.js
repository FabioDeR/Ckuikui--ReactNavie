import "react-native-gesture-handler";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import SearchRecette from "../components/Recette/SearchRecette";
import RecetteDetail from "../components/Recette/RecetteDetail";

const Drawer = createDrawerNavigator();
const authNav = () => {
  return (
    <Drawer.Navigator initialRouteName="Search">
      <Drawer.Screen
        name="Register"
        component={Register}
        options={{ headerShown: true }}
      />
      <Drawer.Screen
        name="Login"
        component={Login}
        options={{ headerShown: true }}
      />
      <Drawer.Screen
        name="Search"
        component={StackRecette}
        options={{ headerShown: true }}
      />
    </Drawer.Navigator>
  );
};

const Stack = createStackNavigator();
const StackRecette = () => {
  return (
    <Stack.Navigator
      initialRouteName="SearchRecette"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SearchRecette" component={SearchRecette} />
      <Stack.Screen name="RecetteDetail" component={RecetteDetail} />
    </Stack.Navigator>
  );
};

export default authNav;
