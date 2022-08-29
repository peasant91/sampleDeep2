/**
 * Created by Widiana Putra on 14/06/2022
 * Copyright (c) 2022 - Made with love
 */

import React, { useEffect, useState } from "react";
import TextField from "../TextInput/TextField";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import { useLocale } from "../../../src/providers/LocaleProvider";
import TimePickerBottomSheet from "../BottomSheet/TimePickerBottomSheet";

interface Props {
  initial?: string;
  onChangeTime?: (time: string) => void;
  title?: string;
}

export default function TimePicker({ initial, ...rest }: React.ComponentProps<typeof TextField> & Props) {
  const { t } = useLocale();
  const [isOpenPicker, setIsOpenPicker] = useState(false);
  const [selected, setSelected] = useState(initial ? new Date() : undefined);
  const handleOpen = () => {
    setIsOpenPicker(true);
  };

  useEffect(() => {
    if (rest.onChangeTime) {
      const data = selected ?
        moment(selected).format("HH:mm") : "";
      rest.onChangeTime(data);
    }
  }, [selected]);


  return (
    <>
      <TextField
        value={
          selected ?
            moment(selected).format("HH:mm") : ""
        }
        pointerEvents="none"
        editable={false}
        pickerType={"date"}
        onOpenPicker={handleOpen}
        suffixIcon={{
          icon: "time",
          size: 18,
        }}
        {...rest}
      />

      <TimePickerBottomSheet
        initTime={selected}
        open={isOpenPicker}
        onClose={() => {
          setIsOpenPicker(false);
        }}
        onSave={(date) => {
          setSelected(date);
        }}
      />
      {/*<DatePicker*/}
      {/*  theme={"light"}*/}
      {/*  title={rest.title}*/}
      {/*  modal={true}*/}
      {/*  open={isOpenPicker}*/}
      {/*  date={selected ?? new Date()}*/}
      {/*  mode={"time"}*/}
      {/*  confirmText={t("confirm")}*/}
      {/*  cancelText={t("cancel")}*/}
      {/*  androidVariant={"iosClone"}*/}
      {/*  onConfirm={(date) => {*/}
      {/*    setIsOpenPicker(false);*/}
      {/*    setSelected(date);*/}
      {/*  }}*/}
      {/*  onCancel={() => {*/}
      {/*    setIsOpenPicker(false);*/}
      {/*  }}*/}
      {/*/>*/}

    </>
  );
}
