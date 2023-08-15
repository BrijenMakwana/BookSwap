import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  ColorSchemeName,
  TextInput,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

const UIInput = (props) => {
  const colorScheme: ColorSchemeName = useColorScheme();

  const { placeholder } = props;

  return (
    <TextInput
      placeholder={placeholder}
      style={[
        styles.input,
        {
          borderBottomColor: Colors[colorScheme].text,
          color: Colors[colorScheme].text,
        },
      ]}
      placeholderTextColor={Colors[colorScheme].text}
    />
  );
};

export default UIInput;

const styles = StyleSheet.create({
  input: {
    padding: 10,
    width: "80%",
    marginTop: 20,
    fontSize: 15,
    borderBottomWidth: 0.5,
  },
});
