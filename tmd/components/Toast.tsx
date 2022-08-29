/**
 * Created by Widiana Putra on 08/07/2022
 * Copyright (c) 2022 - Made with love
 */

import React from "react";
import { default as ExToast, ToastOptions } from "react-native-root-toast";
import configureFonts from "../styles/fonts";
import { colors } from "../styles/colors";
import { DefaultTheme } from "../index";

export type ToastVariant = "neutral" | "success" | "error" | "warning" | "info" | "primary";
export type ToastShape = "rounded" | "rect";
interface ToastOption extends ToastOptions {
  variant?: ToastVariant;
  shape?: ToastShape;
}
export default class Toast extends ExToast {
  static show(message: string, options?: ToastOption) {
    const theme = DefaultTheme.toast;
    const usedVariant = options?.variant ?? theme.variant;
    const usedShape = options?.shape ?? theme.shape;
    let borderRadius, backgroundColor, textColor = colors.neutral.neutral_10;
    if (usedShape === "rounded") {
      borderRadius = 24;
    } else {
      borderRadius = 8;
    }
    switch (usedVariant) {
      case "neutral": {
        backgroundColor = colors.neutral.neutral_90;
        break;
      }
      case "primary": {
        backgroundColor = colors.primary.main;
        break;
      }
      case "success": {
        backgroundColor = colors.success.main;
        break;
      }
      case "error": {
        backgroundColor = colors.danger.main;
        break;
      }
      case "info": {
        backgroundColor = colors.info.main;
        break;
      }
      case "warning": {
        backgroundColor = colors.warning.main;
        break;
      }
    }
    ExToast.show(message, {
      ...options,
      opacity: 1,
      shadow: true,
      backgroundColor: backgroundColor,
      textColor: textColor,
      containerStyle: { borderRadius: borderRadius, paddingVertical: 8, paddingHorizontal: 16 },
      textStyle: { ...configureFonts().regular, fontSize: 14 },
    });
  }
}
