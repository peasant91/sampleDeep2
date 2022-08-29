import React, { useEffect, useRef } from "react";
import { Animated, Platform, StyleProp, StyleSheet, View, ViewProps, ViewStyle } from "react-native";
import Color from "color";
import { useTheme } from "../../core/theming";

export type SkeletonAnimation = "none" | "pulse" | "wave";

export interface SkeletonProps extends ViewProps {
  /**
   * show circular variant
   */
  circle?: boolean;
  /**
   * Width of Skeleton View
   */
  width?: number;
  /**
   * Height of Skeleton View
   * @default 12
   */
  height?: number;
  /**
   * Type of animation
   */
  animation?: SkeletonAnimation;
  /**
   * Custom style for skeleton gradient
   */
  skeletonStyle?: StyleProp<ViewStyle>;
  /**
   * Custom Linear Gradient Component
   * @type React Component
   */
  LinearGradientComponent?: React.ComponentType<any>;
  borderRadius?: number;
}

/**
 * A placeholder preview for content before the data gets loaded, an alternative for spinners.
 *
 * @usage
 *
 * ### Variants
 * The component supports 2 shape variants, i.e. `circle`, `rectangle`.
 * ```tsx live
 * <Skeleton width={120} height={40} />
 * <Skeleton circle width={40} height={40} />
 * ```
 * ### Animations
 * By default, the skeleton pulsates, but you can change the animation to a wave or disable it entirely.
 * ```tsx live
 * <Skeleton animation="pulse"width={80} height={40} />
 * <Skeleton LinearGradientComponent={LinearGradient} animation="wave"width={80} height={40} />
 * <Skeleton animation="none"width={80} height={40} />
 * ```
 *
 */
export default function Skeleton({
                                   circle,
                                   width = "100%",
                                   height,
                                   animation,
                                   style,
                                   skeletonStyle,
                                   LinearGradientComponent,
                                   borderRadius,
                                   ...rest
                                 }: SkeletonProps) {
  const theme = useTheme();
  const { colors, skeleton } = theme;
  const usedAnimation = animation ?? skeleton.animation;
  const usedBorderRadios = borderRadius ?? skeleton.borderRadius;
  const animationRef = useRef(new Animated.Value(0));
  const animationLoop = useRef<Animated.CompositeAnimation>();

  const [layoutWidth, setLayoutWidth] = React.useState<number>(0);

  useEffect(() => {
    animationLoop.current = Animated.timing(animationRef.current, {
      toValue: 2,
      delay: 400,
      duration: 1500,
      useNativeDriver: !!Platform.select({
        web: false,
        native: true,
      }),
    });
    animationRef.current.setValue(0);
    Animated.loop(animationLoop.current).start();
  }, []);

  return (
    <View
      accessibilityRole="none"
      accessibilityLabel="loading..."
      accessible={false}
      testID="RNE__Skeleton"
      onLayout={({ nativeEvent }) => {
        setLayoutWidth(nativeEvent.layout.width);
      }}
      style={[
        styles.container,
        {
          width: width,
          height: height || 12,
          backgroundColor: colors?.neutral.neutral_40,
        },
        usedBorderRadios ? { borderRadius: usedBorderRadios } : {},
        circle && {
          borderRadius: 50,
          height: height || width,
        },
        style,
      ]}
      {...rest}
    >
      {usedAnimation !== "none" && (
        <Animated.View
          style={[
            styles.skeleton,
            !LinearGradientComponent && {
              backgroundColor: Color(colors?.neutral.neutral_40)
                .darken(0.1)
                .rgb()
                .string(),
            },
            usedAnimation === "pulse" && {
              width: "100%",
              opacity: animationRef.current.interpolate({
                inputRange: [0, 1, 2],
                outputRange: [1, 0, 1],
              }),
            },
            usedAnimation === "wave" && {
              transform: [
                {
                  translateX: animationRef.current.interpolate({
                    inputRange: [0, 2],
                    outputRange: [-layoutWidth * 2, layoutWidth * 2],
                  }),
                },
              ],
            },
            skeletonStyle,
          ]}
        >
          {LinearGradientComponent && (
            <LinearGradientComponent
              style={styles.skeleton}
              colors={[
                theme.colors.neutral.neutral_40,
                theme.colors.neutral.neutral_50,
                theme.colors.neutral.neutral_40,
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          )}
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: 2,
  },
  skeleton: {
    height: "100%",
  },
});
