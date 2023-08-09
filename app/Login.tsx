import {
  StyleSheet,
  Text,
  Image,
  Pressable,
  ImageBackground,
} from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

const SignInWithGoogle = () => {
  return (
    <Pressable style={styles.loginGoogle}>
      <FontAwesome5 name="google" size={22} color="#fff" />
      <Text style={styles.btnText}>Sign In With Google</Text>
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
    backgroundColor: "#e0218a",
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
    color: "#fff",
    marginLeft: 20,
    textTransform: "capitalize",
  },
});
