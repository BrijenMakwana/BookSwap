import { StyleSheet, useColorScheme, ColorSchemeName } from "react-native";
import React, { useEffect, useState } from "react";
import Book from "./Book";
import axios from "axios";
import { ListItem, Button } from "@rneui/themed";
import Colors from "@/constants/Colors";

const BookShelfBook = (props) => {
  const colorScheme: ColorSchemeName = useColorScheme();

  const [book, setBook] = useState({});

  const { bookID, removeBookFromShelf } = props;

  const getBook = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${bookID}?key=${process.env.EXPO_PUBLIC_API_KEY}`
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
    <ListItem.Swipeable
      rightContent={
        <Button
          title="Delete"
          onPress={() => removeBookFromShelf(bookID)}
          icon={{ name: "delete", color: Colors[colorScheme].background }}
          buttonStyle={{
            minHeight: "100%",
            backgroundColor: Colors[colorScheme].barbie,
          }}
          titleStyle={{
            color: Colors[colorScheme].background,
          }}
        />
      }
      containerStyle={{
        padding: 0,
      }}
    >
      <Book
        id={book.id}
        imageUrl={book?.volumeInfo?.imageLinks?.thumbnail}
        title={book?.volumeInfo?.title}
        author={book?.volumeInfo?.authors[0] || "NA"}
        rating={book?.volumeInfo?.averageRating}
        publishedDate={book.volumeInfo?.publishedDate}
        pageCount={book.volumeInfo?.pageCount}
      />
    </ListItem.Swipeable>
  );
};

export default BookShelfBook;

const styles = StyleSheet.create({});
