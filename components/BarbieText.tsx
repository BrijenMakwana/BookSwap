import { Text } from "react-native";
import { FC, useEffect } from "react";
import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { IBarbieText } from "@/types/barbieText";

SplashScreen.preventAutoHideAsync();

const BarbieText: FC<IBarbieText> = (props) => {
  const { children, style } = props;

  const [fontsLoaded] = useFonts({
    Lobster: require("../assets/fonts/Lobster-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <Text style={{ fontFamily: "Lobster", ...style }}>{children}</Text>;
};

export default BarbieText;
