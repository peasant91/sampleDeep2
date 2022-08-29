/**
 * Created by Widiana Putra on 08/07/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { ComponentProps, useState } from "react";
import TextField from "../TextInput/TextField";
import DateRangePickerBottomSheet, {
  DateRange,
  DateRangeValidationType,
} from "../BottomSheet/DateRangePickerBottomSheet";
import { CalendarList } from "react-native-calendars/src";
import { useLocale } from "../../../src/providers/LocaleProvider";

interface Props {
  initial?: DateRange;
  onChangeRange?: (date: DateRange) => void;
}

export default function DateRangePicker({
                                          initial,
                                          onChangeRange,
                                          ...rest
                                        }: Props & ComponentProps<typeof TextField> & ComponentProps<typeof CalendarList> & DateRangeValidationType) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<DateRange | undefined>(initial);
  const { momentLocale } = useLocale();
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <TextField
        pickerType={"date"}
        value={
          selected?.startDate ? `${momentLocale(selected?.startDate).format("D MMMM YYYY")} - ${momentLocale(selected?.endDate).format("D MMMM YYYY")}` : undefined
        }
        editable={false}
        onOpenPicker={handleOpen}
        {...rest}
        suffixIcon={{
          icon: "ios-calendar",
          size: 18,
        }}
      />

      <DateRangePickerBottomSheet
        onSave={(data) => {
          setSelected(data);
          if (onChangeRange) {
            onChangeRange(data);
          }
        }}
        selected={selected}
        open={isOpen}
        onClose={handleClose}
        {...rest}
      />
    </>
  );
}
