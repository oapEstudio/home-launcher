import { useCallback, useState } from "react";
import axios, { type AxiosRequestConfig } from "axios";

interface DownloadOptions {
  filename?: string;
  config?: AxiosRequestConfig;
  onStart?: () => void;
  onSuccess?: () => void;
  onError?: () => void;
}

export const useDownloadFile = () => {
  const [loading, setLoading] = useState(false);

  const downloadFile = useCallback(
    async (url: string, opts: DownloadOptions = {}) => {
      if (!url) return;

      const { filename, config, onStart, onSuccess, onError } = opts;

      try {
        onStart?.();
        setLoading(true);

        const res = await axios.get(url, {
          responseType: "blob",
          ...config,
        });

        const blob = new Blob([res.data], {
          type: res.headers["content-type"] || "application/octet-stream",
        });

        const fileURL = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = fileURL;
        link.download = filename || "archivo";
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(fileURL);

        onSuccess?.();
      } catch (e) {
        console.error("Error al descargar archivo:", e);
        onError?.();
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { downloadFile, loading };
};
