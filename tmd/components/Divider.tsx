import * as React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { useTheme } from "../core/theming";

interface Props {
  variant?: "solid" | "dotted";
  size?: "xs" | "sm" | "md" | "lg";
}

export default function Divider({ variant, size = "xs", ...props }: Props & React.ComponentProps<typeof View>) {
  const theme = useTheme();
  const { colors } = theme;
  let borderWidth = 1;
  switch (size) {
    case "xs": {
      borderWidth = 1;
      break;
    }
    case "sm": {
      borderWidth = 5;
      break;
    }
    case "md": {
      borderWidth = 6;
      break;
    }
    case "lg": {
      borderWidth = 8;
      break;
    }
  }

  const _s = StyleSheet.create({
    androidDivider: {
      borderStyle: variant == "dotted" ? "dotted" : "solid",
      borderTopWidth: borderWidth,
      borderColor: colors.neutral.neutral_40
    },

    iosDivider: {
      borderWidth: 1,
      backgroundColor: colors.neutral.neutral_40,
    }
  })
  
  return <View
    style={[
      (Platform.OS == "android") ? _s.androidDivider : _s.iosDivider,
      props.style,
    ]}
  >
  </View>;

}

