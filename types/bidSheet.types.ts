export interface BidSheetRow {
  supplier: string;
  category: string;
  item: string;
  minimumVolume: number; // Assuming this should be converted from percentage to a decimal
  maximumVolume: number; // Assuming this should be converted from percentage to a decimal
  pricePerThousand: number; // Assuming this needs to parse currency values, handling missing values
}
