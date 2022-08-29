import React, { ComponentProps, useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import TextField from "./TextField";

interface Props {
  initial?: string;
  onChangePriceValue?: (value?: string) => void;
  isRHF?: boolean;
}

export default function PriceField({
                                     initial,
                                     isRHF = false,
                                     onChangePriceValue,
                                     ...rest
                                   }: ComponentProps<typeof TextField> & Props) {
  const [textVal, setTextVal] = useState(initial);
  useEffect(() => {
    if (onChangePriceValue) {
      onChangePriceValue(textVal);
    }
  }, [textVal]);

  return (
    <>
      <NumberFormat
        value={isRHF ? rest.value : textVal}
        displayType={"text"}
        thousandSeparator={true}
        renderText={value => (
          <TextField
            onChangeText={(val) => {
              const newVal = val.split(",").join("");
              setTextVal(newVal);
            }}
            {...rest}
            value={value}
            keyboardType="numeric"
          />
        )}
      />
    </>
  );
}
