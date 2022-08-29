import * as React from "react";
import { useState } from "react";
import {
  Animated,
  I18nManager,
  Platform,
  Pressable,
  StyleSheet,
  TextInput as NativeTextInput,
  TextStyle,
  View,
} from "react-native";
import color from "color";
import type { ChildTextInputProps, RenderProps } from "./types";
import { useTheme } from "../../core/theming";
import LabelInput from "./Label/LabelInput";
import { HelperText } from "../../index";
import Typography from "../Typography/Typography";
import IconButton from "../IconButton";
import _countries from "../../data/_countries";
import Icon from "../Icon";

const INPUT_PADDING_HORIZONTAL = 8;
const MIN_HEIGHT = 32;
const SHAPE_RADIUS = 10;
const ROUNDED_RADIUS = 32;
const ICON_BUTTON = MIN_HEIGHT - 14;

const TextInputFlat = ({
                         disabled = false,
                         editable = true,
                         label,
                         error = false,
                         errorText = "",
                         selectionColor,
                         underlineColor,
                         activeUnderlineColor,
                         dense,
                         style,
                         render = (props: RenderProps) => <NativeTextInput {...props} />,
                         multiline = false,
                         parentState,
                         innerRef,
                         onFocus,
                         forceFocus,
                         onBlur,
                         helperText,
                         onChangeText,
                         onLayoutAnimatedText,
                         onLeftAffixLayoutChange,
                         onRightAffixLayoutChange,
                         left,
                         right,
                         placeholderTextColor,
                         prefixText,
                         prefixIcon,
                         suffixText,
                         suffixIcon,
                         password,
                         counter,
                         maxLength,
                         value,
                         ...rest
                       }: ChildTextInputProps) => {
  const theme = useTheme();
  const isAndroid = Platform.OS === "android";
  const { colors, fonts } = theme;
  const font = fonts.regular;
  const hasActiveOutline = parentState.focused || error;
  const [isShowPassword, setIsShowPassword] = useState(!password);
  const [isShowSearch, setIsShowSearch] = useState(false);

  const {
    fontSize: fontSizeStyle,
    fontWeight,
    height,
    paddingHorizontal,
    textAlign,
    ...viewStyle
  } = (StyleSheet.flatten(style) || {}) as TextStyle;
  const fontSize = fontSizeStyle

  let inputTextColor,
    activeColor,
    underlineColorCustom,
    placeholderColor,
    errorColor;

  if (disabled) {
    inputTextColor = activeColor = color(colors.neutral.neutral_60)
      .rgb()
      .string();
    placeholderColor = colors.neutral.neutral_60;
    underlineColorCustom = colors.neutral.neutral_60;
  } else {
    inputTextColor = colors.neutral.neutral_100;
    activeColor = error ? colors.danger.main : activeUnderlineColor || colors.primary.main;
    placeholderColor = colors.neutral.neutral_70;
    errorColor = colors.danger.main;
    underlineColorCustom = underlineColor || colors.neutral.neutral_60;
  }

  const containerStyle = {
    backgroundColor: theme.dark
      ? color(colors.neutral.neutral_10).rgb().string()
      : color(colors.neutral.neutral_10).rgb().string(),
    borderTopLeftRadius: theme.roundness,
    borderTopRightRadius: theme.roundness,
  };


  const labelWidth = parentState.labelLayout.width;
  const labelHeight = parentState.labelLayout.height;
  const labelHalfWidth = labelWidth / 2;
  const labelHalfHeight = labelHeight / 2;


  if (height && typeof height !== "number") {
    // eslint-disable-next-line
    console.warn("Currently we support only numbers in height prop");
  }

  return (
    <View style={{ width: "100%", display: "flex", overflow: "hidden", flexDirection: "column" }}>

      <View style={[containerStyle, viewStyle]}>
        {
          label &&
          <LabelInput
            disabled={disabled}
            label={label}
            type={"label1"}
            style={{ marginBottom: 4 }}
            required={rest.requiredLabel}
          />
        }
        <Pressable
          onPress={() => {
            if (rest.pickerType && rest.pickerType != "phone") {
              if (!disabled) {
                // @ts-ignore
                rest.onOpenPicker();
              }
            }
          }}

          style={[
            multiline ? {} : { height: height ?? MIN_HEIGHT },
            {
              flexDirection: "row",
            }]}>
          {/*Phone*/}
          {
            rest.pickerType == "phone" &&
            <PhonePicker
              initial={rest.initialPhoneCode}
              onChange={() => {
                // @ts-ignore
                rest.onOpenPicker();
              }}
            />
          }
          <View style={{ flexGrow: 1 }}>

            <Underline
              parentState={parentState}
              underlineColorCustom={underlineColorCustom}
              error={error}
              colors={colors}
              activeColor={activeColor}
            />
            <View
              style={[
                multiline ? {} : { height: height ?? MIN_HEIGHT, alignItems: 'center', justifyContent: 'center' },
                {
                  flexDirection: "row",
                  alignItems: "center",
                  display: "flex",
                }]}
            >
              {
                (prefixText || prefixIcon || rest.search) &&
                <View style={{
                  flexShrink: 1,
                  marginBottom: 1,
                  paddingRight: 4,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}>
                  {
                    rest.search &&
                    <Icon icon={"search"} size={20} color={colors.neutral.neutral_70} />
                  }

                  {
                    prefixIcon &&
                    <Icon
                      color={colors.neutral.neutral_70}
                      size={18}
                      {...prefixIcon}
                    />
                  }
                  {
                    prefixText &&
                    <Typography
                      type={"body2"}
                      style={{
                        color: disabled ? colors.neutral.neutral_60 : colors.neutral.neutral_90,
                        marginBottom: 1,
                      }}>
                      {prefixText}
                    </Typography>
                  }
                </View>
              }
              <View
                pointerEvents={
                  editable ? "auto" : "none"
                }
                style={{
                  flexGrow: 1,
                  flex: 1,
                }}
              >

                <View
                  style={[
                    styles.labelContainer,
                    {},
                  ]}
                >

                  {/*<InputLabel parentState={parentState} labelProps={labelProps} />*/}
                  {render?.({
                    testID: "text-input-filled",
                    secureTextEntry: !isShowPassword,
                    maxLength: maxLength,
                    value: value,
                    ...rest,
                    ref: innerRef,
                    // onChangeText,
                    onChangeText: (val) => {
                      if (rest.search) {
                        console.log(val.length > 0);
                        setIsShowSearch(val.length > 0);
                      }
                      if (onChangeText) {
                        onChangeText(val);
                      }

                    },
                    placeholder: rest.placeholder,
                    placeholderTextColor: placeholderTextColor ?? placeholderColor,
                    editable: !disabled && editable,
                    selectionColor: theme.colors.primary.main,
                    onFocus,
                    onBlur,
                    underlineColorAndroid: "transparent",
                    multiline,
                    style: [
                      styles.input,
                      !multiline || (multiline && height) ? { height: height ?? MIN_HEIGHT} : {},
                      // paddingFlat,
                      {
                        ...font,
                        fontSize,
                        fontWeight,
                        color: inputTextColor,
                        display: "flex",
                        paddingVertical: 4,
                        textAlignVertical: "center",
                        textAlign: textAlign
                          ? textAlign
                          : I18nManager.isRTL
                            ? "right"
                            : "left",
                      },
                      Platform.OS === "web" && { outline: "none" },
                    ],
                  })}
                </View>

              </View>
              {
                isShowSearch &&
                <View style={{
                  flexShrink: 1,
                  display: "flex",
                  marginBottom: 1,
                  paddingLeft: 0,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                >
                  <IconButton
                    style={{
                      backgroundColor: "transparent",
                    }}
                    variant={'tertiary'}
                    fitIcon
                    color={
                      colors.neutral.neutral_70
                    }
                    onPress={() => {
                      if(rest.onClear){
                        rest?.onClear();
                      }
                      if(rest.onInvokeTextChanged){
                        rest?.onInvokeTextChanged("");
                      }
                      setIsShowSearch(false);
                    }}
                    icon={"close-circle"}
                    size={ICON_BUTTON} />
                </View>

              }

              {
                password && <View style={{
                  flexShrink: 1,
                  display: "flex",
                  marginBottom: 1,
                  paddingLeft: 0,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                >
                  <IconButton
                    style={{
                      backgroundColor: "transparent",
                    }}
                    fitIcon
                    variant={'tertiary'}
                    color={
                      isShowPassword ? theme.colors.primary.main : theme.colors.neutral.neutral_70
                    }
                    onPress={() => {
                      setIsShowPassword(!isShowPassword);
                    }}
                    icon={
                      isShowPassword ? "eye-off" :
                        "eye"}
                    size={ICON_BUTTON} />
                </View>
              }
              {
                (suffixText || suffixIcon) &&
                <View style={{
                  flexShrink: 1,
                  display: "flex",
                  marginBottom: 1,
                  paddingLeft: 4,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                  {
                    suffixText &&
                    <Typography
                      type={"body2"}
                      style={{
                        color: disabled ? colors.neutral.neutral_60 : colors.neutral.neutral_90,
                        marginBottom: 1,
                      }}>
                      {suffixText}
                    </Typography>
                  }

                  {
                    suffixIcon &&
                    <Icon
                      color={colors.neutral.neutral_70}
                      size={18}
                      {...suffixIcon}
                      />
                  }
                </View>
              }

            </View>
          </View>
        </Pressable>
        {
          (errorText || helperText || maxLength) &&
          <View style={{ display: "flex", flexDirection: "row", marginTop: 4 }}>
            <HelperText type={error ? "error" : "info"} style={{ flexGrow: 1, flex: 1 }}>
              {error ? errorText : helperText}
            </HelperText>

            {
              (counter && maxLength) &&
              <Typography style={{ flexShrink: 1, paddingLeft: 3, color: theme.colors.neutral.neutral_90 }}
                          type={"body3"}>
                {value?.length ?? 0} / {maxLength}
              </Typography>
            }
          </View>
        }
      </View>
    </View>
  );
};

export default TextInputFlat;

type PhonePickerProps = {
  initial?: string;
  onChange?: Function;
}

const PhonePicker = ({ initial, onChange }: PhonePickerProps) => {
  const country = _countries.find((it) => it.phone_code == initial);
  const theme = useTheme();
  return <View
    style={{
      display: "flex",
      paddingLeft: INPUT_PADDING_HORIZONTAL,
      paddingRight: INPUT_PADDING_HORIZONTAL,
      marginRight: INPUT_PADDING_HORIZONTAL,
      height: MIN_HEIGHT,
      backgroundColor: theme.colors.neutral.neutral_20,
      borderRadius: 32,
      borderWidth: 1,
      borderColor: theme.colors.neutral.neutral_30,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Pressable
      onPress={() => onChange() ?? null}
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Typography style={{ marginRight: 4 }}>+{country?.phone_code}</Typography>
      <Icon icon={"chevron-down"} color={theme.colors.neutral.neutral_90} size={14} />
    </Pressable>
  </View>;
};


type UnderlineProps = {
  parentState: {
    focused: boolean;
  };
  error?: boolean;
  colors: {
    error: string;
  };
  activeColor: string;
  underlineColorCustom?: string;
};

const Underline = ({
                     parentState,
                     error,
                     colors,
                     activeColor,
                     underlineColorCustom,
                   }: UnderlineProps) => {
  let backgroundColor = parentState.focused
    ? activeColor
    : underlineColorCustom;
  if (error) backgroundColor = colors.error;
  return (
    <Animated.View
      style={[
        styles.underline,
        {
          backgroundColor,
          // Underlines is thinner when input is not focused
          transform: [{ scaleY: parentState.focused ? 1 : 0.5 }],
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  placeholder: {
    position: "absolute",
    left: 0,
  },
  underline: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 2,
    zIndex: 1,
  },
  labelContainer: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  input: {
    margin: 0,
  },
  inputFlat: {
    paddingTop: 24,
    paddingBottom: 4,
  },
  patchContainer: {
    height: 24,
    zIndex: 2,
  },
});
