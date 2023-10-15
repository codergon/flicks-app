export type RecentSearches = RecentSearch[];

export type RecentSearch = {
  id: string;
  type: "keyword" | "creator";
  keyword?: string;
  creator?: RecentSearchCreator;
};

export interface RecentSearchCreator {
  address?: string;
  id?: string;
  image_url?: string;
  is_verified?: boolean;
  moniker?: string;
  subscription_type?: string;
}
