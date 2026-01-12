import { z } from "zod";

export const createUpdateProductSchema = z
  .object({
    name: z.string().min(3, "Nama produk minimal 3 karakter"),
    minStock: z
      .number({
        error: (err) => {
          if (Number.isNaN(err.input)) {
            return { message: "Minimum stok tidak boleh kosong" };
          }
        },
      })
      .refine((val) => val !== undefined, {
        message: "Minimum stok tidak boleh kosong",
      })
      .refine((val) => !Number.isNaN(val), {
        message: "Minimum stok harus berupa angka",
      })
      .min(0, "Minimum stok tidak boleh kurang dari 0"),
    fillPerSack: z
      .number({
        error: (err) => {
          if (Number.isNaN(err.input)) {
            return { message: "Isi per karung tidak boleh kosong" };
          }
        },
      })
      .refine((val) => val !== undefined, {
        message: "Isi per karung tidak boleh kosong",
      })
      .refine((val) => !Number.isNaN(val), {
        message: "Isi per karung harus berupa angka",
      })
      .min(1, "Isi per karung minimal 1"),
    basePrice: z
      .number({
        error: (err) => {
          if (Number.isNaN(err.input)) {
            return { message: "Harga modal tidak boleh kosong" };
          }
        },
      })
      .refine((val) => val !== undefined, {
        message: "Harga modal tidak boleh kosong",
      })
      .refine((val) => !Number.isNaN(val), {
        message: "Harga modal harus berupa angka",
      })
      .min(0, "Harga modal tidak boleh kurang dari 0"),
    sellPrice: z
      .number({
        error: (err) => {
          if (Number.isNaN(err.input)) {
            return { message: "Harga jual tidak boleh kosong" };
          }
        },
      })
      .refine((val) => val !== undefined, {
        message: "Harga jual tidak boleh kosong",
      })
      .refine((val) => !Number.isNaN(val), {
        message: "Harga jual harus berupa angka",
      })
      .min(0, "Harga jual tidak boleh kurang dari 0"),
  })
  .refine((data) => data.sellPrice >= data.basePrice, {
    message: "Harga jual tidak boleh lebih murah dari harga modal",
    path: ["sellPrice"],
  });

export type CreateUpdateProductFormSchema = z.infer<
  typeof createUpdateProductSchema
>;
