import React from "react";
import ReactTimeAgo from "react-time-ago";
import { Style } from "javascript-time-ago";
import { RgText, Text } from "components/_ui/typography";
import { TextStyle } from "react-native";
import { Dayjs } from "dayjs";

interface TimeProps {
  date: Date;
  tooltip: boolean;
  children: string;
  verboseDate?: string;
}
interface TimeAgoProps {
  textStyle?: TextStyle;
  timeStyle?: string | Style;
  date: Date | number;
}

const TimeAgo = ({
  date,
  timeStyle = "round-minute",
  textStyle,
}: TimeAgoProps) => {
  function Time({ date, verboseDate, tooltip, children }: TimeProps) {
    return <RgText style={textStyle}>{children}</RgText>;
  }

  return <ReactTimeAgo component={Time} timeStyle={timeStyle} date={date} />;
};

export default TimeAgo;
