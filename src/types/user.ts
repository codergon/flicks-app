export interface Creator {
  id: string;
  bio: string;
  wallet: Wallet;
  address: string;
  moniker: string;
  image_url: string;
  banner_url: string;
  created_at: string;
  updated_at: string;
  is_verified: boolean;
  social_links: SocialLinks;
  is_suspended: boolean;
  contents_count: number;
  subscription_info: SubscriptionInfo;
  subscribers_count: number;
  suspension_reason: string;
  subscription_type: string;
  is_subscribed: boolean;
}

export interface Wallet {
  id: string;
  balance: string;
  deposit_addresses: DepositAddress[];
  created_at: string;
  updated_at: string;
}

export interface DepositAddress {
  id: string;
  address: string;
  blockchain: string;
  created_at: string;
  updated_at: string;
}

export interface SocialLinks {}

export interface SubscriptionInfo {
  amount?: number;
  collection_name?: string;
  collection_address?: string;
  collection_image?: string;
  collection_description?: string;

  token_name?: string;
  minimum_token_balance?: number;
}
