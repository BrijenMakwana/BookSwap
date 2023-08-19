import { Pressable, StyleSheet, Text, ToastAndroid } from "react-native";
import { BottomSheet } from "@rneui/themed";
import { supabase } from "@/supabase/supabase";
import { useColorScheme, ColorSchemeName } from "react-native";
import Colors from "@/constants/Colors";
import useUserID from "@/hooks/useUserID";

export enum BOOK_SHELVES {
  Read = 1,
  WantToRead = 2,
  CurrentlyReading = 3,
}

const BookshelvesBottomSheet = (props) => {
  const colorScheme: ColorSchemeName = useColorScheme();

  const { userID, sessionError } = useUserID();

  const { isVisible, setIsVisible, bookID, bookshelfType } = props;

  const addBookToShelf = async (bookShelfID: number) => {
    try {
      if (sessionError) {
        throw new Error(sessionError.message);
      }

      const bookObj = {
        userID: userID,
        bookShelfID: bookShelfID,
        bookID: bookID,
      };

      const { error } = await supabase.from("Books").insert(bookObj);

      if (error) {
        throw new Error(error.message);
      }

      ToastAndroid.show("Book added successfully!", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    } finally {
      setIsVisible(false);
    }
  };

  const updateBookshelf = async (bookShelfID: number) => {
    try {
      if (sessionError) {
        throw new Error(sessionError.message);
      }

      const { error } = await supabase
        .from("Books")
        .update({ bookShelfID: bookShelfID })
        .eq("userID", userID)
        .eq("bookID", bookID);

      if (error) {
        throw new Error(error.message);
      }

      ToastAndroid.show("Book updated successfully!", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    } finally {
      setIsVisible(false);
    }
  };

  const addOrUpdateBook = (bookshelfID: number) => {
    bookshelfType ? updateBookshelf(bookshelfID) : addBookToShelf(bookshelfID);
  };

  const bookshelves = [
    {
      title: "Read",
      onPress: () => addOrUpdateBook(BOOK_SHELVES.Read),
    },
    {
      title: "Currently Reading",
      onPress: () => addOrUpdateBook(BOOK_SHELVES.CurrentlyReading),
    },
    {
      title: "Want to Read",
      onPress: () => addOrUpdateBook(BOOK_SHELVES.WantToRead),
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
