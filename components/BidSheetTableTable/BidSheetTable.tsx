import { BidSheetRow } from "@/types/bidSheet.types";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import { x } from "@xstyled/styled-components";

export const BidSheetTable = ({ rowData }: { rowData: BidSheetRow[] }) => {
  const [colDefs, setColDefs] = useState<ColDef<BidSheetRow>[]>([
    { field: "supplier" },
    { field: "category" },
    { field: "item" },
    { field: "minimumVolume" },
    { field: "maximumVolume" },
    { field: "pricePerThousand" },
  ]);

  return (
    <x.div
      className="ag-theme-quartz"
      style={{ width: "100%", height: "100%" }}
    >
      <AgGridReact rowData={rowData} columnDefs={colDefs} />
    </x.div>
  );
};
