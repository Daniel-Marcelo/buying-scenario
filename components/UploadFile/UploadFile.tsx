import { Button } from "@mui/material";
import { useRef, useState } from "react";

type UploadFormProps = {
  onSelectFile: (file: File) => void;
};
export const UploadForm = ({ onSelectFile }: UploadFormProps) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      <Button
        type="submit"
        value="Upload"
        variant="contained"
        onClick={() => ref.current?.click()}
      >
        Select File
      </Button>
      <input
        hidden
        ref={ref}
        type="file"
        name="file"
        accept=".csv"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          onSelectFile(file);
        }}
      />
    </>
  );
};
