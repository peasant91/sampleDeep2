import React, { ComponentProps, useMemo, useState } from "react";
import Tooltip, { TooltipOptionalProps } from "./Tooltip";
import { useTooltipStepper } from "../../providers/TooltipStepperProvider";
import { useLocale } from "../../../src/providers/LocaleProvider";

interface Props {
  children: React.ReactNode;
}

export default function TooltipStepper({ stepperId,  ...rest }: Props & TooltipOptionalProps) {
  const { totalItem, currentItem, next, prev, close, initialPosition } = useTooltipStepper();
  const { t } = useLocale();
  const isLast = currentItem && currentItem.position == totalItem;
  const isFirst = currentItem && currentItem.position == 1;
  const [isOpen, setIsOpen] = useState(false);
  const isSelected = useMemo(() => {
    return currentItem && currentItem.id == stepperId;
  }, [currentItem]);

  // useEffect(() => {
  //   if (!isSelected) {
  //     setIsOpen(false);
  //   } else {
  //     setTimeout(() => {
  //       setIsOpen(true);
  //     }, 300);
  //   }
  // }, [currentItem]);

  return <Tooltip
    stepper
    stepperTotal={totalItem}
    primaryButtonText={isLast ? t("finish") : t("next")}
    secondaryButtonText={t("previous")}
    primaryButtonAction={next}
    secondaryButtonAction={isFirst ? undefined : prev}
    stepperCurrentPosition={currentItem?.position}
    {...rest}
    dismissible={false}
    onClose={close}
    open={currentItem?.id == stepperId}
  />;
}
