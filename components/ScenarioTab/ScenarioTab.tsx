import { x } from "@xstyled/styled-components";
import { BaselineRow } from "@/types/baseline.types";
import { CurrentItemTable } from "../CurrentItemTable/CurrentItemTable";
import { CurrentItem } from "@/types/currentItem.types";
import { BidSheetRow } from "@/types/bidSheet.types";
import { SelectedItem } from "../SelectedItem/SelectedItem";
import React from "react";
import { OutlinedCard } from "../SelectedScenarioRow/SelectedScenarioRow";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Box, Divider } from "@mui/material";
import numeral from "numeral";

type ScenarioTabProps = {
  rowData: CurrentItem[];
  setRowData: (v: CurrentItem[]) => void;
  bidSheetRows: BidSheetRow[];
  baselineRows: BaselineRow[];
  selectedRow?: CurrentItem;
  setSelectedRow: (v: CurrentItem | undefined) => void;
};
export const ScenarioTab = ({
  rowData,
  setRowData,
  bidSheetRows,
  baselineRows,
  selectedRow,
  setSelectedRow,
}: ScenarioTabProps) => {
  return (
    <>
      <x.div h="300px" mt="1.5rem">
        <CurrentItemTable
          selectedRow={selectedRow}
          rowData={rowData}
          setRowData={setRowData}
          setSelectedRow={setSelectedRow}
          bidSheetRows={bidSheetRows}
          baselineRows={baselineRows}
        />
      </x.div>
      {selectedRow && (
        <Card variant="outlined" sx={{ mt: "3rem" }}>
          <React.Fragment>
            <CardContent>
              <Box sx={{ display: "flex" }}>
                <x.div w="25%">Category</x.div>
                <x.div w="25%">Item</x.div>
                <x.div w="25%">TotalVolume</x.div>
                <x.div w="25%">Current Spend</x.div>
              </Box>

              <Divider sx={{ my: "1rem" }} />
              <Box sx={{ display: "flex" }}>
                <x.div w="25%">{selectedRow?.category}</x.div>
                <x.div w="25%">{selectedRow?.item}</x.div>
                <x.div w="25%">
                  {numeral(selectedRow?.totalVolume).format("0,0")}
                </x.div>
                <x.div w="25%">
                  {numeral(selectedRow?.currentSpend).format("0,0")}
                </x.div>
              </Box>
            </CardContent>
          </React.Fragment>
        </Card>
      )}
      <SelectedItem
        rowData={rowData}
        setRowData={setRowData}
        bidSheetRows={bidSheetRows}
        selectedRow={selectedRow}
      />
    </>
  );
};
