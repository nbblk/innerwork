export interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image_url: string;
}

export interface UnsplashImageSize {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}
