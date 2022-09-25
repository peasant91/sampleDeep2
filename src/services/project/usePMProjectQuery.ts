import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useQuery } from "react-query";
import StorageKey from "../../utils/StorageKey";
import useProjectService from "./useProjectService";

export default function usePMProjectQuery() {
  const { getProject } = useProjectService();
  const { data, isLoading, refetch, ...rest } = useQuery("pm-project", getProject);

  useEffect(() => {
    saveToLocal()
  }, [data])

  const saveToLocal = async () => {
    await AsyncStorage.setItem(StorageKey.PROJECT_DATA, JSON.stringify(data?.data ?? ""));
  }

  return {
    project: data?.data,
    isLoadingProject: isLoading,
    refetch: refetch,
    ...rest,
  };
}