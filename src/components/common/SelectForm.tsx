import type { SelectOption } from "@/types/input";
import { useEffect, useRef, useState } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface SelectDropdownProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
}

export default function SelectForm<T extends FieldValues>({
  name,
  control,
  label,
  options,
  error,
  placeholder = "Pilih",
}: SelectDropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // close when click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const selected = options.find((opt) => opt.value === field.value);

          return (
            <div className="relative">
              {/* Trigger */}
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className={`w-full px-3 py-2 border rounded-md text-left bg-white text-sm ${
                  selected?.label ? "text-gray-900" : "text-gray-400"
                } ${
                  error
                    ? "border-red-500 focus:ring-red-100"
                    : "border-gray-500 focus:ring-blue-500"
                }`}
              >
                {selected?.label ?? placeholder}
              </button>
              {/* Dropdown */}
              {open && (
                <ul className="absolute z-20 mt-1 w-full max-h-48 overflow-auto rounded-md bg-white border shadow-md">
                  {options.map((opt) => (
                    <li
                      key={opt.value}
                      onClick={() => {
                        field.onChange(opt.value);
                        setOpen(false);
                      }}
                      className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 text-gray-900 ${
                        opt.value === field.value
                          ? "bg-gray-100 font-medium"
                          : ""
                      }`}
                    >
                      {opt.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        }}
      />
      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
}
