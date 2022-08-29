/**
 * Created by Widiana Putra on 13/07/2022
 * Copyright (c) 2022 - Made with love
 */

import React, { useEffect, useRef, useState } from "react";
import { FlatList, KeyboardAvoidingView, Modal, Pressable, SafeAreaView, Text, View } from "react-native";
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";
import { useLocale } from "../../../src/providers/LocaleProvider";
import Config from "react-native-config";
import TextField from "../TextInput/TextField";
import { Button, Divider, Icon, IconButton, Stack, useTheme } from "../../index";
import Typography from "../Typography/Typography";
import IllustNoLocation from "../../../src/assets/illusts/location_not_found.svg";
import Portal from "../Portal/Portal";
import TextButton from "../Button/TextButton";
import { useDispatch, useSelector } from "react-redux";
import { rootReducer } from "../../../src/redux/stores/store";
import useLayout from "../../utils/useLayout";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelected: (data: GooglePlaceData | null, detail: GooglePlaceDetail | null) => void;
  onCurrentLocation: () => void;
}

export default function MapPlacePickerModal({ open, onClose, onSelected, onCurrentLocation }: Props) {
  const { t, currentLanguage } = useLocale();
  const ref = useRef<GooglePlacesAutocompleteRef>(null);
  const { colors } = useTheme();
  const histories = useSelector((state: ReturnType<typeof rootReducer>) => state.mapReducer.searchHistories);
  const dispatch = useDispatch();
  const [isOpenHistory, setIsOpenHistory] = useState(true);
  const [tbSize, setTbSize] = useLayout();
  const [topSize, setTopSize] = useLayout();

  useEffect(() => {
    if (open) {
      setTimeout(() => ref?.current?.focus(), 150);
    }
  }, [open]);


  const CustomTextField = React.forwardRef((props: any, ref) => {
    return (
      <View
        onLayout={setTopSize}
        style={{
          flex: 1,
        }}>
        <View style={{ marginHorizontal: 16 }}>
          <TextField
            ref={ref}
            {...props}
            placeholder={t("search")}
          />
        </View>

        <View
          style={{
            marginTop: 16,
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 16,
            justifyContent: "space-between",
          }}>
          <Button
            onPress={onClose}
            icon={{
              icon: "map-outline",
            }}
            variant={"secondary"}
            size={"sm"}>{t("choose_from_map")}</Button>

          <Button
            onPress={() => {
              onCurrentLocation();
              onClose();
            }}
            variant={"secondary"}
            icon={{
              icon: "locate",
            }}
            size={"sm"}>{t("current_location")}</Button>
        </View>
        <Divider style={{
          marginTop: 16,
          borderColor: colors.neutral.neutral_30,
          borderWidth: 0.3,
        }} />
      </View>

    );
  });


  function addSearchHistory(data: GooglePlaceData, googlePlaceDetail: GooglePlaceDetail | null) {
    if (histories.map(it => it.data.place_id).includes(data.place_id)) {
      dispatch({
        type: "DELETE_SEARCH_MAP_HISTORY",
        payload: {
          place_id: data.place_id,
        },
      });
    }
    dispatch({
      type: "ADD_SEARCH_MAP_HISTORY",
      payload: {
        search_history: {
          data: data,
          detail: googlePlaceDetail,
        },
      },
    });
  }

  const clearSearchHistory = () => {
    dispatch({
      type: "CLEAR_SEARCH_MAP_HISTORY",
    });
  };

  const PlaceRowItem = ({ data, index }: { data: GooglePlaceData, index: number }) => {
    return (
      <View
        key={index}
        style={{
          width: "100%",
        }}
      >
        <Stack direction={"row"} spacing={8} style={{
          alignItems: "flex-start",
        }}>
          {
            data?.types?.includes("lodging")
              ? <Icon icon={"business"} size={20} color={colors.neutral.neutral_90} />
              : <Icon icon={"location"} size={20} color={colors.neutral.neutral_90} />
          }
          <Stack spacing={4}>
            <Typography type={"label1"}>{data?.structured_formatting?.main_text}</Typography>
            {/*<Text>{data?.description}</Text>*/}
            <Typography
              type={"body3"}>{data?.description}</Typography>
          </Stack>
        </Stack>
      </View>
    );
  };

  return (
    <>
      <Portal>
        <Modal visible={open} onRequestClose={onClose} animationType={"fade"}>
          <SafeAreaView style={{
            flex: 1,
          }}>
            {/*<ScrollView style={{*/}
            {/*  flex: 1,*/}
            {/*}}>*/}
            <KeyboardAvoidingView style={{
              flex: 1,
              position: "relative",
            }}>


              {/*search history*/}
              {
                ((tbSize.measured && topSize.measured) && isOpenHistory) &&
                <View style={{
                  position: "absolute",
                  backgroundColor: "white",
                  top: tbSize.height + topSize.height, right: 0, left: 0, bottom: 0,
                }}>
                  <View style={{ margin: 8 }} />
                  <View style={{
                    paddingHorizontal: 16,
                  }}>
                    <Stack direction={"row"} content={"space-between"}>
                      <Typography type={"label1"}
                                  style={{ color: colors.neutral.neutral_100 }}>{t("latest_search")}</Typography>
                      <TextButton underline size={"sm"} onPress={clearSearchHistory}>{t("clear_history")}</TextButton>
                    </Stack>
                  </View>
                  <FlatList
                    style={{
                      padding: 16,
                      marginTop: 16,
                    }}
                    data={histories}
                    renderItem={({ item, index }) => {
                      return (
                        <Pressable
                          style={{
                            marginStart: 4,
                          }}
                          onPress={() => {
                            addSearchHistory(item.data, item.detail);
                            onSelected(item.data, item.detail);
                            onClose();
                          }}>
                          <Stack direction={"column"}>

                            <PlaceRowItem data={item.data} index={index} />
                            <Divider style={{ marginVertical: 16, marginStart: 28 }} />
                          </Stack>
                        </Pressable>
                      );
                    }}
                  />
                </View>
              }


              <View
                onLayout={setTbSize}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  backgroundColor: "white",
                }}>
                <IconButton
                  shape={"rounded"}
                  onPress={() => {
                    onClose();
                  }}
                  icon={"arrow-back"}
                  color={colors.neutral.neutral_90}
                  style={{ backgroundColor: colors.neutral.neutral_10 }} />
                <Typography type={"title2"} style={{ marginStart: 8, flexGrow: 1 }}>
                  {t("choose_address")}
                </Typography>
              </View>


              <GooglePlacesAutocomplete
                ref={ref}
                fetchDetails={true}
                styles={{
                  container: {
                    flex: 1,
                    height: "100%",
                  },
                  textInputContainer: {
                    margin: 0,
                  },
                  listView: {
                    marginTop: 8,
                    paddingStart: 8,
                    paddingEnd: 16,
                    backgroundColor: "white",
                  },
                  separator: {
                    marginStart: 42,
                    backgroundColor: colors.neutral.neutral_30,
                  },
                }}
                placeholder={t("search")}
                onPress={(data, detail) => {
                  addSearchHistory(data, detail);
                  onSelected(data, detail);
                  onClose();
                }}
                listEmptyComponent={() => {
                  return <Stack
                    spacing={4}
                    style={{
                      height: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingTop: 32,
                      backgroundColor: "white",
                    }}>
                    <IllustNoLocation />
                    <Typography style={{ textAlign: "center", marginTop: 8 }}
                                type={"title2"}>{t("location_not_found")}</Typography>
                    <Typography style={{ textAlign: "center" }}>{t("location_not_found_description")}</Typography>
                  </Stack>;
                }}
                isRowScrollable={false}
                renderRow={(data, index) => {
                  return (
                    <PlaceRowItem data={data} index={index} />
                  );
                }}
                query={{
                  key: Config.GOOGLE_MAPS_API_KEY,
                  language: currentLanguage,
                }}
                textInputProps={{
                  InputComp: CustomTextField,
                  search: true,
                  style: {
                    width: "100%",
                    backgroundColor: "white",
                  },
                  onClear: () => {
                    ref?.current?.clear();
                    ref?.current?.blur();
                  },
                }}
              />
            </KeyboardAvoidingView>
            {/*</ScrollView>*/}
          </SafeAreaView>
        </Modal>
      </Portal>
    </>
  );
}
