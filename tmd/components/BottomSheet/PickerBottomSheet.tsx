/**
 * Created by Widiana Putra on 06/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { ComponentProps, useEffect, useRef, useState } from "react";
import { Portal } from "react-native-portalize";
import { Modalize } from "react-native-modalize";
import { Animated, FlatList, Image, Pressable, SafeAreaView, View } from "react-native";
import Typography from "../Typography/Typography";
import { Button, Divider, useTheme } from "../../index";
import TextField from "../TextInput/TextField";
import RadioButtonGroup from "../RadioButton/RadioButtonGroup";
import { PickerItem } from "../../model/PickerItem";
import RadioButton from "../RadioButton/RadioButton";
import { useTranslation } from "react-i18next";

interface Props {
  open?: boolean;
  onClose?: () => void;
  value?: string | number;
  data?: PickerItem[];
  onReset?: () => void;
  onSave?: (item?: PickerItem) => void;
  title?: string;
  search?: boolean;
  fullHeight?: boolean;
  pickerMode?: "select" | "auto";
}

export default function PickerBottomSheet({
                                            fullHeight = true,
                                            pickerMode = "select",
                                            ...props
                                          }: Props & ComponentProps<typeof Modalize>) {

  const modalizeRef = useRef<Modalize>(null);
  const flatListRef = useRef<FlatList>(null);
  const [selected, setSelected] = useState();
  const [list, setList] = useState(props.data);
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();
  const { colors } = theme;
  const { t } = useTranslation();

  // const isFullHeight = props.data?.length >= 6;
  const isFullHeight = fullHeight;
  console.log(isFullHeight);
  const [contentHeight, setContentHeight] = useState(null);


  // useEffect(() => {
  //   // if (props?.initial) {
  //   setSelected(props?.value);
  //   // }
  // }, [props.value]);

  useEffect(() => {
    if (props.open) {
      setSelected(props?.value);
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


  const handleSave = (value: string) => {
    if (props.onSave) {
      const obj = props.data?.find(it => it.id == value);
      props.onSave(obj);
      if (props.onClose) {
        props?.onClose();
      }
    }
  };

  const renderItem = ({ item }) => {
    return <Pressable
      onPress={() => {
        setSelected(item?.id);
        if (pickerMode == "auto") {
          handleSave(item?.id);
        }
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
      {...props}
      customRenderer={
        <Animated.View style={{
          height: isFullHeight
            ? "100%"
            : contentHeight ?? "100%",
          flexDirection: "column",
        }}>
          <SafeAreaView style={{ flex: 1 }}>
            <View
              style={isFullHeight && {
                flex: 1,
              }}
              onLayout={(event) => {
                const { height } = event.nativeEvent.layout;
                if (!isFullHeight) {
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
                        placeholder={"Search"}
                      />
                    </View>
                  }
                </View>
                {/*{(props.search || props.onReset) &&*/}
                {/*  <Divider*/}
                {/*    variant={"dotted"}*/}
                {/*    style={{*/}
                {/*      marginTop: 8,*/}
                {/*      marginBottom: 0,*/}
                {/*    }} />*/}
                {/*}*/}
              </View>

              <View
                style={
                  isFullHeight
                    ? { flexGrow: 1, flex: 1, height: "100%" }
                    : {}
                }
              >
                <RadioButtonGroup
                  onValueChange={(value) => {
                    setSelected(value);
                    if (pickerMode == "auto") {
                      handleSave(value);
                    }
                  }}
                  value={selected}>
                  <FlatList
                    ref={flatListRef}
                    style={{
                      paddingHorizontal: 16,
                    }}
                    data={list}
                    keyExtractor={(item) => item.name}
                    renderItem={renderItem}
                  />
                </RadioButtonGroup>
              </View>
              {/*<Divider*/}
              {/*  style={{*/}
              {/*    marginTop: 0,*/}
              {/*  }}*/}
              {/*  variant={"dotted"} />*/}

              {
                pickerMode == "select" &&
                <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
                  <Button
                    size={"lg"}
                    onPress={() => {
                      if (props.onSave) {
                        const obj = props.data?.find(it => it.id == selected);
                        props.onSave(obj);
                        if (props.onClose) {
                          props?.onClose();
                        }
                      }
                    }}
                    buttonStyle={{
                      width: "100%",
                    }}
                  >{t("save")}</Button>
                </View>
              }

            </View>
          </SafeAreaView>
        </Animated.View>
      }
      disableScrollIfPossible
      ref={modalizeRef}>
    </Modalize>

  </Portal>;

}
