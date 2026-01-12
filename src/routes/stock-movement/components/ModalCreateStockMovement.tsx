import type { ModalProps } from "@/types/modal";
import { ArrowDownLeft, ArrowUpRight, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import type {
  CreateStockMovement,
  StockMovementReferenceType,
  StockMovementType,
} from "../type";
import { useForm } from "react-hook-form";
import {
  createStockMovementSchema,
  type CreateStockFormSchema,
} from "../schema/stock-movement.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectForm from "@/components/common/SelectForm";
import InputForm from "@/components/common/InputForm";
import TextareaForm from "@/components/common/TextAreaForm";
import { changeWordingStockMovementType } from "@/utils/wording";
import { useConfirmStore } from "@/app/stores/confirm.store";
import { useStockMovementStore } from "../store";
import { useProductStore } from "@/routes/product/store";
import { STOCK_MOVEMENT_REFERENCE_TYPE } from "@/constants/stock";

const defaultValue = {
  product: "",
  qty: undefined,
  type: "IN",
  notes: undefined,
};

export default function ModalCreateStockMovement({
  open,
  onClose,
}: ModalProps) {
  const products = useProductStore((s) => s.products);
  const addStockMovement = useStockMovementStore((s) => s.addStockMovement);
  const confirm = useConfirmStore((s) => s.confirm);

  const [movementType, setMovementType] = useState<StockMovementType>("IN");

  const optionProducts = products.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const optionReferenceType = [
    {
      label: STOCK_MOVEMENT_REFERENCE_TYPE.id.PURCHASE_ORDER,
      value: "PURCHASE_ORDER",
    },
    {
      label: STOCK_MOVEMENT_REFERENCE_TYPE.id.STOCK_ADJUSTMENT,
      value: "STOCK_ADJUSTMENT",
    },
    { label: STOCK_MOVEMENT_REFERENCE_TYPE.id.INVOICE, value: "INVOICE" },
  ];

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateStockFormSchema>({
    resolver: zodResolver(createStockMovementSchema),
  });

  useEffect(() => {
    if (open) {
      reset(defaultValue);
    }
  }, [open, reset]);

  if (!open) return null;

  const onSubmit = async (data: CreateStockFormSchema) => {
    const ok = await confirm({
      title: `Konfirmasi Penambahan Pergerakan Stok`,
      message:
        "Pergerakan stok baru akan ditambahkan ke dalam sistem. Apakah Anda ingin melanjutkan?",
      confirmText: "Tambah Pergerakan Stok",
      variant: "primary",
    });

    if (!ok) return;
    // use await if API already exists

    const productName = optionProducts.find(
      (item) => item.value === data.product
    );

    const payload: CreateStockMovement = {
      productId: data.product,
      product: productName?.label ?? "-",
      referenceId: null,
      type: movementType as StockMovementType,
      referenceType: data.referenceType as StockMovementReferenceType,
      qty: data.qty,
    };

    addStockMovement(payload);

    reset(defaultValue);
    onClose();
  };

  const handleClose = () => {
    reset(defaultValue);
    onClose();
    setMovementType("IN");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm transition-all">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-900">Tambah Stok</h2>
          <button
            onClick={() => handleClose()}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Type Toggle */}
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setMovementType("IN")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
                movementType === "IN"
                  ? "bg-white text-green-700 shadow-sm ring-1 ring-black/5"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <ArrowDownLeft
                className={`w-4 h-4 ${
                  movementType === "IN" ? "text-green-600" : ""
                }`}
              />
              Stok Masuk
            </button>
            <button
              type="button"
              onClick={() => setMovementType("OUT")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${
                movementType === "OUT"
                  ? "bg-white text-red-700 shadow-sm ring-1 ring-black/5"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <ArrowUpRight
                className={`w-4 h-4 ${
                  movementType === "OUT" ? "text-red-600" : ""
                }`}
              />
              Stock Keluar
            </button>
          </div>

          <div className="space-y-4">
            <SelectForm
              name="product"
              label="Produk"
              control={control}
              placeholder="Pilih Produk"
              error={errors.product?.message}
              options={optionProducts}
            />
            <div className="grid grid-cols-2 gap-4">
              <InputForm
                label="Quantity"
                {...register("qty", { valueAsNumber: true })}
                type="number"
                inputMode="numeric"
                placeholder="0"
                error={errors.qty?.message}
              />
              <SelectForm
                name="referenceType"
                label="Tipe Referensi"
                control={control}
                placeholder="Pilih Tipe Referensi"
                error={errors.referenceType?.message}
                options={optionReferenceType}
              />
            </div>
            <TextareaForm
              label="Notes (Opsional)"
              placeholder="Tambahkan keterangan..."
              rows={4}
              {...register("notes")}
              error={errors.notes?.message}
            />
          </div>
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => handleClose()}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className={`flex items-center gap-2 px-6 py-2 text-white rounded-lg transition-all shadow-sm font-medium cursor-pointer ${
                movementType === "IN"
                  ? "bg-green-600 hover:bg-green-700 shadow-green-600/20"
                  : "bg-red-600 hover:bg-red-700 shadow-red-600/20"
              }`}
            >
              <Save className="w-4 h-4" />
              Konfirmasi {changeWordingStockMovementType(movementType)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
