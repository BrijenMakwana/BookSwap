import { Dispatch, SetStateAction } from "react";

interface ISearchBar {
  searchedBook: string;
  setSearchedBook: Dispatch<SetStateAction<string>>;
  openBarcodeScanner: () => void;
}

export { ISearchBar };
