import { create } from "zustand";
import { getNestedFileList } from "@/features/fileList/utils/getNestedFileList";
import { Item } from "@/features/fileList/types/fileListTypes";
import { fetchData } from "@/shared/utils/fetch";

/**
 * Стор для работы со списком файлов
 * TODO добавить action для isFavourite
 */
export interface IFileStore {
  items: Item[];
  currentItemId: number | null;
  loading: boolean;
  error: string | null;
  actions: {
    fetchFiles: () => Promise<void>;
    setCurrentFolder: (id: number | null) => void;
  };
}

export const useFileStore = create<IFileStore>((set) => ({
  items: [],
  currentItemId: null,
  loading: false,
  error: null,
  actions: {
    fetchFiles: async () => {
      set({ loading: true, error: null });
      const result = await fetchData();
      if (result instanceof Error)
        set({ error: "Failed to load files", loading: false });
      const tree = getNestedFileList(result);
      set({ items: tree, loading: false });
    },
    setCurrentFolder: (id) => {
      set({ currentItemId: id });
    },
  },
}));
