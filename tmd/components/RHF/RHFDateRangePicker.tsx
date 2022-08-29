/**
 * Created by Widiana Putra on 08/07/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { ComponentProps } from "react";
import { Controller, useFormContext } from "react-hook-form";
import DateRangePicker from "../picker/DateRangePicker";

interface Props {
  name: string;
}

export default function RHFDateRangePicker({ name, ...rest }: Props & ComponentProps<typeof DateRangePicker>) {
  const { control, setValue, clearErrors } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value }, fieldState }) => {
        return <DateRangePicker
          onChangeRange={(val) => {
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
