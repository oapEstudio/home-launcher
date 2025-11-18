import { Typography } from "@mui/material";
import type { IHelp } from "../../../../../domain/entities/IHelp";
import { CustomBox } from "../../../../components/ui/box/CustomBox";
import { DocumentAction } from "./DocumentAction";
import { colors } from "../../../../common/colors";


interface DocumentItemProps {
    item: IHelp;
}

export const DocumentItem: React.FC<DocumentItemProps> = ({ item }) => (

        <CustomBox sx={{ py: 2, display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${colors.divider}`, width: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{
                fontSize: '0.95rem',
                padding: 0,
                margin: 0,
            }}>{item.title}
            </Typography>
            <DocumentAction help={item} />
        </CustomBox>
);
