import * as ImagePicker from "expo-image-picker";
import { useState, ReactNode, useContext, createContext } from "react";

type AppProviderProps = {
  children: ReactNode;
};

interface AppContext {
  loading: boolean;

  startContentUpload: () => Promise<void>;
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

  const [media, setMedia] = useState<any[]>([]);
  const startContentUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      orderedSelection: true,
      presentationStyle: ImagePicker.UIImagePickerPresentationStyle.FULL_SCREEN,
      allowsMultipleSelection: true,
    });

    console.log(result);

    // if (!result.canceled) {
    //   setMedia((m) => [...m, result.uri]);
    // }
  };

  return (
    <AppContext.Provider
      value={{
        loading,

        startContentUpload,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
