import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import Blurhash from "@/constants/Blurhash";
import { Entypo } from "@expo/vector-icons";
import BarbieText from "@/components/BarbieText";
import RandomQuote from "@/components/RandomQuote";

const UserFact = (props) => {
  const { number, text } = props;
  return (
    <View style={styles.userFact}>
      <Text style={styles.factNumber}>{number}</Text>
      <Text style={styles.factText}>{text}</Text>
    </View>
  );
};

const User = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.avatar}
        source="https://images.thedirect.com/media/article_full/margot-robbie-barbie_M4G96Rv.jpg?imgeng=cmpr_75/"
        placeholder={Blurhash}
        contentFit="cover"
        transition={1000}
      />

      <BarbieText
        style={{
          fontSize: 30,
          color: "#e0218a",
          marginTop: 10,
          textTransform: "capitalize",
        }}
      >
        margot robbie
      </BarbieText>

      <Text style={styles.userEmail}>margotrobbie@gmail.com</Text>

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
    backgroundColor: "#fff",
    paddingTop: 40,
    alignItems: "center",
  },
  avatar: {
    width: 75,
    aspectRatio: 1,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#e0218a",
    marginTop: 20,
  },
  userEmail: {
    fontSize: 14,
    color: "#333333",
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
    color: "#000",
  },
  factText: {
    fontWeight: "400",
    fontSize: 13,
    color: "#000",
    textTransform: "capitalize",
    marginTop: 5,
  },
});
