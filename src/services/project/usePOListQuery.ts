import { useInfiniteQuery, useQuery } from "react-query";
import { _poListMock } from "../../../tmd/data/_mock";
import useProjectService from "./useProjectService";
import { PoListResponse } from "../../models/spb/po";

export default function usePOListQuery(spbID: string) {
  const { getPOList } = useProjectService();
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
    ...rest
  } = useInfiniteQuery<PoListResponse>(["po-list"], (par) => {
    // console.log("useInfiniteQuery", par);
    return getPOList(spbID, par.pageParam);
  }, {
    getNextPageParam: (lastPage) => (lastPage.meta.current_page < lastPage.meta.last_page) ? lastPage.meta.current_page + 1 : undefined
  });

  const mappedData = data?.pages?.map(it => it.data).flat();

  const fetchNext = () => {
    console.log("fetchNext", hasNextPage);
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return {
    poData: mappedData ?? _poListMock,
    isPOListLoading: isLoading,
    fetchNext,
    refetchPOList: refetch,
    ...rest,
  };
}
