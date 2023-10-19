import { useState } from "react";
import * as Clipboard from "expo-clipboard";

const useClipboard = (): [boolean, (text: string) => Promise<void>] => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    setCopied(true);
    await Clipboard.setStringAsync(text);

    setTimeout(() => {
      setCopied(false);
    }, 1300);
  };

  return [copied, copyToClipboard];
};

export default useClipboard;
