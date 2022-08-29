import React, { useEffect, useRef, useState } from "react";
import { useLocale } from "../../providers/LocaleProvider";
import { SelectedMap } from "../../../tmd/components/picker/MapPicker";
import MapView from "react-native-maps";
import { Button, Page, Skeleton, useTheme } from "../../../tmd";
import Geocoder from "@timwangdev/react-native-geocoder";
import Config from "react-native-config";
import Geolocation from "react-native-geolocation-service";
import { Image, SafeAreaView, View } from "react-native";
import Stack from "../../../tmd/components/Layout/Stack";
import Typography from "../../../tmd/components/Typography/Typography";
import Icon from "../../../tmd/components/Icon";
import IconButton from "../../../tmd/components/IconButton";
import MapPlacePickerModal from "../../../tmd/components/Modal/MapPlacePickerModal";
import { goBack } from "../../navigations/RootNavigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AppNavigationType from "../../navigations/AppNavigationType";

export default function MapPickerScreen({ route }: NativeStackScreenProps<AppNavigationType, "MapPickerScreen">) {
  const { initial, onSelected } = route.params;
  const { t } = useLocale();
  const [addressObj, setAddressObj] = useState<SelectedMap | null>(null);
  const [mapRegion, setMapRegion] = useState({});
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [isLoadingGeocode, setIsLoadingGeocode] = useState(false);
  const mapRef = useRef<MapView>(null);
  const theme = useTheme();

  const onClose = () => {
    goBack();
  };

  const handleAddressChange = (lat: number, lng: number) => {
    setIsLoadingGeocode(true);
    Geocoder.geocodePositionGoogle({
      lat: lat,
      lng: lng,
    }, {
      apiKey: Config.GOOGLE_MAPS_API_KEY,
    }).then((res) => {
      const a = res[0];
      const location = {
        latitude: a.position.lat,
        longitude: a.position.lng,
      };
      setIsLoadingGeocode(false);
      setAddressObj({
        fullAddress: a.formattedAddress,
        location: location,
        nameAddress: a.feature ?? a.streetName ?? a.subAdminArea,
      });
    }).catch((e) => {
      setIsLoadingGeocode(false);
    });
  };

  const openSearchModal = () => {
    setIsOpenSearch(true);
  };

  const handleCameraChanges = (lat: number, lng: number) => {
    mapRef?.current?.animateCamera({
      center: { latitude: lat, longitude: lng },
      pitch: 2,
      heading: 20,
      altitude: 200,
      zoom: 18,
    }, { duration: 500 });
  };

  useEffect(() => {
    if (initial?.location) {
      setAddressObj(initial);
      handleCameraChanges(initial?.location?.latitude, initial?.location?.longitude);
    } else {
      getUserCurrentLocation();
    }
  }, []);


  const getUserCurrentLocation = () => {
    Geolocation.getCurrentPosition((position) => {
      setMapRegion({
        latitude: position.coords.latitude,
        longitude: position.coords.latitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      handleCameraChanges(position.coords.latitude, position.coords.longitude);
    }, (err) => {
      console.log(err);
    }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 });
  };

  return (<>
      <Page>

        <View style={{
          flex: 1,
        }}>
          <SafeAreaView style={{ flex: 1 }}>

            <View style={{
              position: "relative",
              flexGrow: 1,
            }}>


              <View
                style={{
                  position: "absolute",
                  flex: 1,
                  top: 0,
                  bottom: 120,
                  left: 0,
                  right: 0,
                }}
              >

                <View style={{
                  position: "relative",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                  <View style={{
                    zIndex: 200,
                    marginBottom: 52,
                  }}>
                    <Image
                      source={require("../../../src/assets/icons/ic_marker/ic_marker.png")} />
                  </View>

                  <MapView
                    showsCompass={false}
                    style={{
                      position: "absolute",
                      top: 0, bottom: 0, left: 0, right: 0,
                    }}
                    ref={mapRef}
                    showsUserLocation={true}
                    showsMyLocationButton={false}
                    onRegionChangeComplete={(r, d) => {
                      handleAddressChange(r.latitude, r.longitude);
                    }}
                  >

                  </MapView>
                </View>

              </View>

              <View style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: 16,
                zIndex: 50,
                backgroundColor: "white",
                borderTopStartRadius: 16,
                borderTopEndRadius: 16,
              }}>
                <Stack>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}>
                    <Typography type={"title1"}>{t("select_location")}</Typography>
                    <Button
                      variant={"secondary"}
                      size={"sm"}
                      onPress={() => {
                        openSearchModal();
                      }}
                    >{t("search")}</Button>
                  </View>

                  <Stack style={{
                    marginTop: 16,
                  }}>
                    <Stack direction={"row"} spacing={2}
                           style={{
                             alignItems: "center",
                           }}>
                      <Icon icon={"location-sharp"} size={16} color={theme.colors.primary.main} />
                      {
                        isLoadingGeocode
                          ? <Skeleton
                            width={"50%"}
                            height={14} />
                          : <Typography
                            numberOfLines={1}
                            ellipsizeMode={"tail"}
                            style={{ fontWeight: "600" }}
                            type={"title3"}>{addressObj?.nameAddress ?? "-"}</Typography>
                      }
                    </Stack>
                    {
                      isLoadingGeocode
                        ? <Stack spacing={8} mt={4}>
                          <Skeleton width={"100%"} />
                          <Skeleton width={"80%"} />
                        </Stack>
                        :
                        <Typography
                          type={"body2"}
                          style={{ marginTop: 4 }}
                        >{addressObj?.fullAddress}</Typography>
                    }
                  </Stack>

                  <Button
                    loading={isLoadingGeocode}
                    onPress={() => {
                      if (onSelected) {
                        onSelected(addressObj);
                        // console.log(dataToSend);
                        if (onClose) {
                          onClose();
                        }
                      }
                    }}
                    style={{ marginTop: 16 }}
                    fullWidth size={"md"}>{t("save")}</Button>
                </Stack>

              </View>


              <View
                style={{
                  flexDirection: "row",
                }}>
                <IconButton
                  shape={"rounded"}
                  themeSize={"lg"}
                  variant={"tertiary"}
                  color={theme.colors.neutral.neutral_80}
                  style={{
                    margin: 16,
                    elevation: 8,
                  }}
                  onPress={() => {
                    if (onClose) {
                      onClose();
                    }
                  }}
                  icon={"arrow-back"}
                />
                <View style={{ flexGrow: 1 }} />
                <IconButton
                  shape={"rounded"}
                  themeSize={"lg"}
                  color={theme.colors.neutral.neutral_80}
                  variant={"tertiary"}
                  style={{
                    elevation: 8,
                    margin: 16,
                  }}
                  onPress={() => {
                    getUserCurrentLocation();
                  }}
                  icon={"locate"}
                />

              </View>
            </View>
          </SafeAreaView>

        </View>

        <MapPlacePickerModal
          onCurrentLocation={() => {
            getUserCurrentLocation();
          }}
          open={isOpenSearch}
          onClose={() => {
            setIsOpenSearch(false);
          }}
          onSelected={(data, detail) => {
            const { lat, lng } = detail?.geometry?.location;
            if (lat && lng) {
              handleCameraChanges(lat, lng);
            }
          }} />
      </Page>
    </>
  );
}
