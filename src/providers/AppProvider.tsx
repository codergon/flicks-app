import axios from "axios";
import { router } from "expo-router";
import { useAccount } from "./AccountProvider";
import * as ImagePicker from "expo-image-picker";
import { PresignedUrlResponse } from "typings/api";
import * as VideoThumbnails from "expo-video-thumbnails";
import { useState, ReactNode, useContext, createContext } from "react";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLargeStorageState } from "hooks/useLargeStorageState";
import {
  RecentSearchCreator,
  RecentSearch,
  RecentSearches,
} from "typings/common";
import { nanoid } from "nanoid";

type AppProviderProps = {
  children: ReactNode;
};

export type MediaType = ImagePicker.ImagePickerAsset & {
  thumbnail?: string;
  edits?: string[];
};

export function useApp() {
  const value = useContext(AppContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useApp must be wrapped in a <AppProvider />");
    }
  }
  return value;
}

const AppProvider = ({ children }: AppProviderProps) => {
  const insets = useSafeAreaInsets();
  const { userSignature } = useAccount();

  const [uploading, setUploading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaType[]>([]);

  const [[isLoadingSearches, recentSearches], setRecentSearches] =
    useLargeStorageState<RecentSearches>("recentSearches");

  const [uploadStatus, setUploadStatus] = useState<string[]>([
    "Uploading media...",
    "Creating content...",
    "Done!",
  ]);

  // handle searching for creators
  const [searchQuery, setSearchQuery] = useState<ISearchQuery>({
    data: null,
    loading: false,
    error: null,
  });
  const handleSearch = async (search: string) => {
    console.log("search for this keyword");
    setSearchQuery((prev) => ({ ...prev, loading: true, error: null }));

    try {
      //

      const { data } = await axios.get("/creators/search", {
        params: {
          q: search,
        },
        headers: {
          Authorization: `Signature ${userSignature?.publicKey}:${userSignature?.signature}`,
        },
      });

      console.log(data);

      handleRecentSearches(
        {
          id: nanoid(),
          type: "keyword",
          keyword: search,
        },
        "add"
      );
    } catch (error: any) {
      setSearchQuery((prev) => ({ ...prev, error }));
    } finally {
      setSearchQuery((prev) => ({ ...prev, loading: false }));
    }
  };

  // add search to recent searches
  const handleRecentSearches = (
    search: RecentSearch,
    action: "add" | "delete" = "add"
  ) => {
    if (action === "add") {
      // Filter out the existing search
      const filteredSearches = (recentSearches ?? []).filter((item) => {
        if (search.type === "keyword" && item.type === "keyword") {
          return item.keyword?.toLowerCase() !== search.keyword?.toLowerCase();
        } else if (search.type === "creator" && item.type === "creator") {
          return item.creator?.id !== search.creator?.id;
        }
        return true;
      });

      // Add the new search at the beginning
      setRecentSearches([search, ...filteredSearches]);
    } else {
      setRecentSearches(
        (recentSearches ?? []).filter((item) => item.id !== search.id)
      );
    }
  };

  // Fetch user's posts
  const usersPostQuery = useQuery(
    ["account-posts", userSignature?.publicKey],
    async () =>
      axios
        .get(`/contents/creators/${userSignature?.publicKey}`, {
          headers: {
            Authorization: `Signature ${userSignature?.publicKey}:${userSignature?.signature}`,
          },
        })
        .then((res) => res.data?.data?.results),
    {
      enabled: !!userSignature,
    }
  );

  // Start content upload
  const startContentUpload = async () => {
    // Prompt user to select media
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      orderedSelection: true,
      presentationStyle: ImagePicker.UIImagePickerPresentationStyle.FULL_SCREEN,
      allowsMultipleSelection: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      // for each of the selected media, create a thumbnail for the videos
      const assets = [];
      for (const asset of result.assets) {
        if (asset.type === "video") {
          try {
            const { uri } = await VideoThumbnails.getThumbnailAsync(asset.uri);
            assets.push({ ...asset, thumbnail: uri });
          } catch (error) {
            assets.push(asset);
          }
        } else {
          assets.push(asset);
        }
      }

      setSelectedMedia(assets);
      router.push("/upload");
    }
  };

  // Remove media
  const removeMedia = (assetId?: string) => {
    if (!assetId) return;
    setSelectedMedia((prev) => prev.filter((item) => item.assetId !== assetId));
  };

  // Edit media
  const editMedia = async (action: string, assetId: string) => {
    if (!assetId) return;

    const media = selectedMedia.find((item) => item.assetId === assetId);
    if (!media) return;

    switch (action) {
      case "rotate":
        const { uri } = await manipulateAsync(media.uri, [{ rotate: -90 }], {
          format: SaveFormat.PNG,
        });
        setSelectedMedia((prev) =>
          prev.map((item) =>
            item.assetId === assetId
              ? { ...item, uri, edits: [...(item?.edits ?? []), "rotate"] }
              : item
          )
        );
        break;
      case "verticalFlip":
      case "horizontalFlip":
        const flip =
          action === "verticalFlip" ? FlipType.Vertical : FlipType.Horizontal;
        const { uri: flipUri } = await manipulateAsync(media.uri, [{ flip }], {
          format: SaveFormat.PNG,
        });
        setSelectedMedia((prev) =>
          prev.map((item) =>
            item.assetId === assetId
              ? {
                  ...item,
                  uri: flipUri,
                  edits: [...(item?.edits ?? []), action],
                }
              : item
          )
        );
        break;
      case "undo":
        const edits = media.edits ?? [];
        const lastEdit = edits[edits.length - 1];
        if (!lastEdit) return;
        const { uri: undoUri } = await manipulateAsync(
          media.uri,
          [
            // if last edit was rotate, undo by rotating 90 degrees
            ...(lastEdit === "rotate"
              ? [{ rotate: 90 }]
              : // if last edit was vertical flip, undo by flipping vertically
              lastEdit === "verticalFlip"
              ? [{ flip: FlipType.Vertical }]
              : // if last edit was horizontal flip, undo by flipping horizontally
              lastEdit === "horizontalFlip"
              ? [{ flip: FlipType.Horizontal }]
              : []),
          ],
          {
            format: SaveFormat.PNG,
          }
        );

        setSelectedMedia((prev) =>
          prev.map((item) =>
            item.assetId === assetId
              ? {
                  ...item,
                  uri: undoUri,
                  edits: [...(item?.edits ?? []).slice(0, -1)],
                }
              : item
          )
        );
        break;
      default:
        break;
    }
  };

  const uploadContent = async (
    caption: string,
    contentType: "free" | "paid",
    price: number
  ) => {
    try {
      setUploading(true);
      // Get presigned urls
      const { data: responseData } = await axios.post(
        "/contents/get-upload-urls",
        {
          files: selectedMedia.map((item) => ({
            file_type: item.type,
            file_name: item.fileName,
          })),
        },
        {
          headers: {
            Authorization: `Signature ${userSignature?.publicKey}:${userSignature?.signature}`,
          },
        }
      );

      const { data }: { data: PresignedUrlResponse } = responseData;

      // Upload media to presigned urls
      const uploadPromises = selectedMedia.map(async (item, index) => {
        const { url, fields } = data?.[item.fileName ?? ""];
        const formData = new FormData();
        Object.entries(fields).forEach(([key, value]) => {
          formData.append(key, value);
        });
        // @ts-ignore
        formData.append("file", {
          uri: item.uri,
          type: "image/jpeg",
          name: item.fileName ?? "",
        });

        return axios.post(url, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      });

      await Promise.all(uploadPromises);

      const blurhash = "LKN]Rv%2Tw=w]~RBVZRi};RPxuwH";

      const contentData = {
        ...(contentType === "paid" && { price }),
        caption: caption ?? "✨",
        content_type: contentType,
        media: selectedMedia.map((item) => ({
          blur_hash: blurhash,
          media_type: item.type,
          s3_key: data?.[item.fileName ?? ""]?.fields?.key,
        })),
      };

      // Create content
      const { data: content } = await axios.post("/contents/", contentData, {
        headers: {
          Authorization: `Signature ${userSignature?.publicKey}:${userSignature?.signature}`,
        },
      });

      console.log(content);
    } catch (e: any) {
      console.log(e?.response?.data);
      Toast.show({
        type: "error",
        topOffset: insets.top + 10,
        text1: "Error uploading post",
        text2: "Something went wrong while uploading your post",
      });
    } finally {
      setUploading(false);
    }
  };

  // handle liking and unliking of posts
  const handleLike = async (postId: string, action: "like" | "unlike") => {
    try {
      // if user is not logged in, return
      if (!userSignature) return;

      if (action === "like") {
        await axios.post(`/contents/${postId}/likes`, undefined, {
          headers: {
            Authorization: `Signature ${userSignature?.publicKey}:${userSignature?.signature}`,
          },
        });
      } else {
        await axios.delete(`/contents/${postId}/likes`, {
          headers: {
            Authorization: `Signature ${userSignature?.publicKey}:${userSignature?.signature}`,
          },
        });
      }
    } catch (e: any) {
      console.log(e?.response?.data);
      Toast.show({
        type: "error",
        topOffset: insets.top + 10,
        text1: 'Error "liking" post',
        text2: 'Something went wrong while "liking" this post',
      });
    }
  };

  // handle commenting on posts
  const handleComment = async (postId: string, comment: string) => {
    // if user is not logged in, return
    if (!userSignature) return;

    await axios.post(
      `/contents/${postId}/comments`,
      { message: comment },
      {
        headers: {
          Authorization: `Signature ${userSignature?.publicKey}:${userSignature?.signature}`,
        },
      }
    );
  };

  return (
    <AppContext.Provider
      value={{
        uploading,
        uploadContent,

        handleLike,
        handleComment,

        usersPostQuery,

        editMedia,
        removeMedia,
        selectedMedia,
        startContentUpload,

        recentSearches,
        handleRecentSearches,

        searchQuery,
        handleSearch,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

interface ISearchQuery {
  data: RecentSearchCreator[] | null;
  loading: boolean;
  error: any;
}

interface AppContext {
  recentSearches: RecentSearches | null;
  handleRecentSearches: (
    search: RecentSearch,
    action: "add" | "delete"
  ) => void;

  searchQuery: {
    data: RecentSearchCreator[] | null;
    loading: boolean;
    error: any;
  };
  handleSearch: (search: string) => void;
  setSearchQuery: React.Dispatch<React.SetStateAction<ISearchQuery>>;

  uploading: boolean;
  selectedMedia: MediaType[];
  uploadContent: (
    caption: string,
    contentType: "free" | "paid",
    price: number
  ) => Promise<void>;
  removeMedia: (assetId?: string) => void;
  startContentUpload: () => Promise<void>;
  usersPostQuery: UseQueryResult<any, unknown>;
  editMedia: (action: string, assetId: string) => Promise<void>;
  handleComment: (postId: string, comment: string) => Promise<void>;
  handleLike: (postId: string, action: "like" | "unlike") => Promise<void>;
}

const AppContext = createContext({} as AppContext);
