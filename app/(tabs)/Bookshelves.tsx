import {
  View,
  StyleSheet,
  useColorScheme,
  ColorSchemeName,
} from "react-native";
import { useEffect, useState } from "react";
import { SpeedDial } from "@rneui/themed";
import BarbieText from "@/components/BarbieText";
import { FontAwesome } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import Divider from "@/components/Divider";
import Colors from "@/constants/Colors";
import { supabase } from "@/supabase/supabase";
import BookShelfBook from "@/components/BookShelfBook";
import { BOOK_SHELVES } from "@/components/BookshelvesBottomSheet";

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

  const { setBooks } = props;

  const [dialIsOpen, setDialIsOpen] = useState(false);

  const getBookshelf = async (bookShelfID: number) => {
    const { data } = await supabase
      .from("Books")
      .select("bookID")
      .eq("bookShelfID", bookShelfID);

    setBooks(data);
    setDialIsOpen(false);
  };

  useEffect(() => {
    getBookshelf(BOOK_SHELVES.Read);
  }, []);

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
        onPress={() => getBookshelf(BOOK_SHELVES.Read)}
      />
      <CustomSpeedDialAction
        title="Currently Reading"
        icon="eye"
        onPress={() => getBookshelf(BOOK_SHELVES.CurrentlyReading)}
      />
      <CustomSpeedDialAction
        title="Want to Read"
        icon="bullseye"
        onPress={() => getBookshelf(BOOK_SHELVES.WantToRead)}
      />
    </SpeedDial>
  );
};

const Bookshelves = () => {
  const colorScheme: ColorSchemeName = useColorScheme();

  const [books, setBooks] = useState([]);

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
        want to read
      </BarbieText>

      <FlashList
        data={books}
        renderItem={({ item }) => <BookShelfBook bookID={item?.bookID} />}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={20}
        ItemSeparatorComponent={() => <Divider />}
      />

      <CustomSpeedDial setBooks={setBooks} />
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
