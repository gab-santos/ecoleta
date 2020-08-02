import React from "react";
import { StatusBar } from "react-native";

import {
  Roboto_400Regular as Roboto400Regular,
  Roboto_500Medium as Roboto500Medium,
} from "@expo-google-fonts/roboto";
import {
  Ubuntu_700Bold as Ubuntu700Bold,
  useFonts,
} from "@expo-google-fonts/ubuntu";
import { AppLoading } from "expo";

import Routes from "./src/routes";

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Roboto400Regular,
    Roboto500Medium,
    Ubuntu700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Routes />
    </>
  );
};

export default App;
