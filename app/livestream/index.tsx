import styles from "./styles";
import { Image } from "expo-image";
import * as SystemUI from "expo-system-ui";
import { View } from "components/_ui/themed";
import StreamUpdates from "components/livestream/streamUpdates";
import LiveStreamHeader from "components/livestream/streamHeader";
import LiveStreamFooter from "components/livestream/streamFooter";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  IRtcEngine,
  ClientRoleType,
  RtcSurfaceView,
  ChannelProfileType,
  createAgoraRtcEngine,
} from "react-native-agora";
import { Fragment, useEffect, useRef, useState } from "react";
import { PermissionsAndroid, Platform, ScrollView } from "react-native";
import { useAccount } from "providers/AccountProvider";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { StreamDetails } from "typings/stream";
import { Text } from "components/_ui/typography";

const appId = "aef331efe8d54bc6ba78c459604a11d5";

const LiveStream = () => {
  const insets = useSafeAreaInsets();
  const { userSignature, userData } = useAccount();
  const { streamDetails } = useLocalSearchParams();
  const [streamData, setStreamData] = useState<StreamDetails | null>(null);

  const [streamId, setStreamId] = useState<number | undefined>();
  const agoraEngineRef = useRef<IRtcEngine>(); // Agora engine instance
  const [isHost, setIsHost] = useState(false); // Client role
  const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
  const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
  const [messages, setMessages] = useState<any[]>([]); // Message to the user

  const [numOfViewers, setNumOfViewers] = useState(0); // Number of viewers

  useEffect(() => {
    SystemUI.setBackgroundColorAsync("#000");
    const parseStream = () => {
      try {
        const parsed = JSON.parse(streamDetails as any);
        if (parsed) {
          setStreamData(parsed);
          setIsHost(parsed?.creator === userData?.id);
        }
      } catch (e: any) {
        console.log(e);
      }
    };
    parseStream();
  }, [streamDetails]);

  const { data } = useQuery(
    ["livestreams", streamData?.id],
    async () =>
      axios
        .get(`/contents/livestreams/${streamData?.id}/join`, {
          headers: {
            Authorization: `Signature ${userSignature}`,
          },
        })
        .then((res) => res.data?.data),
    {
      enabled: !!userSignature && !!streamData?.id,
    }
  );

  useEffect(() => {
    if (data && data?.token) {
      setupVideoSDKEngine();
    }
  }, [data]);

  const getPermission = async () => {
    if (Platform.OS === "android") {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
  };

  const setupVideoSDKEngine = async () => {
    try {
      // use the helper function to get permissions
      if (Platform.OS === "android") {
        await getPermission();
      }

      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;

      agoraEngine.registerEventHandler({
        onJoinChannelSuccess: () => {
          console.log("Successfully joined the channel " + data?.channel_name);
          setIsJoined(true);
        },
        onUserJoined: (_connection, Uid) => {
          setRemoteUid(Uid);
          setNumOfViewers((prev) => prev + 1);
        },
        onLeaveChannel: () => {
          setNumOfViewers((prev) => prev - 1);
        },
        onUserOffline: (_connection, Uid) => {
          console.log("Remote user left the channel. uid: " + Uid);
          setRemoteUid(0);
        },
        onStreamMessage: (uid, remoteUid, streamId, data) => {
          const decoder = new TextDecoder();
          console.log(decoder.decode(data));

          setMessages((prev) => [...prev, JSON.parse(decoder.decode(data))]);
        },
      });

      agoraEngine.initialize({
        appId,
        channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
      });

      agoraEngine.enableVideo();
      const streamID = agoraEngine.createDataStream({});

      setStreamId(streamID);

      await joinStream();
    } catch (e) {
      console.log(e);
    }
  };

  console.log(isJoined);

  const joinStream = async () => {
    if (isJoined) {
      return;
    }

    console.log("as host? - ", isHost);

    try {
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileLiveBroadcasting
      );
      if (isHost) {
        agoraEngineRef.current?.startPreview();
        agoraEngineRef.current?.joinChannelWithUserAccount(
          data?.token,
          data?.channel_name,
          data?.user_account,
          {
            clientRoleType: ClientRoleType.ClientRoleBroadcaster,
          }
        );
      } else {
        agoraEngineRef.current?.joinChannelWithUserAccount(
          data?.token,
          data?.channel_name,
          data?.user_account,
          {
            clientRoleType: ClientRoleType.ClientRoleAudience,
          }
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const exitStream = () => {
    try {
      agoraEngineRef.current?.leaveChannel();
      setRemoteUid(0);
      setIsJoined(false);
      console.log("You left the channel");
    } catch (e) {
      console.log(e);
    }
  };

  const sendChannelMessage = async (message = "") => {
    if (!streamId || !message?.trim()) return;

    const data = {
      message,
      user_name: userData?.moniker,
      user_image: userData?.image_url,
    };
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(JSON.stringify(data));

    try {
      agoraEngineRef.current?.sendStreamMessage(
        streamId,
        encodedData,
        encodedData.length
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <ScrollView
        horizontal
        bounces={false}
        keyboardShouldPersistTaps="never"
        contentContainerStyle={{
          width: "100%",
          height: "100%",
          flexDirection: "column",
        }}
      >
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <View style={{ width: "100%", height: "100%" }}>
              {isJoined && (
                <Fragment key={0}>
                  <RtcSurfaceView
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    canvas={{ uid: isHost ? 0 : remoteUid }}
                  />
                </Fragment>
              )}
            </View>

            <View
              style={[styles.streamContainer, { paddingTop: insets.top + 6 }]}
            >
              {/* Stream header */}
              <LiveStreamHeader isHost={isHost} exitStream={exitStream} />

              {/* Stream body */}
              <View style={[styles.streamBody]}>
                <View />

                {/* Stream updates */}
                <StreamUpdates messages={messages} />
              </View>
            </View>
          </View>
        </View>

        {/* Stream footer */}
        <LiveStreamFooter
          isHost={isHost}
          sendChannelMessage={sendChannelMessage}
        />
      </ScrollView>
    </>
  );
};

export default LiveStream;
