import { Button, Typography } from "@alifd/next";
import React from "react";

export function Home() {
  return (
    <div>
      <Typography.H1>Home</Typography.H1>
      <Button
        onClick={() => {
          console.log("hello");
        }}
      >
        Say Hello
      </Button>
    </div>
  );
}
