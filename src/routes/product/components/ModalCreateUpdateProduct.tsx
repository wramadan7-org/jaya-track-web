import { Save, X } from "lucide-react";
import { useProductStore } from "../store";
import type { Product } from "../types";
import InputForm from "@/components/common/InputForm";
import type { ModalProps } from "@/types/modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUpdateProductSchema,
  type CreateUpdateProductFormSchema,
} from "../schema/product.schema";
import { useEffect } from "react";
import { useConfirmStore } from "@/app/stores/confirm.store";

const defaultValue = {
  name: "",
  minStock: undefined,
  fillPerSack: undefined,
  basePrice: undefined,
  sellPrice: undefined,
};

export function ModalCreateUpdateProduct({
  id,
  open,
  onClose,
}: ModalProps & { id?: string }) {
  const products = useProductStore((s) => s.products);
  const addProduct = useProductStore((s) => s.addProduct);
  const updateProduct = useProductStore((s) => s.updateProduct);
  const confirm = useConfirmStore((s) => s.confirm);
  const product: Product | undefined = products.find(
    (product) => product.id === id
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateUpdateProductFormSchema>({
    resolver: zodResolver(createUpdateProductSchema),
  });

  useEffect(() => {
    if (open) {
      if (product) {
        reset({
          name: product.name,
          minStock: product.minStock,
          fillPerSack: product.fillPerSack,
          basePrice: product.basePrice,
          sellPrice: product.sellPrice,
        });
      } else {
        reset(defaultValue);
      }
    }
  }, [open, product, reset]);

  if (!open) return null;

  const onSubmit = async (data: CreateUpdateProductFormSchema) => {
    const ok = await confirm({
      title: `Konfirmasi ${product && id ? "Perubahan" : "Penambahan"} Produk`,
      message:
        product && id
          ? "Perubahan pada produk ini akan langsung disimpan. Apakah Anda ingin melanjutkan?"
          : "Produk baru akan ditambahkan ke dalam sistem. Apakah Anda ingin melanjutkan?",
      confirmText: product && id ? "Simpan Perubahan" : "Tambah Produk",
      variant: "primary",
    });

    if (!ok) return;
    // use await if API already exists

    if (product && id) {
      updateProduct(id, {
        ...product,
        ...data,
      });
    } else {
      addProduct(data);
    }

    reset(defaultValue);
    onClose();
  };

  const handleClose = () => {
    reset(defaultValue);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm transition-all">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            {product ? "Edit Produk" : "Tambah Produk"}
          </h2>
          <button
            type="button"
            onClick={() => handleClose()}
            className="cursor-pointer group"
          >
            <X className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
          </button>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Body */}
          <div className="px-6 py-4 space-y-4">
            <InputForm
              label="Nama Produk"
              {...register("name")}
              placeholder="Serok Jumbo"
              error={errors.name?.message}
            />
            <div className="grid grid-cols-2 gap-4">
              <InputForm
                label="Minimum Stok"
                {...register("minStock", { valueAsNumber: true })}
                type="number"
                inputMode="numeric"
                placeholder="10"
                error={errors.minStock?.message}
              />
              <InputForm
                label="Isi / Karung"
                {...register("fillPerSack", { valueAsNumber: true })}
                type="number"
                inputMode="numeric"
                placeholder="15"
                error={errors.fillPerSack?.message}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <InputForm
                label="Harga Modal"
                {...register("basePrice", { valueAsNumber: true })}
                type="number"
                inputMode="numeric"
                placeholder="84000"
                error={errors.basePrice?.message}
              />
              <InputForm
                label="Harga Jual"
                {...register("sellPrice", { valueAsNumber: true })}
                type="number"
                inputMode="numeric"
                placeholder="90000"
                error={errors.sellPrice?.message}
              />
            </div>
          </div>
          {/* Footer */}
          <div className="flex justify-end gap-2 px-6 py-4 border-t">
            <button
              type="button"
              onClick={() => handleClose()}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 text-white rounded-lg transition-all shadow-sm font-medium cursor-pointer bg-green-600 hover:bg-green-700 shadow-green-600/20"
            >
              <Save className="w-4 h-4" />
              Simpan Produk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
