import { forwardRef } from "react";
import type { TextareaProps } from "@/types/input";

const TextareaForm = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>

        <textarea
          ref={ref}
          {...props}
          className={`w-full px-3 py-2 border border-gray-500 rounded-md text-sm resize-none focus:outline-none focus:ring-2 text-gray-800 ${
            error
              ? "focus:ring-red-100 border-red-500 placeholder:text-red-400"
              : "focus:ring-blue-500 placeholder:text-gray-400"
          }`}
        />

        {error && <span className="text-red-400 text-sm">{error}</span>}
      </div>
    );
  }
);

TextareaForm.displayName = "TextareaForm";
export default TextareaForm;
