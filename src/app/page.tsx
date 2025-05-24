"use client";

import { useEffect } from "react";
import {
  useFileActions,
  useFiles,
} from "@/features/fileList/store/fileListStoreHooks";

export default function Home() {
  const files = useFiles();
  const { fetchFiles } = useFileActions();

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return (
    <div>
      {files.map((file) => (
        <div key={file.id}>{file.name}</div>
      ))}
    </div>
  );
}
