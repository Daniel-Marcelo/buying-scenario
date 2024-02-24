import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useState } from "react";
import { ColDef, Grid } from "ag-grid-community";
import { x } from "@xstyled/styled-components";
import { BaselineTable } from "@/components/BaselineTable/BaselineTable";
import { BidSheetTable } from "@/components/BidSheetTableTable/BidSheetTable";
import { BidSheetRow } from "@/types/bidSheet.types";
import { BaselineRow } from "@/types/baseline.types";
import { CurrentItemTable } from "@/components/CurrentItemTable/CurrentItemTable";
import { CurrentItem } from "@/types/currentItem.types";
import { SelectedItem } from "@/components/SelectedItem/SelectedItem";
import { FileUpload } from "@mui/icons-material";
import { UploadForm } from "@/components/UploadFile/UploadFile";
import { BuyingTabs } from "@/components/BuyingTabs/BuyingTabs";
// Create new GridExample component
const GridExample = () => {};
export default function Home() {
  const [rowData, setRowData] = useState<CurrentItem[]>([]); // [1

  const bidSheet = useQuery<BidSheetRow[]>({
    queryKey: ["bidSheet"],
    queryFn: async () => {
      const response = await axios.get("/api/bid-sheet");
      return response.data;
    },
  });

  const baseline = useQuery<BaselineRow[]>({
    queryKey: ["baseline"],
    queryFn: async () => {
      const response = await axios.get("/api/baseline");
      return response.data;
    },
  });

  const [selectedRow, setSelectedRow] = useState<CurrentItem>();

  return (
    <x.div h="100vh" p="1.5rem">
      <BuyingTabs />
      {/* <UploadForm />
      <CurrentItemTable
        rowData={rowData}
        setRowData={setRowData}
        setSelectedRow={setSelectedRow}
        bidSheetRows={bidSheet.data ?? []}
        baselineRows={baseline.data ?? []}
      />
      <SelectedItem
        rowData={rowData}
        setRowData={setRowData}
        bidSheetRows={bidSheet.data ?? []}
        selectedRow={selectedRow}
      />
      <BaselineTable rowData={baseline.data ?? []} />
      <BidSheetTable rowData={bidSheet.data ?? []} /> */}
    </x.div>
  );
}
