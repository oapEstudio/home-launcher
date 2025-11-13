import { IconButton, Tooltip, Typography } from "@mui/material";
import type { JSX } from "react";
import { useState } from "react";
import { DownloaddIcon, Visibility } from "../../../../components/ui/icons";
import { HELP_DOCUMENT_DOWNLOAD, HELP_DOCUMENT_LINK, HELP_DOCUMENT_PDF } from "../../contants/helps";
import type { IHelp } from "../../../../../domain/entities/IHelp";
import { useDownloadFile } from "../../hooks/useDownloadFile";
import { SimpleToast } from "./SimpleToast";

interface DocumentActionProps {
  help: IHelp;
}

type ToastVariant = "info" | "success" | "error";

export const DocumentAction: React.FC<DocumentActionProps> = ({ help }) => {
  const { downloadFile } = useDownloadFile();

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastVariant, setToastVariant] = useState<ToastVariant>("info");

  const showToast = (message: string, variant: ToastVariant = "info") => {
    setToastMsg(message);
    setToastVariant(variant);
    setToastOpen(true);
    // auto-hide
    setTimeout(() => {
      setToastOpen(false);
    }, 3500);
  };

  const onOpenLink = () => {
    const win = window.open(help.link, "_blank", "noopener,noreferrer");
    if (win) win.focus();
  };

  const onOpenPdf = () => {
    const win = window.open(help.documentLink, "_blank", "noopener,noreferrer");
    if (win) win.focus();
  };

  const onAction = () => {
    if (!help.documentLink) return;

    downloadFile(help.documentLink, {
      filename: help.title || "archivo",
      onStart: () => {
        showToast("Descargando archivo...", "info");
      },
      onSuccess: () => {
        showToast("Descarga completada", "success");
      },
      onError: () => {
        showToast("Error al descargar el archivo", "error");
      },
    });
  };

  const renderAction = (): JSX.Element | null => {
    switch (help.helpDocumentTypeId) {
      case HELP_DOCUMENT_DOWNLOAD:
        return (
          <Tooltip title={`Descargar archivo`} placement="top" arrow>
            <IconButton
              color="primary"
              size="small"
              onClick={onAction}
              aria-label="descargar"
            >
              <DownloaddIcon />
            </IconButton>
          </Tooltip>
        );

      case HELP_DOCUMENT_PDF:
        return (
          <Tooltip title={`Ver pdf`} placement="top" arrow>
            <IconButton
              color="primary"
              size="small"
              onClick={onOpenPdf}
              aria-label="ver"
            >
              <Visibility />
            </IconButton>
          </Tooltip>
        );

      case HELP_DOCUMENT_LINK:
        return (
          <Tooltip title={`Ver enlace`} placement="top" arrow>
            <Typography
              sx={{
                cursor: "pointer",
                fontWeight: 500,
                fontSize: "0.9rem",
                color: "primary.main",
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={onOpenLink}
            >
              Explorar
            </Typography>
          </Tooltip>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {renderAction()}

      <SimpleToast
        open={toastOpen}
        message={toastMsg}
        variant={toastVariant}
        onClose={() => setToastOpen(false)}
      />
    </>
  );
};