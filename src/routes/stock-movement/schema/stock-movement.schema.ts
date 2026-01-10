import { referenceTypeLabel, stockMovementTypeLabel } from "@/utils/wording";
import z from "zod";

export const createStockMovementSchema = z.object({
  product: z.string(),
  qty: z.number().min(0, "Stok tidak boleh negatif"),
  type: z.enum(Object.keys(stockMovementTypeLabel), {
    error: () => ({
      message: "Tipe pergerakan stok tidak valid",
    }),
  }),
  referenceType: z.enum(Object.keys(referenceTypeLabel), {
    error: () => ({
      message: "Tipe referensi pergerakan stok tidak valid",
    }),
  }),
  notes: z.string().optional(),
});

export type CreateStockFormSchema = z.infer<typeof createStockMovementSchema>;
