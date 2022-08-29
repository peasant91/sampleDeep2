import * as React from "react";
import { ReactNode } from "react";
import { GestureResponderEvent, StyleProp, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import color from "color";

import TouchableRipple from "./TouchableRipple/TouchableRipple";
import { useTheme } from "../core/theming";

import type { $RemoveChildren } from "../types";
import Icon from "./Icon";
import { ButtonShape, ButtonSize, ButtonVariant } from "./Button/Button";

type Props = $RemoveChildren<typeof TouchableRipple> & {
  /**
   * Whether the button is disabled. A disabled button is greyed out and `onPress` is not called on touch.
   */
  disabled?: boolean;
  /**
   * Accessibility label for the button. This is read by the screen reader when the user taps the button.
   */
  accessibilityLabel?: string;
  /**
   * Function to execute on press.
   */
  onPress?: (e: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  ref?: React.RefObject<TouchableWithoutFeedback>;
  fitIcon?: boolean;
  variant?: ButtonVariant;
  shape?: ButtonShape;
  color?: string;
  themeSize?: ButtonSize;
  iconNode?: ReactNode
  /**
   * @optional
   */
};

/**
 * An icon button is a button which displays only an icon without a label.
 * By default button has 150% size of the icon.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img src="screenshots/icon-button-1.png" />
 *     <figcaption>Icon button</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/icon-button-2.png" />
 *     <figcaption>Pressed icon button</figcaption>
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { IconButton, Colors } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <IconButton
 *     icon="camera"
 *     color={Colors.red500}
 *     size={20}
 *     onPress={() => console.log("Pressed")}
 *   />
 * );
 *
 * export default MyComponent;
 * ```
 *
 * @extends TouchableRipple props https://callstack.github.io/react-native-paper/touchable-ripple.html
 */
const IconButton = ({
                      icon,
                      color: iconColor,
                      size: iconSize,
                      accessibilityLabel,
                      disabled,
                      onPress,
                      style,
                      variant,
                      shape,
                      themeSize,
                      iconNode,
                      ...rest
                    }: Props & React.ComponentProps<typeof Icon>) => {
  const theme = useTheme();
  const { colors, roundness, button } = theme;

  const usedVariant = variant ?? button.variant;
  const usedShape = shape ?? button.shape;
  const usedSize = themeSize ?? button.size;


  let backgroundColor: string,
    borderColor: string,
    textColor: string,
    borderWidth: number,
    usedIconSize: number,
    calculateButtonSize: number;

  switch (usedSize) {
    case "xs" : {
      usedIconSize = 10;
      calculateButtonSize = 2.4;
      break
    }
    case "sm" : {
      usedIconSize = 12;
      calculateButtonSize = 2.6;
      break;
    }
    case "md": {
      usedIconSize = 20;
      calculateButtonSize = 1.7;

      break;
    }
    case "lg": {
      usedIconSize = 28;
      calculateButtonSize = 1.7;
      break;
    }
  }
  usedIconSize = iconSize ?? usedIconSize;

  switch (usedVariant) {
    case "primary": {
      if (disabled) {
        backgroundColor = colors.neutral.neutral_60;
        textColor = colors.neutral.neutral_10;
      } else {
        backgroundColor = colors.primary?.main;
        textColor = colors.neutral.neutral_10;
      }
      break;
    }
    case "secondary": {
      if (disabled) {
        backgroundColor = colors.neutral.neutral_10;
        textColor = colors.neutral.neutral_50;
      } else {
        backgroundColor = colors.neutral.neutral_10;
        textColor = colors.primary.main;
      }
      break;
    }
    case "tertiary": {
      if (disabled) {
        backgroundColor = colors.neutral.neutral_10;
        textColor = colors.neutral.neutral_50;
      } else {
        backgroundColor = colors.neutral.neutral_10;
        textColor = colors.primary.main;
      }
      break;
    }
  }

  const rippleColor = color(iconColor ? iconColor : colors.primary.pressed).alpha(0.32).rgb().string();
  const IconComponent = Icon;
  const buttonSize = rest.fitIcon ? usedIconSize : usedIconSize * calculateButtonSize;
  return (
    <TouchableRipple
      borderless
      centered
      onPress={onPress}
      rippleColor={rippleColor}
      style={[
        styles.container,
        { width: buttonSize, height: buttonSize, borderRadius: usedShape == "rect" ? roundness : buttonSize / 2 },
        {
          backgroundColor: backgroundColor,
        },
        usedVariant == "secondary" ? {
          borderWidth: 1,
          borderColor: iconColor ? iconColor : textColor,
        } : {},
        style,
      ]}
      accessibilityLabel={accessibilityLabel}
      // @ts-expect-error We keep old a11y props for backwards compat with old RN versions
      accessibilityTraits={disabled ? ["button", "disabled"] : "button"}
      accessibilityComponentType="button"
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      hitSlop={
        TouchableRipple.supported
          ? { top: 10, left: 10, bottom: 10, right: 10 }
          : { top: 6, left: 6, bottom: 6, right: 6 }
      }
      {...rest}
    >
      <View>
        {
          icon &&
          <IconComponent color={iconColor ? iconColor : textColor} icon={icon} size={usedIconSize}
                         source={rest.source} />
        }
        {
          iconNode &&
          <>
            {iconNode}
          </>
        }
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});

export default IconButton;
