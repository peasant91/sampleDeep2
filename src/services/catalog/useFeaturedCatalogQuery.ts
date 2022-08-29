/**
 * Created by Widiana Putra on 27/06/2022
 * Copyright (c) 2022 - Made with love
 */
import { useQuery } from "react-query";
import useCatalogService from "./useCatalogService";

export default function useFeaturedCatalogQuery() {
  const { getFeaturedCatalog } = useCatalogService();
  const { data, isLoading, ...rest } = useQuery("featured-catalog", getFeaturedCatalog);

  return {
    catalogs: data,
    isLoadingCatalog: isLoading,
    ...rest,
  };
}
