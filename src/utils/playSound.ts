import {
  Audio,
  Video,
  InterruptionModeIOS,
  InterruptionModeAndroid,
} from "expo-av";

const triggerAudio = async (ref: React.RefObject<Video>) => {
  await Audio.setAudioModeAsync({
    shouldDuckAndroid: false,
    allowsRecordingIOS: false,
    playsInSilentModeIOS: true,
    staysActiveInBackground: false,
    interruptionModeIOS: InterruptionModeIOS.DoNotMix,
    interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
  });
  ref?.current && ref.current.playAsync();
};

export default triggerAudio;
