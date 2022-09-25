import { useQuery } from "react-query";
import { isSchema } from "yup";
import { _spbDetailMock } from "../../../tmd/data/_mock";
import useProjectService from "./useProjectService";

export default function useSPBDetailQuery(id: string) {
  const { getSPBDetail } = useProjectService();
  const { data, isLoading, refetch, isSuccess, ...rest } = useQuery("spb-detail", () => {
    return getSPBDetail(id)
  }, {refetchOnWindowFocus: true, refetchOnMount: true});

  return {
    data: data?.data ?? _spbDetailMock,
    isLoading: isLoading,
    refetchSPB: refetch,
    postSuccess: isSuccess,
    ...rest,
  };
}
