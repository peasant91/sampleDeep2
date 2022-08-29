import React, { ComponentProps } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "../../index";
import PriceField from "../TextInput/PriceField";

interface Props {
  name: string;
}

export default function RHFPriceField({ name, ...rest }: Props & ComponentProps<typeof TextField>) {
  const { control, setValue, clearErrors } = useFormContext();

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value }, fieldState }) => {
          return <PriceField
            isRHF
            onBlur={onBlur}
            value={value}
            onChangePriceValue={(val) => {
              onChange(val);
            }}
            error={fieldState?.error != undefined}
            errorText={fieldState?.error?.message}
            {...rest}
          />;
        }}
      />
    </>
  );
}
