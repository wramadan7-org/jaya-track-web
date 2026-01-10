import type { InputProps } from "@/types/input";
import { forwardRef } from "react";

const InputForm = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <input
          ref={ref}
          {...props}
          onWheel={(e) => (e.target as HTMLInputElement).blur()}
          className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 text-gray-800 ${
            error
              ? "focus:ring-red-100 border-red-500 placeholder:text-red-400"
              : "focus:ring-blue-100 placeholder:text-gray-400 border-gray-300"
          }`}
        />
        {error && <span className="text-red-400 text-sm">{error}</span>}
      </div>
    );
  }
);

InputForm.displayName = "InputForm";
export default InputForm;
