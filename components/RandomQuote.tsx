import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
  ColorSchemeName,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Colors from "@/constants/Colors";

const RandomQuote = () => {
  const colorScheme: ColorSchemeName = useColorScheme();

  const [randomQuote, setRandomQuote] = useState([]);

  const getRandomQuote = async () => {
    try {
      const response = await axios.get("https://api.quotable.io/quotes/random");

      setRandomQuote(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  if (randomQuote.length === 0) return;

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.quote,
          {
            color: Colors[colorScheme].barbie,
          },
        ]}
      >
        {randomQuote[0].content}
      </Text>
      <Text
        style={[
          styles.author,
          {
            color: Colors[colorScheme].text,
          },
        ]}
      >
        - {randomQuote[0].author}
      </Text>
    </View>
  );
};

export default RandomQuote;

const styles = StyleSheet.create({
  container: {
    marginTop: "auto",
    marginBottom: "auto",
    paddingHorizontal: 40,
  },
  quote: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
  },
  author: {
    fontSize: 14,
    marginTop: 10,
    textAlign: "right",
    textTransform: "capitalize",
    fontWeight: "500",
  },
});
