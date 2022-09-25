import useBaseService from "../useBaseService";
import { useBottomSheet } from "../../../tmd/providers/BottomSheetProvider";
import { useState } from "react";
import { BaseSPBNumberModel, SPBDetailModel, SPBDetailResponse, SpbListResponse } from "../../models/spb/spb";
import { BaseProjectModel, ProjectModel } from "../../models/project/project";
import { PODetailModel, PODetailResponse, PoListResponse } from "../../models/spb/po";

export default function useProjectService() {
    const { getAPI, postAPI, patchAPI} = useBaseService();
    const { showErrorBS } = useBottomSheet();
    const [isLoadingProject, setIsLoading] = useState(false);

    const postSPB = async (noSPB: string, query: any) => {
        try {
            setIsLoading(true);
            const res = await postAPI(`project/spb/${noSPB}`, query)
            setIsLoading(false);
            return res;
        } catch (e) {
            setIsLoading(false);
            showErrorBS(e);
        }
    }

    const patchSPB = async (noSPB: string, query: any) => {
        try {
            setIsLoading(true);
            const res = await patchAPI(`project/spb/${noSPB}`, query)
            setIsLoading(false);
            return res;
        } catch (e) {
            setIsLoading(false);
            console.log(e)
            showErrorBS(e);
        }
    }


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

    const getPOList = async (spbID: string) => {
        try {
            return await getAPI<PoListResponse>(`project/spb/${spbID}/po`)
        } catch (e) {
            showErrorBS(e);
        }
    }

    const getPODetail = async (spbID: string, poID: string) => {
        try {
            return await getAPI<PODetailResponse>(`project/spb/${spbID}/po/${poID}`)
        } catch (e) {
            showErrorBS(e);
        }
    }

    const getProject = () => {
        return getAPI<BaseProjectModel>(`project`)
    }

    const getSPBNumber = () => {
        return getAPI<BaseSPBNumberModel>(`project/spb`)
    }

    return {
        getSPB,
        getSPBDetail,
        getPOList,
        getPODetail,
        getProject,
        getSPBNumber,

        postSPB,
        patchSPB,
        isLoadingProject
    }
}
