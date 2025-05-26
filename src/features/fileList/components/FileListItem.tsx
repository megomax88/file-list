"use client";
import { Item, ItemType } from "@/features/fileList/types/fileListTypes";

import styles from "./fileListItem.module.css";
import FileListItemIsFavouriteButton from "./FileListItemIsFavouriteButton";
import FolderIcon from "../icons/FolderIcon";
import FileIcon from "../icons/FileIcon";

type Props = {
  file: Item;
  onClick: () => void;
};

/**
 * Элемент списка файлов
 */
export default function FileListItem({ file, onClick }: Props) {
  return (
    <li className={styles.item} onClick={onClick}>
      <div className={styles.nameIconContainer}>
        {file.type === ItemType.dir ? <FolderIcon /> : <FileIcon />}
        <span className={styles.name}>{file.name}</span>
      </div>
      {file.parentId !== null && <FileListItemIsFavouriteButton file={file} />}
    </li>
  );
}
