import { Dispatch, SetStateAction } from "react";

interface IUIInput {
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  isProtected?: boolean;
}

export { IUIInput };
