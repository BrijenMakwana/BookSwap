import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";

const SearchBar = (props) => {
  const { searchedBook, setSearchedBook, openBarcodeScanner } = props;

  const clearInput = () => {
    setSearchedBook("");
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <EvilIcons name="search" size={30} color="#e0218a" />
        <TextInput
          placeholder="Search your books here"
          style={styles.input}
          placeholderTextColor="#333333"
          onChangeText={(text) => setSearchedBook(text)}
          value={searchedBook}
        />

        {searchedBook ? (
          <Pressable onPress={clearInput} style={styles.clearBtn}>
            <EvilIcons name="close-o" size={25} color="#e0218a" />
          </Pressable>
        ) : (
          <Pressable
            style={styles.clearBtn}
            onPress={openBarcodeScanner}
            android_ripple={{
              color: "#e0218a",
            }}
          >
            <MaterialCommunityIcons
              name="barcode-scan"
              size={25}
              color="black"
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e0218a",
    paddingTop: 60,
    paddingBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: "#000",
    padding: 7,
  },
  clearBtn: {
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
});
