import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  RefreshControl,
} from "react-native";
import SearchBar from "@/components/SearchBar";
import { useState, useEffect } from "react";
import axios from "axios";
import Book from "@/components/Book";
import { FlashList } from "@shopify/flash-list";

export default function TabOneScreen() {
  const [searchedBook, setSearchedBook] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const [books, setBooks] = useState([]);

  const searchBooks = async () => {
    setIsSearching(true);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchedBook}&key=${process.env.EXPO_PUBLIC_API_KEY}`
      );
      setBooks(response.data.items);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSearching(false);
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

      <FlashList
        data={books}
        renderItem={({ item }) => (
          <Book
            id={item.id}
            imageUrl={item?.volumeInfo?.imageLinks?.smallThumbnail}
            title={item?.volumeInfo?.title}
            overview={item?.searchInfo?.textSnippet}
            author={item?.volumeInfo?.authors[0] || "NA"}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={20}
        refreshControl={
          <RefreshControl
            refreshing={isSearching}
            colors={["#e0218a"]}
            progressBackgroundColor="#fff"
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
