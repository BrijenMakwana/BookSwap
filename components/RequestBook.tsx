import {
  Pressable,
  StyleSheet,
  ToastAndroid,
  useColorScheme,
  ColorSchemeName,
  Linking,
  View,
  Text,
} from "react-native";
import { useEffect, useState } from "react";
import Book from "./Book";
import axios from "axios";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { supabase } from "@/supabase/supabase";

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
      <Text
        style={[
          styles.requestBtnText,
          {
            color: Colors[colorScheme].background,
          },
        ]}
      >
        request this book
      </Text>
      <Entypo name="forward" size={20} color={Colors[colorScheme].background} />
    </Pressable>
  );
};

const RequestBook = (props) => {
  const colorScheme: ColorSchemeName = useColorScheme();

  const [book, setBook] = useState({});

  const { bookID, recipientName, recipientEmail } = props;

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

  const sendEmailRequest = async () => {
    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        throw new Error(sessionError.message);
      }

      const senderName = session?.user.user_metadata.full_name;

      const subject = `Request from the BookSwap - ${book?.volumeInfo?.title}`;
      const senderEmail = recipientEmail;
      const emailBody = `
        Hello ${recipientName},
  
        I hope this message finds you well. I came across your listing for the book "${book?.volumeInfo?.title}" on the BookSwap App, 
        and I'm quite interested in reading it. I was wondering if you'd be open to exchanging the book with me.
  
        If you're open to the idea, I would greatly appreciate the opportunity to borrow the book from you.
        I promise to take good care of it and return it in the same condition. Please let me know if this arrangement works for you.
  
        Thank you for considering my request. I look forward to hearing from you.
  
        Best regards,
        ${senderName}
      `;

      const emailUrl = `mailto:${encodeURIComponent(
        senderEmail
      )}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        emailBody
      )}`;

      const supported = await Linking.canOpenURL(emailUrl);

      if (!supported) {
        throw new Error("Email app is not supported on this device");
      }

      await Linking.openURL(emailUrl);
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome5
          name="user-alt"
          size={20}
          color={Colors[colorScheme].barbie}
        />
        <Text
          style={[
            styles.recipientName,
            {
              color: Colors[colorScheme].text,
            },
          ]}
        >
          {recipientName}
        </Text>
      </View>

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
    </View>
  );
};

export default RequestBook;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  header: {
    marginLeft: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  recipientName: {
    fontSize: 15,
    fontWeight: "500",
    marginLeft: 10,
    textTransform: "capitalize",
  },
  requestBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    position: "absolute",
    bottom: 20,
    right: 75,
  },
  requestBtnText: {
    fontSize: 13,
    textTransform: "capitalize",
    marginRight: 10,
  },
});
