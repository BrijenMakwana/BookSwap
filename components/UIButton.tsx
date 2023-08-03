import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";

const UIButton = (props) => {
  const { text, type } = props;
  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: type === 1 ? "#e0218a" : "#0AF6EE",
        },
      ]}
    >
      <MaterialCommunityIcons
        name="book-plus"
        size={20}
        color={type === 1 ? "#fff" : "#000"}
      />
      <Text
        style={[
          styles.btnText,
          {
            color: type === 1 ? "#fff" : "#000",
          },
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default UIButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    borderRadius: 20,
    paddingHorizontal: 12,
  },
  btnText: {
    fontSize: 11,
    fontWeight: "600",
    marginLeft: 5,
  },
});
