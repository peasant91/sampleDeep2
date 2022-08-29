import React from "react";
import { Button, Page, Stack } from "../../../tmd";
import { useModal } from "../../../tmd/providers/ModalProvider";
import IllustNoConnection from "../../assets/illusts/no_internet_connection.svg";
import { CAMERA_PERMISSIONS, LOCATION_PERMISSIONS, STORAGE_PERMISSIONS } from "../../../tmd/data/_permissionTypes";
import { Alert } from "react-native";
import { usePermission } from "../../../tmd/providers/PermissionProvider";
import Toolbar from "../../../tmd/components/Toolbar/Toolbar";

export default function ModalScreen() {
  const { showAlertModal, showConfirmationModal, hideConfirmationModal } = useModal();
  const { requestPermissions } = usePermission();
  const handleShowConfirmation = () => {
    showConfirmationModal({
      title: "Takin ingin Tanda Tangan Kontrak?",
      imageNode: <IllustNoConnection />,
      description: "Selesaikan kontrak dengan melakukan tanda tangan digital pada aplikasi",
      buttonOrientation: "horizontal",
      buttonPrimaryAction: () => {
        hideConfirmationModal();
      },
    });
  };

  const handleShowAlert = () => {
    showAlertModal({
      title: "Hmm, Internet kamu putus",
      imageNode: <IllustNoConnection />,
      description: "Tenang, cek koneksi internet atau Wi-fi kamu dan coba lagi ya...",
    });
  };

  const requestPermission = () => {
    requestPermissions([CAMERA_PERMISSIONS, STORAGE_PERMISSIONS, LOCATION_PERMISSIONS],
      () => {
        Alert.alert("GRANTED ");
      });
  };

  return (
    <Page>
      <Toolbar title={"ModalScreen"} />
      <Stack spacing={16} p={16}>
        <Button onPress={handleShowAlert}>Show Alert Modal</Button>
        <Button onPress={handleShowConfirmation}>Show Confirmation Modal</Button>
        <Button onPress={requestPermission}>Permission BS (Decline)</Button>
      </Stack>
    </Page>
  );
}
