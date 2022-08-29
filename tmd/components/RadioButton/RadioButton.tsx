import * as React from "react";
import { StyleProp, TextStyle, View, ViewStyle } from "react-native";
import RadioButtonAndroid from "./RadioButtonAndroid";
import { useTheme } from "../../core/theming";
import Typography from "../Typography/Typography";
import { RadioButtonContext, RadioButtonContextType } from "./RadioButtonGroup";

export type Props = {
  /**
   * Value of the radio button
   */
  value: string;
  /**
   * Status of radio button.
   */
  status?: "checked" | "unchecked";
  /**
   * Whether radio is disabled.
   */
  disabled?: boolean;
  /**
   * Function to execute on press.
   */
  onPress?: () => void;
  /**
   * Custom color for unchecked radio.
   */
  uncheckedColor?: string;
  /**
   * Custom color for radio.
   */
  color?: string;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * @optional
   */
  testID?: string;
};

/**
 * Radio buttons allow the selection a single option from a set.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img src="screenshots/radio-enabled.android.png" />
 *     <figcaption>Android (enabled)</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/radio-disabled.android.png" />
 *     <figcaption>Android (disabled)</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/radio-enabled.ios.png" />
 *     <figcaption>iOS (enabled)</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/radio-disabled.ios.png" />
 *     <figcaption>iOS (disabled)</figcaption>
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { View } from 'react-native';
 * import { RadioButton } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [checked, setChecked] = React.useState("first");
 *
 *   return (
 *     <View>
 *       <RadioButton
 *         value="first"
 *         status={ checked === 'first' ? 'checked' : 'unchecked' }
 *         onPress={() => setChecked("first")}
 *       />
 *       <RadioButton
 *         value="second"
 *         status={ checked === 'second' ? 'checked' : 'unchecked' }
 *         onPress={() => setChecked("second")}
 *       />
 *     </View>
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */
const RadioButton = ({ onPress, value, ...props }: Props) => {
  const theme = useTheme();
  const Button = RadioButtonAndroid;

  const parentComponentStyle: StyleProp<ViewStyle> = [{
    flexDirection: "row",
    alignItems: "center",
  }, props.containerStyle];

  return <>
    <RadioButtonContext.Consumer>
      {(context?: RadioButtonContextType) => {
        return (
          <View style={parentComponentStyle}>
            <Button color={props.color ?? theme.colors.primary.main} {...props} value={value} />
            {
              props.text &&
              <Typography
                type={"body2"}
                style={[{
                  color: theme.colors.neutral.neutral_90,
                },
                  props.textStyle,
                ]}>
                {
                  props.text
                }
              </Typography>
            }
          </View>
        );
      }}
    </RadioButtonContext.Consumer>

  </>;
};

export default RadioButton;

