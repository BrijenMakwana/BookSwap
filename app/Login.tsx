import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ImageBackground,
} from "react-native";
import React from "react";
import { Image } from "expo-image";
import Blurhash from "@/constants/Blurhash";
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
      source={{
        uri: "https://images.unsplash.com/photo-1603284569248-821525309698?=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=685&q=80",
      }}
      resizeMode="cover"
    >
      <Image
        style={styles.logo}
        source={require("../assets/images/logo.png")}
        placeholder={Blurhash}
        contentFit="fill"
        transition={1000}
      />

      <SignInWithGoogle />
    </ImageBackground>
  );
};

export default Login;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    backgroundColor: "#e0218a",
    opacity: 0.9,
    alignItems: "center",
    justifyContent: "space-around",
  },
  logo: {
    aspectRatio: 2 / 1,
    width: "80%",
    alignSelf: "center",
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
  },
  btnText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#fff",
    marginLeft: 20,
    textTransform: "capitalize",
  },
});
