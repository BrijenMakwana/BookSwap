import {
  Pressable,
  StyleSheet,
  ToastAndroid,
  useColorScheme,
  ColorSchemeName,
  Linking,
} from "react-native";
import { useEffect, useState } from "react";
import Book from "./Book";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const RequestBtn = (props) => {
  const colorScheme: ColorSchemeName = useColorScheme();

  const { onPress } = props;

  return (
    <Pressable
      style={[
        styles.requestBtn,
        {
          backgroundColor: Colors[colorScheme].barbie,
        },
      ]}
      onPress={onPress}
      android_ripple={{
        color: Colors[colorScheme].background,
      }}
    >
      <Entypo name="forward" size={20} color={Colors[colorScheme].background} />
    </Pressable>
  );
};

const RequestBook = (props) => {
  const colorScheme: ColorSchemeName = useColorScheme();

  const [book, setBook] = useState({});

  const { bookID } = props;

  const getBook = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${bookID}?key=${process.env.EXPO_PUBLIC_API_KEY}`
      );
      setBook(response.data);
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };

  const sendEmailRequest = () => {
    const subject = "Your subject here";
    const senderEmail = "your@email.com";
    const emailBody = "Your email body text here";

    const emailUrl = `mailto:${encodeURIComponent(
      senderEmail
    )}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      emailBody
    )}`;

    Linking.canOpenURL(emailUrl)
      .then((supported) => {
        if (!supported) {
          console.log("Email app is not supported on this device");
        } else {
          return Linking.openURL(emailUrl);
        }
      })
      .catch((error) => console.error("Error opening email app:", error));
  };

  useEffect(() => {
    getBook();
  }, []);

  return (
    <>
      <Book
        id={book.id}
        imageUrl={book?.volumeInfo?.imageLinks?.thumbnail}
        title={book?.volumeInfo?.title}
        author={book?.volumeInfo?.authors[0] || "NA"}
        rating={book?.volumeInfo?.averageRating}
        publishedDate={book.volumeInfo?.publishedDate}
        pageCount={book.volumeInfo?.pageCount}
      />
      <RequestBtn onPress={sendEmailRequest} />
    </>
  );
};

export default RequestBook;

const styles = StyleSheet.create({
  requestBtn: {
    position: "absolute",
    top: 15,
    left: 15,
    padding: 10,
    borderRadius: 5,
  },
});
