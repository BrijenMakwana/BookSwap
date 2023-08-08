import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import Blurhash from "@/constants/Blurhash";
import { Entypo } from "@expo/vector-icons";
import BarbieText from "@/components/BarbieText";
import RandomQuote from "@/components/RandomQuote";

const UserFact = (props) => {
  const { icon, text } = props;
  return (
    <View style={styles.userFact}>
      <Entypo name={icon} size={23} color="#333333" />
      <Text style={styles.statText}>{text}</Text>
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
        <UserFact icon="book" text="95 books on the shelf" />
        <UserFact icon="open-book" text="35 books read" />
        <UserFact icon="hand" text="5 books exchange" />
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
    marginTop: 20,
    width: "100%",
    padding: 15,
    alignItems: "center",
  },
  userFact: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
    marginTop: 10,
    backgroundColor: "#0AF6EE",
    paddingVertical: 5,
    borderRadius: 20,
  },
  statText: {
    marginLeft: 15,
    textTransform: "capitalize",
    fontWeight: "500",
    fontSize: 13,
    color: "#333333",
    width: "60%",
  },
});
