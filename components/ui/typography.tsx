import { InputProps, NormalText, TextInput, TextProps } from "./themed";

export function LightText(props: TextProps) {
  return (
    <NormalText
      {...props}
      style={[props.style, { fontFamily: "DMSans-Regular" }]}
    />
  );
}

export function RgText(props: TextProps) {
  return (
    <NormalText
      {...props}
      style={[props.style, { fontFamily: "DMSans-Medium" }]}
    />
  );
}

export function Text(props: TextProps) {
  return (
    <NormalText
      {...props}
      style={[props.style, { fontFamily: "AcidGrotesk-Medium" }]}
    />
  );
}

export function BdText(props: TextProps) {
  return (
    <NormalText
      {...props}
      style={[
        props.style,
        { fontFamily: "AcidGrotesk-Medium", fontWeight: "900" },
      ]}
    />
  );
}

export function InputRg(props: InputProps) {
  return (
    <TextInput
      {...props}
      style={[props.style, { fontFamily: "DMSans-Regular" }]}
    />
  );
}

export function Input(props: InputProps) {
  return (
    <TextInput
      {...props}
      style={[props.style, { fontFamily: "AcidGrotesk-Medium" }]}
    />
  );
}

export function InputBd(props: InputProps) {
  return (
    <TextInput
      {...props}
      style={[
        props.style,
        { fontFamily: "AcidGrotesk-Medium", fontWeight: "900" },
      ]}
    />
  );
}
