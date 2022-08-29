/**
 * Created by Widiana Putra on 07/07/2022
 * Copyright (c) 2022 - Made with love
 */
import React, { ComponentProps, useEffect, useMemo, useState } from "react";
import { Modalize } from "react-native-modalize";
import { Animated, View } from "react-native";
import { Portal } from "react-native-portalize";
import { DateData } from "react-native-calendars";
import moment from "moment";
import { useTheme } from "../../core/theming";
import { Button } from "../../index";
import Typography from "../Typography/Typography";
import { CalendarList } from "react-native-calendars/src";
import { useLocale } from "../../../src/providers/LocaleProvider";
import Toast from "../Toast";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave?: (date: DateRange) => void;
}

export type DateRangeValidationType = {
  dismissible?: boolean;
  selected?: DateRange;
  minDays?: number;
  maxDays?: number;
}

export  type DateRange = {
  startDate?: string,
  endDate?: string
}

const DateRangePickerBottomSheet = ({
                                      open,
                                      onClose,
                                      dismissible = true,
                                      onSave,
                                      selected,
                                      minDays, maxDays,
                                      ...rest
                                    }: Props & ComponentProps<typeof CalendarList> & DateRangeValidationType) => {
  const modalizeRef = React.useRef<Modalize>(null);
  const { colors, roundness } = useTheme();
  const [datePeriod, setDatePeriod] = useState([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({});

  const { t } = useLocale();

  useEffect(() => {
    if (open) {
      setDateRange({
        startDate: selected?.startDate,
        endDate: selected?.endDate,
      });
      modalizeRef?.current?.open();
    } else {
      setDatePeriod([]);
      setDateRange({ startDate: "", endDate: "" });
      modalizeRef?.current?.close();
    }
  }, [open]);

  const isMinMaxValid = (start: string, end: string) => {
    if (minDays) {
      const totalDays = enumerateDaysBetweenDates(start, end, false).length;
      if (totalDays < minDays) {
        Toast.show(t("errors.min_number", { min: minDays, path: t('date_range') }));
        return false;
      }
    }
    if (maxDays) {
      const totalDays = enumerateDaysBetweenDates(start, end, false).length;
      if (totalDays > maxDays) {
        Toast.show(t("errors.max_number", { max: maxDays, path: t("date_range") }));
        return false;
      }
    }
    return true;
  };

  const handleDatePress = (date: DateData) => {
    if (dateRange?.endDate || (dateRange?.startDate && dateRange?.endDate) || (!dateRange?.startDate)) {
      setDateRange({ startDate: date.dateString, endDate: undefined });
    }

    //end date
    if (dateRange?.startDate && !dateRange?.endDate) {
      //if valid range
      if (moment(dateRange.startDate).isBefore(date.dateString)) {

        //validate based on min or max
        if (isMinMaxValid(dateRange.startDate, date.dateString)) {
          setDateRange({ ...dateRange, endDate: date.dateString });
        }
      } else {
        //set start date
        setDateRange({ startDate: date.dateString, endDate: undefined });
      }
    }
  };

  useEffect(() => {
    if (dateRange?.startDate) {
      enumerateDaysBetweenDates(dateRange?.startDate, dateRange?.endDate);
    }
  }, [dateRange?.startDate, dateRange?.endDate]);


  const enumerateDaysBetweenDates = function(startDate: string, endDate?: string, updateState: boolean = true) {
    const dates = [];
    if (endDate) {
      const currDate = moment(startDate).startOf("day").subtract(1, "days");
      const lastDate = moment(endDate).startOf("day").add(1, "days");
      while (currDate.add(1, "days").diff(lastDate) < 0) {
        dates.push(currDate.format("YYYY-MM-DD"));
      }
    } else {
      dates.push(startDate);
    }
    if(updateState){
      setDatePeriod(dates);
    }
    return dates;
  };

  const mappedDate = useMemo(() => {
    const map: { [key: string]: any } = {};
    datePeriod.map((date, index) => {
      const isFirst = index === 0;
      const isLast = index === datePeriod.length - 1;
      const isFirstOrLast = isFirst || isLast;
      const isMoreThanOne = datePeriod.length > 1;
      map[date] = {
        customStyles: {
          container: {
            backgroundColor: isFirstOrLast ? colors.primary.main : colors.primary.border,
            borderTopLeftRadius: isFirst ? roundness : 0,
            borderBottomLeftRadius: isFirst ? roundness : 0,
            borderTopRightRadius: isLast ? roundness : 0,
            borderBottomRightRadius: isLast ? roundness : 0,
            width: isMoreThanOne ? "100%" : "80%",
          },
          text: {
            color: isFirstOrLast ? colors.neutral.neutral_10 : colors.neutral.neutral_90,
          },
        },
      };
    });
    return map;
  }, [datePeriod]);

  const handleSubmit = () => {
    if (onSave) {
      if (dateRange) {
        onSave(dateRange);
      }
    }
    onClose();
  };

  return (
    <Portal>
      <Modalize
        closeOnOverlayTap={dismissible ? !dismissible : true}
        handlePosition={"inside"}
        withHandle={!!dismissible}
        modalStyle={{
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
          flex: 1,
        }}

        onClose={onClose}
        customRenderer={
          <Animated.View style={{
            paddingTop: 32,
            flexGrow: 1,
          }}>
            <View style={{
              paddingHorizontal: 16,
            }}>
              <Typography type={"title1"}>{t("choose_date")}</Typography>
            </View>
            <View style={{
              flexGrow: 1,
              marginTop: 16,
              flex: 1,
            }}>
              <CalendarList
                theme={{
                  todayTextColor: colors.primary.main,
                  textDayFontFamily: "Inter-Regular",
                  textMonthFontFamily: "Inter-Regular",
                  textMonthFontWeight: "800",
                  textDayHeaderFontFamily: "Inter-Regular",
                }}
                current={selected?.startDate}
                onDayPress={handleDatePress}
                showScrollIndicator={true}
                markingType={"custom"}
                markedDates={mappedDate}
                {...rest}
              />
            </View>

            <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}
            >
              <Button
                disabled={!dateRange?.startDate || !dateRange?.endDate}
                onPress={handleSubmit}
                size={"lg"}
                buttonStyle={{
                  width: "100%",
                }}>{t("save")}</Button>
            </View>
          </Animated.View>
        }
        ref={modalizeRef}
      />
    </Portal>
  );
};
export default DateRangePickerBottomSheet;
