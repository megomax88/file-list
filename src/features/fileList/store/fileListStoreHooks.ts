"use client";
import { useFileContext } from "@/features/fileList/store/fileListStoreProvider";

/**
 * Хук для доступа к списку файлов
 */
export const useFiles = () => useFileContext((state) => state.items);
/**
 * Хук для доступа к actions
 */
export const useFileActions = () => useFileContext((state) => state.actions);
/**
 * Хук для доступа к текущему элементу
 */
export const useCurrentItem = () =>
  useFileContext((state) =>
    state.currentItemId === null
      ? state.items
      : state.items.find((i) => i.id === state.currentItemId)?.children || []
  );
