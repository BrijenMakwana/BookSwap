import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";

const Bookshelves = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Bookshelves</Text>
    </SafeAreaView>
  );
};

export default Bookshelves;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
});
