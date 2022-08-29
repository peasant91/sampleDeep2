/**
 * Created by Widiana Putra on 27/06/2022
 * Copyright (c) 2022 - Made with love
 */
import useBaseService from "../useBaseService";
import { useBottomSheet } from "../../../tmd/providers/BottomSheetProvider";

export default function useBankService() {
  const { getAPI } = useBaseService();
  const { showErrorBS } = useBottomSheet();
  const getBank = async () => {
    try {
      return await getAPI("bank");
    } catch (e) {
      showErrorBS(e);
    }
  };

  return {
    getBank,
  };
}
