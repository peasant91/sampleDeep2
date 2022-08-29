import React, { ComponentProps, useEffect, useMemo, useRef, useState } from "react";
import useLayout from "../../utils/useLayout";
import { Animated, Image as ImageFactory, View } from "react-native";
import { useTheme } from "../../core/theming";
import Icon from "../Icon";

interface Props {

}

export default function Image({ ...rest }: Props & ComponentProps<typeof ImageFactory>) {
  const [size, setSize] = useLayout();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const opacityErrorAnimation = useRef(new Animated.Value(0)).current;
  const opacityLoadingAnimation = useRef(new Animated.Value(1)).current;
  const { colors } = useTheme();
  const errorPadding = 16;
  const errorSize = useMemo(() => {
    if (size.width > 64 + errorPadding && size.height > 64 + errorPadding) {
      return 64;
    } else {
      return Math.min(size.height, size.width) - errorPadding;
    }
  }, [size.width, size.height]);

  useEffect(() => {
    if (isError) {
      Animated.timing(opacityErrorAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isError]);

  // useEffect(() => {
  //   if (isLoaded) {
  //     Animated.timing(opacityLoadingAnimation, {
  //       toValue: 0,
  //       duration: 300,
  //       useNativeDriver: true,
  //     }).start();
  //   }
  // }, [isLoaded]);


  return (
    <View
      onLayout={setSize}
      style={[{
        position: "relative",
        overflow: "hidden",
      },
        rest.style,
      ]}>
      <ImageFactory
        onError={() => {
          setIsError(true);
        }}
        onLayout={setSize}
        onLoad={() => {
          setIsLoaded(true);
        }}
        onLoadEnd={() => {
          setIsLoaded(true);
        }}
        style={rest.style}
        {...rest}
      />

      {/*<Animated.View*/}
      {/*  style={{*/}
      {/*     position: "absolute",*/}
      {/*     width: size.width,*/}
      {/*     height: size.height,*/}
      {/*     opacity: opacityLoadingAnimation,*/}
      {/*   }}>*/}
      {/*   <Skeleton style={{*/}
      {/*     borderRadius: 0,*/}
      {/*     width: size.width,*/}
      {/*     height: size.height,*/}
      {/*   }} />*/}
      {/* </Animated.View>*/}

      <Animated.View
        style={{
          position: "absolute",
          width: size.width,
          height: size.height,
          opacity: opacityErrorAnimation,
        }}>
        <View style={{
          flex: 1,
          backgroundColor: colors.neutral.neutral_20,
          justifyContent: "center",
          alignItems: "center",
        }}>

          <View style={{
            height: errorSize,
            width: errorSize,
            borderRadius: errorSize,
            backgroundColor: colors.neutral.neutral_40,
            justifyContent: "center",
            alignItems: "center",
          }}>
            <Icon icon={"image-broken-variant"} source={"material-community"} color={colors.neutral.neutral_50} />
          </View>
        </View>
      </Animated.View>
      {/*<Typography style={{*/}
      {/*  position: "absolute",*/}
      {/*  top: 0,*/}
      {/*  color: "black",*/}
      {/*}}>{`${isLoaded}`}</Typography>*/}
    </View>
  );
}
