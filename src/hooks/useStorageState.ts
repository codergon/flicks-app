import * as React from "react";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

type UseStateHook<T> = [[boolean, T | null], (value?: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null]
): UseStateHook<T> {
  return React.useReducer(
    (state: [boolean, T | null], action: T | null = null) => [false, action],
    // @ts-ignore
    initialValue
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: any) {
  if (Platform.OS === "web") {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (e) {
      console.error("Local storage is unavailable:", e);
    }
  } else {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, JSON.stringify(value));
    }
  }
}

export function useStorageState<T>(key: string): UseStateHook<T> {
  const [state, setState] = useAsyncState<T>();

  // Get
  React.useEffect(() => {
    if (Platform.OS === "web") {
      try {
        if (typeof localStorage !== "undefined") {
          setState(JSON.parse(localStorage.getItem(key) || ""));
        }
      } catch (e) {
        console.error("Local storage is unavailable:", e);
      }
    } else {
      SecureStore.getItemAsync(key).then((value) => {
        setState(value === null ? null : JSON.parse(value));
      });
    }
  }, [key]);

  // Set
  const setValue = React.useCallback(
    (value?: T | null) => {
      setStorageItemAsync(key, value || null).then(() => {
        setState(value);
      });
    },
    [key]
  );

  return [state, setValue];
}
