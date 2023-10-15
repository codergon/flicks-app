export interface IPost {
  caption: string;
  comments: IPostComment[];
  comments_count: number;
  content_type: string;
  created_at: string;
  creator: ICreator;
  id: string;
  is_liked: boolean;
  is_purchased: boolean[];
  likes_count: number;
  media: IPostMedia[];
  price: string;
  updated_at: string;
}

export interface ICreator {
  address: string;
  id: string;
  image_url: string;
  is_verified: boolean;
  moniker: string;
  subscription_type: string;
}

export interface IPostMedia {
  blur_hash: string;
  created_at: string;
  media_type: string;
  s3_key: string;
  updated_at: string;
  url: string;
}

export interface IPostComment {
  id: string;
  author: ICreator;
  message: string;
  created_at: string;
  updated_at: string;
}
