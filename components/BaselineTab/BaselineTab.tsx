import { useMutation } from "@tanstack/react-query";
import { BidSheetTable } from "../BidSheetTableTable/BidSheetTable";
import axios from "axios";
import { UploadForm } from "../UploadFile/UploadFile";
import { x } from "@xstyled/styled-components";
import { BaselineRow } from "@/types/baseline.types";
import { BaselineTable } from "../BaselineTable/BaselineTable";

export const BaselineTab = ({
  onUploadFile,
  baselineRows,
}: {
  onUploadFile: (file: File) => void;
  baselineRows: BaselineRow[];
}) => {
  return (
    <>
      <UploadForm onSelectFile={onUploadFile} />
      <x.div h="500px" mt="1.5rem">
        <BaselineTable rowData={baselineRows} />
      </x.div>
    </>
  );
};
