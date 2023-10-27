import { DragEvent, CSSProperties, MouseEvent } from "react";

export interface CuiFile extends File {
  id: string;
}

export interface UploadProps {
  multiple?: boolean;
  accept?: string;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  onDrop?: (e: DragEvent<HTMLDivElement>) => void;
  beforeUpload: (file: File) => void;
  children: React.ReactNode;
  showUploadList?: boolean;
  onFileRemove?: FileRemoveFunction;
  style?: CSSProperties;
}

export type FileRemoveFunction = (file: CuiFile, e?: MouseEvent) => void;
