import {
  StyleSheet,
  Text,
  ColorSchemeName,
  useColorScheme,
} from "react-native";
import React, { FC } from "react";
import { Pressable } from "react-native";
import Colors from "@/constants/Colors";
import { IUIButton } from "@/types/uiButton";

const UIButton: FC<IUIButton> = (props) => {
  const colorScheme: ColorSchemeName = useColorScheme();

  const { text, type, onPress } = props;

  return (
    <Pressable
      style={[
        styles.btnContainer,
        {
          backgroundColor:
            type === "solid"
              ? Colors[colorScheme].barbie
              : Colors[colorScheme].background,
        },
      ]}
      android_ripple={{
        color:
          type === "solid"
            ? Colors[colorScheme].background
            : Colors[colorScheme].barbie,
      }}
      onPress={onPress}
    >
      <Text
        style={[
          styles.btnText,
          {
            color:
              type === "solid"
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
  btnContainer: {
    paddingVertical: 10,
    marginTop: 30,
    width: "80%",
    alignItems: "center",
    borderRadius: 5,
  },
  btnText: {
    fontSize: 15,
    fontWeight: "600",
    textTransform: "capitalize",
  },
});
