/**
 * Created by Widiana Putra on 13/07/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { useEffect, useMemo, useState } from "react";
import { PickerItem } from "../../model/PickerItem";
import TextField, { TextInputProps } from "../TextInput/TextField";
import PickerModal, { PickerModalProps } from "../Modal/PickerModal";
import { useTheme } from "../../core/theming";

interface Props {
  initial?: string | number;
  options: PickerItem[];
  onSelectedValueChange?: (value: string | number) => void;
}

export default function SelectModal(
  {
    initial,
    options,
    search,
    onSelectedValueChange,
    ...rest
  }:
    Props & TextInputProps & PickerModalProps,
) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | number>(initial);
  const theme = useTheme();

  const selectedObj = useMemo(() => {
    return options.find((it) => it.id == selected);
  }, [selected]);

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (onSelectedValueChange) {
      onSelectedValueChange(selected);
    }
  }, [selected]);

  return <>
    <TextField
      label={rest.label}
      placeholder={rest.placeholder}
      onOpenPicker={() => {
        console.log("OPEN THIS");
        setIsOpen(true);
      }}
      value={selectedObj?.name}
      pickerType={"select"}
      editable={false}
      mode={rest.mode ?? theme?.textInput?.mode}
      suffixIcon={{
        icon: "chevron-down",
        size: 16,
      }}
      {...rest}
    />

    <PickerModal
      value={selected}
      search={search}
      open={isOpen}
      onClose={handleClose}
      data={options}
      onSave={(value) => {
        setSelected(value?.id);
      }}
      searchPlaceholder={rest.searchPlaceholder}
      title={rest.title ?? rest.label}
      renderCustomItem={rest.renderCustomItem}
    />
  </>;
}
