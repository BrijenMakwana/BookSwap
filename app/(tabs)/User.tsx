import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import Blurhash from "@/constants/Blurhash";

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

      <Text style={styles.userName}>margot robbie</Text>

      <Text style={styles.userEmail}>margotrobbie@gmail.com</Text>
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
  userName: {
    fontSize: 18,
    color: "#e0218a",
    fontWeight: "700",
    marginTop: 10,
    textTransform: "capitalize",
  },
  userEmail: {
    fontSize: 14,
    color: "#333333",
    fontWeight: "400",
    marginTop: 5,
  },
});
