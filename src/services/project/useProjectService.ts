import useBaseService from "../useBaseService";
import { useBottomSheet } from "../../../tmd/providers/BottomSheetProvider";
import { useState } from "react";
import { SPBDetailModel, SPBDetailResponse, SpbListResponse } from "../../models/spb/spb";
import { BaseProjectModel, ProjectModel } from "../../models/project/project";
import { PODetailModel, PODetailResponse, PoListResponse } from "../../models/spb/po";

export default function useProjectService() {
    const { getAPI, postAPI } = useBaseService();
    const { showErrorBS } = useBottomSheet();
    const [isLoadingCheckCredential, setIsLoadingCheckCredential] = useState(false);

    const getSPB = (page: number = 1, query: any) => {
        return getAPI<SpbListResponse>(`project/list-spb`, {
            params: {
                ...query,
                page: page,
            },
        });
    };

    const getSPBDetail = async (id: string) => {
        try {
            return await getAPI<SPBDetailResponse>(`project/spb/${id}`)
        } catch (e) {
            showErrorBS(e);
        }
    }

    const getPOList = async(spbID: string) => {
        try {
            return await getAPI<PoListResponse>(`project/spb/${spbID}/po`)
        } catch (e) {
            showErrorBS(e);
        }
    }

    const getPODetail = async(spbID: string, poID: string) => {
        try {
            return await getAPI<PODetailResponse>(`project/spb/${spbID}/po/${poID}`)
        } catch (e) {
            showErrorBS(e);
        }
    }

    const getProject = () => {
        return getAPI<BaseProjectModel>(`project`)
    }

    return {
        getSPB,
        getSPBDetail,
        getPOList,
        getPODetail,
        getProject
    }
}
