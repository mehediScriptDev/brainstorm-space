"use client";

import React, { createContext, useContext, useCallback, useState, useEffect } from "react";

const ToastContext = createContext(null);

export function useToast() {
  return useContext(ToastContext);
}

let idCounter = 1;

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const add = useCallback((type, message, opts = {}) => {
    const id = `t-${Date.now()}-${idCounter++}`;
    const ttl = opts.duration ?? 4000;
    setToasts((s) => [...s, { id, type, message }]);
    if (ttl > 0) setTimeout(() => setToasts((s) => s.filter((t) => t.id !== id)), ttl);
    return id;
  }, []);

  const remove = useCallback((id) => setToasts((s) => s.filter((t) => t.id !== id)), []);

  return (
    <ToastContext.Provider value={{ addToast: add, removeToast: remove }}>
      {children}
      <div className="fixed right-4 bottom-6 z-50 flex flex-col gap-3 max-w-sm w-full">
        {toasts.map((t) => (
          <div key={t.id} className={`px-4 py-3 rounded-xl shadow-lg text-sm font-bold text-white ${t.type === "error" ? "bg-red-600" : t.type === "warn" ? "bg-yellow-600 text-black" : "bg-indigo-600"}`}>
            {t.message}
            <button onClick={() => remove(t.id)} className="ml-3 text-xs opacity-80">✕</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
