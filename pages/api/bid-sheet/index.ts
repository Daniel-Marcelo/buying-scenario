// Assuming this is in pages/api/read-csv.ts for a Next.js API route
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import csvParser from 'csv-parser';
import { BidSheetRow } from '@/types/bidSheet.types';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const results: BidSheetRow[] = [];

  fs.createReadStream('Scenario Calculation - BID Sheets.csv')
    .pipe(csvParser())
    .on('data', (rawData) => {
      const data: BidSheetRow = {
        supplier: rawData.Supplier,
        category: rawData.Category,
        item: rawData.Item,
        minimumVolume: parseFloat(rawData['Minimum Volume'].replace('%', '')) / 100,
        maximumVolume: parseFloat(rawData['Maximum Volume'].replace('%', '')) / 100,
        pricePerThousand: rawData['Price/1000']
          ? parseFloat(rawData['Price/1000'].replace('$', '').trim())
          : 0,
      };
      results.push(data);
    })
    .on('end', () => {
      // console.log(results);
      res.status(200).json(results);
    })
    .on('error', (error) => {
      // console.error(error);
      res.status(500).json({ error: 'Error reading the CSV file' });
    });
}
