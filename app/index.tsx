import { Redirect } from "expo-router";

import { LogBox } from "react-native";

LogBox.ignoreLogs(["@supabase/gotrue-js: Stack guards not supported"]);

const index = () => {
  return <Redirect href="/Login" />;
};

export default index;
