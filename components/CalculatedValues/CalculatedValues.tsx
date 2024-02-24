import { BaselineRow } from '@/types/baseline.types';
import { BidSheetRow } from '@/types/bidSheet.types';
import { CurrentItem } from '@/types/currentItem.types';
import { CardContent } from '@mui/material';
import { x } from '@xstyled/styled-components';
import numeral from 'numeral';

export const CalculatedValues = ({
  rowData,
  selectedRow,
  supplierShare,
  bidSheetRows,
  supplierName,
}: {
  bidSheetRows: BidSheetRow[];
  supplierShare: string;
  supplierName: string;
  selectedRow: CurrentItem;
  rowData: CurrentItem[];
}) => {
  const volume = selectedRow.totalVolume * (+supplierShare / 100);

  const volumePercentage = +supplierShare / 100;
  // console.log(volumePercentage, "volumePercentage");
  const foundRow = bidSheetRows.find((row) => {
    console.log(
      'comparing ',
      supplierName,
      ' with ',
      row.supplier,
      ' and ',
      selectedRow.item,
      ' with ',
      row.item,
      ' and ',
      volumePercentage,
      ' with ',
      row.minimumVolume,
      ' and ',
      row.maximumVolume,
    );
    console.log(row);
    return (
      row.supplier.toLowerCase() === (supplierName || '').toLowerCase() &&
      row.item.toLowerCase() === (selectedRow.item || '').toLowerCase() &&
      volumePercentage >= row.minimumVolume &&
      volumePercentage <= row.maximumVolume
    );
  });

  console.log(foundRow, 'foundRow');

  const spend = foundRow?.pricePerThousand ? (foundRow?.pricePerThousand * volume) / 1000 : 0;

  return (
    <CardContent>
      <x.div display="flex" gap=".5rem">
        <x.div>
          <div>Volume pcs</div>
          <div>{numeral(volume).format('0,00')}</div>
        </x.div>
        <x.div>
          <div>Price per 1000</div>
          <x.div mt=".25rem">
            {/* {numeral(foundRow?.pricePerThousand).format("$0,00")} */}
            {foundRow?.pricePerThousand}
          </x.div>
        </x.div>
        <x.div>
          <div>Spend (per 1000)</div>
          <div>{numeral(spend).format('0,00')}</div>
        </x.div>
      </x.div>
    </CardContent>
  );
};
