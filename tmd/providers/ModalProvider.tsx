import React, { ComponentProps, createContext, useContext, useState } from "react";
import IllustNoConnection from "../../src/assets/illusts/no_internet_connection.svg";
import IllustServerError from "../../src/assets/illusts/server_error.svg";
import IllustLocationPermission from "../../src/assets/illusts/permission_location.svg";
import IllustCameraPermission from "../../src/assets/illusts/permission_camera.svg";
import { Linking } from "react-native";
import { useLocale } from "../../src/providers/LocaleProvider";
import { PermissionType } from "./BottomSheetProvider";
import ConfirmationModal from "../components/Modal/ConfirmationModal";
import AlertModal from "../components/Modal/AlertModal";
import ProgressModal from "../components/Modal/ProgressModal";
import { CircularProgressBar } from "../index";
import { StackDirection } from "../components/Layout/Stack";

type ConfirmationModalContext = {
  imageNode?: React.ReactNode;
  title?: string;
  description?: string;
  buttonPrimaryTitle?: string;
  buttonSecondaryTitle?: string;
  buttonPrimaryAction?: () => void;
  buttonSecondaryAction?: () => void;
  buttonSecondary?: boolean;
  dismissible?: boolean;
  buttonOrientation?: "horizontal" | "vertical";
}

type ModalContextType = {
  showConfirmationModal: (props: ConfirmationModalContext) => void;
  hideConfirmationModal: () => void;
  showAlertModal: (props: ConfirmationModalContext) => void;
  hideAlertModal: () => void;
  showErrorModal: (error: any, props?: ConfirmationModalContext) => void;
  hideErrorModal: () => void;
  showPermissionModal: (type: PermissionType, props?: ConfirmationModalContext) => void;
  hidePermissionModal: () => void;
  showLoadingModal: (props?: ProgressModalProps) => void;
  hideLoadingModal: () => void;
}

type ProgressModalProps = {
  title?: string;
  description?: string;
  dismissible?: boolean;
  circularProgressProps?: ComponentProps<typeof CircularProgressBar>;
}

const initialState: ModalContextType = {
  showConfirmationModal: () => {
  },
  hideConfirmationModal: () => {
  },
  showAlertModal: () => {
  },
  hideAlertModal: () => {
  },
  showErrorModal: () => {
  },
  hideErrorModal: () => {
  },
  showPermissionModal: () => {
  },
  hidePermissionModal: () => {
  },
  showLoadingModal: () => {

  },
  hideLoadingModal: () => {

  },
};

export const ModalContext = createContext(initialState);
export const useModal = () => useContext(ModalContext);
const ModalProvider = ({ children }: any) => {
  const { t } = useLocale();
  const [isOpenConfirmation, setIsOpenConfirmation] = useState(false);
  const [confirmationProps, setConfirmationProps] = useState<ConfirmationModalContext>({});
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [alertProps, setAlertProps] = useState<ConfirmationModalContext>({});

  const [isOpenError, setIsOpenError] = useState(false);
  const [errorProps, setErrorProps] = useState<ConfirmationModalContext>({});

  const [isOpenPermission, setIsOpenPermission] = useState(false);
  const [permissionProps, setPermissionProps] = useState<ConfirmationModalContext>({});

  const [isOpenProgress, setIsOpenProgress] = useState(false);
  const [progressProps, setProgressProps] = useState<ProgressModalProps>({});


  const showErrorModal = (error: any, props?: ConfirmationModalContext) => {
    let data: ConfirmationModalContext;
    if (error?.error?.errors) {
      data = {
        title: props?.title ?? error?.error?.errors[0]?.title,
        description: props?.description ?? error?.error?.errors[0]?.message,
        ...props,
      };
    } else if (error?.message == "Network Error") {
      data = {
        imageNode: <IllustNoConnection />,
        title: t("errors.no_connection_title"),
        description: t("errors.no_connection_description"),
        ...props,
      };
    } else {
      data = {
        imageNode: <IllustServerError />,
        title: t("errors.server_error_title"),
        description: t("errors.server_error_description"),
        ...props,
      };
    }
    setErrorProps(data);
    setIsOpenError(true);
  };

  const hideErrorModal = () => {
    setIsOpenError(false);
  };

  const openSetting = () => {
    Linking.openSettings();
  };

  const showPermissionModal = (type: PermissionType, props?: ConfirmationModalContext) => {
    if (type != "another") {
      let data: ConfirmationModalContext;
      switch (type) {
        case "camera": {
          data = {
            imageNode: <IllustCameraPermission />,
            title: t("permissions.camera_title"),
            description: t("permissions.camera_description"),
            buttonPrimaryAction: openSetting,
            buttonPrimaryTitle: t("allow"),
            buttonSecondary: true,
            buttonSecondaryTitle: t("back"),
            ...props,
          };
          break;
        }
        case "bluetooth": {
          data = {
            title: t("permissions.bluetooth_title"),
            description: t("permissions.bluetooth_description"),
            buttonPrimaryAction: openSetting,
            buttonPrimaryTitle: t("allow"),
            buttonSecondary: true,
            buttonSecondaryTitle: t("back"),
            ...props,
          };
          break;
        }
        case "location": {
          data = {
            imageNode: <IllustLocationPermission />,
            title: t("permissions.location_title"),
            description: t("permissions.location_description"),
            buttonPrimaryAction: openSetting,
            buttonPrimaryTitle: t("allow"),
            buttonSecondary: true,
            buttonSecondaryTitle: t("back"),
            ...props,
          };
          break;
        }
        case "storage": {
          data = {
            imageNode: <IllustLocationPermission />,
            title: t("permissions.storage_title"),
            description: t("permissions.storage_description"),
            buttonPrimaryAction: openSetting,
            buttonPrimaryTitle: t("allow"),
            buttonSecondary: true,
            buttonSecondaryTitle: t("back"),
            ...props,
          };
          break;
        }
      }
      setPermissionProps(data);
      setIsOpenPermission(true);
    }
  };

  const hidePermissionModal = () => {
    setIsOpenPermission(false);
  };

  const showConfirmationModal = (props: ConfirmationModalContext) => {
    setConfirmationProps(props);
    setIsOpenConfirmation(true);
  };

  const showAlertModal = (props: ConfirmationModalContext) => {
    console.log(props);
    setAlertProps(props);
    setIsOpenAlert(true);
  };

  const hideConfirmationModal = () => {
    setIsOpenConfirmation(false);
  };

  const hideAlertModal = () => {
    setIsOpenAlert(false);
  };

  const showLoadingModal = (props?: ProgressModalProps) => {
    if (props) {
      setProgressProps(props);
    }
    setIsOpenProgress(true);
  };

  const hideLoadingModal = () => {
    setIsOpenProgress(false);
  };

  const renderComponent = () => {
    return <>
      <ConfirmationModal
        {...confirmationProps}
        open={isOpenConfirmation}
        onClose={() => {
          hideConfirmationModal();
        }} />

      <AlertModal
        open={isOpenAlert}
        onClose={hideAlertModal}
        {...alertProps} />

      <AlertModal
        open={isOpenError}
        onClose={hideErrorModal}
        {...errorProps} />

      <AlertModal
        open={isOpenPermission}
        onClose={hidePermissionModal}
        {...permissionProps} />

      <ProgressModal open={isOpenProgress} onClose={hideLoadingModal} {...progressProps} />
    </>;
  };
  return (
    <ModalContext.Provider value={{
      showConfirmationModal,
      hideConfirmationModal,
      showAlertModal,
      hideAlertModal,
      showErrorModal,
      hideErrorModal,
      showPermissionModal,
      hidePermissionModal,
      showLoadingModal,
      hideLoadingModal,
    }}>
      {renderComponent()}
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
