/**
 * Created by Widiana Putra on 22/06/2022
 * Copyright (c) 2022 - Made with love
 */
import React from "react";
import Button from "./Button";

export default function TextButton({ ...rest }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      contentStyle={{
        marginVertical: 0,
        marginHorizontal: 0,
      }}
      shape={"rect"}
      variant={"tertiary"}
      {...rest}
    >
      {rest.children}
    </Button>
  );
}
