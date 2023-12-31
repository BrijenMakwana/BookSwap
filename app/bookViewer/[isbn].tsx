import { StyleSheet } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import { useLocalSearchParams } from "expo-router";
import { GoBack } from "../book/[id]";

const BookViewer = () => {
  const params = useLocalSearchParams();

  return (
    <>
      <GoBack />
      <WebView
        style={styles.container}
        originWhitelist={["*"]}
        source={{
          html: `<!DOCTYPE html "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
          <title>Google Books Embedded Viewer API Example</title>
          <script type="text/javascript" src="https://www.google.com/books/jsapi.js"></script>
          <script type="text/javascript">
            google.books.load();

            function alertNotFound() {
              alert("could not embed this book!");
            }
      
            function initialize() {
              var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
              viewer.load('ISBN:${params.isbn}',alertNotFound);
            }
      
            google.books.setOnLoadCallback(initialize);
          </script>
        </head>
        <body>
          <div id="viewerCanvas" style="width: 100%; height: 100%"></div>
        </body>
      </html>`,
        }}
      />
    </>
  );
};

export default BookViewer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
