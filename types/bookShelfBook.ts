interface IBookShelfBook {
  bookID: string;
  removeBookFromShelf: (bookID: string) => Promise<void>;
}

export { IBookShelfBook };
