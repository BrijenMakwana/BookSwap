import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  useColorScheme,
  ColorSchemeName,
} from "react-native";
import { EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import * as Device from "expo-device";
import { FC } from "react";
import { ISearchBar } from "@/types/searchBar";

const SearchBar: FC<ISearchBar> = (props) => {
  const colorScheme: ColorSchemeName = useColorScheme();

  const { searchedBook, setSearchedBook, openBarcodeScanner } = props;

  const clearInput = () => {
    setSearchedBook("");
  };
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: Colors[colorScheme].barbie,
        },
      ]}
    >
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: Colors[colorScheme].background,
          },
        ]}
      >
        <EvilIcons name="search" size={30} color={Colors[colorScheme].barbie} />
        <TextInput
          placeholder="Search your books here"
          style={[
            styles.input,
            {
              color: Colors[colorScheme].text,
            },
          ]}
          placeholderTextColor={Colors[colorScheme].text}
          onChangeText={(text) => setSearchedBook(text)}
          value={searchedBook}
        />

        {searchedBook ? (
          <Pressable onPress={clearInput} style={styles.clearBtn}>
            <EvilIcons
              name="close-o"
              size={25}
              color={Colors[colorScheme].text}
            />
          </Pressable>
        ) : (
          <Pressable
            style={styles.clearBtn}
            onPress={openBarcodeScanner}
            android_ripple={{
              color: Colors[colorScheme].barbie,
            }}
          >
            <MaterialCommunityIcons
              name="barcode-scan"
              size={25}
              color={Colors[colorScheme].text}
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
    paddingTop: Device.deviceType === 2 ? 30 : 60,
    paddingBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    padding: Device.deviceType === 2 ? 12 : 7,
  },
  clearBtn: {
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
});
