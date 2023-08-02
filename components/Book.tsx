import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import UIButton from "./UIButton";

const Book = (props) => {
  const { title, imageUrl, overview, author } = props;
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: imageUrl,
        }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.bookInfo}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.author}>{author || "not available"}</Text>

        <Text style={styles.overview} numberOfLines={3}>
          {overview || "not available"}
        </Text>

        <UIButton text="add to shelf" />
      </View>
    </View>
  );
};

export default Book;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    padding: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#222222",
    width: "95%",
    alignSelf: "center",
    shadowColor: "#e0218a",
    shadowOffset: {
      height: 5,
      width: 5,
    },
    elevation: 3,
  },
  image: {
    width: 110,
    height: 165,
    borderRadius: 3,
  },
  bookInfo: {
    flex: 1,
    marginLeft: 20,
    paddingRight: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: "#e0218a",
  },
  author: {
    fontSize: 13,
    fontWeight: "500",
    color: "#fff",
    marginTop: 5,
  },
  overview: {
    fontSize: 12,
    fontWeight: "300",
    color: "#fff",
    marginTop: 15,
  },
});
