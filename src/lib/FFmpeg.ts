// lib/FFmpeg.js
import {
  FFmpegKit,
  FFmpegKitConfig,
  ReturnCode,
} from "ffmpeg-kit-react-native";
import RNFS from "react-native-fs";

export const FRAME_PER_SEC = 1;
export const FRAME_WIDTH = 80;

class FFmpegWrapper {
  static getFrames(
    localFileName: string,
    videoURI: string,
    frameNumber: number,
    successCallback?: (outputImagePath: string) => void,
    errorCallback?: () => void
  ) {
    let outputImagePath = `${RNFS.CachesDirectoryPath}/${localFileName}_%4d.png`;
    const ffmpegCommand = `-ss 0 -i ${videoURI} -vf "fps=${FRAME_PER_SEC}/1:round=up,scale=${FRAME_WIDTH}:-2" -vframes ${frameNumber} ${outputImagePath}`;

    FFmpegKit.executeAsync(
      ffmpegCommand,
      async (session) => {
        const state = FFmpegKitConfig.sessionStateToString(
          await session.getState()
        );
        const returnCode = await session.getReturnCode();
        const failStackTrace = await session.getFailStackTrace();
        const duration = await session.getDuration();

        if (ReturnCode.isSuccess(returnCode)) {
          console.log(
            `Encode completed successfully in ${duration} milliseconds;.`
          );
          console.log(`Check at ${outputImagePath}`);
          successCallback && successCallback(outputImagePath);
        } else {
          console.log("Encode failed. Please check log for the details.");
          console.log(
            `Encode failed with state ${state} and rc ${returnCode}${
              failStackTrace ? "\\n" + failStackTrace : ""
            }`
          );
          errorCallback && errorCallback();
        }
      },
      (log) => {
        console.log(log.getMessage());
      },
      (statistics) => {
        console.log(statistics);
      }
    ).then((session) =>
      console.log(
        `Async FFmpeg process started with sessionId ${session.getSessionId()}.`
      )
    );
  }
}

export default FFmpegWrapper;
