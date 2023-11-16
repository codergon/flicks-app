import axios from "axios";
import { nanoid } from "nanoid";
import { router } from "expo-router";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { useAccount } from "./AccountProvider";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import { PresignedUrlResponse } from "typings/api";
import * as Notifications from "expo-notifications";
import ImageCompressor from "react-native-compressor";
import * as VideoThumbnails from "expo-video-thumbnails";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useLargeStorageState } from "hooks/useLargeStorageState";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import {
  useRef,
  useState,
  useEffect,
  ReactNode,
  useContext,
  createContext,
} from "react";
import {
  RecentSearch,
  RecentSearches,
  RecentSearchCreator,
} from "typings/common";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function schedulePushNotification({
  title,
  body,
  data,
}: Notifications.NotificationContentInput) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
      // data: { data: "notification data" },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  try {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      // alert("Failed to get push token for push notification!");
      return;
    }

    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas.projectId,
      })
    ).data;
  } catch (error) {
    console.log(error);
  }

  return token;
}

const AppProvider = ({ children }: AppProviderProps) => {
  const insets = useSafeAreaInsets();
  const { userSignature, userData } = useAccount();

  // State
  const [uploading, setUploading] = useState(false);
  const [currentUpload, setCurrentUpload] = useState<{
    price?: number;
    caption: string;
    contentType: "free" | "paid";
  } | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string[]>([]);
  const [uploadError, setUploadError] = useState<any>(null);

  const [selectedMedia, setSelectedMedia] = useState<MediaType[]>([]);

  const [[_, recentSearches], setRecentSearches] =
    useLargeStorageState<RecentSearches>("recentSearches");

  // push notifications
  const responseListener = useRef<Notifications.Subscription>();
  const notificationListener = useRef<Notifications.Subscription>();
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);

  // register for push notifications
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token || "")
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification as any);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current as Notifications.Subscription
      );
      Notifications.removeNotificationSubscription(
        responseListener.current as any
      );
    };
  }, []);

  // handle searching for creators
  const [searchQuery, setSearchQuery] = useState<ISearchQuery>({
    data: null,
    loading: false,
    error: null,
  });

  const handleSearch = async (search: string) => {
    setSearchQuery((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const { data } = await axios.get("/creators/search", {
        params: {
          q: search,
        },
        headers: {
          Authorization: `Signature ${userSignature}`,
        },
      });

      setSearchQuery((prev) => ({ ...prev, data: data?.data }));

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
    ["account-posts", userSignature],
    async () =>
      axios
        .get(`/contents/creators/${userSignature}`, {
          headers: {
            Authorization: `Signature ${userSignature}`,
          },
        })
        .then((res) => res.data?.data?.results),
    {
      enabled: !!userData?.address && !!userSignature,
    }
  );

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

  // Start content upload
  const startContentUpload = async () => {
    if (uploading) {
      Toast.show({
        type: "warning",
        topOffset: insets.top + 10,
        text1: "Upload in progress",
        text2:
          "Please wait for the current upload to complete before starting a new one",
      });

      return;
    }

    // Prompt user to select media
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      aspect: [4, 3],
      selectionLimit: 4,
      orderedSelection: true,
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      presentationStyle: ImagePicker.UIImagePickerPresentationStyle.FULL_SCREEN,
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

  // Upload content
  const uploadContent = async (
    caption: string,
    contentType: "free" | "paid",
    price: number,
    isRetry: boolean = false
  ) => {
    let success = false;
    try {
      setUploading(true);
      setUploadError(null);

      setCurrentUpload({
        contentType,
        caption: caption ?? "✨",
        ...(contentType === "paid" && { price }),
      });
      if (!isRetry) router.replace("/(tabs)/(account)/account");

      setUploadStatus(["Compresing media..."]);

      // compress media
      const compressedMedia = await Promise.all(
        selectedMedia.map(async (item) => {
          if (
            (item?.type === "image" &&
              (item?.fileSize || 0) < 1024 * 1024 * 4.5) ||
            (item?.type === "video" &&
              (item?.fileSize || 0) < 1024 * 1024 * 188)
          ) {
            return item;
          } else {
            const result = await ImageCompressor?.[
              item?.type === "video" ? "Video" : "Image"
            ].compress(item?.uri);
            const size = await ImageCompressor.getFileSize(result);
            return {
              ...item,
              uri: result,
              fileSize: Number(size),
            };
          }
        })
      );

      setUploadStatus((prev) => [...prev, "Getting upload urls..."]);

      // Get presigned urls
      const { data: responseData } = await axios.post(
        "/contents/get-upload-urls",
        {
          files: compressedMedia.map((item) => ({
            file_type: item.type,
            file_name: item.fileName,
          })),
        },
        {
          headers: {
            Authorization: `Signature ${userSignature}`,
          },
        }
      );

      const { data }: { data: PresignedUrlResponse } = responseData;

      setUploadStatus((prev) => [...prev, "Uploading media..."]);

      // Upload media to presigned urls
      const uploadPromises = compressedMedia.map(async (item, index) => {
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

      setUploadStatus((prev) => [...prev, "Uploading content..."]);

      const contentData = {
        ...(contentType === "paid" && { price }),
        caption: caption ?? "✨",
        content_type: contentType,
        media: compressedMedia.map((item) => ({
          media_type: item.type,
          s3_key: data?.[item.fileName ?? ""]?.fields?.key,
        })),
      };

      // Create content
      await axios.post("/contents/", contentData, {
        headers: {
          Authorization: `Signature ${userSignature}`,
        },
      });

      setUploadStatus((prev) => [...prev, "Upload complete! Refreshing..."]);

      // refetch user data
      await usersPostQuery.refetch();

      success = true;

      // reset state
      setSelectedMedia([]);
      setCurrentUpload(null);
    } catch (e: any) {
      console.log(e?.response?.data);
      setUploadError(e?.response?.data);
      Toast.show({
        type: "error",
        topOffset: insets.top + 10,
        text1: "Error uploading post",
        text2: "Try selecting a smaller media",
      });
    } finally {
      setUploading(false);
      if (success) {
        await schedulePushNotification({
          title: "Upload complete!",
          body: "Your content is now live",
        });
      }
    }
  };

  const cancelUpload = () => {
    setUploadError(null);
    setSelectedMedia([]);
    setCurrentUpload(null);
    setUploading(false);
    setUploadStatus([]);
  };

  // handle liking and unliking of posts
  const handleLike = async (postId: string, action: "like" | "unlike") => {
    try {
      // if user is not logged in, return
      if (!userSignature) return;

      if (action === "like") {
        await axios.post(`/contents/${postId}/likes`, undefined, {
          headers: {
            Authorization: `Signature ${userSignature}`,
          },
        });
      } else {
        await axios.delete(`/contents/${postId}/likes`, {
          headers: {
            Authorization: `Signature ${userSignature}`,
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
          Authorization: `Signature ${userSignature}`,
        },
      }
    );
  };

  return (
    <AppContext.Provider
      value={{
        handleLike,
        handleComment,

        usersPostQuery,

        uploading,
        uploadStatus,
        uploadContent,
        currentUpload,
        uploadError,
        cancelUpload,

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

  uploadError: any;
  cancelUpload: () => void;
  uploadStatus: string[];
  currentUpload: {
    price?: number;
    caption: string;
    contentType: "free" | "paid";
  } | null;

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
    price: number,
    isRetry?: boolean
  ) => Promise<void>;
  removeMedia: (assetId?: string) => void;
  startContentUpload: () => Promise<void>;
  usersPostQuery: UseQueryResult<any, unknown>;
  editMedia: (action: string, assetId: string) => Promise<void>;
  handleComment: (postId: string, comment: string) => Promise<void>;
  handleLike: (postId: string, action: "like" | "unlike") => Promise<void>;
}

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

const AppContext = createContext({} as AppContext);
