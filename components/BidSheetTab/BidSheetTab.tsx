import { useMutation } from "@tanstack/react-query";
import { BidSheetTable } from "../BidSheetTableTable/BidSheetTable";
import { BidSheetRow } from "@/types/bidSheet.types";
import axios from "axios";
import { UploadForm } from "../UploadFile/UploadFile";
import { x } from "@xstyled/styled-components";
export const BidSheetTab = () => {
  const uploadBidSheetMutation = useMutation({
    mutationFn: async (file: File) => {
      const data = new FormData();
      data.set("file", file);

      const response = await axios.post<{ results: BidSheetRow[] }>(
        "/api/bid-sheet/upload",
        data
      );
      return response.data.results;
    },
  });

  return (
    <>
      <UploadForm onSelectFile={uploadBidSheetMutation.mutate} />
      <x.div h="500px" mt="1.5rem">
        <BidSheetTable rowData={uploadBidSheetMutation.data ?? []} />
      </x.div>
    </>
  );
};
