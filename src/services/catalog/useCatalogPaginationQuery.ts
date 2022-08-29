import { useState } from "react";
import useCatalogService from "./useCatalogService";
import { useBottomSheet } from "../../../tmd/providers/BottomSheetProvider";
import { useQuery, useQueryClient } from "react-query";

export default function useCatalogPaginationQuery(page: number) {
  const { getCatalogs } = useCatalogService();
  const { showErrorBS } = useBottomSheet();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const client = useQueryClient();
  const [currPage, setCurrPage] = useState(page);

  const { data, isLoading, ...rest } = useQuery(["catalogs", currPage], () => getCatalogs(currPage), {
    keepPreviousData: true,
  });

  const fetchNextPage = () => {
    setCurrPage(currPage + 1);
  };

  return {
    catalogs: data?.data,
    isLoadingCatalog: isLoading,
    fetchNextPage,
    ...rest,
  };


}
