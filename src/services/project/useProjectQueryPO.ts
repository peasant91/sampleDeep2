
import useProjectService from "./useProjectService";
import { useBottomSheet } from "../../../tmd/providers/BottomSheetProvider";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { CatalogListResponse } from "../../models/catalog/Catalog";
import { useEffect, useMemo, useRef, useState } from "react";
import { SpbListItem, SpbListResponse } from "../../models/spb/spb";
import { print } from "@gorhom/bottom-sheet/lib/typescript/utilities/logger";
import { _spbMock } from "../../../tmd/data/_mock";
import { PoListResponse } from "../../models/spb/po";

type QueryKey = {
  // search: string
  status: string
}

export default function useProjectInfiniteQueryPO(key: string,{ status }: QueryKey) {
  const { getPOsList } = useProjectService();
  const { showErrorBS } = useBottomSheet();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const searchKey = useRef<string>("")
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
  } = useInfiniteQuery<PoListResponse>([key,status], (par) => {
    return getPOsList(par.pageParam, {
      "query": searchKey.current,
      "po_status": status
    });
  }, {
    keepPreviousData: false,
    refetchOnWindowFocus: 'always',
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.current_page >= lastPage.meta.last_page) {
        return null
      }
      return lastPage.meta.current_page + 1
    },
  });

  // const mappedData = data?.pages.map(it => it.data).flat();
  const mappedData = data?.pages ? data.pages.flatMap((page) => [...page.data]) : []

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

  function setQuery(text: string) {
    searchKey.current = text
  }

  return {
    setQuery: setQuery,
    poLists: data?.pages.map(page => page.data).flat(),
    isLoadingCatalog: isLoading,
    fetchNext,
    refresh,
    doRefresh: refresh,
    isRefreshing,
    isRefetching,
    isFetchingNextPage,
    ...rest,
  };
}