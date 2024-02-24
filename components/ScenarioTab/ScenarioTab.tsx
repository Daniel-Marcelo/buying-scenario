import { useMutation } from "@tanstack/react-query";
import { BidSheetTable } from "../BidSheetTableTable/BidSheetTable";
import axios from "axios";
import { UploadForm } from "../UploadFile/UploadFile";
import { x } from "@xstyled/styled-components";
import { BaselineRow } from "@/types/baseline.types";
import { BaselineTable } from "../BaselineTable/BaselineTable";
import { CurrentItemTable } from "../CurrentItemTable/CurrentItemTable";
import { CurrentItem } from "@/types/currentItem.types";
import { BidSheetRow } from "@/types/bidSheet.types";

type ScenarioTabProps = {
  rowData: CurrentItem[];
  setRowData: (v: CurrentItem[]) => void;
  bidSheetRows: BidSheetRow[];
  baselineRows: BaselineRow[];
  setSelectedRow: (v: CurrentItem | undefined) => void;
};
export const ScenarioTab = ({
  rowData,
  setRowData,
  bidSheetRows,
  baselineRows,
  setSelectedRow,
}: ScenarioTabProps) => {
  return (
    <>
      <x.div h="500px" mt="1.5rem">
        <CurrentItemTable
          rowData={rowData}
          setRowData={setRowData}
          setSelectedRow={setSelectedRow}
          bidSheetRows={bidSheetRows}
          baselineRows={baselineRows}
        />
      </x.div>
    </>
  );
};
