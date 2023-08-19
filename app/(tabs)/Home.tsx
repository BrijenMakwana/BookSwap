import {
  StyleSheet,
  useColorScheme,
  ColorSchemeName,
  SafeAreaView,
  ToastAndroid,
  RefreshControl,
} from "react-native";
import { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { FlashList } from "@shopify/flash-list";
import useUserID from "@/hooks/useUserID";
import Divider from "@/components/Divider";
import { supabase } from "@/supabase/supabase";
import { BOOK_SHELVES } from "@/components/BookshelvesBottomSheet";
import RequestBook from "@/components/RequestBook";

const Home = () => {
  const colorScheme: ColorSchemeName = useColorScheme();

  const { userID, sessionError } = useUserID();

  const [books, setBooks] = useState([]);
  const [booksAreLoading, setBooksAreLoading] = useState<boolean>(false);

  const getBooksFromUsers = async () => {
    setBooksAreLoading(true);
    try {
      if (sessionError) {
        throw new Error(sessionError.message);
      }

      if (!userID) {
        throw new Error("Try again!");
      }

      const { data, error } = await supabase
        .from("Books")
        .select()
        .neq("userID", userID)
        .eq("bookShelfID", BOOK_SHELVES.Read);

      if (error) {
        throw new Error(error.message);
      }

      setBooks(data);
    } catch (error) {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    } finally {
      setBooksAreLoading(false);
    }
  };

  useEffect(() => {
    if (sessionError) return;

    if (userID) {
      getBooksFromUsers();
    }
  }, [userID]);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: Colors[colorScheme].background,
        },
      ]}
    >
      <FlashList
        data={books}
        renderItem={({ item }) => <RequestBook bookID={item?.bookID} />}
        estimatedItemSize={20}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Divider />}
        refreshControl={
          <RefreshControl
            refreshing={booksAreLoading}
            colors={[Colors[colorScheme].barbie]}
            progressBackgroundColor={Colors[colorScheme].background}
            onRefresh={() => getBooksFromUsers()}
          />
        }
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
});
