/**
 * Created by Widiana Putra on 13/07/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { useEffect, useState } from "react";
import { useTheme } from "../../core/theming";
import { FlatList, Image, Modal, Pressable, SafeAreaView, View } from "react-native";
import { CustomRenderItemType, PickerItem } from "../../model/PickerItem";
import { Button, Divider, IconButton, Stack } from "../../index";
import Typography from "../Typography/Typography";
import TextField from "../TextInput/TextField";
import RadioButtonGroup from "../RadioButton/RadioButtonGroup";
import { useTranslation } from "react-i18next";
import RadioButton from "../RadioButton";
import Portal from "../Portal/Portal";

interface RequiredProps {
  open: boolean;
  onClose: () => void;
  data: PickerItem[];
}

export interface PickerModalProps {
  value?: string | number;
  onReset?: () => void;
  onSave?: (item?: PickerItem) => void;
  searchPlaceholder?: string;
  title?: string;
  search?: boolean;
  renderCustomItem?: (item: CustomRenderItemType) => JSX.Element;
}

export default function PickerModal({
                                      open,
                                      onClose,
                                      value,
                                      data,
                                      onReset,
                                      onSave,
                                      title,
                                      search,
                                      searchPlaceholder,
                                      renderCustomItem,
                                    }: PickerModalProps & RequiredProps) {
  const { colors } = useTheme();
  const [selected, setSelected] = useState();
  const [list, setList] = useState(data);
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();
  useEffect(() => {
    if (searchQuery.length > 0) {
      setList(data?.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())));
    } else {
      setList(data);
    }
  }, [searchQuery]);

  const handleSetSelected = (item?: PickerItem) => {
    setSelected(item?.id);
  };

  const renderItem = ({ item }) => {
    return <Pressable
      onPress={() => {
        handleSetSelected(item);
      }}
    >
      <View
        style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", paddingVertical: 8, flex: 1 }}>
        {
          item?.image &&
          <View style={{ marginRight: 8 }}>
            {/*<Typography>{item?.image}</Typography>*/}
            <Image
              source={{ uri: item?.image }}
              resizeMode={"center"}
              style={{
                width: 24,
                height: 24,
              }} />

          </View>
        }

        <RadioButton
          containerStyle={{
            flexDirection: "row-reverse",
            flex: 1,
          }}
          text={item?.name}
          textStyle={{
            flexGrow: 1,
            color: colors.neutral.neutral_90,
          }}
          value={item?.id}
        />
      </View>
      <Divider />
    </Pressable>;
  };

  return (
    <Portal>
      <Modal
        visible={open}
        onRequestClose={onClose}
        animationType={"slide"}>
        <SafeAreaView style={{
          flex: 1,
        }}>
          <Stack style={{
            flex: 1,
          }}>
            <Stack>
              <Stack direction={"row"}
                     style={{ alignItems: "center", paddingHorizontal: 16, paddingVertical: 16 }}
                     spacing={8}>
                <IconButton
                  onPress={onClose}
                  fitIcon={true}
                  icon={"close"}
                  style={{ backgroundColor: colors.neutral.neutral_10 }}
                  color={colors.neutral.neutral_90} />
                <Typography type={"title2"} style={{ flexGrow: 1 }}>{title ?? ""}</Typography>
                {
                  onReset &&
                  <Button size={"xs"} variant={"secondary"} onPress={onReset}>{t("reset")}</Button>
                }
              </Stack>
              <Divider />
            </Stack>

            <Stack style={{ marginTop: 4, flex: 1 }}>
              {
                search &&
                <View style={{ marginTop: 8, paddingHorizontal: 16 }}>
                  <TextField
                    shape={"rounded"}
                    onInvokeTextChanged={(text) => {
                      setSearchQuery(text);
                    }}
                    search
                    placeholder={searchPlaceholder ?? t("search")}
                  />
                </View>
              }

              <View style={{ marginTop: 16, flexGrow: 1, flex: 1 }}>
                <RadioButtonGroup
                  onValueChange={(value) => {
                    setSelected(value);
                  }}
                  value={selected}>
                  <FlatList
                    style={{
                      paddingHorizontal: 16,
                    }}
                    data={list}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => {
                      if (renderCustomItem) {
                        const propsToSend: CustomRenderItemType = {
                          item: item,
                          onSelect: handleSetSelected,
                          isSelected: item?.id == selected,
                        };
                        return renderCustomItem(propsToSend);
                      }
                      return renderItem({ item });
                    }}
                  />
                </RadioButtonGroup>

              </View>
              <View style={{
                flexShrink: 1,
              }}>
                <Button
                  size={"lg"}
                  onPress={() => {
                    if (onSave) {
                      const obj = data?.find(it => it.id == selected);
                      onSave(obj);
                      if (onClose) {
                        onClose();
                      }
                    }
                  }}
                  style={{
                    marginVertical: 16,
                    paddingHorizontal: 16,
                  }}
                  buttonStyle={{
                    width: "100%",
                  }}
                >{t("choose")}</Button>
              </View>
            </Stack>

          </Stack>

        </SafeAreaView>
      </Modal>
    </Portal>
  );
}
