import * as React from "react";
import { StyleProp, TextStyle, View, ViewStyle } from "react-native";
import Typography from "../Typography/Typography";
import RNSwitch from "./RNSwitch";

type Props = React.ComponentPropsWithRef<typeof RNSwitch> & {
  onChange?: (val: boolean) => void;
  style?: StyleProp<ViewStyle>;
  switchStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  text?: string;
  /**
   * @optional
   */
};

/**
 * Switch is a visual toggle between two mutually exclusive states — on and off.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img src="screenshots/switch-enabled.android.png" />
 *     <figcaption>Android (enabled)</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/switch-disabled.android.png" />
 *     <figcaption>Android (disabled)</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/switch-enabled.ios.png" />
 *     <figcaption>iOS (enabled)</figcaption>
 *   </figure>
 *   <figure>
 *     <img src="screenshots/switch-disabled.ios.png" />
 *     <figcaption>iOS (disabled)</figcaption>
 *   </figure>
 * </div>
 *
 */

const Switch = ({
                  value,
                  disabled,
                  onChange,
                  switchStyle,
                  textStyle,
                  style,
                  text,
                  ...rest
                }: Props) => {
  return (
    <View style={
      [
        {
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "flex-start",
        },
        style,
      ]
    }>
        <RNSwitch
          disabled={disabled}
          value={value}
          handleOnPress={disabled ? undefined : onChange}
          style={switchStyle}
          {...rest}
        />
      {text &&
        <Typography
          style={[
            { marginLeft: 8 },
            textStyle]}
          type={"body2"}>
          {text}
        </Typography>
      }
    </View>
  );
};

export default Switch;
