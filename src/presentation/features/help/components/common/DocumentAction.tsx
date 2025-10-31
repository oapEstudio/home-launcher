import { IconButton, Typography } from "@mui/material";
import type { JSX } from "react";
import { DownloaddIcon, Visibility } from "../../../../components/ui/icons";
import { HELP_DOCUMENT_DOWNLOAD, HELP_DOCUMENT_LINK, HELP_DOCUMENT_PDF } from "../../contants/helps";

interface DocumentActionProps {
  helpDocumentTypeId: number;
}

const onAction = () => {
  const win = window.open('https://www.google.com', '_blank', 'noopener,noreferrer');
  if (win) win.focus();
};

export const DocumentAction: React.FC<DocumentActionProps> = ({ helpDocumentTypeId }) => {
  const renderAction = (): JSX.Element | null => {
    switch (helpDocumentTypeId) {
      case HELP_DOCUMENT_DOWNLOAD:
        return (
          <IconButton
            size="small"
            onClick={onAction}
            aria-label="descargar"
          >
            <DownloaddIcon />
          </IconButton>
        );

      case HELP_DOCUMENT_LINK:
        return (
          <IconButton
            size="small"
            onClick={onAction}
            aria-label="ver"
          >
            <Visibility />
          </IconButton>
        );

      case HELP_DOCUMENT_PDF:
        return (
          <Typography
            sx={{
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: '0.9rem',
              '&:hover': { textDecoration: 'underline' }
            }}
            onClick={onAction}
          >
            Explorar
          </Typography>
        );

      default:
        return null;
    }
  };

  return <>{renderAction()}</>;
};