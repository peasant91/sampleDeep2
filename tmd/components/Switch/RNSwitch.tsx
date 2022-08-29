/**
 * Created by Widiana Putra on 05/07/2022
 * Copyright (c) 2022 - Made with love
 */

import React, { useEffect, useState } from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import Animated, { interpolateColors, spring } from "react-native-reanimated";
import { useTheme } from "../../core/theming";
import color from "color";

interface Props {
  value: boolean;
  thumbColor?: string;
  inActiveThumbColor?: string;
  activeTrackColor?: string;
  inActiveTrackColor?: string;
  handleOnPress?: (value: boolean) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const RNSwitch = ({
                    activeTrackColor,
                    inActiveTrackColor,
                    thumbColor,
                    handleOnPress,
                    value,
                    disabled,
                    style,
                    ...rest
                  }: Props) => {

  const { colors } = useTheme();
  let usedThumbColor, usedActiveTrackColor, usedInactiveTrackColor, inactiveThumbColor;
  if (!disabled) {
    usedThumbColor = colors.neutral.neutral_10;
    inactiveThumbColor = colors.neutral.neutral_10;
    usedActiveTrackColor = colors.primary.main;
    usedInactiveTrackColor = colors.neutral.neutral_40;
  } else {
    usedThumbColor = color(colors.neutral.neutral_10).alpha(1).rgb().string();
    inactiveThumbColor = color(colors.neutral.neutral_50).alpha(1).rgb().string();
    usedActiveTrackColor = color(colors.primary.main).alpha(0.4).rgb().string();
    usedInactiveTrackColor = colors.neutral.neutral_40;
  }
  const [switchTranslate] = useState(new Animated.Value(0));

  useEffect(() => {
    if (value) {
      spring(switchTranslate, {
        toValue: 21,
        mass: 1,
        damping: 15,
        stiffness: 120,
        overshootClamping: false,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
      }).start();
    } else {
      spring(switchTranslate, {
        toValue: 0,
        mass: 1,
        damping: 15,
        stiffness: 120,
        overshootClamping: false,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
      }).start();
    }
  }, [value, switchTranslate]);

  const interpolateBackgroundColor = {
    backgroundColor: interpolateColors(switchTranslate, {
      inputRange: [0, 22],
      outputColorRange: [usedInactiveTrackColor, usedActiveTrackColor],
    }),
  };

  const memoizedOnSwitchPressCallback = React.useCallback(() => {
    if (!disabled) {
      if (handleOnPress) {
        handleOnPress(!value);
      }
    }
  }, [handleOnPress, value]);

  return (
    <Pressable onPress={memoizedOnSwitchPressCallback} style={style}>
      <Animated.View
        style={[styles.containerStyle, interpolateBackgroundColor]}
      >
        <Animated.View
          style={[
            styles.circleStyle,
            { backgroundColor: value ? usedThumbColor : inactiveThumbColor },
            {
              transform: [
                {
                  translateX: switchTranslate,
                },
              ],
            },
            styles.shadowValue,
          ]}
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  circleStyle: {
    width: 18,
    height: 18,
    borderRadius: 18,
  },
  containerStyle: {
    width: 44,
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderRadius: 36.5,
  },
  shadowValue: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});

export default RNSwitch;
