/**
 * Created by Widiana Putra on 23/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { createContext, useContext, useEffect, useState } from "react";
import { I18nextProvider, TFunction, useTranslation as useTranslationi18n } from "react-i18next";
import StorageKey from "../utils/StorageKey";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "../utils/i18n";
import * as Yup from "yup";
import "moment/locale/id";
import moment from "moment";

type LocaleProviderType = {
  changeLanguage: (lang: string) => void;
  currentLanguage: string;
  t: TFunction<"translation", undefined>;
  momentLocale: (inp?: moment.MomentInput, format?: moment.MomentFormatSpecification, language?: string, strict?: boolean) => moment.Moment;
}
const initialState: LocaleProviderType = {
  changeLanguage: (lang: string) => {
  },
  currentLanguage: "en",
  t: () => {
  },
  momentLocale: (inp?: moment.MomentInput, format?: moment.MomentFormatSpecification, language?: string, strict?: boolean) => moment(),
};

export const LocaleContext = createContext(initialState);
export const useLocale = () => useContext(LocaleContext);

const LocaleChildProvider = ({ children }: any) => {
  const { i18n, t } = useTranslationi18n();
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const changeLanguage = (lang: string) => {
    AsyncStorage.setItem(StorageKey.LOCALE, lang);
    setCurrentLanguage(lang);
    i18n.changeLanguage(lang);
  };


  const momentLocale = (inp?: moment.MomentInput, format?: moment.MomentFormatSpecification, language?: string, strict?: boolean) => {
    return moment(inp, format, language, strict).locale(currentLanguage);
  };

  const changeLanguageAsync = async () => {
    const lang = await AsyncStorage.getItem(StorageKey.LOCALE) ?? currentLanguage;
    changeLanguage(lang);
  };


  useEffect(() => {
    changeLanguageAsync();
  }, []);

  Yup.setLocale({
    mixed: {
      default: ({ path }) => t("errors.invalid", { path: path }),
      required: ({ path }) => t("errors.required", { path: path }),
      defined: ({ path }) => t("errors.defined", { path: path }),
      oneOf: ({ path, values }) => t("errors.oneOf", { path: path, values: values }),
      notOneOf: ({ path, values }) => t("errors.notOneOf", { path: path, values: values }),
      notType: ({ path }) => t("errors.required", { path: path }),
      // is_greater: ({ path }) => t("errors.required", { path: path }),
    },
    string: {
      length: ({ length, path }) => t("errors.length_string", { path: path, length: length }),
      min: ({ min, path }) => t("errors.min_string", { path: path, min: min }),
      max: ({ max, path }) => t("errors.max_string", { path: path, max: max }),
      matches: ({ regex, path }) => t("errors.matches", { regex: regex, path: path }),
      email: ({ path }) => t("errors.email", { path: path }),
      url: ({ path }) => t("errors.url", { path: path }),
      uuid: ({ path }) => t("errors.uuid", { path: path }),
      trim: ({ path }) => t("errors.trim", { path: path }),
      lowercase: ({ path }) => t("errors.lowercase", { path: path }),
      uppercase: ({ path }) => t("errors.uppercase", { path: path }),
    },
    number: {
      min: ({ min, path }) => t("errors.min_number", { min: min, path: path }),
      max: ({ max, path }) => t("errors.max_number", { max: max, path: path }),
      lessThan: ({ less, path }) => t("errors.lessThan", { less: less, path: path }),
      moreThan: ({ more, path }) => t("errors.moreThan", { more: more, path: path }),
      positive: ({ path }) => t("errors.positive", { path: path }),
      negative: ({ path }) => t("errors.negative", { path: path }),
      integer: ({ path }) => t("errors.integer", { path: path }),
    },
    date: {
      min: ({ min, path }) => t("errors.min_date", { min: min, path: path }),
      max: ({ max, path }) => t("errors.max_date", { max: max, path: path }),
    },
    boolean: {
      isValue: ({ path, value }) => t("errors.isValue", { value: value, path: path }),
    },
    object: {
      noUnknown: ({ path, value }) => t("errors.noUnknown", { path: path, unknown: value }),
    },
    array: {
      min: ({ min, path }) => t("errors.min_array", { min: min, path: path }),
      max: ({ max, path }) => t("errors.max_array", { max: max, path: path }),
      length: ({ length, path }) => t("errors.length_array", { length: length, path: path }),
    },
  });

  return (
    <LocaleContext.Provider value={{ changeLanguage, currentLanguage, t, momentLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};

const LocaleProvider = ({ children }: any) => {
  return (
    <I18nextProvider i18n={i18n}>
      <LocaleChildProvider>
        {children}
      </LocaleChildProvider>
    </I18nextProvider>
  );
};

export default LocaleProvider;
