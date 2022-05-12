export interface MovieAPIResItemDefinition {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface MovieAPIResDefinition {
  Response: string;
  Search: MovieAPIResItem[];
  totalResults: string;
}

export interface MovieItemDefinition {
  title: string;
  year: string;
  imdbID: string;
  type: string;
  poster: string;
}
