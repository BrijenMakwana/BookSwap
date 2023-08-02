import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

const UIButton = (props) => {
  const { text } = props;
  return (
    <Pressable style={styles.container}>
      <MaterialCommunityIcons name="book-plus" size={20} color="#000" />
      <Text style={styles.btnText}>{text}</Text>
    </Pressable>
  );
};

export default UIButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e0218a",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  btnText: {
    fontSize: 11,
    fontWeight: "600",
    marginLeft: 5,
    color: "#000",
  },
});
