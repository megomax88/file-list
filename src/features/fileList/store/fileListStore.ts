import { createStore } from "zustand/vanilla";

import { getNestedFileList } from "@/features/fileList/utils/getNestedFileList";
import { Item } from "@/features/fileList/types/fileListTypes";
import { fetchData } from "@/shared/utils/fetch";

export interface IFileStore {
  items: Map<Item["id"], Item> | null;
  currentItemId: number | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  actions: {
    initialize: () => Promise<void>;
    setCurrentItem: (id: number | null) => void;
  };
}

export const useFileStore = createStore<IFileStore>((set) => ({
  items: null,
  currentItemId: null,
  loading: false,
  error: null,
  initialized: false,
  actions: {
    initialize: async () => {
      if (useFileStore.getState().initialized) return;

      set({ loading: true, error: null });
      try {
        const result = await fetchData();
        if (Array.isArray(result) && result.every(Item.isCorrectApiData)) {
          const { itemMap, idWithoutParent } = getNestedFileList(result);
          set({
            items: itemMap,
            currentItemId: idWithoutParent,
            initialized: true,
          });
        }
      } catch {
        set({ error: "Failed to load files" });
      } finally {
        set({ loading: false });
      }
    },
    setCurrentItem: (id) => {
      set({ currentItemId: id });
    },
  },
}));
