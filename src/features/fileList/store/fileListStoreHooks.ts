"use client";
import { useFileContext } from "@/features/fileList/store/fileListStoreProvider";

/**
 * Хук для доступа к actions
 */
export const useFileActions = () => useFileContext((state) => state.actions);
/**
 * Хук для доступа к id текущего элемента
 */
export const useCurrentItemId = () =>
  useFileContext((state) => state.currentItemId);
/**
 * Хук для доступа к коллекции
 */
export const useItems = () => useFileContext((state) => state.items);

/**
 * Хук для доступа к id главного родителя
 */
export const useItemitemWithoutParent = () =>
  useFileContext((state) => state.itemWithoutParent);
