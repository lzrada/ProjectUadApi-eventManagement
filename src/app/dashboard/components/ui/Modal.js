import React from "react";
import { X } from "lucide-react";

export const Modal = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X className="h-5 w-5" />
          </button>
        </div>
        {/* Content */}
        <div className="p-4">{children}</div>
        {/* Footer */}
        <div className="flex justify-end p-4 border-t border-gray-200">
          <button onClick={onClose} className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition">
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
