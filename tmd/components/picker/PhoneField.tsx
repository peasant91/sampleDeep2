/**
 * Created by Widiana Putra on 30/05/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { useEffect, useState } from "react";
import TextField from "../TextInput/TextField";
import _countries from "../../data/_countries";
import PickerBottomSheet from "../BottomSheet/PickerBottomSheet";
import { PickerItem } from "../../model/PickerItem";

interface Props {
  initialPhoneCode?: string;
  onPhoneCodeChange?: (value: string | number) => void;
}

const PhoneField = ({
                      search,
                      initialPhoneCode,
                      onPhoneCodeChange,
                      ...props
                    }: Props & React.ComponentProps<typeof TextField> & React.ComponentProps<typeof PickerBottomSheet>) => {
  const [selected, setSelected] = useState<string | number>("");
  const [isOpenPicker, setIsOpenPicker] = useState(false);


  const handleSelected = (value: string | number) => {
    setSelected(value);
  };

  useEffect(() => {
    if (onPhoneCodeChange) {
      onPhoneCodeChange(selected);
    }
  }, [selected]);


  const handleOpenPicker = () =>
    setIsOpenPicker(true);


  useEffect(() => {
    if (initialPhoneCode) {
      setSelected(initialPhoneCode);
    }
  }, []);

  return <>
    <TextField
      pickerType={"phone"}
      onOpenPicker={() => {
        handleOpenPicker();
      }}
      initialPhoneCode={selected}
      keyboardType={"numeric"}
      {...props}
    />

    <PickerBottomSheet
      value={selected}
      open={isOpenPicker}
      search={search}
      onClose={() => {
        setIsOpenPicker(false);
      }}
      data={
        _countries.map((item) => {
          const i: PickerItem = {
            id: item.phone_code,
            name: `+${item.phone_code} (${item.name})`,
            image: item.flag,
          };
          return i;
        })
      }
      onSave={(value) => {
        handleSelected(value?.id);
        setIsOpenPicker(false);
      }}
      title={"Phone Code Picker"}
    />
  </>;
};

export default PhoneField;
