import {
  ColorSchemeName,
  StyleSheet,
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
import { router } from "expo-router";
import { View } from "react-native";

const Register = () => {
  const colorScheme: ColorSchemeName = useColorScheme();

  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const isEmptyFields = () => {
    return !fullName || !location;
  };

  const registerUser = async () => {
    try {
      if (isEmptyFields()) {
        throw new Error("Please fill in all the fields!");
      }

      if (!emailIsValid(email)) {
        throw new Error("Invalid Email!");
      }

      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: fullName,
            location: location.trim(),
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data) {
        ToastAndroid.show(
          "We sent you a email verification link!",
          ToastAndroid.SHORT
        );

        goToLoginScreen();
      }
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };

  const goToLoginScreen = () => {
    router.back();
  };

  return (
    <View
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
          color: Colors[colorScheme].barbie,
        }}
      >
        register
      </BarbieText>
      <UIInput
        placeholder="Full Name"
        value={fullName}
        setValue={setFullName}
      />
      <UIInput placeholder="Email" value={email} setValue={setEmail} />
      <UIInput
        placeholder="Password"
        value={password}
        setValue={setPassword}
        isProtected
      />
      <UIInput placeholder="Location" value={location} setValue={setLocation} />

      <UIButton text="register" onPress={registerUser} type="solid" />
      <UIButton text="back to login" type="outline" onPress={goToLoginScreen} />
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
