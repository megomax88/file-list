"use client";
import { useFileContext } from "@/features/fileList/store/fileListStoreProvider";

/**
 * Хук для доступа к actions
 */
export const useFileActions = () => useFileContext((state) => state.actions);
/**
 * Хук для доступа к текущему элементу
 */
export const useCurrentItem = () =>
  useFileContext(({ items, currentItemId, error }) => {
    if (items && currentItemId) return items?.get(currentItemId);
    return error;
  });

