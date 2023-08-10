import { StyleSheet, Text, View } from "react-native";
import React from "react";

const CalendarView = () => {
  return (
    <View style={styles.container}>
      <Text>CalendaarView</Text>
    </View>
  );
};

export default CalendarView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
