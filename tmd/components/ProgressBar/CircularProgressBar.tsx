import * as React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { useTheme } from "../../core/theming";
import * as Progress from "react-native-progress";

type Props = React.ComponentPropsWithRef<typeof View> & {
  /**
   * Whether to show the indicator or hide it.
   */
  animating?: boolean;
  /**
   * The color of the spinner.
   */
  color?: string;
  /**
   * Size of the indicator.
   */
  size?: "sm" | "md" | "lg" | number;
  /**
   * Whether the indicator should hide when not animating.
   */
  hidesWhenStopped?: boolean;
  style?: StyleProp<ViewStyle>;
  /**
   * @optional
   */
};

const DURATION = 2400;

/**
 * Activity indicator is used to present progress of some activity in the app.
 * It can be used as a drop-in for the ActivityIndicator shipped with React Native.
 *
 * <div class="screenshots">
 *   <img src="screenshots/activity-indicator.gif" style="width: 100px;" />
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { ActivityIndicator, Colors } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <ActivityIndicator animating={true} color={Colors.red800} />
 * );
 *
 * export default MyComponent;
 * ```
 */
const CircularProgressBar = ({
                             animating = true,
                             color: indicatorColor,
                             hidesWhenStopped = true,
                             size: indicatorSize = "sm",
                             style,
                             ...rest
                           }: Props) => {
  const theme = useTheme();

  const color = indicatorColor ?? theme.colors.primary.main;

  let size = 24;
  if (typeof indicatorSize === "string") {
    switch (indicatorSize) {
      case "sm": {
        size = 24;
        break;
      }
      case "md": {
        size = 36;
        break;
      }
      case "lg": {
        size = 48;
        break;
      }
    }
  } else {
    size = indicatorSize ? indicatorSize : 24;
  }
  return (
    <View style={[
      {
        alignSelf: "center",
      },
      style]}>
      <Progress.CircleSnail
        color={color}
        strokeCap={"round"}
        indeterminate={true}
        spinDuration={1500}
        size={size}
        animating={true}
        thickness={size / 12}
        {...rest}
      />

    </View>
  );
};

export default CircularProgressBar;
