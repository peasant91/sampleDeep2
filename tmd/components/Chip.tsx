import * as React from "react";
import { useEffect, useState } from "react";
import { StyleProp, TextStyle, View, ViewStyle } from "react-native";
import Typography from "./Typography/Typography";
import Icon, { IconProps } from "./Icon";
import { useTheme } from "../core/theming";
import { TouchableRipple } from "../index";
import PickerBottomSheet from "./BottomSheet/PickerBottomSheet";
import { PickerItem } from "../model/PickerItem";

export type ChipShape = "rect" | "rounded"
export type ChipVariant = "filled" | "outlined"
export type ChipType = "filter" | "picker"

export type ChipProps = {
  shape?: ChipShape;
  variant?: ChipVariant;
  text?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: IconProps;
  suffixIcon?: IconProps;
  selected?: boolean;
  onPress?: () => void;
  type?: "filter" | "picker";
  onPickerChanges?: (item?: PickerItem) => void;
  initial?: string;
  pickerList?: PickerItem[];
  pickerTitle?: string;
  onResetPicker?: () => void;
}
const ROUNDED_BORDER_RADIUS = 32;

export default function Chip({
                               shape,
                               variant,
                               text,
                               selected,
                               type = "filter",
                               suffixIcon,
                               ...rest
                             }: ChipProps) {
  const { colors, chip, roundness } = useTheme();
  let bgColor, txtColor, borderColor;
  const usedVariant = variant ?? chip.variant;
  const [isOpenPicker, setIsOpenPicker] = useState(false);
  const usedShape = shape ?? chip.shape;
  const isSelectedFilled = usedVariant == "filled" && isSelected;
  const isUseBorder = usedVariant == "outlined" || isSelectedFilled;
  const [selectedObj, setSelectedObj] = useState({});

  const [isSelected, setIsSelected] = useState(false);
  const [pickerInitial, setPickerInitial] = useState("");

  useEffect(() => {
    setIsSelected(selected ?? false);
  }, [selected]);

  useEffect(() => {
    const obj = rest?.pickerList?.find((item) => item.id == rest.initial);
    if (obj) {
      setIsSelected(true);
      setSelectedObj(obj);
    }
    setPickerInitial(rest?.initial)
  }, [rest.initial, rest.pickerList]);


  switch (usedVariant) {
    case "filled": {
      bgColor = colors.neutral.neutral_20;
      txtColor = colors.neutral.neutral_90;
      if (isSelected) {
        bgColor = colors.primary.main;
        txtColor = colors.neutral.neutral_10;
        borderColor = colors.primary.border;
      }
      break;
    }
    case "outlined": {
      bgColor = colors.neutral.neutral_10;
      borderColor = colors.neutral.neutral_50;
      txtColor = colors.neutral.neutral_90;
      if (isSelected) {
        bgColor = colors.primary.surface;
        borderColor = colors.primary.main;
        txtColor = colors.primary.main;
      }
      break;
    }
  }

  const borderRadius = {
    borderRadius: usedShape == "rect" ? roundness : ROUNDED_BORDER_RADIUS,
  };

  const handleOnPress = () => {
    if (type == "picker") {
      setIsOpenPicker(true);
    } else {
      if (rest.onPress) {
        rest.onPress();
      }
    }
  };

  return <>
    <View
      style={[{
        backgroundColor: bgColor,
        borderWidth: isSelectedFilled ? 2 : isUseBorder ? 1 : 0,
        borderColor: borderColor,
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "baseline",
      }, borderRadius,

        rest.style]}
    >
      <TouchableRipple
        borderless
        style={[
          {
            paddingVertical: isSelectedFilled
              ? 4
              : 6,
            paddingHorizontal: isSelectedFilled
              ? 14 :
              16,
            flexDirection: "row",
            alignItems: "center",
          },
          borderRadius,
        ]}
        onPress={handleOnPress}
        delayPressIn={0}
      >
        <>
          {
            rest.icon &&
            <Icon
              style={{
                marginRight: 4,
              }}
              size={rest.icon.size ?? 18}
              color={rest.icon.color ?? txtColor}
              {...rest.icon}
            />
          }
          <Typography
            style={[
              { color: txtColor },
              rest.textStyle,
            ]}
            type={"label1"}>
            {selectedObj?.name ?? text}
          </Typography>
          {
            suffixIcon &&
            <Icon
              style={{
                marginLeft: 8,
              }}
              size={18}
              color={txtColor}
              {...suffixIcon}
            />
          }

          {
            type == "picker" &&
            <Icon
              style={{
                marginLeft: 4,
              }}
              size={18}
              color={txtColor}
              icon={"chevron-down"} />
          }
        </>
      </TouchableRipple>
    </View>
    {
      type == "picker" &&
      <PickerBottomSheet
        open={isOpenPicker}
        title={rest.pickerTitle}
        onReset={rest.onResetPicker ? () => {
          if (rest.onResetPicker) {
            rest.onResetPicker();
            setPickerInitial("")
            setSelectedObj({});
            setIsSelected(false);
            setIsOpenPicker(false);
          }
        } : undefined}
        onClose={() => {
          setIsOpenPicker(false);
        }}
        onSave={(item) => {
          if (item) {
            if (rest.onPickerChanges) {
              rest.onPickerChanges(item);
            }
            setPickerInitial(item.id)
            setSelectedObj(item);
            setIsSelected(true);
            setIsOpenPicker(false);
          }
        }}
        value={pickerInitial}
        data={rest.pickerList}
      />
    }
  </>;
}
