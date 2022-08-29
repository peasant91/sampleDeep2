import React from "react";
import AlertModal, { ModalProps } from "./AlertModal";
import { useLocale } from "../../../src/providers/LocaleProvider";

export default function ConfirmationModal({
                                            open,
                                            onClose,
                                            buttonPrimaryTitle,
                                            buttonSecondaryTitle,
                                            buttonSecondary,
                                            ...rest
                                          }: ModalProps) {
  const { t } = useLocale();
  return (
    <>
      <AlertModal
        buttonSecondaryTitle={buttonSecondaryTitle ?? t("back")}
        buttonPrimaryTitle={buttonPrimaryTitle ?? t("sure")}
        buttonSecondary={true}
        open={open} onClose={onClose} {...rest} />
    </>
  );
}
