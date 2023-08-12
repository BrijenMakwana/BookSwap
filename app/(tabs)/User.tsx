import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  ColorSchemeName,
} from "react-native";
import React from "react";
import { Image } from "expo-image";
import Blurhash from "@/constants/Blurhash";
import BarbieText from "@/components/BarbieText";
import RandomQuote from "@/components/RandomQuote";
import Colors from "@/constants/Colors";
import * as Device from "expo-device";

const UserFact = (props) => {
  const colorScheme: ColorSchemeName = useColorScheme();

  const { number, text } = props;
  return (
    <View style={styles.userFact}>
      <Text
        style={[
          styles.factNumber,
          {
            color: Colors[colorScheme].text,
          },
        ]}
      >
        {number}
      </Text>
      <Text
        style={[
          styles.factText,
          {
            color: Colors[colorScheme].text,
          },
        ]}
      >
        {text}
      </Text>
    </View>
  );
};

const User = () => {
  const colorScheme: ColorSchemeName = useColorScheme();

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
        margot robbie
      </BarbieText>

      <Text
        style={[
          styles.userEmail,
          {
            color: Colors[colorScheme].tabIconDefault,
          },
        ]}
      >
        margotrobbie@gmail.com
      </Text>

      <View style={styles.userFacts}>
        <UserFact text="shelf" number={95} />
        <UserFact text="reads" number={35} />
        <UserFact text="exchange" number={5} />
      </View>

      <RandomQuote />
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
  userFacts: {
    marginTop: 40,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  userFact: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DCDCDC",
    width: "20%",
    paddingVertical: 10,
    borderRadius: 5,
  },
  factNumber: {
    fontWeight: "500",
    fontSize: 25,
  },
  factText: {
    fontWeight: "400",
    fontSize: 13,
    textTransform: "capitalize",
    marginTop: 5,
  },
});
