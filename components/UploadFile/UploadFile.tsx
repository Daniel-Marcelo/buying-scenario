import { Button } from "@mui/material";
import { useRef, useState } from "react";

export const UploadForm = () => {
  const [file, setFile] = useState<File>();
  const ref = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    debugger;
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("api/upload", {
        method: "POST",
        body: data,
      });
      // handle the error
      if (!res.ok) throw new Error(await res.text());
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }
  };

  return (
    <form onSubmit={onSubmit}>
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
        onChange={(e) => setFile(e.target.files?.[0])}
      />
      <Button type="submit" value="Upload" variant="contained">
        Submit
      </Button>
    </form>
  );
};
