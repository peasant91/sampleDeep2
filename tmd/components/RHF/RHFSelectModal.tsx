import React, { ComponentProps } from "react";
import SelectModal from "../Select/SelectModal";
import { Controller, useFormContext } from "react-hook-form";

/**
 * Created by Widiana Putra on 13/07/2022
 * Copyright (c) 2022 - Made with love
 */
interface Props {
  name: string;
}

export default function RHFSelectModal(
  { name, ...props }: Props & ComponentProps<typeof SelectModal>,
) {
  const { control, setValue, clearErrors } = useFormContext();
  return <Controller
    control={control}
    name={name}
    render={({ field: { onChange, onBlur, value }, fieldState }) => {
      return <SelectModal
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
