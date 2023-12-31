import {
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  ColorSchemeName,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { FC } from "react";
import { IAddToBookshelvesButton } from "@/types/addToBookshelvesButton";

const AddToBookshelvesButton: FC<IAddToBookshelvesButton> = (props) => {
  const colorScheme: ColorSchemeName = useColorScheme();

  const { bookshelfType, onPress } = props;

  const btnText: string = bookshelfType ? bookshelfType : "Add to Bookshelf";

  const backgroundColor: string = bookshelfType
    ? Colors[colorScheme].background
    : Colors[colorScheme].barbie;
  const borderColor: string = bookshelfType
    ? Colors[colorScheme].barbie
    : Colors[colorScheme].background;
  const borderWidth: number = bookshelfType ? 1 : 0;
  const textColor: string = bookshelfType
    ? Colors[colorScheme].barbie
    : Colors[colorScheme].background;

  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: borderWidth,
        },
      ]}
      onPress={onPress}
    >
      <MaterialCommunityIcons name="book-plus" size={22} color={textColor} />
      <Text
        style={[
          styles.btnText,
          {
            color: textColor,
          },
        ]}
      >
        {btnText}
      </Text>
    </Pressable>
  );
};

export default AddToBookshelvesButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 7,
    borderRadius: 5,
    marginTop: 20,
  },
  btnText: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 10,
  },
});
