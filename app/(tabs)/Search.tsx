import {
  SafeAreaView,
  StyleSheet,
  RefreshControl,
  useColorScheme,
  ColorSchemeName,
  ToastAndroid,
} from "react-native";
import SearchBar from "@/components/SearchBar";
import { useState, useEffect } from "react";
import axios from "axios";
import Book from "@/components/Book";
import { FlashList } from "@shopify/flash-list";
import Divider from "@/components/Divider";
import BarcodeScanner from "@/components/BarcodeScanner";
import Colors from "@/constants/Colors";
import * as Device from "expo-device";

const Search = () => {
  const colorScheme: ColorSchemeName = useColorScheme();

  const [searchedBook, setSearchedBook] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [scannerIsVisible, setScannerIsVisible] = useState<boolean>(false);

  const [books, setBooks] = useState([]);

  const searchBooks = async () => {
    setIsSearching(true);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchedBook}&key=${process.env.EXPO_PUBLIC_API_KEY}`
      );

      setBooks(response.data.items);
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    } finally {
      setIsSearching(false);
    }
  };

  const openBarcodeScanner = () => {
    setScannerIsVisible(true);
  };

  const closeBarcodeScanner = () => {
    setScannerIsVisible(false);
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
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: Colors[colorScheme].background,
        },
      ]}
    >
      {scannerIsVisible ? (
        <BarcodeScanner
          closeBarcodeScanner={closeBarcodeScanner}
          setSearchedBook={setSearchedBook}
          searchedBook={searchedBook}
        />
      ) : (
        <>
          <SearchBar
            searchedBook={searchedBook}
            setSearchedBook={setSearchedBook}
            openBarcodeScanner={openBarcodeScanner}
          />
          <FlashList
            data={books}
            numColumns={Device.deviceType === 2 ? 2 : 1}
            renderItem={({ item }) => (
              <Book
                id={item?.id}
                imageUrl={item?.volumeInfo?.imageLinks?.thumbnail}
                title={item?.volumeInfo?.title}
                author={item?.volumeInfo?.authors?.[0] || "Unknown Author"}
                rating={item?.volumeInfo?.averageRating}
                publishedDate={item?.volumeInfo?.publishedDate}
                pageCount={item?.volumeInfo?.pageCount}
              />
            )}
            showsVerticalScrollIndicator={false}
            estimatedItemSize={20}
            refreshControl={
              <RefreshControl
                refreshing={isSearching}
                colors={[Colors[colorScheme].barbie]}
                progressBackgroundColor={Colors[colorScheme].background}
                onRefresh={() => searchBooks()}
              />
            }
            ItemSeparatorComponent={() => <Divider />}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
