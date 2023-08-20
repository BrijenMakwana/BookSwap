import { Dispatch, SetStateAction } from "react";

interface IBookshelvesBottomSheet {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  bookID: string;
  bookshelfType: string;
}

export { IBookshelvesBottomSheet };
