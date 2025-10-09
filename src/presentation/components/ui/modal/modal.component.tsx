// src/presentation/components/ui/CustomModal.tsx
import * as React from 'react'
import { styled, type Breakpoint } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { CustomStack } from '../stack/Stack';
import Button from '../button/button.component';
import H5 from '../H5/H5'
import { colors } from '../../../common/colors'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

export interface CustomModalProps {
  open: boolean
  onClose: () => void
  title?: string,
  children: any,
  onOk: () => void,
  onCancel: () =>void,
  maxWidth: Breakpoint,
  disabled: boolean
}

export const CustomModal: React.FC<CustomModalProps> = ({
  open,
  onClose,
  title = 'Modal title',
  children,
  onOk,
  onCancel,
  maxWidth = 'md',
  disabled= false
}) => {
  return (
    <BootstrapDialog
      onClose={(_, reason) => {
        // Evita que se cierre por backdrop click si lo deseas:
        if (reason === 'backdropClick') return
        onClose()
      }}
      aria-labelledby="customized-dialog-title"
      open={open}
      disableEscapeKeyDown // opcional, deshabilita ESC
      fullWidth
      maxWidth={maxWidth}
    >
      <DialogTitle sx={{ m: 0, p: 2, color:  colors.palette.primary.main }} id="customized-dialog-title">
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
          <CustomStack direction='column' spacing={2}>
            {children}
          </CustomStack>   
      </DialogContent>

      <DialogActions>
          <CustomStack direction='row' spacing={5} sx={{  width: '100%',  justifyContent: 'center'}}>
            <Button variant={'secondary'}  title='Cancelar' onClick={onClose}/>
            <Button variant={'primary'}  title='Aceptar' onClick={onOk} disabled={disabled} />
          </CustomStack>
      </DialogActions>
    </BootstrapDialog>
  )
}

export default CustomModal
