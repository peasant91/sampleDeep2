import useBaseService from '../useBaseService';
import { useBottomSheet } from '../../../tmd/providers/BottomSheetProvider';
import { useState } from 'react';
import {
  BaseSPBNumberModel,
  SPBDetailModel,
  SPBDetailResponse,
  SpbListResponse,
} from '../../models/spb/spb';
import { BaseProjectModel, ProjectModel } from '../../models/project/project';
import {
  PODetailModel,
  PODetailResponse,
  PoListResponse,
  StatusPO,
} from '../../models/spb/po';
import { NOT_SUPPORTED } from 'react-native-maps/lib/decorateMapComponent';
import { StatusSPB } from '../../screens/components/item/SpbList';
import { string } from 'yup';
import { CatalogListResponse } from "../../models/catalog/Catalog";

export default function useProjectService() {
  const { getAPI, postAPI, patchAPI } = useBaseService();
  const { showErrorBS } = useBottomSheet();
  const [isLoadingProject, setIsLoading] = useState(false);

  const postSPB = async (noSPB: string, query: any) => {
    try {
      setIsLoading(true);
      const res = await postAPI(`project/spb/${noSPB}`, query);
      setIsLoading(false);
      return res;
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      showErrorBS(e);
    }
  };

  const patchSPB = async (noSPB: string, query: any) => {
    try {
      setIsLoading(true);
      const res = await patchAPI(`project/spb/${noSPB}`, query);
      setIsLoading(false);
      return res;
    } catch (e) {
      setIsLoading(false);
      console.log(e);
      showErrorBS(e);
    }
  };

  const patchSPBStatus = async (
    noSPB: string,
    status: StatusSPB,
    notes?: string,
  ) => {
    try {
      setIsLoading(true);
      const res = await patchAPI(`project/spb/${noSPB}/status`, {
        spb_status: status,
        notes: notes ?? '',
      });
      setIsLoading(false);
      return res;
    } catch (e) {
      setIsLoading(false);
      console.log(e);
      showErrorBS(e);
    }
  };

  const getSPB = (page: number = 1, query: any) => {
    return getAPI<SpbListResponse>('project/list-spb', {
      params: {
        page: page,
        ...query,
      },
    });
    // return getAPI<SpbListResponse>(`project/list-spb?spb_status=${query["spb_status"]}&query=${query.query}&page=${page}`)
  };

  const getPOsList = (page: number = 1, query: any) => {
    return getAPI<PoListResponse>('project/list-po', {
      params: {
        page: page,
        ...query,
      },
    });
    // return getAPI<SpbListResponse>(`project/list-spb?spb_status=${query["spb_status"]}&query=${query.query}&page=${page}`)
  };

  const getSPBDetail = async (id: string) => {
    try {
      setIsLoading(true);
      const res = await getAPI<SPBDetailResponse>(`project/spb/${id}`);
      setIsLoading(false);
      return res;
    } catch (e) {
      setIsLoading(false);
      console.log(e);
      showErrorBS(e);
    }
  };

  const getPOList = async (spbID: string, page: number = 1) => {
    return getAPI<PoListResponse>(`project/spb/${spbID}/po`, {
      params: {
        page: page,
      },
    });
    // try {
    //   setIsLoading(true);
    //   const res = await getAPI<PoListResponse>(`project/spb/${spbID}/po`, {
    //     params: {
    //       page: page,
    //     },
    //   });
    //   setIsLoading(false);
    //   return res;
    // } catch (e) {
    //   setIsLoading(false);
    //   showErrorBS(e);
    // }
  };

  const getPODetail = async (spbID: string, poID: string) => {
    try {
      return await getAPI<PODetailResponse>(`project/spb/${spbID}/po/${poID}`);
    } catch (e) {
      showErrorBS(e);
    }
  };

  const patchPOStatus = async (
    spbID: string,
    poID: string,
    status: StatusPO,
    notes?: string,
    image?: string
  ) => {
    try {
      setIsLoading(true);
      var query: any = {};
      query.status = status;
      if (notes) {
        query.notes = notes;
      }

      if (image) {
        query.photo = image
      }

      const res = await patchAPI(`project/spb/${spbID}/po/${poID}`, query);
      setIsLoading(false);
      return res;
    } catch (e) {
      setIsLoading(false);
      console.log(e);
      showErrorBS(e);
    }
  };

  const postPOStatus = async (
    spbID: string,
    poID: string,
    status: StatusPO,
    notes?: string,
    image?: string
  ) => {
    try {
      setIsLoading(true);
      const body = new FormData()

      body.append('status', status)

      if (image) {
        body.append('photo', {
          uri: image,
          name: 'po_report.jpg',
          type: 'image/jpg'
        })
      }

      if (notes) {
        body.append('notes', notes)
      }

      const res = await postAPI(`project/spb/${spbID}/po/${poID}`, body, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      setIsLoading(false);
      return res;
    } catch (e) {
      setIsLoading(false);
      console.log(e);
      showErrorBS(e);
    }
  }

  const getProject = async () => {
    try {
      setIsLoading(true);
      const res = await getAPI<BaseProjectModel>('project');
      setIsLoading(false);
      return res;
    } catch (e) {
      setIsLoading(false);
      showErrorBS(e);
    }
  };

  const getSPBNumber = async () => {
    try {
      setIsLoading(true);
      const res = await getAPI<BaseSPBNumberModel>('project/spb');
      setIsLoading(false);
      return res;
    } catch (e) {
      setIsLoading(false);
      showErrorBS(e);
    }
  };

  return {
    getSPB,
    getSPBDetail,

    getPOsList,
    getPOList,
    getPODetail,
    patchPOStatus,
    postPOStatus,

    getProject,
    getSPBNumber,

    postSPB,
    patchSPB,
    patchSPBStatus,
    isLoadingProject,
  };
}
