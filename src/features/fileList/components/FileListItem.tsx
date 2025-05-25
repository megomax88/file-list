import { Item } from "@/features/fileList/types/fileListTypes";

import styles from "./fileListItem.module.css";
import OutlinedStar from "../icons/OutlinedStar";

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
      <span className={styles.name}>{file.name}</span>
      {file.parentId !== null && (
        <button
          className={`${
            file.isFavorite ? styles.favorite : styles.nonFavorite
          }`}
        >
          <OutlinedStar />
        </button>
      )}
    </li>
  );
}
