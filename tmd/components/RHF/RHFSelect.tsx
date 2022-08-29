/**
 * Created by Widiana Putra on 29/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { ComponentProps } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Select from "../Select/Select";

interface Props {
  name: string;
}

export default function RHFSelect(
  { name, ...props }: Props & ComponentProps<typeof Select>
) {
  const { control, setValue, clearErrors } = useFormContext();
  return <Controller
    control={control}
    name={name}
    render={({ field: { onChange, onBlur, value }, fieldState }) => {
      return <Select
        onBlur={onBlur}
        onSelectedValueChange={(val) => {
          setValue(name, val);
          clearErrors(name);
        }}
        onChangeText={onChange}
        initial={value}
        error={fieldState.error != undefined}
        errorText={fieldState.error?.message}
        {...props}
      />;
    }}
  />;
}
