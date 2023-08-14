import {
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  ColorSchemeName,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const AddToBookshelvesButton = (props) => {
  const colorScheme: ColorSchemeName = useColorScheme();

  const { text, onPress } = props;
  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: Colors[colorScheme].barbie,
        },
      ]}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        name="book-plus"
        size={22}
        color={Colors[colorScheme].background}
      />
      <Text
        style={[
          styles.btnText,
          {
            color: Colors[colorScheme].background,
          },
        ]}
      >
        {text}
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
