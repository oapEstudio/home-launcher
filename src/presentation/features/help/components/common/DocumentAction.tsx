import { IconButton, Tooltip, Typography } from "@mui/material";
import type { JSX } from "react";
import { DownloaddIcon, Visibility } from "../../../../components/ui/icons";
import { HELP_DOCUMENT_DOWNLOAD, HELP_DOCUMENT_LINK, HELP_DOCUMENT_PDF } from "../../contants/helps";
import type { IHelp } from "../../../../../domain/entities/IHelp";

interface DocumentActionProps {
  help: IHelp;
}

export const DocumentAction: React.FC<DocumentActionProps> = ({ help }) => {

  const onOpenLink = () => {
    const win = window.open(help.link, '_blank', 'noopener,noreferrer');
    if (win) win.focus();
  };

  const onOpenPdf = () => {
    console.log('Open PDF:', help);
    const win = window.open(help.link, '_blank', 'noopener,noreferrer');
    if (win) win.focus();
  };

  const onAction = () => {
    console.log('Archivo:', help);
    const win = window.open(help.link, '_blank', 'noopener,noreferrer');
    if (win) win.focus();
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
              onClick={onAction}
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
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: '0.9rem',
                color: 'primary.main',
                '&:hover': { textDecoration: 'underline' }
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

  return <>{renderAction()}</>;
};