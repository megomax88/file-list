"use client";
import { createContext, useContext, useRef } from "react";
import { useStore } from "zustand";
import {
  useFileStore,
  IFileStore,
} from "@/features/fileList/store/fileListStore";

const FileStoreContext = createContext<typeof useFileStore | null>(null);

/**
 * Провайдер для работы со списком файлов
 */
export function FileStoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef(useFileStore);
  return (
    <FileStoreContext.Provider value={storeRef.current}>
      {children}
    </FileStoreContext.Provider>
  );
}

/**
 * Хук для доступа к стору
 */
export function useFileContext<T>(selector: (state: IFileStore) => T): T {
  const store = useContext(FileStoreContext);
  if (!store) throw new Error("FileStoreProvider not found!");
  return useStore(store, selector);
}
