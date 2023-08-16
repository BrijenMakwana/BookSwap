import { Pressable, StyleSheet, Text, ToastAndroid } from "react-native";
import { BottomSheet } from "@rneui/themed";
import { supabase } from "@/supabase/supabase";
import { useColorScheme, ColorSchemeName } from "react-native";
import Colors from "@/constants/Colors";

export enum BOOK_SHELVES {
  Read = 1,
  WantToRead = 2,
  CurrentlyReading = 3,
}

const BookshelvesBottomSheet = (props) => {
  const colorScheme: ColorSchemeName = useColorScheme();

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
    {
      title: "Read",
      onPress: () => addBookToShelf(BOOK_SHELVES.Read, bookID),
    },
    {
      title: "Currently Reading",
      onPress: () => addBookToShelf(BOOK_SHELVES.CurrentlyReading, bookID),
    },
    {
      title: "Want to Read",
      onPress: () => addBookToShelf(BOOK_SHELVES.WantToRead, bookID),
    },
    {
      title: "Cancel",
      onPress: () => setIsVisible(false),
    },
  ];

  return (
    <BottomSheet
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)}
    >
      {bookshelves.map((shelf, index) => (
        <Pressable
          key={index}
          style={[
            styles.btnContainer,
            {
              backgroundColor: Colors[colorScheme].background,
            },
          ]}
          android_ripple={{
            color: Colors[colorScheme].barbie,
          }}
          onPress={shelf.onPress}
        >
          <Text
            style={[
              styles.btnText,
              {
                color:
                  shelf.title === "Cancel"
                    ? Colors[colorScheme].barbie
                    : Colors[colorScheme].text,
              },
            ]}
          >
            {shelf.title}
          </Text>
        </Pressable>
      ))}
    </BottomSheet>
  );
};

export default BookshelvesBottomSheet;

const styles = StyleSheet.create({
  btnContainer: {
    padding: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontSize: 16,
  },
});
