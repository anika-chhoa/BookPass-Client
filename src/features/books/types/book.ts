export interface Book {
  id: string;
  title: string;
  writerId: string;
  writerName: string;
  writerPhotoUrl: string;
  coverUrl: string;
  images: string[];
  category: string;
  shortDescription: string;
  description: string;
  pages: number;
  publishedDate: string;
  rating: number;
  reviewCount: number;
  totalCopies: number;
}