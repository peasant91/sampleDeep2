/**
 * Created by Widiana Putra on 29/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { ComponentProps } from "react";
import { Controller, useFormContext } from "react-hook-form";
import PhoneField from "../picker/PhoneField";

interface Props {
  name: string;
  phoneCodeName: string;
}

export default function RHFPhoneField({ name, phoneCodeName, ...rest }: Props & ComponentProps<typeof PhoneField>) {
  const { control, setValue, getValues } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onBlur, onChange, value }, fieldState }) => {
        return <PhoneField
          onBlur={onBlur}
          onPhoneCodeChange={(val) => {
            setValue(phoneCodeName, val);
          }}
          initialPhoneCode={getValues(phoneCodeName)}
          onChangeText={onChange}
          value={value}
          error={fieldState.error != undefined}
          errorText={fieldState.error?.message}
          {...rest}
        />;
      }}
    />
  );
}
