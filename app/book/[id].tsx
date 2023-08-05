import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { Fontisto } from "@expo/vector-icons";
import moment from "moment";
import { Image } from "expo-image";
import Blurhash from "@/constants/Blurhash";

SplashScreen.preventAutoHideAsync();

const Authors = (props) => {
  const { authorName, index, authorCount } = props;

  return index < authorCount - 1 ? `${authorName}, ` : `${authorName}`;
};

const BookRating = (props) => {
  const { rating } = props;

  if (!rating) return;

  return (
    <View style={styles.ratingContainer}>
      <Fontisto name="star" size={17} color="#e0218a" />
      <Text style={styles.rating}>{rating || "NA"}</Text>
    </View>
  );
};

const BookPublishedDate = (props) => {
  const { date } = props;

  if (!date) return;

  return (
    <View style={styles.dateContainer}>
      <Fontisto name="date" size={17} color="#e0218a" />
      <Text style={styles.date}>{moment(date).format("ll")}</Text>
    </View>
  );
};

const Overview = (props) => {
  const { overview } = props;

  if (!overview) return;

  return (
    <View style={styles.overviewContainer}>
      <Text style={styles.overviewHeading}>overview</Text>
      <Text style={styles.description}>{overview}</Text>
    </View>
  );
};

const Book = () => {
  const params = useLocalSearchParams();
  const [book, setBook] = useState({});

  const [fontsLoaded] = useFonts({
    Lobster: require("../../assets/fonts/Lobster-Regular.ttf"),
  });

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

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={require("../../assets/images/barbie.jpeg")}
        resizeMode="cover"
        style={styles.imageContainer}
        blurRadius={8}
      >
        {book.volumeInfo?.imageLinks?.large && (
          <Image
            style={styles.image}
            source={book.volumeInfo?.imageLinks?.large}
            placeholder={Blurhash}
            contentFit="contain"
            transition={1000}
          />
        )}

        <View style={styles.pageCountContainer}>
          <Text style={styles.pageCount}>{book.volumeInfo?.pageCount}</Text>
          <Text style={styles.page}>pages</Text>
        </View>
      </ImageBackground>

      <View style={styles.bookInfo}>
        <Text
          style={[
            styles.title,
            {
              fontFamily: "Lobster",
            },
          ]}
          numberOfLines={2}
        >
          {book.volumeInfo?.title}
        </Text>

        <Text
          style={[
            styles.author,
            {
              fontFamily: "Lobster",
            },
          ]}
        >
          {book.volumeInfo?.authors.map((authorName: string, index: number) => (
            <Authors
              authorName={authorName}
              index={index}
              authorCount={book.volumeInfo?.authors.length}
              key={index}
            />
          ))}
        </Text>

        {book.volumeInfo?.publisher && (
          <Text style={styles.publisher}>
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
    backgroundColor: "#fff",
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
    borderRadius: 5,
  },
  bookInfo: {
    width: "100%",
    padding: 20,
    marginTop: 15,
  },
  title: {
    color: "#e0218a",
    fontSize: 35,
    fontWeight: "500",
  },
  author: {
    color: "#555555",
    fontSize: 17,
    fontWeight: "300",
  },
  pageCountContainer: {
    backgroundColor: "#0AF6EE",
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
    color: "#fff",
  },
  page: {
    fontSize: 10,
    fontWeight: "700",
    color: "#000",
    textTransform: "capitalize",
  },
  publisher: {
    color: "#808080",
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
    color: "#696969",
  },
  description: {
    marginTop: 10,
    fontSize: 13,
    color: "#808080",
  },
});
