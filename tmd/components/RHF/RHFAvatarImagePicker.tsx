import React, { ComponentProps } from "react";
import AvatarImagePicker from "../picker/AvatarImagePicker";
import { Controller, useFormContext } from "react-hook-form";

interface Props {
  name: string;
}

export default function RHFAvatarImagePicker({ name, ...rest }: Props & ComponentProps<typeof AvatarImagePicker>) {
  const { control, setValue, clearErrors } = useFormContext();
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value }, fieldState }) => {
          return (
            <AvatarImagePicker
              initialImageUrl={value}
              onImageChange={(val) => {
                setValue(name, val);
                clearErrors(name);
              }}
              error={fieldState.error != undefined}
              errorText={fieldState.error?.message}
              {...rest} />
          );
        }}
      />
    </>
  );


}
