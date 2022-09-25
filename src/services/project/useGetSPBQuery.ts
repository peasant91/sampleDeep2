import { useQuery } from "react-query";
import { _poDetailMock } from "../../../tmd/data/_mock";
import useProjectService from "./useProjectService";

export default function useGetSPBNumberQuery() {
  const { getSPBNumber } = useProjectService();
  const { data, isLoading, ...rest } = useQuery("spb-number", getSPBNumber)


  return {
    noSPB: data?.no_spb ?? "",
    isLoading: isLoading,
    ...rest,
  };
}
