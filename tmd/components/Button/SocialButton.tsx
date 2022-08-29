import React, { ComponentProps } from "react";
import { Button, Icon, IconButton, useTheme } from "../../index";
import IcMail from "../../../src/assets/icons/ic_mail.svg";
import IcTwitter from "../../../src/assets/icons/ic_twitter.svg";
import IcFacebook from "../../../src/assets/icons/ic_fb.svg";
import IcApple from "../../../src/assets/icons/ic_apple.svg";
import IcGoogle from "../../../src/assets/icons/ic_google.svg";
import { View } from "react-native";

type SocialType = "twitter" | "google" | "apple" | "facebook" | "email";
type Variant = "text" | "icon"

interface Props {
  social?: SocialType;
  socialVariant?: Variant;
}

export default function SocialButton({
                                       social = "google",
                                       socialVariant = "text",
                                       ...rest
                                     }: Props & ComponentProps<typeof Button>) {
  const { colors } = useTheme();
  let IconLocal = IcGoogle;
  let logoName = "logo-google";
  switch (social) {
    case "twitter": {
      IconLocal = IcTwitter;
      logoName = "logo-twitter";
      break;
    }
    case "facebook": {
      IconLocal = IcFacebook;
      logoName = "logo-facebook";
      break;
    }
    case "apple": {
      IconLocal = IcApple;
      logoName = "logo-apple";
      break;
    }
    case "email": {
      IconLocal = IcMail;
      logoName = "mail";
      break;
    }
    case "google": {
      IconLocal = IcGoogle;
      logoName = "logo-google";
      break;
    }

  }

  let usedBg = colors.neutral.neutral_10, txtColor = colors.neutral.neutral_100;
  if (rest.disabled) {
    usedBg = colors.neutral.neutral_40;
    txtColor = colors.neutral.neutral_60;
  }
  return (
    <>
      {
        socialVariant == "text" &&
        <Button
          {...rest}
          variant={"primary"}
          iconNode={
            <View>
              {
                rest.disabled
                  ? <Icon size={18} icon={logoName} color={colors.neutral.neutral_60} />
                  : <IconLocal fill={"green"} />
              }
            </View>
          }
          disabled={rest.disabled}
          buttonStyle={{
            backgroundColor: usedBg,
            borderColor: colors.neutral.neutral_40,
            borderWidth: 1,
          }}
          size={"lg"}
          labelStyle={{
            color: txtColor,
            flexGrow: 1,
            marginLeft: -16,
          }}
        >

          {rest.children}
        </Button>

      }
      {
        socialVariant == "icon" &&
        <IconButton
          {...rest}
          themeSize={"lg"}
          iconNode={
            <View>
              {rest.disabled ? <Icon icon={logoName} color={colors.neutral.neutral_60} /> : <IconLocal />}
            </View>
          }
          style={{
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: colors.neutral.neutral_40,
          }} />
      }
    </>
  );
}
