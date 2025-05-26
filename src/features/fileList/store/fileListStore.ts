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
  itemWithoutParent: number;
  actions: {
    initialize: () => Promise<void>;
    setCurrentItem: (id: number | null) => void;
    toggleFavorite: (id: number) => void;
  };
}

export const useFileStore = createStore<IFileStore>((set) => ({
  items: null,
  currentItemId: null,
  loading: false,
  error: null,
  initialized: false,
  itemWithoutParent: 0,
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
            itemWithoutParent: idWithoutParent,
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
    toggleFavorite: async (id) => {
      // Имитация обновления на сервере
      // const currentValue = useFileStore.getState().items?.get(id)?.isFavorite;
      // const response = await fetch(`/api/files/${id}/favorite`, {
      //   method: "PATCH",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ isFavorite: !currentValue }),
      // });

      // if (!response.ok) throw new Error("Request failed");

      // const updatedItem = await response.json();

      set((state) => {
        state.items?.get(id)?.toggleIsFavorite();
        const updatedItems = new Map(state.items);
        return { items: updatedItems };
      });
    },
  },
}));
