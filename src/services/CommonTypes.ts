export interface IUser {
  fullName: string;
  email: string;
  role: string;
  password: string;
  imageUrl: string;
  googleId?: string;
  tokens: string[];
  _id?: string;
}

export interface IPost {
  _id?:string;
  ownerId: string;
  ownerName?: string;
  ownerImageUrl?: string;
  text: string;
  rating: number;
  imageUrl?: string;
  tmdbId: string;
  contentinterface?: string;
  tmdbTitle?: string;
  tmdbImageUrl?: string;
  numOfComments?: number;
  createdAt?: Date | string;
}

export interface IComment {
  ownerId: string;
  postId: string;
  text: string;
}

export interface IMovie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  year: string;
  genre_ids: number[];
  language: string;
}

export interface IMovieDetails extends IMovie {
  backdrop_path?: string;
  genres?: string[];
  tagline?: string;
}

export interface ITvShow {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  year: string;
  genre_ids: number[];
  language: string;
}
