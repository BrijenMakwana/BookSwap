import { View, StyleSheet, Text } from "react-native";
import { useState } from "react";
import { SpeedDial } from "@rneui/themed";
import BarbieText from "@/components/BarbieText";

const CustomSpeedDial = () => {
  const [dialIsOpen, setDialIsOpen] = useState(false);

  return (
    <SpeedDial
      isOpen={dialIsOpen}
      icon={{ name: "book", color: "#fff" }}
      openIcon={{ name: "close", color: "#fff" }}
      onOpen={() => setDialIsOpen(!dialIsOpen)}
      onClose={() => setDialIsOpen(!dialIsOpen)}
      overlayColor="rgba(224, 33, 138,0.2)"
      color="#e0218a"
    >
      <SpeedDial.Action
        icon={{ name: "add", color: "#e0218a" }}
        title="Read"
        onPress={() => console.log("Add Something")}
        color="#fff"
      />
      <SpeedDial.Action
        icon={{ name: "add", color: "#e0218a" }}
        title="Currently Reading"
        onPress={() => console.log("Add Something")}
        color="#fff"
      />
      <SpeedDial.Action
        icon={{ name: "book", color: "#e0218a" }}
        title="Want to Read"
        onPress={() => console.log("Delete Something")}
        color="#fff"
      />
    </SpeedDial>
  );
};

const headingStyle = {
  fontSize: 35,
  textTransform: "capitalize",
  fontWeight: "600",
  color: "#e0218a",
  marginLeft: 20,
};

const Bookshelves = () => {
  return (
    <View style={styles.container}>
      <BarbieText style={headingStyle}>want to read</BarbieText>

      <CustomSpeedDial />
    </View>
  );
};

export default Bookshelves;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },

  heading: {
    fontSize: 30,
    textTransform: "capitalize",
    fontWeight: "600",
    color: "#e0218a",
  },
});