import { z } from "zod";

export const createUpdateProductSchema = z
  .object({
    name: z.string().min(3, "Nama produk minimal 3 karakter"),
    minStock: z.number().min(0, "Minimum stok tidak boleh negatif"),
    fillPerSack: z.number().min(1, "Isi per karung minimal 1"),
    basePrice: z.number().min(0, "Harga modal tidak boleh negatif"),
    sellPrice: z.number().min(0, "Harga jual tidak boleh negatif"),
  })
  .refine((data) => data.sellPrice >= data.basePrice, {
    message: "Harga jual tidak boleh lebih murah dari harga modal",
    path: ["sellPrice"],
  });

export type CreateUpdateProductFormSchema = z.infer<
  typeof createUpdateProductSchema
>;
