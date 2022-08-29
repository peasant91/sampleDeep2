import React, { createContext, useContext, useMemo, useState } from "react";
import { StepperItem } from "../model/StepperItem";

type StepperType = {
  next: () => void;
  totalItem: number;
  prev: () => void;
  currentItem?: StepperItem;
  initialPosition: number;
  isFirst: boolean;
  isLast: boolean;
  steppers: StepperItem[];
  currentPosition: number;
}

const initialState: StepperType = {
  next: () => {
  },
  totalItem: 0,
  prev: () => {
  },
  currentItem: undefined,
  initialPosition: 0,
  isFirst: true,
  isLast: false,
  steppers: [],
  currentPosition: 0,
};

export const StepperContext = createContext(initialState);
export const useStepper = () => {
  const context = useContext(StepperContext);
  if (!context) throw new Error("Stepper context must be use inside TooltipStepperProvider");
  return context;
};

interface Props {
  children: React.ReactNode;
  initialPosition?: number;
  steppers: StepperItem[];
}

export default function StepperProvider({ children, initialPosition = 0, steppers }: Props) {
  const [currPosition, setCurrPosition] = useState(initialPosition);
  const next = () => {
    setCurrPosition(currPosition + 1);
  };

  const prev = () => {
    setCurrPosition(currPosition - 1);
  };

  const currentItem = useMemo(() => {
    if (currPosition >= steppers.length) {
      return undefined;
    } else {
      return steppers[currPosition];
    }
  }, [steppers, currPosition]);

  const isFirst = useMemo(() => {
    return currPosition == 0;
  }, [currPosition]);

  const isLast = useMemo(() => {
    return currPosition == steppers.length - 1;
  }, [currPosition]);

  return (
    <StepperContext.Provider
      value={{
        next,
        totalItem: steppers.length,
        prev,
        currentItem,
        initialPosition,
        isFirst,
        isLast,
        steppers,
        currentPosition: currPosition,
      }}>
      {children}
    </StepperContext.Provider>
  );
}
