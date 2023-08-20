interface IBook {
  id: string;
  title: string;
  imageUrl: string;
  author: string;
  rating: number;
  publishedDate: Date;
  pageCount: number;
}

export { IBook };
