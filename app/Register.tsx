import {
  ColorSchemeName,
  SafeAreaView,
  StyleSheet,
  Text,
  ImageBackground,
  useColorScheme,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import UIInput from "@/components/UIInput";
import BarbieText from "@/components/BarbieText";
import UIButton from "@/components/UIButton";
import { supabase } from "@/supabase/supabase";
import { emailIsValid } from "@/utility/utility";

const Register = () => {
  const colorScheme: ColorSchemeName = useColorScheme();

  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const registerUser = async () => {
    try {
      if (!emailIsValid(email)) {
        throw new Error("Invalid Email!");
      }

      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: fullName,
            location: location,
          },
        },
      });
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };

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
      <UIInput
        placeholder="Full Name"
        type="solid"
        value={fullName}
        setValue={setFullName}
      />
      <UIInput
        placeholder="Email"
        type="solid"
        value={email}
        setValue={setEmail}
      />
      <UIInput
        placeholder="Password"
        type="solid"
        value={password}
        setValue={setPassword}
        isProtected={true}
      />
      <UIInput
        placeholder="Location"
        type="solid"
        value={location}
        setValue={setLocation}
      />

      <UIButton text="register" onPress={registerUser} type="solid" />
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
