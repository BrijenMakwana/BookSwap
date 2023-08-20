import { GestureResponderEvent } from "react-native";

interface IAddToBookshelvesButton {
  bookshelfType: string;
  onPress: (event: GestureResponderEvent) => void;
}

export { IAddToBookshelvesButton };
