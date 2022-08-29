/**
 * Created by Widiana Putra on 31/05/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import { useTheme } from "../core/theming";
import { default as Ionicons } from "react-native-vector-icons/Ionicons";
import { StyleProp, TextStyle, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

//look icons here https://github.com/oblador/react-native-vector-icons#bundled-icon-sets
export interface IconProps {
  source?: "ionicons" | "material-community" | "fa-5";
  icon: string;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
}

const Icon = ({
                source = "ionicons", icon, size = 22, color, style,
              }: IconProps) => {
  const theme = useTheme();
  const defaultColor = theme.colors.neutral.neutral_90;
  return <View>
    {
      source == "material-community" &&
      <MaterialCommunityIcons style={style} name={icon} size={size} color={color ?? defaultColor} />
    }

    {
      source == "fa-5" &&
      <FontAwesome5 style={style} name={icon} size={size} color={color ?? defaultColor} />
    }

    {
      source == "ionicons" &&
      <Ionicons style={style} name={icon} size={size} color={color ?? defaultColor} />
    }
  </View>;
};

export default Icon;
