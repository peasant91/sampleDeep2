
import useProjectService from "./useProjectService";
import { useBottomSheet } from "../../../tmd/providers/BottomSheetProvider";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { CatalogListResponse } from "../../models/catalog/Catalog";
import { useEffect, useState } from "react";
import { SpbListItem, SpbListResponse } from "../../models/spb/spb";
import { print } from "@gorhom/bottom-sheet/lib/typescript/utilities/logger";

type QueryKey = {
  search: string
  status: string
}

export default function useProjectInfiniteQuery({ search, status }: QueryKey) {
  const { getSPB } = useProjectService();
  const { showErrorBS } = useBottomSheet();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    error,
    isError,
    isPreviousData,
    isRefetching,
    isFetchingNextPage,
    ...rest
  } = useInfiniteQuery<SpbListResponse>(["spb-lists"], (par) => {
    return getSPB(par.pageParam, {
      "spb_status": status
    });
  }, {
    keepPreviousData: false,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.current_page == lastPage.meta.last_page) {
        return null
      }
      return lastPage.meta.current_page + 1
    },
  });

  const mappedData = data?.pages.map(it => it.data).flat();

  useEffect(() => {
    if (error) {
      showErrorBS(error);
    }
  }, [isError]);

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
    isRefetching,
    isFetchingNextPage,
    ...rest,
  };
}
