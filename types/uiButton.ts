interface IUIButton {
  text: string;
  type: "solid" | "outline";
  onPress: () => void | Promise<void>;
}

export { IUIButton };
