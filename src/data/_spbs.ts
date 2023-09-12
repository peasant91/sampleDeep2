import { t } from "i18next";
import { FilterModel } from "../models/BaseModel";
import { StatusSPB } from "../screens/components/item/SpbList";

export const _spbsStatus: FilterModel[] = [
    {
        id: 1,
        name: t("all"),
        value: ""
    },
    {
        id: 2,
        name: t("in_process"),
        value: StatusSPB.inProgress
    },
    {
        id: 1,
        name: t("finish"),
        value: StatusSPB.done
    },
]