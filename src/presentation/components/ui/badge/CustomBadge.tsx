import * as React from 'react';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

interface ICustomBadgeProps{
    count: number;
    children: React.ReactNode;
    color: "primary" | "secondary" | "default" | "error" | "info" | "success" | "warning";
}
export default function CustomBadge({count,children,color}: ICustomBadgeProps) {
  return (
    <Badge badgeContent={count} color={color}>
      {children}
    </Badge>
  );
}
