import React, { useEffect, useRef, useState } from "react";
import { Page, useTheme } from "../../../tmd";
import { Image, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import polyline from "@mapbox/polyline";

export default function MapTrackingScreen() {
  const mapRef = useRef<MapView>(null);
  const [markerPos, setMarkerPos] = useState<Geolocation.GeoCoordinates | null>(null);
  const [cameraHeading, setCameraHeading] = useState(0);
  const {colors} = useTheme()
  useEffect(() => {
    Geolocation.getCurrentPosition((position) => {
      console.log(JSON.stringify(position, null, 2));
      handleCameraChanges(position.coords.latitude, position.coords.longitude);
      setMarkerPos(position.coords);
    });
    const watchId = Geolocation.watchPosition((position) => {
        console.log(JSON.stringify(position, null, 2));
        // handleCameraChanges(position.coords.latitude, position.coords.longitude);
        setMarkerPos(position.coords);
      }, (error) => {
        console.log(JSON.stringify(error, null, 2));
      }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 1 },
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  const handleCameraChanges = (lat: number, lng: number) => {
    mapRef?.current?.animateCamera({
      center: { latitude: lat, longitude: lng },
      pitch: 2,
      heading: 20,
      altitude: 200,
      zoom: 18,
    }, { duration: 500 });
  };

  const updateCameraHeading = () => {
    mapRef?.current?.getCamera().then((camera) => {
      console.log(camera);
      setCameraHeading(camera.heading);
    });
  };

  const decodedPolylineArrs = polyline.decode("hs~s@e|j~T^Eh@CT@n@BN?BfFJpCBpCuCEqCL_FDgAFaG@wEDCkBAMwA@A?_BAiBEgBBmB@gADc@?sC?A^InFOlECdAsGIkGEIAMCC?ICCBo@@cDBoA?yA@}E@@QJyDLoJb@CDMBE`A?rC@");
  const decodedPolyline = decodedPolylineArrs.map((arr) => {
    return {
      latitude: arr[0],
      longitude: arr[1],
    };
  })

  return (
    <Page>
      <View style={{
        flex: 1,
      }}>
        <MapView
          followsUserLocation={true}
          ref={mapRef}
          onTouchEnd={() => {
            updateCameraHeading();
          }}
          onTouchCancel={() => {
            updateCameraHeading();
          }}
          onTouchStart={() => {
            updateCameraHeading();
          }}
          onTouchMove={() => {
            updateCameraHeading();
          }}
          showsUserLocation={true}
          style={{
            flex: 1,
          }}>
          {
            decodedPolyline &&
            <Polyline
              coordinates={decodedPolyline} strokeWidth={3} strokeColor={colors.primary.main}
            />
          }
          {
            markerPos && (
              <Marker
                flat
                anchor={{
                  x: 0.5,
                  y: 0.5,
                }}
                coordinate={{
                  latitude: markerPos?.latitude,
                  longitude: markerPos?.longitude,
                }}>
                <View
                  style={{
                    // transform: [{ rotate: "45deg" }],
                    transform: [{ rotate: `${(markerPos?.heading ?? 0 - cameraHeading) - 180}deg` }],
                  }}
                >
                  <Image
                    source={require("../../assets/icons/ic_driver/ic_driver.png")} />
                </View>
              </Marker>
            )
          }

        </MapView>
      </View>
    </Page>
  );
}
