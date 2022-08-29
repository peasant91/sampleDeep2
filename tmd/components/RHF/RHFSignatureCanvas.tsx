import React, { ComponentProps } from "react";
import { Controller, useFormContext } from "react-hook-form";
import SignatureCanvas from "../Signature/SignatureCanvas";

interface Props {
  name: string;
}

export default function RHFSignatureCanvas({ name, ...rest }: Props & ComponentProps<typeof SignatureCanvas>) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value }, fieldState }) => (
        <SignatureCanvas
          onChangePath={(data) => {
            onChange(data);
          }}
          error={fieldState.error != undefined}
          errorText={fieldState.error?.message}
          {...rest}
        />
      )}
    />
  );
}
