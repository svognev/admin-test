import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';

const Modal = styled(Dialog)(() => ({
  '& .MuiDialogContent-root': {
    background: "#202222",
  },
  '& .MuiDialogActions-root': {
    background: "#202222",
  },
  '& .MuiPaper-root': {
    backgroundColor: "#202222",
  },
  '& .MuiMenuItem-root': {
    background: "#202222",
    color: "#dcdcdc",
  },
  '& .MuiTypography-root' : {
    color: "#dcdcdc"
  },
  '& .MuiDialogTitle-root' : {
    paddingBotton: "0px"
  },
  '& .MuiInputBase-input' : {
    color: "#dcdcdc"
  },
  '& .MuiFormLabel-root' : {
    color: "#999999"
  },
  '& .MuiDialog-paper' : {
    borderRadius: "10px"
  },
  '& .MuiSvgIcon-root' : {
    color: "#dcdcdc"
  },
  '& .MuiSelect-icon' : {
    color: "#888888"
  },
  '& .MuiFormControlLabel-root' : {
    marginTop: "7px"
  },
}));

export default Modal;