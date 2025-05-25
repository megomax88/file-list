"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useFileActions,
  useCurrentItem,
} from "@/features/fileList/store/fileListStoreHooks";
import { Item } from "@/features/fileList/types/fileListTypes";
import FileListItem from "./FileListItem";

import styles from "./fileList.module.css";

/**
 * Список файлов
 */
export default function FileList() {
  const router = useRouter();
  const currentItem = useCurrentItem();
  const { initialize, setCurrentItem } = useFileActions();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleClick = (id: number) => {
    setCurrentItem(id);
    router.push(`/files/${id}`);
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
