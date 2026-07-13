export interface Book {
  id: string;
  title: string;
  writer: string;
  coverUrl: string;
  category: string;
  description: string;
  pages: number;
  publishedDate: string;
  rating: number;
  reviewCount: number;
  totalCopies: number;
  availableCopies: number;
}