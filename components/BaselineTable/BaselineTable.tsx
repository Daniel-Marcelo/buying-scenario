import { BaselineRow } from "@/types/baseline.types";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import { x } from "@xstyled/styled-components";

export const BaselineTable = ({ rowData }: { rowData: BaselineRow[] }) => {
  const [colDefs] = useState<ColDef<BaselineRow>[]>([
    { field: "category" },
    { field: "item" },
    { field: "supplier" },
    { field: "volumeShare" },
    { field: "pricePerThousand" },
    { field: "volume" },
    { field: "spend" },
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
