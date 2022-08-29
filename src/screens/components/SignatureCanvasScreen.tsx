import React, { useState } from "react";
import { Button, Page, Stack } from "../../../tmd";
import SignatureCanvas from "../../../tmd/components/Signature/SignatureCanvas";
import Toolbar from "../../../tmd/components/Toolbar/Toolbar";

export default function SignatureCanvasScreen() {
  const [signature, setSignature] = useState("");
  return (
    <Page>
      <Toolbar title={"SignatureCanvasScreen"} />
      <Stack
        style={{
          flex: 1,
          padding: 16,
        }}>

        <SignatureCanvas
          label={"Tanda Tangan Digital"}
          requiredLabel
          onChangedBase64={setSignature}
        />

        <Stack
          direction={"row"} spacing={8} mt={16}>
          <Button
            fullWidth
            disabled={!signature}
            onPress={() => {
            }}>
            Save
          </Button>
        </Stack>
      </Stack>
    </Page>
  );
}
