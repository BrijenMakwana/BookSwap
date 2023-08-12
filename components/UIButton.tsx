import {
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  ColorSchemeName,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import Colors from "@/constants/Colors";

const UIButton = (props) => {
  const colorScheme: ColorSchemeName = useColorScheme();

  const { text, theme } = props;
  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor:
            theme === "barbie"
              ? Colors[colorScheme].barbie
              : Colors[colorScheme].ken,
        },
      ]}
    >
      <MaterialCommunityIcons
        name="book-plus"
        size={20}
        color={
          theme === "barbie"
            ? Colors[colorScheme].background
            : Colors[colorScheme].text
        }
      />
      <Text
        style={[
          styles.btnText,
          {
            color:
              theme === "barbie"
                ? Colors[colorScheme].background
                : Colors[colorScheme].text,
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
