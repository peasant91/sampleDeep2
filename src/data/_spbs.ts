import { t } from "i18next";
import { FilterModel } from "../models/BaseModel";

export const _spbsStatus: FilterModel[] = [
    {
        id: 1,
        name: t("all"),
        value: "all"
    },
    {
        id: 2,
        name: t("in_process"),
        value: "in_process"
    },
    {
        id: 1,
        name: t("finish"),
        value: "finish"
    },
]