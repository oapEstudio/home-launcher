import * as React from "react";
import { IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CustomBox } from "../../../../components/ui/box/CustomBox";

type SimpleToastVariant = "info" | "success" | "error";

interface SimpleToastProps {
  open: boolean;
  message: string;
  variant?: SimpleToastVariant;
  onClose: () => void;
}

export const SimpleToast: React.FC<SimpleToastProps> = ({
  open,
  message,
  variant = "info",
  onClose,
}) => {
  if (!open) return null;

  const bgColor =
    variant === "success"
      ? "success.main"
      : variant === "error"
      ? "error.main"
      : "primary.main";

  return (
    <CustomBox
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 1500,
        minWidth: 260,
        maxWidth: 360,
        bgcolor: bgColor,
        color: "#fff",
        borderRadius: 2,
        boxShadow: 6,
        px: 2,
        py: 1.5,
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Typography
        variant="body2"
        sx={{ flexGrow: 1, fontWeight: 500, lineHeight: 1.4 }}
      >
        {message}
      </Typography>

      <IconButton
        size="small"
        onClick={onClose}
        sx={{
          color: "#fff",
          "&:hover": {
            bgcolor: "rgba(255,255,255,0.18)",
          },
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </CustomBox>
  );
};
