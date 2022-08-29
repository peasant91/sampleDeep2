import React from "react";
import { Animated, Pressable, StyleProp, TextStyle, View, ViewStyle } from "react-native";
import { Icon, Image } from "../../index";
import { useTheme } from "../../core/theming";
import Typography, { TypographyType } from "../Typography/Typography";
import Color from "color";

export type AvatarVariant = "text" | "image" | "icon"
export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"

interface Props {
  variant?: AvatarVariant;
  size?: AvatarSize;

  //required if variant is text
  text?: string;

  //required if variant is image
  imageUrl?: string;

  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;

  //customsize
  avatarSize?: number;

  onPress?: () => void;

  showOnlineStatus?: boolean;
  isOnline?: boolean;
}

export default function Avatar({
                                 variant,
                                 text,
                                 imageUrl,
                                 size,
                                 style,
                                 avatarSize,
                                 onPress,
                                 textStyle,
                                 containerStyle,
                                 showOnlineStatus, isOnline,
                               }: Props) {
  const { colors, avatar } = useTheme();
  let viewSize = 40, typographyType: TypographyType = "title1";
  const animation = new Animated.Value(0);
  const usedVariant = variant ?? avatar.variant;
  const usedSize = size ?? avatar.size;
  const inputRange = [0, 1];
  const outputRange = [0, 1];
  const scale = animation.interpolate({ inputRange, outputRange });

  const avatarBorderWidth = 4;
  switch (usedSize) {
    case "xs": {
      viewSize = 24;
      typographyType = "label3";
      break;
    }
    case "sm": {
      viewSize = 32;
      typographyType = "label2";
      break;
    }
    case "md": {
      viewSize = 40;
      typographyType = "title3";
      break;
    }
    case "lg": {
      viewSize = 48;
      typographyType = "title2";
      break;
    }
    case "xl" : {
      viewSize = 56;
      typographyType = "h3";
      break;
    }
    case "2xl" : {
      viewSize = 64;
      typographyType = "h2";
      break;
    }
    case "3xl" : {
      viewSize = 72;
      typographyType = "h1";
      break;
    }
  }


  viewSize = avatarSize ?? viewSize;
  const getInitialText = (text: string | undefined) => {
    if (text) {
      if (text.split(" ").length > 1) {
        return text.split(" ").slice(0, 2).map(word => word[0].toUpperCase()).join("");
      } else {
        if (text.length > 1) {
          return text[0].toUpperCase() + text[1].toUpperCase();
        }
        return text[0].toUpperCase();
      }
    }
    return "";
  };

  const handleOnPress = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, 2000);
  };

  const OnlineStatus = () => {
    const onlineSize = (viewSize / 4) + 2;
    return <View style={{
      position: "absolute",
      bottom: 0, end: 0,
      height: onlineSize,
      width: onlineSize,
      borderRadius: onlineSize / 2,
      borderWidth: 2,
      borderColor: colors.neutral.neutral_10,
      backgroundColor: isOnline ? colors.success.main : colors.neutral.neutral_30,
    }}>

    </View>;
  };

  return (
    <View style={[{
      alignSelf: "baseline",
      position: "relative",
    }, style]}>

      {
        <Animated.View style={[{
          position: "absolute",
          top: -avatarBorderWidth,
          bottom: -avatarBorderWidth,
          left: -avatarBorderWidth,
          right: -avatarBorderWidth,
          backgroundColor: Color(colors.primary.focus).alpha(0.25).rgb().toString(),
          borderRadius: (viewSize - avatarBorderWidth / 2),
        }, {
          transform: [{ scale }],

        }]}>
        </Animated.View>
      }

      <Pressable
        onPress={() => {
          if (onPress) {
            handleOnPress();
            onPress();
          }
        }}
        style={
          [{
            width: viewSize,
            height: viewSize,
            backgroundColor: colors.primary.surface,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: viewSize / 2,
          }, containerStyle,
          ]}>
        <>
          {
            usedVariant === "text" &&
            <Typography type={typographyType} style={[{
              color: colors.primary.main,
            }, textStyle]}>
              {getInitialText(text)}
            </Typography>
          }
          {
            usedVariant === "image" &&
            <>
              {
                imageUrl
                  ? <Image
                    style={{
                      width: viewSize,
                      height: viewSize,
                    }}
                    borderRadius={viewSize / 2}
                    source={{
                      uri: imageUrl,
                    }}
                  />
                  : <Icon icon="person" size={viewSize / 2} color={colors.primary.main} />
              }
            </>
          }
          {
            usedVariant === "icon" &&
            <Icon icon={"person"} color={colors.primary.main} size={viewSize / 2} />
          }
        </>
      </Pressable>

      {
        showOnlineStatus &&
        <OnlineStatus />
      }
    </View>
  );
}
