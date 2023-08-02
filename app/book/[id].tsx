import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

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
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: book.volumeInfo?.imageLinks?.large,
          }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.bookInfo}>
        <View style={styles.bookDetails}>
          <View style={styles.bookTitleInfo}>
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
              by {book.volumeInfo?.authors[0]}
            </Text>
          </View>

          <View style={styles.pageCountContainer}>
            <Text style={styles.pageCount}>{book.volumeInfo?.pageCount}</Text>
            <Text style={styles.page}>pages</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Book;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222222",
    paddingTop: 50,
  },
  imageContainer: {},
  image: {
    width: "70%",
    aspectRatio: 1 / 1.5,
    borderRadius: 5,
  },
  bookInfo: {
    marginTop: 10,
    width: "100%",
    padding: 15,
  },
  bookDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bookTitleInfo: {
    flex: 1,
    paddingRight: 20,
  },
  title: {
    color: "#e0218a",
    fontSize: 35,
    fontWeight: "500",
  },
  author: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "300",
    marginTop: 5,
  },
  pageCountContainer: {
    backgroundColor: "#e0218a",
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  pageCount: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
  },
  page: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    textTransform: "capitalize",
  },
});
