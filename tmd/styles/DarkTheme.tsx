import DefaultTheme from "./DefaultTheme";
import type { Theme } from "../types";

const DarkTheme: Theme = {
  ...DefaultTheme,
  dark: true,
  mode: "adaptive",
  colors: {
    ...DefaultTheme.colors,
  },
};

export default DarkTheme;
