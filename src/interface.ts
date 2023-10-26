import { MouseEvent } from "react";
export interface CuiFile extends File {
  id: string;
}

export type FileRemoveFunction = (file: CuiFile, e?: MouseEvent) => void;
