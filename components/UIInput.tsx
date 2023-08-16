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

  const { placeholder, value, setValue, isProtected = false } = props;

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
      value={value}
      onChangeText={(text) => setValue(text)}
      secureTextEntry={isProtected}
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
