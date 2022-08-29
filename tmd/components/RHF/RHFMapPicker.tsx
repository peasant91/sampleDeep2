/**
 * Created by Widiana Putra on 08/07/2022
 * Copyright (c) 2022 - Made with love
 */

import React, { ComponentProps } from "react";
import { Controller, useFormContext } from "react-hook-form";
import MapPicker, { SelectedMap } from "../picker/MapPicker";

interface Props {
  name: string;
  onMapChange?: (map: SelectedMap) => void;
}

export default function RHFMapPicker({ name, ...rest }: Props & ComponentProps<typeof MapPicker>) {
  const { control, setValue, clearErrors } = useFormContext();

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={
          ({ field: { onChange, onBlur, value }, fieldState }) => {
            return <MapPicker
              initial={value}
              error={fieldState.error != undefined}
              errorText={fieldState.error?.message}
              onSelected={(val) => {
                if(rest.onMapChange){
                  rest.onMapChange(val)
                }
                setValue(name, val);
                clearErrors();
              }}
              onChange={onChange}
              onBlur={onBlur}
              {...rest}
            />;
          }
        }
      />
    </>
  );
}
