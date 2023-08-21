import {
  StyleSheet,
  Text,
  View,
  Pressable,
  useColorScheme,
  ColorSchemeName,
  Image,
} from "react-native";
import React, { FC } from "react";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import Colors from "@/constants/Colors";
import { IBook } from "@/types/book/book";
import { IBookRating } from "@/types/book/bookRating";

const BookRating: FC<IBookRating> = (props) => {
  const colorScheme: ColorSchemeName = useColorScheme();

  const { rating } = props;

  if (!rating) return;

  const roundedRating: number = Math.round(rating * 2) / 2;
  const filledStars: number = Math.floor(roundedRating);
  const hasHalfStar: boolean = roundedRating - filledStars === 0.5;

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

const Book: FC<IBook> = (props) => {
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
          source={{
            uri:
              imageUrl ||
              "https://images.unsplash.com/photo-1564564699685-b1c926c82d16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
          }}
          resizeMode="cover"
          fadeDuration={1000}
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
            by {author}
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
    height: 150,
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
});
