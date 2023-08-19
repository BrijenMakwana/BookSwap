import {
  StyleSheet,
  useColorScheme,
  ColorSchemeName,
  SafeAreaView,
  ToastAndroid,
} from "react-native";
import { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { FlashList } from "@shopify/flash-list";
import useUserID from "@/hooks/useUserID";
import Divider from "@/components/Divider";
import { supabase } from "@/supabase/supabase";
import { BOOK_SHELVES } from "@/components/BookshelvesBottomSheet";
import RequestBook from "@/components/RequestBook";

const index = () => {
  const colorScheme: ColorSchemeName = useColorScheme();

  const { userID, sessionError } = useUserID();

  const [books, setBooks] = useState([]);

  const getBooksFromUsers = async () => {
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
    }
  };

  useEffect(() => {
    getBooksFromUsers();
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
      />
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
});
