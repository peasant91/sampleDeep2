/**
 * Created by Widiana Putra on 08/07/2022
 * Copyright (c) 2022 - Made with love
 */

import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, View, ViewProps } from "react-native";
import { Modalize } from "react-native-modalize";
import { useLocale } from "../../../src/providers/LocaleProvider";
import { Portal } from "react-native-portalize";
import { Button, Stack } from "../../index";
import Typography from "../Typography/Typography";
import DatePicker from "react-native-date-picker";

interface Props {
  open: boolean;
  onClose: () => void;
  dismissible?: boolean;
  title?: string;
  onSave?: (date: Date) => void;
  initTime?: Date;
}

interface DatePickerProps extends ViewProps {
  locale?: string;
  maximumDate?: Date;
  minimumDate?: Date;
  minuteInterval?: 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30;
  androidVariant?: "iosClone" | "nativeAndroid";
  mode?: "date" | "time" | "datetime";
  onDateChange?: (date: Date) => void;
  timeZoneOffsetInMinutes?: number;
  fadeToColor?: string;
  textColor?: string;
  dividerHeight?: number;
  is24hourSource?: "locale" | "device";
  modal?: boolean;
  open?: boolean;
  onConfirm?: (date: Date) => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  title?: string | null;
  theme?: "light" | "dark" | "auto";
}

export default function TimePickerBottomSheet({
                                                open,
                                                onClose,
                                                dismissible,
                                                title,
                                                initTime,
                                                ...rest
                                              }: Props & DatePickerProps) {
  const modalizeRef = useRef<Modalize>(null);
  const { t, momentLocale, currentLanguage } = useLocale();
  const [date, setDate] = useState(initTime ? momentLocale(initTime).toDate() : momentLocale().toDate());
  const [parentWidth, setParentWidth] = useState(0);
  useEffect(() => {
    if (open) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [open]);

  const handleOpen = () => {
    if (initTime) {
      console.log(initTime);
      setDate(initTime);
    }
    modalizeRef?.current?.open();
  };

  const handleClose = () => {
    modalizeRef?.current?.close();
    setDate(momentLocale().toDate());
    // props.onClose();
  };

  const handleSave = () => {
    if (rest.onSave) {
      rest.onSave(date);
    }
    handleClose();
  };

  return (
    <Portal>
      <Modalize
        ref={modalizeRef}
        closeOnOverlayTap={dismissible ? !dismissible : true}
        handlePosition={"inside"}
        adjustToContentHeight
        modalStyle={{
          padding: 16,
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
        }}
        onClose={onClose}
      >
        <SafeAreaView style={{
          flex: 1,
        }}>

          <View
            onLayout={(event) => {
              setParentWidth(event.nativeEvent.layout.width);
            }}
            style={{
              flexDirection: "column",
              paddingVertical: 16,
            }}>
            <Stack spacing={16}>
              <Typography type={"title2"}>
                {title ?? t("choose_time")}
              </Typography>
              <DatePicker
                locale={currentLanguage}
                style={{
                  flex: 1,
                  width: parentWidth,
                }}
                mode={"time"}
                date={date}
                onDateChange={(date) => {
                  setDate(date);
                }}
                modal={false}
                {...rest}
              />

              <Button
                onPress={handleSave}
                buttonStyle={{
                  width: "100%",
                }}>{t("save")}</Button>
            </Stack>
          </View>
        </SafeAreaView>
      </Modalize>
    </Portal>
  );
}
