"use client";
import IconButton from "@/shared/ui/components/IconButton";
import OutlinedStar from "@/features/fileList/icons/OutlinedStar";
import { Item } from "@/features/fileList/types/fileListTypes";
import { useFileActions } from "@/features/fileList/store/fileListStoreHooks";

import styles from "./fileListItemIsFavouriteButton.module.css";

/**
 * Кнопка добавления в избранное
 */
export default function FileListItemIsFavouriteButton({
  file,
}: {
  file: Item;
}) {
  const { toggleFavorite } = useFileActions();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    toggleFavorite(file.id);
  };
  return (
    <IconButton onClick={handleFavoriteClick}>
      <OutlinedStar className={`${file.isFavorite ? styles.iconColor : ""}`} />
    </IconButton>
  );
}
