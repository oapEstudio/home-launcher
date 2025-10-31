import { Paper, Typography, Button } from "@mui/material";
import type { IHelp } from "../../../../../domain/entities/IHelp";
import { CustomBox } from "../../../../components/ui/box/CustomBox";
import { DocumentAction } from "./DocumentAction";
import { HELP_DOCUMENT_DOWNLOAD, HELP_DOCUMENT_LINK, HELP_DOCUMENT_PDF } from "../../contants/helps";
import { colors } from "../../../../common/colors";


interface DocumentItemProps {
    item: IHelp;
}

export const DocumentItem: React.FC<DocumentItemProps> = ({ item }) => (
    <Paper
        key={item.id}
        elevation={0}
        sx={{ py: 2, borderRadius: 0, alignItems: "center", width: '100%', display: 'flex', flexDirection: 'column' }}
    >
        <CustomBox sx={{ minHeight: '60px',  py: 2, display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${colors.divider}`, width: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{
                fontSize: '0.95rem',
                padding: 0,
                margin: 0,
                fontWeight: 600,
            }}>
                Documento Descargable
            </Typography>
            <DocumentAction helpDocumentTypeId={HELP_DOCUMENT_DOWNLOAD} />
        </CustomBox>
        <CustomBox sx={{ minHeight: '60px', py: 2, display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${colors.divider}`, width: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{
                fontSize: '0.95rem',
                padding: 0,
                margin: 0,
                fontWeight: 600,
            }}>
                PDF Manual
            </Typography>
            <DocumentAction helpDocumentTypeId={HELP_DOCUMENT_PDF} />
        </CustomBox>
        <CustomBox sx={{ minHeight: '60px', py: 2, display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${colors.divider}`, width: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{
                fontSize: '0.95rem',
                padding: 0,
                margin: 0,
                fontWeight: 600,
            }}>
                Ven entrevista por Youtube
            </Typography>
            <DocumentAction helpDocumentTypeId={HELP_DOCUMENT_LINK} />
        </CustomBox>
    </Paper>
);
