export interface BaselineRow {
  id: string;
  category: string;
  item: string;
  supplier: string;
  volumeShare: number; // Converted percentage to a decimal
  pricePerThousand: number; // Currency value, removing '$' and parsing as number
  volume: number; // Removing commas and parsing as number
  spend: number; // Removing '$' and commas, then parsing as number
}
