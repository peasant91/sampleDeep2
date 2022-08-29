import React from "react";
import { StyleProp, TextStyle, View, ViewStyle } from "react-native";
import { useTheme } from "../../core/theming";
import Typography, { TypographyType } from "../Typography/Typography";

export type BadgeVariant = "success" | "warning" | "primary" | "danger" | "info"
export type BadgeSize = "sm" | "md" | "lg";
export type BadgeShape = "rect" | "rounded"
export type BadgeType = "alert" | "label"

interface Props {
  label?: string;
  size?: BadgeSize;
  variant?: BadgeVariant;
  shape?: BadgeShape;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  type?: BadgeType;
}

const ROUNDED_SHAPE = 32;

export default function Badge({ label, size, variant, shape, style, textStyle, type = "label" }: Props) {
  const theme = useTheme();
  const { colors, roundness, badge } = theme;
  const usedSize = size ?? badge?.size;
  let typoType: TypographyType;
  let sizeAlert = 10;
  switch (usedSize) {
    case "sm": {
      typoType = "label3";
      sizeAlert = 6;
      break;
    }
    case "md": {
      typoType = "label2";
      sizeAlert = 8;
      break;
    }
    case "lg": {
      typoType = "label1";
      sizeAlert = 10;
      break;
    }
  }

  let borderRadius = roundness;

  if ((shape && shape == "rounded")) {
    borderRadius = ROUNDED_SHAPE;
  } else if (!shape && badge.shape == "rounded") {
    borderRadius = ROUNDED_SHAPE;
  }

  const usedVariant = variant ?? badge?.variant;
  let bgColor = colors[usedVariant]["main"];
  let textColor = colors.neutral.neutral_10;

  return (
    <View style={[{
      backgroundColor: bgColor,
      borderRadius: borderRadius,
      alignSelf: "baseline",
      minHeight: 15,
      minWidth: 15,
      alignItems: "center",
      justifyContent: "center",
    },
      type == "label" && {
        paddingHorizontal: 8,
        paddingVertical: 4,
      },
      type == "alert" && {
        paddingHorizontal: 6,
        paddingVertical: 6,
      },
      style]}>
      {
        type == "label" &&
        <Typography
          type={typoType}
          style={[{
            color: textColor,
          }, textStyle]}>
          {label}
        </Typography>
      }
      {
        type == "alert" &&
        <View style={{
          height: sizeAlert, width: sizeAlert, borderRadius: sizeAlert / 2, backgroundColor: textColor,
        }}>
        </View>
      }
    </View>
  );
}
