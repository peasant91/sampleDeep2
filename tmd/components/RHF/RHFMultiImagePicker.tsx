/**
 * Created by Widiana Putra on 04/07/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { ComponentProps } from "react";
import MultiImagePicker from "../picker/MultiImagePicker";
import { Controller, useFormContext } from "react-hook-form";

interface Props {
  name: string;
}

export default function RHFMultiImagePicker({ name, ...rest }: Props & ComponentProps<typeof MultiImagePicker>) {
  const { control, clearErrors, setValue,  } = useFormContext();
  return <>
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value }, fieldState }) => {
        return <MultiImagePicker

          onChangeSelectedUrls={(urls) => {
            clearErrors(name);
            setValue(name, urls);
          }}
          error={fieldState.error != undefined}
          errorText={fieldState.error?.message}
          {...rest}
        />;
      }}
      name={name} />
  </>;
}
