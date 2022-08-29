/**
 * Created by Widiana Putra on 28/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { ComponentProps, useEffect, useState } from "react";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { useTheme } from "../../core/theming";
import { View } from "react-native";
import HelperText from "../HelperText";
import { TextInputMode } from "../TextInput/TextField";

interface Props {
  helperText?: string;
  errorText?: string;
  error?: boolean;
  mode?: TextInputMode;

}

export default function OTPInput({
                                   error, errorText, helperText, mode, ...rest
                                 }: Props & ComponentProps<typeof OTPInputView>) {
  const { colors, textInput, fonts } = useTheme();
  const [isError, setIsError] = useState(false);
  const borderColor = isError ? colors.danger.main : colors.neutral.neutral_60;
  const selectedBorderColor = isError ? colors.danger.main : colors.primary.main;
  const filledBGColor = isError ? colors.danger.surface : colors.primary.surface;
  const selectedFilledBGColor = isError ? colors.danger.surface : colors.primary.surface;
  useEffect(() => {
    setIsError(error);
  }, [error, errorText]);

  const handleChanges = (val: string) => {
    if (isError) {
      setIsError(false);
    }
    if (rest.onCodeChanged) {
      rest.onCodeChanged(val);
    }
  };

  const usedMode = mode ?? textInput.mode;
  const Filled = () => {
    return (
      <OTPInputView
        onCodeChanged={handleChanges}
        selectionColor={colors.primary.main}
        codeInputFieldStyle={
          [
            {
              borderWidth: 0,
              backgroundColor: filledBGColor,
              borderRadius: 8,
              color: colors.neutral.neutral_90,
              fontSize: 24,
              paddingVertical: 0,
              marginVertical: 0,
            },
            fonts.medium,
          ]
        }

        codeInputHighlightStyle={{
          backgroundColor: selectedFilledBGColor,
          borderColor: colors.primary.border,
          borderWidth: isError ? 0 : 2,
        }}


        {...rest}
        style={[{
          width: "100%",
        }, rest.style]}
      />
    );
  };
  const Flat = () => {
    return (
      <OTPInputView
        onCodeChanged={handleChanges}
        selectionColor={colors.primary.main}
        codeInputFieldStyle={
          [
            {
              borderWidth: 0,
              borderBottomWidth: 2,
              borderBottomColor: borderColor,
              color: colors.neutral.neutral_90,
              fontSize: 24,
              paddingVertical: 0,
              marginVertical: 0,
            },
            fonts.medium,
          ]
        }
        codeInputHighlightStyle={{
          borderBottomColor: selectedBorderColor,
          borderBottomWidth: 2,
        }}
        {...rest}
        style={[{
          width: "100%",
        }, rest.style]}
      />
    );
  };
  const Contained = () => {
    return (
      <OTPInputView
        onCodeChanged={handleChanges}
        selectionColor={colors.primary.main}
        codeInputFieldStyle={
          [
            {
              borderRadius: 8,
              borderColor: borderColor,
              color: colors.neutral.neutral_90,
              fontSize: 24,
              paddingVertical: 0,
              marginVertical: 0,
            },
            fonts.medium,
          ]
        }
        codeInputHighlightStyle={{
          borderColor: selectedBorderColor,
          borderWidth: 2,
        }}
        {...rest}

        style={[{
          width: "100%",
        }, rest.style]}
      />
    );
  };
  return (
    <View style={{
      flexDirection: "column",
      width: "100%",
      flex: 1,
    }}>
      <View style={
        [{
          flex: 1,
          flexDirection: "row",
          position: "relative",
        }, rest.style]
      }>
        {
          usedMode == "contained" &&
          <Contained />
        }

        {
          usedMode == "flat" &&
          <Flat />
        }

        {
          usedMode == "filled" &&
          <Filled />
        }

      </View>
      {
        isError &&
        <HelperText type={"error"} style={{
          marginTop: 12,
        }}>{errorText}</HelperText>
      }
    </View>
  );
}
