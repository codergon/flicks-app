export type PresignedUrlResponse = {
  [key: string]: PresignedUrlResponseItem;
};

export type PresignedUrlResponseItem = {
  url: string;
  fields: {
    key: string;
    acl: string;
    bucket: string;
  };
};
