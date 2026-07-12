export interface Book {
  id: string;
  title: string;
  writer: string;
  coverUrl: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  pages: number;
  publishedDate: string;
  rating: number;
  reviewCount: number;
  totalCopies: number;
  availableCopies: number;
}