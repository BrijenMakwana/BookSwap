import { StyleSheet, Text, View } from "react-native";
import React from "react";
import UIButton from "./UIButton";
import { Link } from "expo-router";
import { Image } from "expo-image";
import Blurhash from "@/constants/Blurhash";

const Book = (props) => {
  const { id, title, imageUrl, overview, author } = props;
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={imageUrl}
        placeholder={Blurhash}
        contentFit="contain"
        transition={1000}
      />

      <View style={styles.bookInfo}>
        <Link href={`/book/${id}`}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </Link>

        <Text style={styles.author}>{author || "not available"}</Text>

        <Text style={styles.overview} numberOfLines={3}>
          {overview || "not available"}
        </Text>

        <View style={styles.btnContainer}>
          <UIButton text="Read" theme="barbie" />
          <UIButton text="Want to Read" theme="ken" />
        </View>
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
    backgroundColor: "#fff",
    width: "95%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      height: 5,
      width: 5,
    },
    elevation: 3,
    shadowOpacity: 0.8,
    borderRadius: 10,
  },
  image: {
    width: 100,
    aspectRatio: 1 / 1.5,
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
    fontSize: 12,
    fontWeight: "500",
    color: "#000",
    marginTop: 5,
  },
  overview: {
    fontSize: 12,
    fontWeight: "300",
    color: "#000",
    marginTop: 15,
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
  },
});
