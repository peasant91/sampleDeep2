import { useQuery } from "react-query";
import { _poListMock } from "../../../tmd/data/_mock";
import useProjectService from "./useProjectService";

export default function usePOListQuery(spbID: string) {
  const { getPOList } = useProjectService();
  const { data, isLoading, refetch, ...rest } = useQuery("po-list", () => {
    return getPOList(spbID)
  });


  return {
    poData: data?.data ?? _poListMock,
    isPOListLoading: isLoading,
    refetchPOList: refetch,
    ...rest,
  };
}
