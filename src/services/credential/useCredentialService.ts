/**
 * Created by Widiana Putra on 27/06/2022
 * Copyright (c) 2022 - Made with love
 */
import useBaseService from "../useBaseService";
import { useBottomSheet } from "../../../tmd/providers/BottomSheetProvider";
import { useState } from "react";

export default function useCredentialService() {
  const { postAPI } = useBaseService();
  const { showErrorBS } = useBottomSheet();
  const [isLoadingCheckCredential, setIsLoadingCheckCredential] = useState(false);
  const checkCredential = async (phone: string, email: string) => {
    try {
      setIsLoadingCheckCredential(true);
      const res = await postAPI("check-credential", {
        phone, email,
      });
      setIsLoadingCheckCredential(true);
      return res;
    } catch (e) {
      setIsLoadingCheckCredential(false);
      showErrorBS(e);
    }
  };

  return {
    checkCredential,
    isLoadingCheckCredential,
  };
}
