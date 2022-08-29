import * as React from "react";
import { useEffect } from "react";
import { Animated, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import color from "color";
import TouchableRipple from "../TouchableRipple/TouchableRipple";
import { useTheme } from "../../core/theming";
import type { $RemoveChildren } from "../../types";
import Icon from "../Icon";
import Typography from "../Typography/Typography";

type Props = $RemoveChildren<typeof TouchableRipple> & {
  /**
   * Status of checkbox.
   */
  checked?: boolean;
  indeterminate?: boolean;
  text?: string;
  /**
   * Whether checkbox is disabled.
   */
  disabled?: boolean;
  /**
   * Function to execute on press.
   */
  onPress?: () => void;
  /**
   * Custom color for unchecked checkbox.
   */
  uncheckedColor?: string;
  /**
   * Custom color for checkbox.
   */
  color?: string;
  /**
   * testID to be used on tests.
   */
  testID?: string;

  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onCheckedChange?: (checked: boolean) => void;
  value?: string | number;

};

// From https://material.io/design/motion/speed.html#duration
const ANIMATION_DURATION = 100;

/**
 * Checkboxes allow the selection of multiple options from a set.
 * This component follows platform guidelines for Android, but can be used
 * on any platform.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img src="screenshots/checkbox-enabled.android.png" />
 *     <figcaption>Enabled</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/checkbox-disabled.android.png" />
 *     <figcaption>Disabled</figcaption>
 *   </figure>
 * </div>
 */
const Checkbox = ({
                    disabled,
                    onPress,
                    checked,
                    indeterminate,
                    testID,
                    value,
                    ...rest
                  }: Props) => {
  const { current: scaleAnim } = React.useRef<Animated.Value>(
    new Animated.Value(1),
  );
  const isFirstRendering = React.useRef<boolean>(true);
  const theme = useTheme();
  const {
    animation: { scale },
    colors,
    roundness,
  } = theme;

  React.useEffect(() => {
    // Do not run animation on very first rendering
    if (isFirstRendering.current) {
      isFirstRendering.current = false;
      return;
    }

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.85,
        duration: checked ? ANIMATION_DURATION * scale : 0,
        useNativeDriver: false,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: checked
          ? ANIMATION_DURATION * scale
          : ANIMATION_DURATION * scale * 1.75,
        useNativeDriver: false,
      }),
    ]).start();
  }, [checked, scaleAnim, scale]);

  useEffect(() => {
    if (rest.onCheckedChange) {
      rest.onCheckedChange(checked ?? false);
    }
  }, [checked]);


  const unchecked = !checked && !indeterminate;
  const checkedColor = rest.color || colors.neutral.neutral_10;
  const uncheckedColor =
    rest.uncheckedColor ||
    color(colors.neutral.neutral_80)
      .alpha(theme.dark ? 0.7 : 0.54)
      .rgb()
      .string();

  let rippleColor, checkboxColor, bgColor, borderColor;
  bgColor = colors.neutral.neutral_10;
  borderColor = colors.neutral.neutral_50;

  if (disabled) {
    rippleColor = color(theme.colors.text).alpha(0.16).rgb().string();
    checkboxColor = theme.colors.neutral.neutral_10;
    bgColor = theme.colors.disabled;
  } else {
    rippleColor = color(checkedColor).fade(0.32).rgb().string();
    if (unchecked) {
      checkboxColor = theme.colors.primary.main;
    }
    if (checked) {
      bgColor = theme.colors.primary.main;
      checkboxColor = checkedColor;
    }
    if (indeterminate) {
      bgColor = colors.neutral.neutral_10;
      checkboxColor = colors.primary.main;
    }
  }

  const borderWidth = scaleAnim.interpolate({
    inputRange: [0.8, 1],
    outputRange: [7, 0],
  });

  const icon = indeterminate
    ? "square"
    : checked
      ? "checkmark"
      : "checkbox-blank-outline";

  return (
    <View style={
      [{
        flexDirection: "row",
        alignItems: "center",
      },
        rest.containerStyle,
      ]}>
      <TouchableRipple
        {...rest}
        borderless
        rippleColor={rippleColor}
        onPress={onPress}
        disabled={disabled}
        // @ts-expect-error We keep old a11y props for backwards compat with old RN versions
        accessibilityTraits={disabled ? ["button", "disabled"] : "button"}
        accessibilityComponentType="button"
        accessibilityRole="checkbox"
        accessibilityState={{ disabled, checked }}
        accessibilityLiveRegion="polite"
        style={styles.container}
        testID={testID}
      >
          <View style={[{
            backgroundColor: bgColor,
            borderRadius: roundness,
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
            width: 20,
            height: 20,
          }, checked ? {} : {
            borderWidth: 1,
            borderColor: borderColor,
          }]

          }>
            {
              !unchecked &&
              <Icon
                size={
                  indeterminate ? 14 : 18
                }
                style={{
                  marginLeft: 1,
                }}
                // allowFontScaling={false}
                icon={icon}
                color={checkboxColor}
              />
            }
          </View>
      </TouchableRipple>
      {
        rest?.text &&
        <Typography type={"label1"} style={
          [
            {
              marginLeft: 6,
            },
            rest.textStyle]}>{rest?.text}</Typography>
      }
    </View>
  );
};


const styles = StyleSheet.create({
  container: {},
  fillContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  fill: {
    height: 17,
    width: 17,
  },
});

export default Checkbox;
