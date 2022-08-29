import React from "react";
import Typography, { TypographyType } from "../Typography/Typography";
import LinearGradient from "react-native-linear-gradient";
import { useTheme } from "../../core/theming";
import { View } from "react-native";
import { Icon, Stack } from "../../index";
import { IconProps } from "../Icon";

export type RibbonVariant = "success" | "warning" | "primary" | "danger" | "info"
export type RibbonSize = "sm" | "md" | "lg"

interface Props {
  label?: string;
  icon?: IconProps;
  variant?: RibbonVariant;
  customGradient?: string[];
  footColor?: string;
  size?: RibbonSize;
  mirror?: boolean;
}

export default function Ribbon({ label, icon, variant, footColor, customGradient, size, mirror }: Props) {
  const { colors } = useTheme();
  const usedVariant = variant ?? "danger";
  const usedSize = size ?? "md";
  let gradientColors = [colors[usedVariant]["main"], colors[usedVariant]["hover"]];
  gradientColors = customGradient ?? gradientColors;
  let typoType: TypographyType;
  let iconSize: number;
  switch (usedSize) {
    case "sm": {
      typoType = "body3";
      iconSize = 14;
      break;
    }
    case "md": {
      typoType = "body2";
      iconSize = 16;
      break;
    }
    case "lg": {
      typoType = "body1";
      iconSize = 18;
      break;
    }
  }


  const TriangleCorner = () => {
    return <View style={
      {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderRightWidth: 12,
        marginLeft: -3,
        marginVertical: 3,
        borderTopWidth: 6,
        borderRightColor: "transparent",
        borderTopColor: footColor ?? colors[usedVariant]["pressed"],
        transform: [{ rotate: "90deg" }],
      }
    } />;
  };

  return (
    <View
      style={{
        transform: [{ scaleX: mirror ? -1 : 1 }],
      }}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={gradientColors}
        style={{
          paddingVertical: 4,
          paddingHorizontal: 10,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          borderTopLeftRadius: 6,
          alignSelf: "baseline",
        }}>
        <Stack spacing={4} direction={"row"} items={"center"} style={{
          transform: [{ scaleX: mirror ? -1 : 1 }],
        }}>
          <Typography style={{ color: "white" }} type={typoType}>{label}</Typography>
          {
            icon &&
            <Icon
              color={colors.neutral.neutral_10}
              size={iconSize}
              {...icon}
            />
          }
        </Stack>
      </LinearGradient>
      <TriangleCorner />
    </View>
  );
}
