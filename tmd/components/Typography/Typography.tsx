/**
 * Created by Widiana Putra on 25/05/2022
 * Copyright (c) 2022 - Made with love
 */
import { StyleProp, StyleSheet, TextStyle } from "react-native";
import * as React from "react";
import { useTheme } from "../../index";
import Text from "./Text";
import { normalizeSize } from "../../utils/normalizeSize";

export type TypographyType =
  "h1"
  | "h2"
  | "h3"
  | "title1"
  | "title2"
  | "title3"
  | "label1"
  | "label2"
  | "label3"
  | "body1"
  | "body2"
  | "body3"
  | "body4"
  | "button1"
  | "button2"
  | "button3"

interface Props {
  style?: StyleProp<TextStyle>;
  type?: TypographyType;
}

const Typography = ({ style, type, ...rest }: Props & React.ComponentProps<typeof Text>) => {
  const theme = useTheme();

  let fontSize = 14;
  let lineHeight = 20;
  let spacing = 0;
  let fontTheme = theme.fonts.medium;
  const usedType = type ?? "body2";
  switch (usedType) {
    case "h1": {
      fontSize = 32;
      lineHeight = 40;
      break;
    }
    case "h2": {
      fontSize = 28;
      lineHeight = 36;
      break;
    }
    case "h3": {
      fontSize = 24;
      lineHeight = 32;
      break;
    }
    case "title1": {
      fontSize = 20;
      lineHeight = 26;
      break;
    }
    case "title2": {
      fontSize = 18;
      lineHeight = 24;
      break;
    }
    case "title3": {
      fontSize = 16;
      lineHeight = 24;
      break;
    }
    case "label1": {
      fontSize = 14;
      lineHeight = 20;
      spacing = 0.1;
      break;
    }
    case "label2": {
      fontSize = 12;
      lineHeight = 16;
      spacing = 0.1;
      break;
    }
    case "label3": {
      fontSize = 10;
      lineHeight = 14;
      spacing = 0.1;
      break;
    }

    case "body1": {
      fontSize = 16;
      lineHeight = 24;
      fontTheme = theme.fonts.regular;
      break;
    }
    case "body2": {
      fontSize = 14;
      lineHeight = 20;
      fontTheme = theme.fonts.regular;
      break;
    }
    case "body3": {
      fontSize = 12;
      lineHeight = 16;
      spacing = 0.1;
      fontTheme = theme.fonts.regular;
      break;
    }
    case "body4": {
      fontSize = 10;
      lineHeight = 14;
      fontTheme = theme.fonts.regular;
      break;
    }
    case "button1": {
      fontSize = 16;
      lineHeight = 24;
      break;
    }
    case "button2": {
      fontSize = 14;
      lineHeight = 20;
      break;
    }
    case "button3": {
      fontSize = 12;
      lineHeight = 16;
      break;
    }
  }


  return (
    <Text
      {...rest}
      style={[
        {
          color: theme.colors.neutral.neutral_90,
          letterSpacing: spacing,
          fontSize: normalizeSize(fontSize),
          ...fontTheme,
        },
        type ? {
          lineHeight: lineHeight,
        } : {},
        styles.text,
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: "left",
  },
});

export default Typography;
