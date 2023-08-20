import { Dispatch, SetStateAction } from "react";

interface IBarcodeScanner {
  closeBarcodeScanner: () => void;
  setSearchedBook: Dispatch<SetStateAction<string>>;
  searchedBook: string;
}

export { IBarcodeScanner };
