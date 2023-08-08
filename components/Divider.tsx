import { StyleSheet, View } from "react-native";
import React from "react";

const Divider = () => {
  return <View style={styles.divider} />;
};

export default Divider;

const styles = StyleSheet.create({
  divider: {
    backgroundColor: "rgba(224, 33, 138,0.3)",
    height: 1,
    width: "90%",
    alignSelf: "center",
  },
});
