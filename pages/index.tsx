import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { x } from "@xstyled/styled-components";
import { BuyingTabs } from "@/components/BuyingTabs/BuyingTabs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <x.div h="100vh" p="1.5rem">
      <BuyingTabs />
      {/*
      <SelectedItem
        rowData={rowData}
        setRowData={setRowData}
        bidSheetRows={bidSheet.data ?? []}
        selectedRow={selectedRow}
      /> */}
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </x.div>
  );
}
