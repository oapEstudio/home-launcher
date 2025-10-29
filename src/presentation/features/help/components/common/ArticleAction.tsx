import { IconButton, Typography } from "@mui/material";
import type { JSX } from "react";
import { DownloaddIcon, EyeIcon } from "../../../../components/ui/icons";

interface ArticleActionProps {
  action: any; //ArticleActionType
  onAction: () => void;
}

export const ArticleAction: React.FC<ArticleActionProps> = ({ action, onAction }) => {
  const renderAction = (): JSX.Element | null => {
    switch (action) {
      case 'download':
        return (
          <IconButton
            size="small"
            color="primary"
            onClick={onAction}
            aria-label="descargar"
          >
            <DownloaddIcon />
          </IconButton>
        );
      
      case 'view':
        return (
          <IconButton
            size="small"
            color="primary"
            onClick={onAction}
            aria-label="ver"
          >
            <EyeIcon />
          </IconButton>
        );
      
      case 'explore':
        return (
          <Typography
            variant="body2"
            color="primary"
            sx={{
              cursor: 'pointer',
              fontWeight: 500,
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