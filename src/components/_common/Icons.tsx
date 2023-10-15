import { ViewProps } from "../_ui/themed";
import Svg, { Circle, ClipPath, Defs, G, Path, Rect } from "react-native-svg";

interface IconProps extends ViewProps {
  size?: number;
  fill?: string;
  color?: string;
  strokeWidth?: number;
}

const Icons = {
  Rotate: ({ color = "#000", size = 19 }) => {
    return (
      <Svg
        viewBox="0 0 30 32"
        style={{
          width: size,
          height: size * (32 / 30),
        }}
      >
        <Path
          fill={color}
          stroke={color}
          strokeWidth={0}
          strokeLinejoin="round"
          d="M4 30h12a2.002 2.002 0 0 0 2-2V16a2.002 2.002 0 0 0-2-2H4a2.002 2.002 0 0 0-2 2v12a2.002 2.002 0 0 0 2 2Zm12-14v12H3.999L4 16h12Zm1-14 1.41 1.41L15.83 6H21a7.008 7.008 0 0 1 7 7v5h-2v-5a5.006 5.006 0 0 0-5-5h-5.17l2.58 2.59L17 12l-5-5 5-5Z"
        />
      </Svg>
    );
  },

  Home: ({ color = "#999DA3", size = 19 }) => {
    return (
      <Svg
        fill="none"
        viewBox="0 0 19 19"
        style={{
          width: size,
          height: size,
        }}
      >
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="m6.965 1.699-4.58 3.569C1.62 5.862 1 7.128 1 8.088v6.296a3.59 3.59 0 0 0 3.577 3.586h9.84a3.588 3.588 0 0 0 3.576-3.577V8.207c0-1.028-.688-2.345-1.53-2.931l-5.25-3.679c-1.19-.833-3.101-.79-4.248.102ZM9.497 14.571v-2.549"
        />
      </Svg>
    );
  },

  Discover: ({ color = "#999DA3", size = 19 }) => {
    return (
      <Svg
        fill="none"
        viewBox="0 0 19 19"
        style={{
          width: size,
          height: size,
        }}
      >
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.3}
          d="m5.583 12.917 1.833-5.5 5.5-1.834-1.833 5.5-5.5 1.834Z"
        />
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.3}
          d="M9.25 17.5a8.25 8.25 0 1 0 0-16.5 8.25 8.25 0 0 0 0 16.5Z"
        />
      </Svg>
    );
  },

  Create: ({ color = "#999DA3", size = 26 }) => {
    return (
      <Svg
        fill="none"
        viewBox="0 0 26 26"
        style={{
          width: size,
          height: size,
        }}
      >
        <Path
          stroke={color}
          strokeWidth={1.3}
          d="M13 25.4c6.848 0 12.4-5.552 12.4-12.4C25.4 6.152 19.848.6 13 .6 6.15.6.6 6.152.6 13 .6 19.848 6.15 25.4 13 25.4Z"
        />
        <Path
          fill={color}
          d="M18 13a.417.417 0 0 1-.417.417h-4.166v4.166a.417.417 0 0 1-.834 0v-4.166H8.417a.416.416 0 1 1 0-.834h4.166V8.417a.416.416 0 1 1 .834 0v4.166h4.166A.417.417 0 0 1 18 13Z"
        />
      </Svg>
    );
  },

  Broadcast: ({ color = "#999DA3", size = 19 }) => {
    return (
      <Svg
        fill="none"
        viewBox="0 0 27 19"
        style={{
          width: size * (27 / 19),
          height: size,
        }}
      >
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.3}
          d="M13.287 13.104a3.509 3.509 0 1 0 0-7.018 3.509 3.509 0 0 0 0 7.018ZM19.172 4.331a7.889 7.889 0 0 1 0 10.527M7.402 14.858a7.889 7.889 0 0 1 0-10.527M22.06 1a12.269 12.269 0 0 1 0 17.19M4.514 18.19a12.269 12.269 0 0 1 0-17.19"
        />
      </Svg>
    );
  },

  Wallet: ({ color = "#999DA3", size = 19 }) => {
    return (
      <Svg
        fill="none"
        viewBox="0 0 19 19"
        style={{
          width: size,
          height: size,
        }}
      >
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={1.3}
          d="M11.923 12.9h-4.25"
        />
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.3}
          d="m10.562 1.44-.026.06-2.465 5.72H5.648c-.578 0-1.13.12-1.632.332L5.504 4l.034-.085.06-.136c.016-.05.033-.102.059-.144C6.77 1.058 8.028.47 10.562 1.44Z"
        />
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.3}
          d="M15.144 7.39a4.047 4.047 0 0 0-1.199-.17H8.071l2.466-5.72.025-.06c.128.043.247.102.374.153l1.879.791c1.045.434 1.776.884 2.218 1.428.085.102.153.196.213.306.076.12.136.238.17.366.034.076.06.153.076.22.23.715.094 1.59-.348 2.687Z"
        />
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.3}
          d="M18.095 11.37v1.657c0 .17-.008.34-.017.51-.162 2.967-1.82 4.463-4.964 4.463h-6.63c-.205 0-.409-.017-.604-.043-2.704-.178-4.149-1.623-4.327-4.326a4.693 4.693 0 0 1-.043-.604V11.37a4.16 4.16 0 0 1 2.516-3.817A4.21 4.21 0 0 1 5.66 7.22h8.296c.417 0 .825.06 1.199.17a4.168 4.168 0 0 1 2.941 3.979Z"
        />
        <Path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.3}
          d="M5.504 4 4.016 7.551A4.16 4.16 0 0 0 1.5 11.37V8.88a4.972 4.972 0 0 1 4.004-4.88ZM18.092 8.878v2.49c0-1.87-1.241-3.459-2.941-3.969.442-1.105.57-1.972.357-2.695a.971.971 0 0 0-.077-.22 4.95 4.95 0 0 1 2.661 4.394Z"
        />
      </Svg>
    );
  },
};

export default Icons;
