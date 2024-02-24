import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { BidSheetTab } from "../BidSheetTab/BidSheetTab";
import { BaselineTab } from "../BaselineTab/BaselineTab";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { BaselineRow } from "@/types/baseline.types";
import { BidSheetRow } from "@/types/bidSheet.types";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const BuyingTabs = () => {
  const [value, setValue] = React.useState(0);

  const uploadBaselineMutation = useMutation({
    mutationFn: async (file: File) => {
      const data = new FormData();
      data.set("file", file);

      const response = await axios.post<{ results: BaselineRow[] }>(
        "/api/baseline/upload",
        data
      );
      return response.data.results;
    },
  });

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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="BidSheet" {...a11yProps(0)} />
          <Tab label="Baseline" {...a11yProps(1)} />
          {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <BidSheetTab
          onUploadFile={(file) => uploadBidSheetMutation.mutate(file)}
          bidSheetRows={uploadBidSheetMutation.data ?? []}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <BaselineTab
          onUploadFile={(file) => uploadBaselineMutation.mutate(file)}
          baselineRows={uploadBaselineMutation.data ?? []}
        />
      </CustomTabPanel>
      {/* <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel> */}
    </Box>
  );
};
