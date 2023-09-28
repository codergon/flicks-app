import { Pressable } from "../_ui/themed";
import { padding } from "helpers/styles";
import { InputRg } from "../_ui/typography";
import { View, StyleSheet } from "react-native";
import useColorScheme from "hooks/useColorScheme";
import { MagnifyingGlass, X } from "phosphor-react-native";

type SearchbarProps = {
  value: string;
  showMargin?: boolean;
  placeholder?: string;
  onFocus?: () => void;
  onChangeText: (text: string) => void;
};

const Searchbar = ({
  value,
  onFocus,
  placeholder,
  onChangeText,
  showMargin = true,
}: SearchbarProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const iconColor = isDark ? "#ddd" : "#666";
  const textColor = isDark ? "#fff" : "#000";
  const darken = isDark ? "#282828" : "#f2f2f2";

  return (
    <View
      style={[
        styles.searchbar,
        {
          backgroundColor: darken,
        },
      ]}
    >
      <View style={styles.searchbar__icon__cover}>
        <MagnifyingGlass
          size={16}
          weight="bold"
          color={iconColor}
          style={styles.searchbar__icon}
        />
      </View>

      <InputRg
        value={value}
        onFocus={onFocus}
        color={textColor}
        onChangeText={onChangeText}
        style={styles.searchbar__input}
        placeholder={placeholder ?? "Search for something..."}
        placeholderTextColor={iconColor}
      />

      {value && (
        <Pressable
          onPress={(_) => onChangeText("")}
          style={{
            ...styles.close__icon__cover,
            backgroundColor: isDark ? "#555" : "#d8d8d8",
          }}
        >
          <X size={13} weight="bold" color={iconColor} />
        </Pressable>
      )}
    </View>
  );
};

export default Searchbar;

const styles = StyleSheet.create({
  searchbar: {
    flex: 1,
    borderRadius: 10,
    ...padding(4, 12),
    overflow: "hidden",
    alignItems: "center",
    flexDirection: "row",
  },
  searchbar__icon__cover: { marginRight: 10, backgroundColor: "transparent" },
  close__icon__cover: {
    width: 24,
    marginLeft: 10,
    marginRight: 0,
    aspectRatio: 1,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  searchbar__icon: { width: 19, height: 19 },
  searchbar__input: {
    flex: 1,
    height: 30,
    fontSize: 14,
  },
});
