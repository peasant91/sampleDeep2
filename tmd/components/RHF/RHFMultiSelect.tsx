/**
 * Created by Widiana Putra on 08/07/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { ComponentProps } from "react";
import { Controller, useFormContext } from "react-hook-form";
import MultiSelect from "../Select/MultiSelect";

interface Props {
  name: string;
}

export default function RHFMultiSelect({ name, ...rest }: Props & ComponentProps<typeof MultiSelect>) {
  const { control, setValue, clearErrors } = useFormContext();
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { value }, fieldState }) => {
          return <MultiSelect
            error={fieldState.error != undefined}
            errorText={fieldState.error?.message}
            onSelectedValueChange={(val) => {
              setValue(name, val);
              clearErrors(name);
            }
            }
            initial={value}
            {...rest}
          />;
        }
        }
      />
    </>
  );
}
