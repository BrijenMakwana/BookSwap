import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { Fontisto } from "@expo/vector-icons";

SplashScreen.preventAutoHideAsync();

const BookRating = (props) => {
  const { rating } = props;
  return (
    <View style={styles.ratingContainer}>
      <Fontisto name="star" size={14} color="#e0218a" />
      <Text style={styles.rating}>{rating || "NA"}</Text>
    </View>
  );
};

const BookGenre = (props) => {
  const { genre } = props;
  return (
    <View style={styles.genreContainer}>
      <Text style={styles.genre}>{genre}</Text>
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
        source={{
          uri: "https://img.freepik.com/free-vector/gradient-pastel-sky-background_23-2148917405.jpg?w=1380&t=st=1691038873~exp=1691039473~hmac=0ad7df3075775131e210a52fdb8b2d4f2a430f3302306a10218bc16afeb773c2",
        }}
        resizeMode="cover"
        style={styles.imageContainer}
        blurRadius={10}
      >
        <Image
          source={{
            uri: book.volumeInfo?.imageLinks?.large,
          }}
          style={styles.image}
          resizeMode="contain"
        />

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
          {book.volumeInfo?.authors.map((authorName: string) => {
            return `${authorName}, `;
          })}
        </Text>

        <BookRating rating={book.volumeInfo?.averageRating} />

        {/* <View style={styles.genres}>
          {book.volumeInfo?.categories?.map((item, index) => (
            <BookGenre genre={item} key={index} />
          ))}
        </View> */}

        <View style={styles.overviewContainer}>
          <Text style={styles.overviewHeading}>overview</Text>
          <Text style={styles.description}>
            {book?.volumeInfo?.description}
          </Text>
        </View>
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
    paddingVertical: 65,
    alignItems: "center",
  },
  image: {
    width: "45%",
    aspectRatio: 1 / 1.5,
    borderRadius: 5,
  },
  bookInfo: {
    width: "100%",
    padding: 25,
    marginTop: 10,
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
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#ededed",
    width: 65,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 15,
  },
  rating: {
    fontSize: 12,
    fontWeight: "500",
  },
  genres: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  genreContainer: {
    backgroundColor: "#0AF6EE",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 5,
    marginLeft: 5,
  },
  genre: {
    fontSize: 12,
  },
  overviewContainer: {
    marginTop: 15,
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
