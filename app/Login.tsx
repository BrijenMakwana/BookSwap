import {
  ColorSchemeName,
  StyleSheet,
  ImageBackground,
  useColorScheme,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import UIInput from "@/components/UIInput";
import BarbieText from "@/components/BarbieText";
import UIButton from "@/components/UIButton";

const Login = () => {
  const colorScheme: ColorSchemeName = useColorScheme();

  return (
    <ImageBackground
      source={require("../assets/images/welcome.png")}
      resizeMode="contain"
      style={[
        styles.container,
        {
          backgroundColor: Colors[colorScheme].background,
        },
      ]}
    >
      <BarbieText
        style={{
          fontSize: 60,
          textTransform: "capitalize",
          color: Colors[colorScheme].text,
        }}
      >
        login
      </BarbieText>

      <UIInput placeholder="Email" />
      <UIInput placeholder="Password" />

      <UIButton text="login" type="solid" />
      <UIButton text="create a new account" type="outline" />
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 130,
  },
});
