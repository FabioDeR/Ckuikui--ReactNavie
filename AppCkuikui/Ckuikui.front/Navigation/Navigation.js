import "react-native-gesture-handler";
import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import SearchRecette from "../components/Recette/SearchRecette";
import RecetteDetail from "../components/Recette/RecetteDetail";
import Timer from "../components/Timer/Timer";
import CreatIngredient from "../components/Ingredient/CreateIngredient";
import authContext from "../components/auth/authContext";
import Logout from "../components/auth/Logout";
import Acceuil from "../components/Acceuil/Acceuil";
import Panier from "../components/Panier/Panier";
import IngredientDetail from "../components/Panier/IngredientDetail";
import MakeTimer from "../components/Timer/MakeTimer";
import CreatRecette from "../components/Recette/CreatRecette";

const Drawer = createDrawerNavigator();

//Mise en place du Menu Hambergur
const authNav = () => {
  const { user, setUser } = useContext(authContext); //Utilisation du contexte de l'utilisateur, récuperer son Id pour toute l'app
  return (
    <Drawer.Navigator
      initialRouteName="Acceuil"
      screenOptions={{ headerShown: true }}
    >
      <Drawer.Screen name="Acceuil" component={StackRecette} />
      {!user && <Drawer.Screen name="Register" component={Register} />}
      {!user && <Drawer.Screen name="Login" component={Login} />}
      {user && <Drawer.Screen name="Logout" component={Logout} />}
      {user && <Drawer.Screen name="Search" component={SearchRecette} />}
      {user && (
        <Drawer.Screen name="CreatIngredient" component={CreatIngredient} />
      )}
      {user && <Drawer.Screen name="Panier" component={Panier} />}
      {user && <Drawer.Screen name="CreatRecette" component={CreatRecette} />}
    </Drawer.Navigator>
  );
};

// Création d'un stack screen === Activity
const Stack = createStackNavigator();
const StackRecette = () => {
  return (
    <Stack.Navigator
      initialRouteName="Acceuil"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Acceuil" component={Acceuil} />
      <Stack.Screen name="SearchRecette" component={SearchRecette} />
      <Stack.Screen name="RecetteDetail" component={RecetteDetail} />
      <Stack.Screen name="IngredientDetail" component={IngredientDetail} />
      <Stack.Screen name="Timer" component={Timer} />
      <Stack.Screen name="MakeTimer" component={MakeTimer} />
      <Stack.Screen name="Panier" component={Panier} />
    </Stack.Navigator>
  );
};

export default authNav;
