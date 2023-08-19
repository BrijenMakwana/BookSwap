import { StyleSheet, ToastAndroid } from "react-native";
import { useEffect, useState } from "react";
import Book from "./Book";
import axios from "axios";

const RequestBook = (props) => {
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

export default RequestBook;

const styles = StyleSheet.create({});
