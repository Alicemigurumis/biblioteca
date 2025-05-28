export interface Media {
  id: string;
  type: 'movies' | 'tv-shows' | 'books';
  title: string;
  year: string;
  coverImage: string;
  rating: number;
  tags: string[];
  description?: string;
  creator?: string; // Director, Author, etc.
  dateAdded: string;
  reviewText?: string;
  additionalInfo?: {
    [key: string]: any;
  };
}

export interface Review {
  id: string;
  mediaId: string;
  mediaType: 'movies' | 'tv-shows' | 'books';
  rating: number;
  reviewText: string;
  dateReviewed: string;
  tags: string[];
}

export interface Tag {
  id: string;
  name: string;
  mediaCount: number;
  coverImage?: string;
}