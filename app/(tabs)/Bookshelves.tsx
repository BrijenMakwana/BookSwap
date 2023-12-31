import {
  View,
  StyleSheet,
  useColorScheme,
  ColorSchemeName,
  FlatList,
  ToastAndroid,
} from "react-native";
import { useEffect, useState } from "react";
import { SpeedDial } from "@rneui/themed";
import BarbieText from "@/components/BarbieText";
import { FontAwesome } from "@expo/vector-icons";
import Divider from "@/components/Divider";
import Colors from "@/constants/Colors";
import { supabase } from "@/supabase/supabase";
import BookShelfBook from "@/components/BookShelfBook";
import { BOOK_SHELVES } from "@/components/BookshelvesBottomSheet";
import useUserID from "@/hooks/useUserID";

const CustomSpeedDialAction = (props) => {
  const colorScheme: ColorSchemeName = useColorScheme();

  const { title, icon, onPress } = props;

  return (
    <SpeedDial.Action
      icon={
        <FontAwesome name={icon} size={20} color={Colors[colorScheme].barbie} />
      }
      title={title}
      onPress={onPress}
      color={Colors[colorScheme].background}
    />
  );
};

const CustomSpeedDial = (props) => {
  const colorScheme: ColorSchemeName = useColorScheme();

  const { getBookshelf, dialIsOpen, setDialIsOpen } = props;

  return (
    <SpeedDial
      isOpen={dialIsOpen}
      icon={{ name: "book", color: Colors[colorScheme].background }}
      openIcon={{ name: "close", color: Colors[colorScheme].background }}
      onOpen={() => setDialIsOpen(!dialIsOpen)}
      onClose={() => setDialIsOpen(!dialIsOpen)}
      overlayColor="rgba(224, 33, 138,0.1)"
      color={Colors[colorScheme].barbie}
    >
      <CustomSpeedDialAction
        title="Read"
        icon="eye-slash"
        onPress={() => getBookshelf(BOOK_SHELVES.Read, "read")}
      />
      <CustomSpeedDialAction
        title="Currently Reading"
        icon="eye"
        onPress={() =>
          getBookshelf(BOOK_SHELVES.CurrentlyReading, "currently reading")
        }
      />
      <CustomSpeedDialAction
        title="Want to Read"
        icon="bullseye"
        onPress={() => getBookshelf(BOOK_SHELVES.WantToRead, "want to read")}
      />
    </SpeedDial>
  );
};

const Bookshelves = () => {
  const colorScheme: ColorSchemeName = useColorScheme();

  const { userID, sessionError } = useUserID();

  const [currentBookself, setCurrentBookself] = useState<string>("read");
  const [books, setBooks] = useState([]);
  const [dialIsOpen, setDialIsOpen] = useState(false);

  const getBookshelf = async (bookShelfID: number, bookshelfTitle: string) => {
    setDialIsOpen(false);
    setCurrentBookself(bookshelfTitle);

    try {
      if (sessionError) {
        throw new Error(sessionError.message);
      }

      if (!userID) {
        throw new Error("Try again!");
      }

      const { data, error } = await supabase
        .from("Books")
        .select("bookID")
        .eq("userID", userID)
        .eq("bookShelfID", bookShelfID);

      if (error) {
        throw new Error(error.message);
      }
      setBooks(data);
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };

  const removeBookFromShelf = async (bookID: string) => {
    try {
      const { error } = await supabase
        .from("Books")
        .delete()
        .eq("userID", userID)
        .eq("bookID", bookID);

      if (error) {
        throw new Error(error.message);
      }

      // need to improve
      switch (currentBookself) {
        case "read":
          getBookshelf(BOOK_SHELVES.Read, currentBookself);
          break;
        case "currently reading":
          getBookshelf(BOOK_SHELVES.CurrentlyReading, currentBookself);
          break;
        case "want to read":
          getBookshelf(BOOK_SHELVES.WantToRead, currentBookself);
          break;
      }

      ToastAndroid.show("Book removed!", ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    if (sessionError) return;

    if (userID) {
      getBookshelf(BOOK_SHELVES.Read, "read");
    }
  }, [userID]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: Colors[colorScheme].background,
        },
      ]}
    >
      <BarbieText
        style={{
          fontSize: 35,
          textTransform: "capitalize",
          color: Colors[colorScheme].barbie,
          marginLeft: 10,
        }}
      >
        {currentBookself + `(${books?.length})`}
      </BarbieText>

      <FlatList
        data={books}
        renderItem={({ item }) => (
          <BookShelfBook
            bookID={item?.bookID}
            removeBookFromShelf={removeBookFromShelf}
          />
        )}
        keyExtractor={(item) => item.bookID}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Divider />}
      />

      <CustomSpeedDial
        getBookshelf={getBookshelf}
        setDialIsOpen={setDialIsOpen}
        dialIsOpen={dialIsOpen}
      />
    </View>
  );
};

export default Bookshelves;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
});
