import {
  StyleSheet,
  Text,
  Image,
  Pressable,
  ImageBackground,
  useColorScheme,
  ColorSchemeName,
} from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const SignInWithGoogle = () => {
  const colorScheme: ColorSchemeName = useColorScheme();

  return (
    <Pressable
      style={[
        styles.loginGoogle,
        {
          backgroundColor: Colors[colorScheme].barbie,
        },
      ]}
    >
      <FontAwesome5
        name="google"
        size={22}
        color={Colors[colorScheme].background}
      />
      <Text
        style={[
          styles.btnText,
          {
            color: Colors[colorScheme].background,
          },
        ]}
      >
        Sign In With Google
      </Text>
    </Pressable>
  );
};

const Login = () => {
  return (
    <ImageBackground
      style={styles.image}
      source={require("../assets/images/login.png")}
      resizeMode="cover"
    >
      <Image
        style={styles.logo}
        source={require("../assets/images/logo.png")}
        resizeMode="contain"
      />

      <SignInWithGoogle />
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  logo: {
    width: 310,
    height: 150,
    marginTop: 25,
    marginLeft: 15,
  },
  loginGoogle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "70%",
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: "auto",
    marginBottom: 100,
  },
  btnText: {
    fontSize: 15,
    fontWeight: "500",
    marginLeft: 20,
    textTransform: "capitalize",
  },
});
