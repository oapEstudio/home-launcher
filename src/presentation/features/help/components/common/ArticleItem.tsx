import { Paper, Typography } from "@mui/material";
import { CustomBox } from "../../../../components/ui/box/CustomBox";
import type { IHelp } from "../../../../../domain/entities/IHelp";
import { DocumentItem } from "./DocumentItem";


interface ArticleItemProps {
  item: IHelp;
}

export const ArticleItem: React.FC<ArticleItemProps> = ({ item }) => (
  <Paper
    key={item.id}
    elevation={0}
    sx={{ py: 2, borderRadius: 0, alignItems: "center" }}
  >
    <CustomBox sx={{ mb: 2 }}>
      <Typography variant="h6" color="primary" gutterBottom>
        {item.title}
      </Typography>
    </CustomBox>
    <CustomBox sx={{ mb: 4 }}>
      <Typography>{item.description}</Typography>
    </CustomBox>
    <DocumentItem key={item.id} item={item} />
  </Paper>
);
