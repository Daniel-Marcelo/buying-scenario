import csvParser from 'csv-parser';
import { IncomingForm } from 'formidable';
// import { promises as fs } from "fs";
import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false, // Disable the default bodyParser
  },
};

export default async function upload(req: NextApiRequest, res: NextApiResponse) {
  console.log('1****************************');

  console.log('parsing form');
  // Ensure method is POST
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  console.log('parsing form');
  const data = await new Promise((resolve, reject) => {
    console.log('2****************************');
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      console.log('parsing');
      if (err) reject(err);

      // console.log("files", files);

      // Assuming a single file upload, 'file' is the field name
      const file = files.file?.[0];

      // In a real-world scenario, ensure you validate the file (e.g., type, size)
      if (!file) {
        reject('No file uploaded.');
        return;
      }

      // console.log("file", file);

      // Read the file content
      // try {
      //   const content = await fs.readFile((file as any).filepath, "utf8");
      //   const rawData = csvParser();
      //   console.log("logging object");
      //   console.log(content); // Print the file contents to the console
      //   resolve({ fields, files });
      // } catch (error) {
      //   reject(error);
      // }
      const results = [] as any;
      // const bytes = await file.arrayBuffer();
      // const buffer = Buffer.from(bytes);
      fs.createReadStream((file as any).filepath)
        .pipe(csvParser())
        .on('data', (rawData) => {
          const data = {
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
          res.json({ results });
        })
        .on('error', (error) => {
          // console.error(error);
          res.json({ error: 'Error reading the CSV file' });
        });
    });
  });

  // Respond to the request indicating success
  res.status(200).json({ message: 'File processed successfully', data });
}
