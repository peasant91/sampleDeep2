/**
 * Created by Widiana Putra on 08/07/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { ComponentProps, useEffect, useMemo, useState } from "react";
import { PickerItem } from "../../model/PickerItem";
import PickerBottomSheet from "../BottomSheet/PickerBottomSheet";
import MultiPickerBottomSheet from "../BottomSheet/MultiPickerBottomSheet";
import { Button, HelperText, useTheme } from "../../index";
import LabelInput from "../TextInput/Label/LabelInput";
import { View } from "react-native";
import Chip from "../Chip";
import { useLocale } from "../../../src/providers/LocaleProvider";

interface Props {
  initial?: string[] | number[];
  options: PickerItem[];
  onSelectedValueChange?: (value: string[] | number[]) => void;
  buttonProps?: ComponentProps<typeof Button>;
  error?: boolean;
  errorText?: string;
  label?: string;
  requiredLabel?: boolean;
  buttonTitle?: string;
  pickerTitle?: string;
  helperText?: string;
  editable?: boolean;
  chipProps?: ComponentProps<typeof Chip>;
}

export default function MultiSelect({
                                      initial,
                                      options,
                                      search,
                                      onSelectedValueChange,
                                      buttonProps,
                                      error,
                                      errorText,
                                      requiredLabel,
                                      label, buttonTitle,
                                      helperText,
                                      editable = true,
                                      chipProps,
                                      ...rest
                                    }: Props & ComponentProps<typeof PickerBottomSheet>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string[] | number[]>(initial ?? []);
  const { t } = useLocale();
  const {colors} = useTheme()

  const selectedObjs = useMemo(() => {
    return options.filter((it) => selected.includes(it?.id));
  }, [selected]);

  const selectedObjNamesStr = useMemo(() => {
    return selectedObjs?.map((it) => it?.name)?.join(", ");
  }, [selectedObjs]);

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (onSelectedValueChange) {
      onSelectedValueChange(selected);
    }
  }, [selected]);

  const removeSelected = (index: number) => {
    const newSelected = [...selected];
    newSelected.splice(index, 1);
    setSelected(newSelected);
  };

  return <View style={[{
    marginVertical: 8,
  }]}>
    <LabelInput label={"MultiSelect"} required={requiredLabel} />
    {
      editable &&
      <Button
        size={'sm'}
        style={[{
          marginTop: 8,
        }]}
        variant={"secondary"}
        onPress={() => {
          setIsOpen(true);
        }}
        icon={{
          icon: "add-circle",
        }}
        {...buttonProps}
      >{buttonTitle ?? t("add_item")}</Button>
    }

    {
      selectedObjs?.length > 0 &&
      <View style={{ marginTop: 8, flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
        {selectedObjs?.map((it, index) => {
          return (
            <Chip
              style={{
                marginRight: 4,
                marginVertical: 4,
              }}
              key={index}
              text={it?.name}
              variant={'outlined'}
              suffixIcon={
                editable ?
                  {
                    icon: "close",
                    color: colors.neutral.neutral_80,
                  } : undefined
              }
              onPress={editable ? () => {
                removeSelected(index);
              } : undefined}
              {...chipProps}
            />
          );
        })}
      </View>
    }
    {
      (error && errorText) &&
      <HelperText type={"error"} style={{
        marginTop: 8,
      }}>{errorText}</HelperText>
    }

    {
      helperText &&
      <HelperText type={"info"} style={{
        marginTop: 4,
      }}>{helperText}</HelperText>
    }

    <MultiPickerBottomSheet
      value={selected}
      search={search}
      open={isOpen}
      onClose={handleClose}
      data={options}
      onSave={(value) => {
        const ids = value?.map((it) => it?.id);
        setSelected(ids);
      }}
      fullHeight={rest.fullHeight}
      title={rest.pickerTitle ?? label} />
  </View>;
}
