import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import * as VideoThumbnails from "expo-video-thumbnails";
import { useState, ReactNode, useContext, createContext } from "react";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";

type AppProviderProps = {
  children: ReactNode;
};

export type MediaType = ImagePicker.ImagePickerAsset & {
  thumbnail?: string;
  edits?: string[];
};

interface AppContext {
  loading: boolean;

  selectedMedia: MediaType[];
  removeMedia: (assetId?: string) => void;
  startContentUpload: () => Promise<void>;
  editMedia: (action: string, assetId: string) => Promise<void>;
}

const AppContext = createContext({} as AppContext);

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
  const [loading, setLoading] = useState(false);

  const [selectedMedia, setSelectedMedia] = useState<MediaType[]>([]);

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

  return (
    <AppContext.Provider
      value={{
        loading,

        editMedia,
        removeMedia,
        selectedMedia,
        startContentUpload,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
