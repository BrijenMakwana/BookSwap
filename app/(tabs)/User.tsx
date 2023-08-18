import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  ColorSchemeName,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import Blurhash from "@/constants/Blurhash";
import BarbieText from "@/components/BarbieText";
import RandomQuote from "@/components/RandomQuote";
import Colors from "@/constants/Colors";
import * as Device from "expo-device";
import { supabase } from "@/supabase/supabase";
import { useNavigation } from "expo-router";
import UIButton from "@/components/UIButton";

const User = () => {
  const colorScheme: ColorSchemeName = useColorScheme();

  const [user, setUser] = useState({});

  const navigation = useNavigation();

  const goToLoginScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const getLoggedInUser = async () => {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    setUser({
      fullName: session?.user.user_metadata.full_name,
      email: session?.user.email,
    });
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    goToLoginScreen();
  };

  useEffect(() => {
    getLoggedInUser();
  }, []);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: Colors[colorScheme].background,
        },
      ]}
    >
      <Image
        style={[
          styles.avatar,
          {
            borderColor: Colors[colorScheme].barbie,
          },
        ]}
        source="https://images.thedirect.com/media/article_full/margot-robbie-barbie_M4G96Rv.jpg?imgeng=cmpr_75/"
        placeholder={Blurhash}
        contentFit="cover"
        transition={1000}
      />

      <BarbieText
        style={{
          fontSize: Device.deviceType === 2 ? 40 : 30,
          color: Colors[colorScheme].barbie,
          marginTop: 10,
          textTransform: "capitalize",
        }}
      >
        {user.fullName}
      </BarbieText>

      <Text
        style={[
          styles.userEmail,
          {
            color: Colors[colorScheme].tabIconDefault,
          },
        ]}
      >
        {user.email}
      </Text>

      <RandomQuote />

      <UIButton text="Sign Out" type="solid" onPress={signOut} />
    </SafeAreaView>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
  },
  avatar: {
    width: Device.deviceType === 2 ? 100 : 75,
    aspectRatio: 1,
    borderRadius: 50,
    borderWidth: 3,
    marginTop: 20,
  },
  userEmail: {
    fontSize: Device.deviceType === 2 ? 15 : 14,
    fontWeight: "400",
  },
});
