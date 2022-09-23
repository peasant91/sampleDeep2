
import useProjectService from "./useProjectService";
import { useBottomSheet } from "../../../tmd/providers/BottomSheetProvider";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { CatalogListResponse } from "../../models/catalog/Catalog";
import { useEffect, useState } from "react";
import { SpbListResponse } from "../../models/spb/spb";
import { print } from "@gorhom/bottom-sheet/lib/typescript/utilities/logger";

type QueryKey = {
    search: string
    status: string
}

export default function useProjectInfiniteQuery({search, status}: QueryKey) {
  const { getSPB } = useProjectService();
  const { showErrorBS } = useBottomSheet();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const client = useQueryClient();
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    error, 
    isError,
    ...rest
  } = useInfiniteQuery<SpbListResponse>(["spb-lists"], (par) => {
    return getSPB(par.pageParam, {
      "spb_status": status
    });
  }, {
    getNextPageParam: (lastPage) => lastPage.meta.current_page + 1,
  });

  const mappedData = data?.pages.map(it => it.data).flat();

  useEffect(() => {
    if (error) {
      showErrorBS(error);
    }
  }, [isError]);

  // useEffect(() => {
  //   client.removeQueries("catalogs");
  // }, []);


  const fetchNext = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const refresh = async () => {
    try {
      setIsRefreshing(true);
      await rest.refetch();
      setIsRefreshing(false);
    } catch (e) {
      setIsRefreshing(false);
    }
  };

  return {
    spbLists: mappedData,
    isLoadingCatalog: isLoading,
    fetchNext,
    refresh,
    isRefreshing,
    ...rest,
  };
}
