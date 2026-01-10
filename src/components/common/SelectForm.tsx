import { useEffect, useRef, useState } from "react";
import {
  Controller,
  type Control,
  type ControllerRenderProps,
  type FieldValues,
  type Path,
  type PathValue,
} from "react-hook-form";
import { ChevronDown, X, Loader2 } from "lucide-react";

type SelectOption = {
  label: string;
  value: string | number;
};

interface SelectFormProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options?: SelectOption[];
  loadOptions?: (search: string) => Promise<SelectOption[]>;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

export default function SelectForm<T extends FieldValues>({
  name,
  control,
  label,
  options = [],
  loadOptions,
  placeholder = "Pilih",
  error,
  disabled,
}: SelectFormProps<T>) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [list, setList] = useState<SelectOption[]>(options);
  const [loading, setLoading] = useState(false);
  const [highlight, setHighlight] = useState(-1);

  /* CLICK OUTSIDE */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setHighlight(-1);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* LOAD OPTIONS */
  useEffect(() => {
    if (!loadOptions) {
      setList(
        options.filter((o) =>
          o.label.toLowerCase().includes(search.toLowerCase())
        )
      );
      return;
    }

    const run = async () => {
      setLoading(true);
      try {
        const result = await loadOptions(search);
        setList(result);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [search, options, loadOptions]);

  /* KEYBOARD NAV */
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    onChange: (value: PathValue<T, Path<T>>) => void
  ) => {
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, list.length - 1));
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    }

    if (e.key === "Enter" && highlight >= 0) {
      e.preventDefault();
      onChange(list[highlight].value as PathValue<T, Path<T>>);
      setSearch(list[highlight].label);
      setOpen(false);
    }

    if (e.key === "Escape") {
      setOpen(false);
      setHighlight(-1);
    }
  };

  /* Render Select */
  const renderInput = (
    field: ControllerRenderProps<T, Path<T>>,
    selected: SelectOption | undefined
  ) => {
    return (
      <div className="relative">
        {/* INPUT */}
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={open ? search : selected?.label ?? ""}
            placeholder={
              open && selected?.label ? selected?.label : placeholder
            }
            disabled={disabled}
            onFocus={() => {
              setOpen(true);
              setSearch("");
            }}
            onChange={(e) => {
              setSearch(e.target.value);
              setOpen(true);
            }}
            onKeyDown={(e) => handleKeyDown(e, field.onChange)}
            className={`w-full px-3 py-2 pr-10 border rounded-md text-sm focus:outline-none text-gray-900 ${
              error
                ? "border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-gray-300 focus:ring-2 focus:ring-blue-100"
            }`}
            role="combobox"
            aria-expanded={open}
          />
          {/* ICON */}
          <div className="absolute inset-y-0 right-2 flex items-center gap-1">
            {field.value && (
              <button
                type="button"
                onClick={() => {
                  field.onChange("");
                  setSearch("");
                  inputRef.current?.focus();
                }}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>
        {/* DROPDOWN */}
        {open && (
          <ul
            role="listbox"
            className="absolute z-20 mt-1 w-full max-h-52 overflow-auto rounded-md bg-white border shadow-md"
          >
            {loading ? (
              <li className="px-3 py-2 text-sm text-gray-400 flex items-center gap-2">
                <Loader2 className="animate-spin" size={14} />
                Memuat...
              </li>
            ) : list.length ? (
              list.map((opt, idx) => (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={opt.value === field.value}
                  onMouseEnter={() => setHighlight(idx)}
                  onClick={() => {
                    field.onChange(opt.value);
                    setSearch(opt.label);
                    setOpen(false);
                  }}
                  className={`px-3 py-2 text-sm cursor-pointer text-gray-900 ${
                    selected?.value === opt.value
                      ? "font-semibold bg-blue-50"
                      : "font-normal"
                  } ${highlight === idx ? "bg-blue-50" : "hover:bg-gray-100"}`}
                >
                  {opt.label}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-sm text-gray-400">
                Data tidak ditemukan
              </li>
            )}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      <div ref={wrapperRef} className="relative">
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            const selected = list.find((opt) => opt.value === field.value);

            return renderInput(field, selected);
          }}
        />
      </div>

      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
}
