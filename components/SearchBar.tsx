import { Pressable, StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { EvilIcons } from "@expo/vector-icons";

const SearchBar = (props) => {
  const { searchedBook, setSearchedBook } = props;

  const clearInput = () => {
    setSearchedBook("");
  };
  return (
    <View style={styles.container}>
      <EvilIcons name="search" size={30} color="#e0218a" />
      <TextInput
        placeholder="Search your books here"
        style={styles.input}
        placeholderTextColor="#333333"
        onChangeText={(text) => setSearchedBook(text)}
        value={searchedBook}
      />

      {searchedBook && (
        <Pressable onPress={clearInput} style={styles.clearBtn}>
          <EvilIcons name="close-o" size={25} color="#e0218a" />
        </Pressable>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#e0218a",
    width: "90%",
    alignSelf: "center",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 30,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: "#222222",
  },
  clearBtn: {
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
});
