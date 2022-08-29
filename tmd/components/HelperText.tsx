import * as React from "react";
import color from "color";
import { Animated, LayoutChangeEvent, StyleProp, StyleSheet, TextStyle } from "react-native";
import AnimatedText from "./Typography/AnimatedText";
import { useTheme } from "../core/theming";
import type { $Omit } from "../types";
import Typography from "./Typography/Typography";

type Props = $Omit<$Omit<React.ComponentPropsWithRef<typeof AnimatedText>, "padding">,
  "type"> & {
  /**
   * Type of the helper text.
   */
  type: "error" | "info";
  /**
   * Whether to display the helper text.
   */
  visible?: boolean;
  /**
   * Whether to apply padding to the helper text.
   */
  padding?: "none" | "normal";
  /**
   * Text content of the HelperText.
   */
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  /**
   * TestID used for testing purposes
   */
  testID?: string;
};

/**
 * Helper text is used in conjuction with input elements to provide additional hints for the user.
 *
 * <div class="screenshots">
 *   <img class="medium" src="screenshots/helper-text.gif" />
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { View } from 'react-native';
 * import { HelperText, TextInput } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [text, setText] = React.useState("");
 *
 *    const onChangeText = text => setText(text);
 *
 *   const hasErrors = () => {
 *     return !text.includes("@");
 *   };
 *
 *  return (
 *     <View>
 *       <TextInput label="Email" value={text} onChangeText={onChangeText} />
 *       <HelperText type="error" visible={hasErrors()}>
 *         Email address is invalid!
 *       </HelperText>
 *     </View>
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */
const HelperText = ({
                      style,
                      type = "info",
                      visible = true,
                      onLayout,
                      padding = "normal",
                      ...rest
                    }: Props) => {
  const theme = useTheme();
  const { current: shown } = React.useRef<Animated.Value>(
    new Animated.Value(visible ? 1 : 0),
  );

  let { current: textHeight } = React.useRef<number>(0);

  const { scale } = theme.animation;

  const { maxFontSizeMultiplier = 1.5 } = rest;

  React.useEffect(() => {
    if (visible) {
      // show text
      Animated.timing(shown, {
        toValue: 1,
        duration: 150 * scale,
        useNativeDriver: true,
      }).start();
    } else {
      // hide text
      Animated.timing(shown, {
        toValue: 0,
        duration: 180 * scale,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, scale, shown]);

  const handleTextLayout = (e: LayoutChangeEvent) => {
    onLayout?.(e);
    textHeight = e.nativeEvent.layout.height;
  };

  const { colors, dark } = theme;

  const textColor =
    type === "error"
      ? colors.error
      : color(colors.neutral.neutral_70)
        .rgb()
        .string();

  return (
    <Typography
      type={"body3"}
      onLayout={handleTextLayout}
      style={[
        styles.text,
        padding !== "none" ? styles.padding : {},
        {
          color: textColor,
        },
        style,
      ]}
      {...rest}
    >
      {rest.children}
    </Typography>
  );
};

const styles = StyleSheet.create({
  text: {
    paddingVertical: 0,
  },
  padding: {
    paddingHorizontal: 0,
  },
});

export default HelperText;
