/**
 * Created by Widiana Putra on 08/07/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { useEffect, useRef, useState } from "react";
import { Portal } from "react-native-portalize";
import { Modalize } from "react-native-modalize";
import { Button, Stack } from "../../index";
import { SafeAreaView, View, ViewProps } from "react-native";
import DatePicker from "react-native-date-picker";
import Typography from "../Typography/Typography";
import { useLocale } from "../../../src/providers/LocaleProvider";

interface Props {
  open: boolean;
  onClose: () => void;
  dismissible?: boolean;
  title?: string;
  onSave?: (date: Date) => void;
  initDate?: Date;
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


export default function DatePickerBottomSheet({
                                                open,
                                                onClose,
                                                dismissible,
                                                title,
                                                initDate,
                                                ...rest
                                              }: Props & DatePickerProps) {
  const modalizeRef = useRef<Modalize>(null);
  const { t, momentLocale, currentLanguage } = useLocale();
  const [date, setDate] = useState(initDate ? momentLocale(initDate).toDate() : momentLocale().toDate());
  const [parentWidth, setParentWidth] = useState(0);
  useEffect(() => {
    if (open) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [open]);

  const handleOpen = () => {
    if (initDate) {
      console.log(initDate);
      setDate(initDate);
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
              const { width } = event.nativeEvent.layout;
              setParentWidth(width);
            }}
            style={{
              flexDirection: "column",
              paddingVertical: 16,
            }}>
            <Stack spacing={16}>
              <Typography type={"title2"}>
                {title ?? t("choose_date")}
              </Typography>
              <DatePicker
                locale={currentLanguage}
                style={{
                  flex: 1,
                  width: parentWidth,
                  // width: "100%",
                }}

                mode={"date"}
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
