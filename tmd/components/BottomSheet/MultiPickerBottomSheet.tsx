/**
 * Created by Widiana Putra on 08/07/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { ComponentProps, useEffect, useRef, useState } from "react";
import { Modalize } from "react-native-modalize";
import { useTheme } from "../../core/theming";
import { useTranslation } from "react-i18next";
import { Animated, FlatList, Image, Pressable, SafeAreaView, View } from "react-native";
import { Button, Checkbox, Divider } from "../../index";
import { Portal } from "react-native-portalize";
import { PickerItem } from "../../model/PickerItem";
import Typography from "../Typography/Typography";
import TextField from "../TextInput/TextField";

interface Props {
  open?: boolean;
  onClose: () => void;
  value?: string[] | number[];
  data?: PickerItem[];
  onReset?: () => void;
  onSave?: (items?: PickerItem[]) => void;
  title?: string;
  search?: boolean;
  fullHeight?: boolean;
}


export default function MultiPickerBottomSheet({
                                                 fullHeight = true,
                                                 ...props
                                               }: Props & ComponentProps<typeof Modalize>) {
  const modalizeRef = useRef<Modalize>(null);
  const [selected, setSelected] = useState<string[] | number[]>([]);
  const [list, setList] = useState(props.data);
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();
  const { colors } = theme;
  const { t } = useTranslation();

  const isFullHeight = fullHeight;

  const [contentHeight, setContentHeight] = useState(null);

  useEffect(() => {
    if (props.open) {
      if (props?.value) {
        setSelected(props?.value);
      }
      setSearchQuery("");
      modalizeRef?.current?.open();
    } else {
      modalizeRef?.current?.close();
    }
  }, [props.open]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setList(props?.data?.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())));
    } else {
      setList(props.data);
    }
  }, [searchQuery]);

  const handleSelected = (id: number | string) => {
    const arr = [...selected];
    if (arr?.includes(id)) {
      const index = arr.indexOf(id);
      if (index !== -1) {
        arr.splice(index, 1);
      }
    } else {
      arr.push(id);
    }
    setSelected(arr);
  };

  const renderItem = ({ item }) => {
    return <Pressable
      onPress={() => {
        handleSelected(item?.id);
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

        <Checkbox
          checked={selected?.includes(item?.id)}
          containerStyle={{
            flexDirection: "row-reverse",
            flex: 1,
            paddingVertical: 8,
            paddingHorizontal: 4,
          }}
          text={item?.name}
          textStyle={{
            flexGrow: 1,
            color: colors.neutral.neutral_90,
            marginLeft: 0,
          }}
        />
      </View>
      <Divider />
    </Pressable>;
  };
  return <Portal>
    <Modalize
      adjustToContentHeight={!isFullHeight}
      onClose={() => {
        setSearchQuery("");
        if (props.onClose) {
          props.onClose();
        }
      }}
      modalStyle={
        [{
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        },
          isFullHeight ? { flex: 1 } : {},
        ]}
      handlePosition={"inside"}
      customRenderer={
        <Animated.View style={{
          height: isFullHeight
            ? "100%"
            : contentHeight ?? "100%",
          flexDirection: "column",
        }}>
          <SafeAreaView style={{
            flex: 1,
          }}>
            <View
              style={isFullHeight && {
                flex: 1,
              }}
              onLayout={(e) => {
                const { height } = e.nativeEvent.layout;
                if (!isFullHeight) {
                  console.log(height);
                  setContentHeight(height);
                }
              }}
            >


              <View
                style={{ flexDirection: "column", paddingTop: 24, paddingBottom: 8 }}>

                <View
                  style={{ flexDirection: "column", paddingHorizontal: 16 }}>

                  <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                    <Typography type={"title2"}>{props.title ?? "Pick Data"}</Typography>
                    {
                      props.onReset &&
                      <Button
                        size={"sm"}
                        variant={"secondary"}
                        onPress={props?.onReset}
                      >
                        {t("reset")}
                      </Button>
                    }
                  </View>
                  {props.search &&
                    <View style={{ marginTop: 8 }}>
                      <TextField
                        onInvokeTextChanged={(text) => {
                          setSearchQuery(text);
                        }}
                        search
                        placeholder={t("search")}
                      />
                    </View>
                  }
                </View>
              </View>

              <View
                style={
                  isFullHeight
                    ? { flexGrow: 1, flex: 1, height: "100%" }
                    : {}
                }
              >
                <FlatList
                  style={{
                    paddingHorizontal: 16,
                  }}
                  data={list}
                  keyExtractor={(item) => item.name}
                  renderItem={renderItem}
                />
              </View>

              <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
                <Button
                  size={"lg"}
                  onPress={() => {
                    if (props.onSave) {
                      const objs = props?.data?.filter((item) => selected.includes(item?.id));
                      props.onSave(objs);
                      props.onClose();
                    }
                  }}
                  buttonStyle={{
                    width: "100%",
                  }}
                >{t("save")}</Button>
              </View>

            </View>
          </SafeAreaView>

        </Animated.View>
      }
      {...props}
      ref={modalizeRef}>
    </Modalize>

  </Portal>;

}
