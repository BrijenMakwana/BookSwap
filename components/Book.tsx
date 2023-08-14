import {
  StyleSheet,
  Text,
  View,
  Pressable,
  useColorScheme,
  ColorSchemeName,
} from "react-native";
import React from "react";
import UIButton from "./AddToBookshelvesButton";
import { Link } from "expo-router";
import { Image } from "expo-image";
import Blurhash from "@/constants/Blurhash";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import Colors from "@/constants/Colors";

const BookRating = (props) => {
  const colorScheme: ColorSchemeName = useColorScheme();

  const { rating } = props;

  if (!rating) return;

  const roundedRating = Math.round(rating * 2) / 2;
  const filledStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating - filledStars === 0.5;

  return (
    <View style={styles.ratingContainer}>
      {[1, 2, 3, 4, 5].map((star: number, index: number) => {
        if (star <= filledStars) {
          return (
            <FontAwesome
              name="star"
              size={16}
              color={Colors[colorScheme].ken}
              key={index}
            />
          );
        } else if (hasHalfStar && star === filledStars + 1) {
          return (
            <FontAwesome
              name="star-half-o"
              size={16}
              color={Colors[colorScheme].ken}
              key={index}
            />
          );
        } else {
          return (
            <FontAwesome
              name="star-o"
              size={16}
              color={Colors[colorScheme].ken}
              key={index}
            />
          );
        }
      })}
    </View>
  );
};

const Book = (props) => {
  const colorScheme: ColorSchemeName = useColorScheme();

  const { id, title, imageUrl, author, rating, publishedDate, pageCount } =
    props;
  return (
    <Link
      href={`/book/${id}`}
      asChild
      style={{
        backgroundColor: Colors[colorScheme].background,
      }}
    >
      <Pressable
        style={styles.container}
        android_ripple={{
          color: Colors[colorScheme].barbie,
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
          <Text
            style={[
              styles.title,
              {
                color: Colors[colorScheme].barbie,
              },
            ]}
            numberOfLines={1}
          >
            {title}
          </Text>

          <Text
            style={[
              styles.author,
              {
                color: Colors[colorScheme].text,
              },
            ]}
          >
            by {author || "NA"}
          </Text>

          <BookRating rating={rating} />

          {publishedDate && (
            <Text
              style={[
                styles.date,
                {
                  color: Colors[colorScheme].text,
                },
              ]}
            >
              published on {moment(publishedDate).format("ll")}
            </Text>
          )}

          <Text
            style={[
              styles.pageCount,
              {
                color: Colors[colorScheme].text,
              },
            ]}
          >
            {pageCount} pages
          </Text>
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
    width: "100%",
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
    fontSize: 15,
    fontWeight: "700",
  },
  author: {
    fontSize: 12,
    fontWeight: "500",
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
  },
  pageCount: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "400",
    textTransform: "capitalize",
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "auto",
  },
});
