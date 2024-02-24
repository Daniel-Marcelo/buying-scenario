import { BaselineRow } from '@/types/baseline.types';
import { BidSheetRow } from '@/types/bidSheet.types';
import { useQuery } from '@tanstack/react-query';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { x } from '@xstyled/styled-components';
import { CurrentItem } from '@/types/currentItem.types';
import { TextField } from '@mui/material';
import uniq from 'lodash/uniq';
import numeral from 'numeral';

export const CurrentItemTable = ({
  bidSheetRows,
  baselineRows,
  setSelectedRow,
  rowData,
  setRowData,
}: {
  rowData: CurrentItem[];
  setRowData: (v: CurrentItem[]) => void;
  bidSheetRows: BidSheetRow[];
  baselineRows: BaselineRow[];
  setSelectedRow: (v: CurrentItem | undefined) => void;
}) => {
  const [name, setName] = useState('');
  const [colDefs, setColDefs] = useState<ColDef<CurrentItem>[]>([
    { field: 'category' },
    { field: 'item' },
    {
      field: 'totalVolume',
      valueFormatter: (params) => numeral(params.value).format('0,0'),
    },
    {
      field: 'currentSpend',
      valueFormatter: (params) => numeral(params.value).format('0,0'),
    },
  ]);

  useEffect(() => {
    const getRowDataForCategory = (category: string): CurrentItem[] =>
      uniq(baselineRows.filter((row) => row.category === category).map((row) => row.item)).map(
        (item) => ({
          category,
          item,
          totalVolume: baselineRows
            .filter((row) => row.item === item)
            .reduce((acc, row) => acc + row.volume, 0),
          currentSpend: baselineRows
            .filter((row) => row.item === item)
            .reduce((acc, row) => acc + row.spend, 0),
        }),
      );
    const categories: string[] = uniq(bidSheetRows.map((row) => row.category));
    const rowData: CurrentItem[] = [];
    categories.forEach((category) => {
      rowData.push(...getRowDataForCategory(category));
    });
    setRowData(rowData);
  }, [baselineRows, bidSheetRows, setRowData]);

  // Container: Defines the grid's theme & dimensions.
  return (
    <x.div h="250px">
      <TextField
        id="filled-basic"
        label="Scenario Name"
        variant="outlined"
        onChange={(e) => setName(e.target.value)}
      />
      <x.h1 my="1rem">Current spend and volume for table</x.h1>
      <div className="ag-theme-quartz" style={{ width: '100%', height: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          onRowClicked={(e) => setSelectedRow(e.data)}
        />
      </div>
    </x.div>
  );
};
