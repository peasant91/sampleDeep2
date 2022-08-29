/**
 * Created by Widiana Putra on 21/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import AlertBottomSheet from "./AlertBottomSheet";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  imageNode?: React.ReactNode;
  title?: string;
  description?: string;
  buttonPrimaryTitle?: string;
  buttonSecondaryTitle?: string;
  buttonPrimaryAction?: () => void;
  buttonSecondaryAction?: () => void;
  onClose: () => void;
  dismissable?: boolean;
}

export default function ConfirmationBottomSheet({ open, buttonPrimaryTitle, buttonSecondaryTitle, ...rest }: Props) {
  const { t } = useTranslation();
  return (
    <>
      <AlertBottomSheet
        open={open}
        buttonSecondaryTitle={buttonSecondaryTitle ?? t("back")}
        buttonPrimaryTitle={buttonPrimaryTitle ?? t("sure")}
        buttonSecondary={true}
        {...rest}
      />
    </>
  );
}
