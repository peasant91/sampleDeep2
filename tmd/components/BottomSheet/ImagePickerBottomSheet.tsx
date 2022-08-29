/**
 * Created by Widiana Putra on 01/07/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { useEffect, useRef, useState } from "react";
import { Modalize } from "react-native-modalize";
import { useTranslation } from "react-i18next";
import { Portal } from "react-native-portalize";
import { Pressable, SafeAreaView, View } from "react-native";
import Typography from "../Typography/Typography";
import Divider from "../Divider";
import Icon from "../Icon";
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker";
import { Stack } from "../../index";

export type ImageRatioCrop = "1:1" | "4:3" | "16:9" | "16:10" | "21:9";
export interface ImagePickerBSProps {
  open?: boolean;
  title?: string;
  onClose?: () => void;
  dismissable?: boolean;
  onDelete?: () => void;
  onChangeImage?: (image: ImageOrVideo) => void;
  ratio?: ImageRatioCrop;
  crop?: boolean;
  camera?: boolean;
  gallery?: boolean;
  selectedImage?: string
}


export default function ImagePickerBottomSheet({ selectedImage,camera = true, gallery = true, ...props }: ImagePickerBSProps) {
  const modalizeRef = useRef<Modalize>(null);
  const { t } = useTranslation();
  const [currentImage, setCurrentImage] = useState(selectedImage);
  const imageSize = 800;
  useEffect(() => {
    if (props.open) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [props.open]);


  const handleOpen = () => {
    modalizeRef?.current?.open();
  };

  const handleClose = () => {
    modalizeRef?.current?.close();
    // props.onClose();
  };

  let imageCropSize = { width: imageSize, height: imageSize };
  if (props.ratio) {
    const ratio = props.ratio.split(":");
    imageCropSize = { width: imageSize, height: (imageSize / parseInt(ratio[0]) * parseInt(ratio[1])) };
  }


  const handleOpenCamera = () => {
    ImagePicker.openCamera({
      width: imageCropSize.width,
      height: imageCropSize.height,
      cropping: props.crop ?? true,
    }).then(image => {
      if (props.onChangeImage) {
        setCurrentImage(image?.path);
        props?.onChangeImage(image);
      }
    }).catch(reason => {
      console.log(reason);
    });
  };

  const handleOpenGallery = () => {
    ImagePicker.openPicker({
      width: imageCropSize.width,
      height: imageCropSize.height,
      cropping: props.crop ?? true,
    }).then(image => {
      if (props.onChangeImage) {
        setCurrentImage(image?.path);
        props?.onChangeImage(image);
      }
    }).catch(reason => {
      console.log(reason);
    });
  };

  const handleDeleteImage = () => {
    if (props.onDelete) {
      props.onDelete();
    }
    setCurrentImage(undefined);
    if (props.onClose) {
      props.onClose();
    }
  };


  return (
    <Portal>
      <Modalize
        closeOnOverlayTap={props.dismissable ? !props.dismissable : true}
        handlePosition={"inside"}
        adjustToContentHeight
        modalStyle={{
          padding: 16,
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
        }}

        onClose={props.onClose}
        ref={modalizeRef}
      >
        <SafeAreaView style={{
          flex: 1,
        }}>

          <View style={{
            flexDirection: "column",
            paddingVertical: 16,
          }}>
            <Stack>
              <>
                <Typography type={"title2"}>{props.title ?? t("pick_image")}</Typography>
                <View style={{ marginTop: 16 }} />
              </>
              {
                camera &&
                <>
                  <Pressable
                    onPress={handleOpenCamera}
                  >

                    <View
                      style={{
                        flexDirection: "row",
                        flex: 1,
                        alignItems: "center",
                        paddingVertical: 16,
                      }}
                    >

                      <Icon icon={"camera"} size={20} />
                      <Typography type={"label1"} style={{
                        flexGrow: 1,
                        marginStart: 16,
                      }}>{t("pick_from_camera")}</Typography>
                      <Icon icon={"chevron-forward"} />
                    </View>
                  </Pressable>
                </>
              }
              {
                (camera && gallery) &&
                <Divider style={{ marginStart: 38 }} />
              }

              {
                gallery &&
                <Pressable
                  onPress={handleOpenGallery}
                >

                  <View
                    style={{
                      flexDirection: "row",
                      flex: 1,
                      alignItems: "center",
                      paddingVertical: 16,
                    }}
                  >

                    <Icon icon={"folder-open"} size={20} />
                    <Typography type={"label1"} style={{
                      flexGrow: 1,
                      marginStart: 16,
                    }}>{t("pick_from_gallery")}</Typography>
                    <Icon icon={"chevron-forward"} />
                  </View>
                </Pressable>
              }
              {
                ((currentImage) && props.onDelete) &&
                <>
                  <Divider style={{ marginStart: 38 }} />
                  <Pressable
                    onPress={handleDeleteImage}>

                    <View
                      style={{
                        flexDirection: "row",
                        flex: 1,
                        alignItems: "center",
                        paddingVertical: 16,
                      }}
                    >

                      <Icon icon={"trash"} size={20} />
                      <Typography type={"label1"} style={{
                        flexGrow: 1,
                        marginStart: 16,
                      }}>{t("delete_image")}</Typography>
                      <Icon icon={"chevron-forward"} />
                    </View>
                  </Pressable>
                </>
              }
            </Stack>

          </View>
        </SafeAreaView>
      </Modalize>
    </Portal>
  );
}

