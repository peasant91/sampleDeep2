import { useQuery } from "react-query";
import { _spbDetailMock } from "../../../tmd/data/_mock";
import useProjectService from "./useProjectService";

export default function useSPBDetailQuery(id: string) {
  const { getSPBDetail } = useProjectService();
  const { data, isLoading, ...rest } = useQuery("spb-detail", () => {
    return getSPBDetail(id)
  });

  return {
    data: data?.data ?? _spbDetailMock,
    isLoading: isLoading,
    ...rest,
  };
}
