import { useMutation } from "@tanstack/react-query";
import { BidSheetTable } from "../BidSheetTableTable/BidSheetTable";
import { BidSheetRow } from "@/types/bidSheet.types";
import axios from "axios";
import { UploadForm } from "../UploadFile/UploadFile";
import { x } from "@xstyled/styled-components";
export const BidSheetTab = ({
  onUploadFile,
  bidSheetRows,
}: {
  onUploadFile: (file: File) => void;
  bidSheetRows: BidSheetRow[];
}) => {
  return (
    <>
      <UploadForm onSelectFile={onUploadFile} />
      <x.div h="500px" mt="1.5rem">
        <BidSheetTable rowData={bidSheetRows} />
      </x.div>
    </>
  );
};
