"use client";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useFileActions,
  useCurrentItemId,
  useItems,
  useItemitemWithoutParent,
} from "@/features/fileList/store/fileListStoreHooks";
import { Item } from "@/features/fileList/types/fileListTypes";
import FileListItem from "./FileListItem";

import styles from "./fileList.module.css";

/**
 * Список файлов
 */
export default function FileList() {
  const router = useRouter();
  const currentItemId = useCurrentItemId() || 0;
  const params = useParams();
  const items = useItems();
  const itemitemWithoutParent = useItemitemWithoutParent();
  const currentItem = items?.get(currentItemId);
  const { initialize, setCurrentItem } = useFileActions();

  useEffect(() => {
    initialize();
  }, [initialize]);

  // Координация url и отображаемого элемента
  useEffect(() => {
    if (params.folderId) {
      const id = Number(params.folderId[1]);
      if (currentItemId !== id) {
        setCurrentItem(id);
      }
    } else {
      setCurrentItem(itemitemWithoutParent);
    }
  }, [currentItemId, itemitemWithoutParent, params.folderId, setCurrentItem]);

  const handleClick = (id: number) => {
    router.push(`/files/${id}`);
    setCurrentItem(id);
  };

  if (!Item.isItem(currentItem)) {
    return null;
  }
  return (
    <>
      <h1 className={styles.title}>{currentItem.name}</h1>
      {currentItem.children.length ? (
        <ul className={styles.list}>
          {currentItem.children.map((child) => (
            <FileListItem
              key={child.id}
              file={child}
              onClick={() => handleClick(child.id)}
            />
          ))}
        </ul>
      ) : (
        <span className={styles.empty}>Содержимое отсутсвует</span>
      )}
    </>
  );
}
