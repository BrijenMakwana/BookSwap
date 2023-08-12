import {
  View,
  StyleSheet,
  useColorScheme,
  ColorSchemeName,
} from "react-native";
import { useState } from "react";
import { SpeedDial } from "@rneui/themed";
import BarbieText from "@/components/BarbieText";
import { FontAwesome } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import Book from "@/components/Book";
import Divider from "@/components/Divider";
import Colors from "@/constants/Colors";

const CustomSpeedDialAction = (props) => {
  const colorScheme: ColorSchemeName = useColorScheme();

  const { title, icon } = props;

  return (
    <SpeedDial.Action
      icon={
        <FontAwesome name={icon} size={20} color={Colors[colorScheme].barbie} />
      }
      title={title}
      onPress={() => console.log("Add Something")}
      color={Colors[colorScheme].background}
    />
  );
};

const CustomSpeedDial = () => {
  const colorScheme: ColorSchemeName = useColorScheme();

  const [dialIsOpen, setDialIsOpen] = useState(false);

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
      <CustomSpeedDialAction title="Read" icon="eye-slash" />
      <CustomSpeedDialAction title="Currently Reading" icon="eye" />
      <CustomSpeedDialAction title="Want to Read" icon="bullseye" />
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
        renderItem={({ item }) => (
          <Book
            id={item.id}
            imageUrl={item?.volumeInfo?.imageLinks?.thumbnail}
            title={item?.volumeInfo?.title}
            author={item?.volumeInfo?.authors[0] || "NA"}
            rating={item?.volumeInfo?.averageRating}
            publishedDate={item.volumeInfo?.publishedDate}
            pageCount={item.volumeInfo?.pageCount}
            allowActionBtns={false}
          />
        )}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={20}
        ItemSeparatorComponent={() => <Divider />}
      />

      <CustomSpeedDial />
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
