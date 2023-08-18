import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Pressable,
  useColorScheme,
  ColorSchemeName,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, Link, router } from "expo-router";
import axios from "axios";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import moment from "moment";
import { Image } from "expo-image";
import Blurhash from "@/constants/Blurhash";
import BarbieText from "@/components/BarbieText";
import Colors from "@/constants/Colors";
import * as Device from "expo-device";
import AddToBookshelvesButton from "@/components/AddToBookshelvesButton";
import BookshelvesBottomSheet from "@/components/BookshelvesBottomSheet";
import { supabase } from "@/supabase/supabase";
import useUserID from "@/hooks/useUserID";

export const GoBack = () => {
  const colorScheme: ColorSchemeName = useColorScheme();

  return (
    <Pressable
      style={[
        styles.backBtn,
        {
          backgroundColor: Colors[colorScheme].background,
        },
      ]}
      onPress={() => router.back()}
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

const PreviewBook = (props) => {
  const colorScheme: ColorSchemeName = useColorScheme();

  const { route } = props;

  if (!route) return;

  return (
    <Link href={`/bookViewer/${route}`} asChild>
      <Pressable style={styles.previewBtn}>
        <Text
          style={[
            styles.previewBtnText,
            {
              color: Colors[colorScheme].barbie,
            },
          ]}
        >
          preview this book
        </Text>
        <Fontisto
          name="arrow-right-l"
          size={24}
          color={Colors[colorScheme].barbie}
        />
      </Pressable>
    </Link>
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
  const [addToBookShelvesIsVisible, setAddToBookShelvesIsVisible] =
    useState(false);
  const [bookIsPresent, setBookIsPresent] = useState(false);

  const { userID, sessionError } = useUserID();

  const bookIsPresentInShelf = async () => {
    const { data } = await supabase
      .from("Books")
      .select()
      .eq("userID", userID)
      .eq("bookID", params.id);

    if (data && data?.length > 0) {
      setBookIsPresent(true);
    }
  };

  const getBook = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${params.id}?key=${process.env.EXPO_PUBLIC_API_KEY}`
      );
      setBook(response.data);
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    getBook();
    bookIsPresentInShelf();
  }, []);

  useEffect(() => {
    if (userID) {
      bookIsPresentInShelf();
    }
  }, [userID]);

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
            contentFit="fill"
            transition={1000}
          />
        )}

        <View
          style={[
            styles.pageCountContainer,
            {
              backgroundColor: Colors[colorScheme].ken,
              borderColor: Colors[colorScheme].background,
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

        <AddToBookshelvesButton
          onPress={() => setAddToBookShelvesIsVisible(true)}
          bookIsPresent={bookIsPresent}
        />

        <PreviewBook
          route={book.volumeInfo?.industryIdentifiers[1].identifier}
        />

        <Overview overview={book?.volumeInfo?.description} />
      </View>

      <BookshelvesBottomSheet
        isVisible={addToBookShelvesIsVisible}
        setIsVisible={setAddToBookShelvesIsVisible}
        bookID={book.id}
        bookIsPresent={bookIsPresent}
      />
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
    height: Device.deviceType === 2 ? 500 : 400,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: Device.deviceType === 2 ? "35%" : "45%",
    aspectRatio: 1 / 1.5,
  },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    padding: 5,
    borderRadius: 50,
    zIndex: 2,
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
    width: 65,
    height: 65,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: -30,
    right: 30,
    borderWidth: 4,
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
    fontSize: Device.deviceType === 2 ? 14 : 12,
    fontWeight: "500",
    marginLeft: 10,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    fontSize: Device.deviceType === 2 ? 14 : 12,
    fontWeight: "500",
    marginLeft: 10,
  },
  previewBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    alignSelf: "center",
  },
  previewBtnText: {
    fontSize: 13,
    fontWeight: "600",
    marginRight: 10,
    textTransform: "capitalize",
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
    fontSize: Device.deviceType === 2 ? 14 : 13,
  },
});
