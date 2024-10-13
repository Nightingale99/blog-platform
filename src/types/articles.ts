export type Articles = {
  articles: Article[];
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: Tags;
  createdAt: string;
  updatedAt: string;
  favoritesCount: number;
  author: Author;
};
export type Tags = string[];

export type Author = {
  username: string;
  bio?: string;
  image: string;
  following: boolean;
};
