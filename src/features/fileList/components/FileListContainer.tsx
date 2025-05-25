import FileList from "@/features/fileList/components/FileList";

import styles from "./fileListContainer.module.css";

/**
 * Контейнер списка
 */
export default function FileListContainer() {
  return (
    <div className={styles.container}>
      <FileList />
    </div>
  );
}
