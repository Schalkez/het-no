import { FC, memo } from "react";
import { Desktop } from "./Desktop";
import { Mobile } from "./Mobile";

export const AddServiceArea: FC = memo(() => {
  return (
    <>
      <Desktop />
      <Mobile />
    </>
  );
});

AddServiceArea.displayName = "AddServiceArea";
