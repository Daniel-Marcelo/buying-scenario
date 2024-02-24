import { BaselineRow } from '@/types/baseline.types';
import { BidSheetRow } from '@/types/bidSheet.types';
import { useQuery } from '@tanstack/react-query';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { x } from '@xstyled/styled-components';

export const BidSheetTable = ({ rowData }: { rowData: BidSheetRow[] }) => {
  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState<ColDef<BidSheetRow>[]>([
    { field: 'supplier' },
    { field: 'category' },
    { field: 'item' },
    { field: 'minimumVolume' },
    { field: 'maximumVolume' },
    { field: 'pricePerThousand' },
  ]);

  // Container: Defines the grid's theme & dimensions.
  return (
    <x.div h="400px" mt="3rem">
      <x.h1 mb="1rem">Bid Sheet</x.h1>
      <div className="ag-theme-quartz" style={{ width: '100%', height: '100%' }}>
        <AgGridReact rowData={rowData} columnDefs={colDefs} />
      </div>
    </x.div>
  );
};
