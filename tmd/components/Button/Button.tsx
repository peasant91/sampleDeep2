import * as React from "react";
import { ReactNode } from "react";
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import color from "color";

import CircularProgressBar from "../ProgressBar/CircularProgressBar";
import Surface from "../Surface";
import TouchableRipple from "../TouchableRipple/TouchableRipple";
import { black, red100, white } from "../../styles/colors";
import { useTheme } from "../../core/theming";
import Icon, { IconProps } from "../Icon";
import Typography, { TypographyType } from "../Typography/Typography";

export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type ButtonShape = "rect" | "rounded"
export type ButtonSize = "xs" | "sm" | "md" | "lg"

interface Props {
  /**
   * full width
   */
  fullWidth?: boolean;

  /**
   * shape
   */
  shape?: ButtonShape;

  /**
   * size
   */
  size?: ButtonSize;

  variant?: ButtonVariant;
  /**
   * Whether the color is a dark color. A dark button will render light text and vice-versa. Only applicable for `contained` mode.
   */
  dark?: boolean;
  /**
   * Use a compact look, useful for `text` buttons in a row.
   */
  compact?: boolean;
  /**
   * Custom text color for flat button, or background color for contained button.
   */
  color?: string;
  /**
   * Whether to show a loading indicator.
   */
  loading?: boolean;
  /**
   * Icon to display for the `Button`.
   */
  icon?: IconProps;
  iconNode?: ReactNode;
  /**
   * Whether the button is disabled. A disabled button is greyed out and `onPress` is not called on touch.
   */
  disabled?: boolean;
  /**
   * Label text of the button.
   */
  children: React.ReactNode;
  /**
   * Make the label text uppercased. Note that this won't work if you pass React elements as children.
   */
  uppercase?: boolean;
  /**
   * Accessibility label for the button. This is read by the screen reader when the user taps the button.
   */
  accessibilityLabel?: string;
  /**
   * Accessibility hint for the button. This is read by the screen reader when the user taps the button.
   */
  accessibilityHint?: string;
  /**
   * Function to execute on press.
   */
  onPress?: () => void;
  /**
   * Function to execute on long press.
   */
  onLongPress?: () => void;
  contentStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  /**
   * Style for the button text.
   */
  labelStyle?: StyleProp<TextStyle>;

  underline?: boolean;
  underlineStyle?: StyleProp<ViewStyle>;
  /**
   * testID to be used on tests.
   */
  testID?: string;
  suffixIcon?: IconProps;
}

const Button = ({
                  size,
                  shape,
                  fullWidth = false,
                  disabled,
                  compact,
                  variant,
                  dark,
                  loading,
                  icon,
                  color: buttonColor,
                  children,
                  uppercase = false,
                  accessibilityLabel,
                  accessibilityHint,
                  onPress,
                  onLongPress,
                  style,
                  contentStyle,
                  labelStyle,
                  testID,
                  accessible,
                  suffixIcon,
                  iconNode,
                  ...rest
                }: Props & React.ComponentProps<typeof Surface>) => {
  const theme = useTheme();
  const usedShape = shape ?? theme.button.shape;
  let marginSize = 8;

  const usedSize = size ?? theme.button.size;
  let defIconSize= 18
  switch (usedSize) {
    case "xs":
      marginSize = 4;
      defIconSize = 14
      break;
    case "sm":
      marginSize = 8;
      defIconSize = 14
      break;
    case "md":
      marginSize = 10;
      break;
    case "lg":
      marginSize = 12;
      break;
  }


  const { colors, roundness } = theme;
  const usedVariant = variant ?? theme.button.variant;
  let backgroundColor: string,
    borderColor: string,
    textColor: string,
    borderWidth: number;


  if (usedVariant === "primary") {
    if (disabled) {
      backgroundColor = color(theme.dark ? white : black)
        .alpha(0.12)
        .rgb()
        .string();
    } else if (buttonColor) {
      backgroundColor = buttonColor;
    } else {
      backgroundColor = colors.primary?.main;
    }
  } else {
    backgroundColor = "transparent";
  }

  if (usedVariant === "secondary") {
    borderColor = colors.primary?.main;
    borderWidth = 1;
  } else {
    borderColor = "transparent";
    borderWidth = 0;
  }

  if (disabled) {
    textColor = color(theme.dark ? white : black)
      .alpha(0.32)
      .rgb()
      .string();
    borderColor = colors.neutral.neutral_50;

  } else if (usedVariant === "primary") {
    let isDark;

    if (typeof dark === "boolean") {
      isDark = dark;
    } else {
      isDark =
        backgroundColor === "transparent"
          ? false
          : !color(backgroundColor).isLight();
    }

    textColor = isDark ? white : black;
  } else if (buttonColor) {
    textColor = buttonColor;
  } else {
    textColor = colors.primary.main;
  }

  const rippleColor = color(colors.primary.pressed).alpha(0.32).rgb().string();
  const buttonStyle = {
    backgroundColor,
    borderColor,
    borderWidth,
    borderRadius: usedShape == "rect"
      ? roundness
      : 24,
  };
  const touchableStyle = {
      borderRadius: usedShape == "rect"
        ? style
          ? ((StyleSheet.flatten(style) || {}) as ViewStyle).borderRadius ||
          roundness
          : roundness
        : 24,
    }
  ;

  const { color: customLabelColor, fontSize: customLabelSize } =
  StyleSheet.flatten(labelStyle) || {};

  const textStyle = { color: textColor };
  const isIconButton = !children && icon;
  const iconStyle = isIconButton
    ? { ...styles.iconButton, margin: marginSize }
    : styles.icon;

  let buttonType: TypographyType;
  switch (usedSize) {
    case "sm" : {
      buttonType = "button3";
      break;
    }
    case "md": {
      buttonType = "button2";
      break;
    }
    case "lg": {
      buttonType = "button1";
      break;
    }
  }
  return (

    <View style={
      [
        { display: "flex", flexDirection: fullWidth ? "column" : "row" },
        style,
        fullWidth ? {
          flex: 1,
        } : {},
      ]
    }>
      <Surface
        elevation={0}
        {...rest}
        style={[
          styles.button,
          compact && styles.compact,
          buttonStyle,
          rest.buttonStyle,
          fullWidth && { width: "100%" },
        ]}
      >
        <TouchableRipple
          borderless
          delayPressIn={0}
          onPress={onPress}
          onLongPress={onLongPress}
          accessibilityLabel={accessibilityLabel}
          accessibilityHint={accessibilityHint}
          // @ts-expect-error We keep old a11y props for backwards compat with old RN versions
          accessibilityTraits={disabled ? ["button", "disabled"] : "button"}
          accessibilityComponentType="button"
          accessibilityRole="button"
          accessibilityState={{ disabled }}
          accessible={accessible}
          disabled={disabled}
          rippleColor={rippleColor}
          style={[
            touchableStyle,
          ]}
          testID={testID}
        >
          <View>

            <View style={[
              { marginVertical: marginSize },
              styles.content,
              contentStyle,
            ]}>


              <>
                {loading && (
                  <View style={{ alignSelf: "center", marginRight: 8 }}>
                    <CircularProgressBar
                      size={customLabelSize ?? 16}
                      color={
                        typeof customLabelColor === "string"
                          ? customLabelColor
                          : textColor
                      }
                    />
                  </View>
                )
                }
                {icon ? (
                  <View style={[
                    iconStyle,
                  ]}>
                    <Icon
                      icon={icon.icon}
                      source={icon.source}
                      size={icon.size ?? customLabelSize ?? defIconSize}
                      color={icon.color ?? textColor}
                    />
                  </View>
                ) : null}

                {/*social media button*/}
                {
                  iconNode &&
                  <View style={[iconStyle]}>
                    {iconNode}
                  </View>
                }

                {
                  (!isIconButton) &&
                  <Typography
                    type={buttonType}
                    selectable={false}
                    numberOfLines={1}
                    style={[
                      styles.label,
                        uppercase && styles.uppercaseLabel,
                        textStyle,
                        labelStyle,
                        {},
                      ]}
                    >
                      {children}
                    </Typography>
                  }

                  {
                    suffixIcon &&
                    <View style={{ marginLeft: 8 }}>
                      <Icon
                        size={suffixIcon?.size ?? defIconSize}
                        color={suffixIcon?.color ?? textColor}
                        {...suffixIcon}
                      />
                    </View>
                  }
                </>


            </View>

            {rest?.underline &&
              <View
                style={[{
                  height: 1,
                  marginBottom: 2,
                  marginHorizontal: 2,
                  backgroundColor: textColor ?? colors.primary.main,
                },
                  rest.underlineStyle,
                ]
                }
              />
            }
          </View>
        </TouchableRipple>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderStyle: "solid",
  },
  compact: {
    minWidth: "auto",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
  },
  icon: {
    marginRight: 8,
  },
  iconReverse: {
    marginLeft: 8,
  },
  iconButton: {
    margin: 8,
  },
  label: {
    textAlign: "center",
  },
  compactLabel: {
    marginHorizontal: 8,
  },
  uppercaseLabel: {
    textTransform: "uppercase",
  },
});

// export const ButtonComponent = Button;
export default Button;
