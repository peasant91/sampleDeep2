import React, { createContext, useContext, useMemo, useState } from "react";
import { TooltipStepperItem } from "../model/TooltipStepper";


type TooltipStepperType = {
  next: () => void;
  totalItem: number;
  prev: () => void;
  currentItem?: TooltipStepperItem;
  close: () => void;
  initialPosition: number;
}

const initialState: TooltipStepperType = {
  next: () => {
  },
  totalItem: 0,
  prev: () => {
  },
  currentItem: undefined,
  close: () => {
  },
  initialPosition: 1,
};

export const TooltipStepperContext = createContext(initialState);

export const useTooltipStepper = () => {
  const context = useContext(TooltipStepperContext);
  if (!context) throw new Error("Stepper context must be use inside TooltipStepperProvider");
  return context;
};

interface Props {
  children: React.ReactNode;
  initialPosition?: number;
  steppers: TooltipStepperItem[];
}

export default function TooltipStepperProvider({ children, initialPosition = 1, steppers }: Props) {
  const [currPosition, setCurrPosition] = useState(initialPosition);
  const next = () => {
    setCurrPosition(currPosition + 1);
  };

  const prev = () => {
    setCurrPosition(currPosition - 1);
  };

  const currentItem = useMemo(() => {
    return steppers.find(item => item.position == currPosition);
  }, [steppers, currPosition]);

  const close = () => {
    setCurrPosition(-1);
  };

  return (
    <TooltipStepperContext.Provider
      value={{ next, totalItem: steppers.length, prev, currentItem, close, initialPosition }}>
      {children}
    </TooltipStepperContext.Provider>
  );
}
