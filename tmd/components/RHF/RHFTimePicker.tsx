/**
 * Created by Widiana Putra on 29/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { ComponentProps } from "react";
import { Controller, useFormContext } from "react-hook-form";
import TimePicker from "../picker/TimePicker";

interface Props {
  name: string;
}

export default function RHFTimePicker({ name, ...rest }: Props & ComponentProps<typeof TimePicker>) {
  const { control, clearErrors, setValue } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState, field: { onBlur, onChange, value } }) => {
        return <TimePicker
          onChangeTime={(time) => {
            setValue(name, time);
            clearErrors(name);
          }}
          error={fieldState.error != undefined}
          errorText={fieldState.error?.message}
          onBlur={onBlur}
          onChange={onChange}
          {...rest}
        />;
      }}
    />
  );
}
