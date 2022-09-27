import { useQuery } from "react-query";
import { _poDetailMock } from "../../../tmd/data/_mock";
import useProjectService from "./useProjectService";

export default function usePODetailQuery(spbID: string, poID: string) {
  const { getPODetail } = useProjectService();
  const { data, isLoading, refetch, ...rest } = useQuery("po-detail", () => {
    return getPODetail(spbID, poID)
  });

  return {
    data: data?.data ?? _poDetailMock,
    isLoading: isLoading,
    refetchPO: refetch,
    ...rest,
  };
}
