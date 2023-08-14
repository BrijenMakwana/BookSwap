import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Book from "./Book";
import axios from "axios";

const BookShelfBook = (props) => {
  const [book, setBook] = useState({});

  const { bookID } = props;

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
    <Book
      id={book.id}
      imageUrl={book?.volumeInfo?.imageLinks?.thumbnail}
      title={book?.volumeInfo?.title}
      author={book?.volumeInfo?.authors[0] || "NA"}
      rating={book?.volumeInfo?.averageRating}
      publishedDate={book.volumeInfo?.publishedDate}
      pageCount={book.volumeInfo?.pageCount}
    />
  );
};

export default BookShelfBook;

const styles = StyleSheet.create({});
