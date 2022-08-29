/**
 * Created by Widiana Putra on 29/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { ComponentProps } from "react";
import { Controller, useFormContext } from "react-hook-form";
import DatePicker from "../picker/DatePicker";

interface Props {
  name: string;
}

export default function RHFDatePicker({ name, ...rest }: Props & ComponentProps<typeof DatePicker>) {
  const { control, setValue, clearErrors } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value }, fieldState }) => {
        return <DatePicker
          onDateChangeSendFormatted={(val) => {
            setValue(name, val);
            clearErrors(name);
          }}
          error={fieldState.error != undefined}
          errorText={fieldState.error?.message}
          onChange={onChange}
          onBlur={onBlur}
          {...rest}
        />;
      }}
    />
  );
}
