import {
  ColorSchemeName,
  SafeAreaView,
  StyleSheet,
  Text,
  ImageBackground,
  useColorScheme,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import UIInput from "@/components/UIInput";
import BarbieText from "@/components/BarbieText";
import UIButton from "@/components/UIButton";

const Register = () => {
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
        register
      </BarbieText>
      <UIInput placeholder="Full Name" type="solid" />
      <UIInput placeholder="Email" type="solid" />
      <UIInput placeholder="Password" type="solid" />
      <UIInput placeholder="Location" type="solid" />

      <UIButton text="register" />
    </ImageBackground>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 130,
  },
});
