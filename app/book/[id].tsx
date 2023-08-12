import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Pressable,
  useColorScheme,
  ColorSchemeName,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import axios from "axios";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import moment from "moment";
import { Image } from "expo-image";
import Blurhash from "@/constants/Blurhash";
import BarbieText from "@/components/BarbieText";
import Colors from "@/constants/Colors";

const GoBack = () => {
  const colorScheme: ColorSchemeName = useColorScheme();

  const navigation = useNavigation();

  return (
    <Pressable
      style={[
        styles.backBtn,
        {
          backgroundColor: Colors[colorScheme].background,
        },
      ]}
      onPress={() => navigation.goBack()}
    >
      <Ionicons
        name="arrow-back"
        size={25}
        color={Colors[colorScheme].barbie}
      />
    </Pressable>
  );
};

const Authors = (props) => {
  const { authorName, index, authorCount } = props;

  return index < authorCount - 1 ? `${authorName}, ` : `${authorName}`;
};

const BookRating = (props) => {
  const colorScheme: ColorSchemeName = useColorScheme();

  const { rating } = props;

  if (!rating) return;

  return (
    <View style={styles.ratingContainer}>
      <Fontisto name="star" size={17} color={Colors[colorScheme].barbie} />
      <Text
        style={[
          styles.rating,
          {
            color: Colors[colorScheme].text,
          },
        ]}
      >
        {rating || "NA"}
      </Text>
    </View>
  );
};

const BookPublishedDate = (props) => {
  const colorScheme: ColorSchemeName = useColorScheme();

  const { date } = props;

  if (!date) return;

  return (
    <View style={styles.dateContainer}>
      <Fontisto name="date" size={17} color={Colors[colorScheme].barbie} />
      <Text
        style={[
          styles.date,
          {
            color: Colors[colorScheme].text,
          },
        ]}
      >
        {moment(date).format("ll")}
      </Text>
    </View>
  );
};

const Overview = (props) => {
  const colorScheme: ColorSchemeName = useColorScheme();

  const { overview } = props;

  if (!overview) return;

  const cleanOverview = overview.replace(/<[^>]*>/g, "");

  return (
    <View style={styles.overviewContainer}>
      <Text
        style={[
          styles.overviewHeading,
          {
            color: Colors[colorScheme].text,
          },
        ]}
      >
        overview
      </Text>
      <Text
        style={[
          styles.description,
          {
            color: Colors[colorScheme].text,
          },
        ]}
      >
        {cleanOverview}
      </Text>
    </View>
  );
};

const Book = () => {
  const colorScheme: ColorSchemeName = useColorScheme();

  const params = useLocalSearchParams();
  const [book, setBook] = useState({});

  const getBook = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${params.id}?key=${process.env.EXPO_PUBLIC_API_KEY}`
      );
      setBook(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: Colors[colorScheme].background,
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        source={require("../../assets/images/barbie.jpeg")}
        resizeMode="cover"
        style={styles.imageContainer}
        blurRadius={8}
      >
        <GoBack />

        {book.volumeInfo?.imageLinks?.large && (
          <Image
            style={styles.image}
            source={
              book.volumeInfo?.imageLinks?.large ||
              book.volumeInfo?.imageLinks?.medium
            }
            placeholder={Blurhash}
            contentFit="contain"
            transition={1000}
          />
        )}

        <View
          style={[
            styles.pageCountContainer,
            {
              backgroundColor: Colors[colorScheme].ken,
            },
          ]}
        >
          <Text
            style={[
              styles.pageCount,
              {
                color: Colors[colorScheme].background,
              },
            ]}
          >
            {book.volumeInfo?.pageCount}
          </Text>
          <Text
            style={[
              styles.page,
              {
                color: Colors[colorScheme].text,
              },
            ]}
          >
            pages
          </Text>
        </View>
      </ImageBackground>

      <View style={styles.bookInfo}>
        <BarbieText
          style={{
            color: Colors[colorScheme].barbie,
            fontSize: 35,
            fontWeight: "500",
          }}
        >
          {book.volumeInfo?.title}
        </BarbieText>

        <BarbieText
          style={{
            color: Colors[colorScheme].text,
            fontSize: 17,
            fontWeight: "300",
          }}
        >
          {book.volumeInfo?.authors.map((authorName: string, index: number) => (
            <Authors
              authorName={authorName}
              index={index}
              authorCount={book.volumeInfo?.authors.length}
              key={index}
            />
          ))}
        </BarbieText>

        {book.volumeInfo?.publisher && (
          <Text
            style={[
              styles.publisher,
              {
                color: Colors[colorScheme].text,
              },
            ]}
          >
            Published By {book.volumeInfo?.publisher}
          </Text>
        )}

        <View style={styles.bookStats}>
          <BookRating rating={book.volumeInfo?.averageRating} />

          <BookPublishedDate date={book.volumeInfo?.publishedDate} />
        </View>

        <Overview overview={book?.volumeInfo?.description} />
      </View>
    </ScrollView>
  );
};

export default Book;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: "100%",
    height: 400,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "45%",
    aspectRatio: 1 / 1.5,
  },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    padding: 5,
    borderRadius: 50,
  },
  bookInfo: {
    width: "100%",
    padding: 20,
    marginTop: 15,
  },
  title: {
    fontSize: 35,
    fontWeight: "500",
  },
  author: {
    fontSize: 17,
    fontWeight: "300",
  },
  pageCountContainer: {
    width: 60,
    height: 60,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: -30,
    right: 30,
  },
  pageCount: {
    fontSize: 14,
    fontWeight: "500",
  },
  page: {
    fontSize: 10,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  publisher: {
    fontSize: 13,
    fontWeight: "400",
    marginTop: 5,
  },
  bookStats: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 20,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 10,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 10,
  },
  overviewContainer: {
    marginTop: 20,
  },
  overviewHeading: {
    fontSize: 15,
    textTransform: "capitalize",
    fontWeight: "500",
  },
  description: {
    marginTop: 10,
    fontSize: 13,
  },
});
