// import { NextApiRequest, NextApiResponse } from "next";

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "GET") {
//     res.status(200).json(JSON.parse(JSON.stringify({ response: true })));
//   } else {
//     res.status(405);
//   }
// }// pages/api/read-csv.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import csvParser from 'csv-parser';
import { BaselineRow } from '@/types/baseline.types';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const results: BaselineRow[] = [];

  fs.createReadStream('Scenario Calculation - Baseline.csv')
    .pipe(csvParser())
    .on('data', (rawData) => {
      const data: BaselineRow = {
        category: rawData.Category,
        item: rawData.Item,
        supplier: rawData.Supplier,
        volumeShare: parseFloat(rawData['Volume Share'].replace('%', '')) / 100,
        pricePerThousand: parseFloat(rawData['Price/1000'].replace('$', '').trim()),
        volume: parseInt(rawData.Volume.replace(/,/g, ''), 10),
        spend: parseFloat(rawData.Spend.replace(/[$,]/g, '')),
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
