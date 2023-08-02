import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import SearchBar from "@/components/SearchBar";
import { useState, useEffect } from "react";
import axios from "axios";
import Book from "@/components/Book";

export default function TabOneScreen() {
  const [searchedBook, setSearchedBook] = useState<string>("");
  const [books, setBooks] = useState([]);

  const searchBooks = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchedBook}&key=${process.env.EXPO_PUBLIC_API_KEY}`
      );
      setBooks(response.data.items);
      console.log(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!searchedBook) {
      setBooks([]);
      return;
    }

    const searchBooksTimeOut = setTimeout(() => {
      searchBooks();
    }, 1500);

    return () => clearTimeout(searchBooksTimeOut);
  }, [searchedBook]);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        searchedBook={searchedBook}
        setSearchedBook={setSearchedBook}
      />

      <FlatList
        data={books}
        renderItem={({ item }) => (
          <Book
            imageUrl={item?.volumeInfo?.imageLinks?.thumbnail}
            title={item?.volumeInfo?.title}
            overview={item?.searchInfo?.textSnippet}
            author={item?.volumeInfo?.authors[0] || undefined}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.books}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
    paddingTop: 50,
  },
  books: {
    marginTop: 20,
  },
});
