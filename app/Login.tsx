import {
  ColorSchemeName,
  StyleSheet,
  ImageBackground,
  useColorScheme,
  ToastAndroid,
} from "react-native";
import { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import UIInput from "@/components/UIInput";
import BarbieText from "@/components/BarbieText";
import UIButton from "@/components/UIButton";
import { supabase } from "@/supabase/supabase";
import { emailIsValid } from "@/utility/utility";
import { useNavigation, router } from "expo-router";
import useUserID from "@/hooks/useUserID";

const Login = () => {
  const colorScheme: ColorSchemeName = useColorScheme();

  const { userID, sessionError } = useUserID();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigation = useNavigation();

  const goToHomeScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "(tabs)" }],
    });
  };

  const goToRegisterScreen = () => {
    router.push("/Register");
  };

  const userIsLoggedIn = async () => {
    if (sessionError) return;

    if (userID) {
      goToHomeScreen();
    }
  };

  const loginWithEmail = async () => {
    try {
      if (!emailIsValid(email)) {
        throw new Error("Invalid Email!");
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data) {
        goToHomeScreen();
      }
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    userIsLoggedIn();
  }, []);

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

      <UIInput placeholder="Email" value={email} setValue={setEmail} />
      <UIInput
        placeholder="Password"
        value={password}
        setValue={setPassword}
        isProtected={true}
      />

      <UIButton text="login" type="solid" onPress={loginWithEmail} />
      <UIButton
        text="create a new account"
        type="outline"
        onPress={goToRegisterScreen}
      />
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
