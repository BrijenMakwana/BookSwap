import { View, StyleSheet } from "react-native";
import { useState } from "react";
import { SpeedDial } from "@rneui/themed";
import BarbieText from "@/components/BarbieText";
import { FontAwesome } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import Book from "@/components/Book";
import Divider from "@/components/Divider";

const CustomSpeedDial = () => {
  const [dialIsOpen, setDialIsOpen] = useState(false);

  return (
    <SpeedDial
      isOpen={dialIsOpen}
      icon={{ name: "book", color: "#fff" }}
      openIcon={{ name: "close", color: "#fff" }}
      onOpen={() => setDialIsOpen(!dialIsOpen)}
      onClose={() => setDialIsOpen(!dialIsOpen)}
      overlayColor="rgba(224, 33, 138,0.1)"
      color="#e0218a"
    >
      <SpeedDial.Action
        icon={<FontAwesome name="eye-slash" size={20} color="#e0218a" />}
        title="Read"
        onPress={() => console.log("Add Something")}
        color="#fff"
      />
      <SpeedDial.Action
        icon={<FontAwesome name="eye" size={20} color="#e0218a" />}
        title="Currently Reading"
        onPress={() => console.log("Add Something")}
        color="#fff"
      />
      <SpeedDial.Action
        icon={<FontAwesome name="bullseye" size={20} color="#e0218a" />}
        title="Want to Read"
        onPress={() => console.log("Delete Something")}
        color="#fff"
      />
    </SpeedDial>
  );
};

const Bookshelves = () => {
  const [books, setBooks] = useState([]);

  return (
    <View style={styles.container}>
      <BarbieText
        style={{
          fontSize: 35,
          textTransform: "capitalize",
          color: "#e0218a",
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
    backgroundColor: "#fff",
    paddingTop: 50,
  },
});
