import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const DeleteModal = ({ isOpen, onClose, onConfirm, itemName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-card w-full max-w-sm rounded-2xl shadow-2xl border border-border/60 overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex flex-col items-center text-center p-8">
          <div className="bg-destructive/10 p-3 rounded-full mb-4">
            <AlertTriangle className="text-destructive h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold mb-2">Are you sure?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This will permanently remove the <span className="text-foreground font-semibold">{itemName}</span> application. This action cannot be undone.
          </p>
        </div>
        
        <div className="flex border-t border-border/40">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-4 text-sm font-semibold hover:bg-muted transition-colors border-r border-border/40"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 px-4 py-4 text-sm font-bold text-destructive hover:bg-destructive/10 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
