import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import UIButton from "./UIButton";
import { Link } from "expo-router";
import { Image } from "expo-image";
import Blurhash from "@/constants/Blurhash";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";

const BookRating = (props) => {
  const { rating } = props;

  if (!rating) return;

  return (
    <View style={styles.ratingContainer}>
      {[1, 2, 3, 4, 5].map((star: number, index: number) =>
        star <= rating ? (
          <FontAwesome name="star" size={16} color="#e0218a" key={index} />
        ) : (
          <FontAwesome name="star-o" size={16} color="#e0218a" key={index} />
        )
      )}
    </View>
  );
};

const Book = (props) => {
  const {
    id,
    title,
    imageUrl,
    author,
    rating,
    publishedDate,
    pageCount,
    allowActionBtns = true,
  } = props;
  return (
    <Link href={`/book/${id}`} asChild>
      <Pressable
        style={styles.container}
        android_ripple={{
          color: "#e0218a",
        }}
      >
        <Image
          style={styles.image}
          source={imageUrl}
          placeholder={Blurhash}
          contentFit="fill"
          transition={1000}
        />

        <View style={styles.bookInfo}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>

          <Text style={styles.author}>by {author || "NA"}</Text>

          <BookRating rating={rating} />

          {publishedDate && (
            <Text style={styles.date}>
              published on {moment(publishedDate).format("ll")}
            </Text>
          )}

          <Text style={styles.pageCount}>{pageCount} pages</Text>

          {allowActionBtns && (
            <View style={styles.btnContainer}>
              <UIButton text="Read" theme="barbie" />
              <UIButton text="Want to Read" theme="ken" />
            </View>
          )}
        </View>
      </Pressable>
    </Link>
  );
};

export default Book;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
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
    textTransform: "capitalize",
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    marginTop: 7,
    alignItems: "center",
  },
  date: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "500",
    textTransform: "capitalize",
    color: "#333333",
  },
  pageCount: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "400",
    textTransform: "capitalize",
    color: "#333333",
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "auto",
  },
});
