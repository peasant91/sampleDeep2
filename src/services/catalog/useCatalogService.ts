/**
 * Created by Widiana Putra on 27/06/2022
 * Copyright (c) 2022 - Made with love
 */
import useBaseService from "../useBaseService";
import { CatalogListResponse } from "../../models/catalog/Catalog";
import { useBottomSheet } from "../../../tmd/providers/BottomSheetProvider";

export default function useCatalogService() {
  const { getAPI } = useBaseService();
  const { showErrorBS } = useBottomSheet();

  const getCatalogs = (page: number = 1) => {
    return getAPI<CatalogListResponse>(`catalog`, {
      params: {
        page: page,
        store: 1,
      },
    });
  };

  const getCatalogPagination = async  (page: number) => {
    try {
      return await getAPI<CatalogListResponse>(`catalog`, {
        params: {
          page: page,
          store: 1,
        },
      });
    } catch (e) {
      showErrorBS(e);
    }

  }

  const getFeaturedCatalog = async () => {
    try {
      return await getAPI<CatalogListResponse>("catalog/featured?store=1");
    } catch (e) {
      showErrorBS(e);
    }
  };

  return {
    getCatalogs,
    getFeaturedCatalog,
  };
}
