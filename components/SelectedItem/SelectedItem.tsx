import { CurrentItem } from '@/types/currentItem.types';
import { x } from '@xstyled/styled-components';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { useState } from 'react';
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import range from 'lodash/range';
import { BidSheetRow } from '@/types/bidSheet.types';
import uniq from 'lodash/uniq';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { set } from 'lodash';
import { CalculatedValues } from '../CalculatedValues/CalculatedValues';

export const SelectedItem = ({
  selectedRow,
  bidSheetRows,
  rowData,
  setRowData,
}: {
  rowData: CurrentItem[];
  setRowData: (v: CurrentItem[]) => void;
  selectedRow?: CurrentItem;
  bidSheetRows: BidSheetRow[];
}) => {
  const [numberOfSuppliers, setNumberOfSuppliers] = useState<number>(1);
  const [supplierIdToShare, setSupplierIdToShare] = useState<Record<string, string>>({});

  const [supplierIdToSupplierName, setSupplierIdToSupplierName] = useState<Record<string, string>>(
    {},
  );

  const bidSheetSuppliers = uniq(bidSheetRows.map((row) => row.supplier));

  return (
    <x.div mt="9rem">
      {selectedRow && (
        <>
          <x.div>category: {selectedRow?.category}</x.div>
          <x.div>item: {selectedRow?.item}</x.div>
          <x.div>totalVolume: {selectedRow?.totalVolume}</x.div>
          <x.div>currentSpend: {selectedRow?.currentSpend}</x.div>

          <x.div mt="1rem">
            <x.div mt="1rem" display="flex" flexDirection="column" gap=".5rem">
              {range(numberOfSuppliers).map((supplierId) => (
                <x.div
                  key={`supplier${supplierId}`}
                  display="flex"
                  gap="1rem"
                  alignItems="center"
                  justifyContent="center"
                >
                  <x.div
                    display="flex"
                    alignItems="center"
                    gap=".5rem"
                    color="red"
                    cursor="pointer"
                    onClick={() => {
                      setNumberOfSuppliers((prev) => prev - 1);
                    }}
                  >
                    <DeleteRoundedIcon />
                  </x.div>

                  <FormControl
                    sx={{
                      width: '200px',
                    }}
                  >
                    <InputLabel id="supplier-label">Select a supplier</InputLabel>

                    <Select
                      labelId="supplier-label"
                      label="supplier-label"
                      onChange={(e) =>
                        setSupplierIdToSupplierName((prev) => ({
                          ...prev,
                          [supplierId]: e.target.value,
                        }))
                      }
                    >
                      {bidSheetSuppliers.map((supplier) => (
                        <MenuItem key={`${supplierId}-supplier`} value={supplier}>
                          {supplier}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    sx={{
                      width: '200px',
                    }}
                    label="Volume Share"
                    type="number"
                    InputProps={{ inputProps: { min: 0, max: 100 } }}
                    id="filled-basic"
                    variant="outlined"
                    onChange={(e) =>
                      setSupplierIdToShare((prev) => ({
                        ...prev,
                        [supplierId]: e.target.value,
                      }))
                    }
                  />

                  <CalculatedValues
                    bidSheetRows={bidSheetRows}
                    selectedRow={selectedRow}
                    rowData={rowData}
                    supplierName={supplierIdToSupplierName[supplierId]}
                    supplierShare={supplierIdToShare[supplierId]}
                  />
                </x.div>
              ))}
            </x.div>
            <x.div
              mt="1rem"
              display="flex"
              alignItems="center"
              gap=".5rem"
              color="green"
              cursor="pointer"
              onClick={() => setNumberOfSuppliers((prev) => prev + 1)}
            >
              <AddCircleRoundedIcon />
              Add a supplier
            </x.div>

            <Divider sx={{ my: '1.5rem' }} orientation="horizontal" variant="middle" flexItem />
          </x.div>
        </>
      )}
    </x.div>
  );
};
