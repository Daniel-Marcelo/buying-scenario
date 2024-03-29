import csvParser from "csv-parser";
import { IncomingForm } from "formidable";
// import { promises as fs } from "fs";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

export const config = {
  api: {
    bodyParser: false, // Disable the default bodyParser
  },
};

export default async function upload(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) res.json({ error: "Error reading the CSV file" });

    const file = files.file?.[0];

    if (!file) {
      res.json({ error: "No file selected" });
      return;
    }

    const results = [] as any;
    fs.createReadStream((file as any).filepath)
      .pipe(csvParser())
      .on("data", (rawData) => {
        if (
          // !rawData.minimumVolume ||
          !rawData["Maximum Volume"] ||
          !rawData.Category ||
          !rawData.Item ||
          !rawData.Supplier
        ) {
          res.status(500).json({ error: "Error reading file" });
          return;
        }
        const data = {
          id: uuidv4(),
          supplier: rawData.Supplier,
          category: rawData.Category,
          item: rawData.Item,
          minimumVolume:
            parseFloat(rawData["Minimum Volume"].replace("%", "")) / 100,
          maximumVolume:
            parseFloat(rawData["Maximum Volume"].replace("%", "")) / 100,
          pricePerThousand: rawData["Price/1000"]
            ? parseFloat(rawData["Price/1000"].replace("$", "").trim())
            : 0,
        };
        results.push(data);
      })
      .on("end", () => {
        // console.log(results);
        res.json({ results });
      })
      .on("error", (error) => {
        // console.error(error);
        res.json({ error: "Error reading the CSV file" });
      });
  });
}
