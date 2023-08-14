import { StyleSheet, ToastAndroid } from "react-native";
import { BottomSheet, ListItem } from "@rneui/themed";
import { supabase } from "@/supabase/supabase";

export enum BOOK_SHELVES {
  Read = 1,
  WantToRead = 2,
  CurrentlyReading = 3,
}

const BookshelvesBottomSheet = (props) => {
  const { isVisible, setIsVisible, bookID } = props;

  const addBookToShelf = async (bookShelfID: number, bookId: string) => {
    const bookObj = {
      email: "brijenma@gmail.com",
      bookShelfID: bookShelfID,
      bookID: bookId,
    };

    try {
      await supabase.from("Books").insert(bookObj);
      ToastAndroid.show("Book added successfully!", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    } finally {
      setIsVisible(false);
    }
  };

  const bookshelves = [
    { title: "Read", onPress: () => addBookToShelf(BOOK_SHELVES.Read, bookID) },
    {
      title: "Currently Reding",
      onPress: () => addBookToShelf(BOOK_SHELVES.CurrentlyReading, bookID),
    },
    {
      title: "Want to Read",
      onPress: () => addBookToShelf(BOOK_SHELVES.WantToRead, bookID),
    },
    {
      title: "Cancel",
      containerStyle: { backgroundColor: "red" },
      titleStyle: { color: "white" },
      onPress: () => setIsVisible(false),
    },
  ];

  return (
    <BottomSheet
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)}
    >
      {bookshelves.map((shelf, index) => (
        <ListItem
          key={index}
          containerStyle={shelf.containerStyle}
          onPress={shelf.onPress}
        >
          <ListItem.Content>
            <ListItem.Title style={shelf.titleStyle}>
              {shelf.title}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
    </BottomSheet>
  );
};

export default BookshelvesBottomSheet;

const styles = StyleSheet.create({});
