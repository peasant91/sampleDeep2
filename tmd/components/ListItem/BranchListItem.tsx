/**
 * Created by Widiana Putra on 13/07/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import { CustomRenderItemType } from "../../model/PickerItem";
import { Pressable, View } from "react-native";
import { Icon, Stack, useTheme } from "../../index";
import Typography from "../Typography/Typography";
import RadioButton from "../RadioButton";

export default function BranchListItem({ item, onSelect, isSelected }: CustomRenderItemType) {
  const { colors } = useTheme();
  return <>
    <Pressable
      style={{
        marginVertical: 6,
        borderWidth: 1,
        borderRadius: 8,
        padding: 16,
        borderColor: isSelected ? colors.primary.main : colors.neutral.neutral_40,
        backgroundColor: isSelected ? colors.primary.surface : colors?.neutral.neutral_10,
      }}
      onPress={() => {
        onSelect(item);
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}>
        <Stack direction={"row"} style={{ flex: 1, alignItems: "center" }}>
          <Stack style={{ flexGrow: 1 }} spacing={4}>
            <Stack direction={"row"} style={{ alignItems: "center" }} spacing={6}>
              <Icon icon={"business"} />
              <Typography type={"label1"}>{item?.name}</Typography>
            </Stack>
            <Typography type={"body3"}>{item?.description}</Typography>
          </Stack>
          <RadioButton
            value={item?.id}
          />
        </Stack>
      </View>
    </Pressable>
  </>;
}
