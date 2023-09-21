import { useRef, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { ANIMATION_OPTIONS } from "components/SettingsBlock/SettingsBlock.constants";
import Modal from "components/Modal";

export default function RuleModal({ isOpen, values, close, submit }) {
  const [ isErrorsEnabled, setIsErrorsEnabled ] = useState(false);
  const amountFieldRef = useRef();
  const isEqualFieldRef = useRef();
  const animationFieldRef = useRef();

  let isEdit = !!values;
  let initialAmount = parseInt(values?.amount || 0) || "";
  let initialIsEqual = values?.is_equal || false;
  let initialAnimation = values?.animation || ANIMATION_OPTIONS[0].value;
  let modalTitle = `${isEdit ? "Edit" : "Create"} donation rule`;
  let saveButtonText = isEdit ? "Save" : "Create";
  
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        amountFieldRef?.current?.focus();
      }, 200)
    }
  }, [isOpen])
  
  const onClose = () => {
    setIsErrorsEnabled(false);
    console.warn(1122);
    close();
  };

  const onSave = async () => {
    const form = {
      amount: parseInt(amountFieldRef?.current?.value),
      is_equal: isEqualFieldRef?.current?.checked || false,
      animation: animationFieldRef?.current?.value || ANIMATION_OPTIONS[0].value,
    };

    if (Object.values(form).some(val => !val && val !== false)) {
      setIsErrorsEnabled(true);
    } else {
      const result = await submit(form, values?.id || null);

      if (result) {
        onClose();
      }
    }
  };
  
  return (
    <div className="ruleModal">
      <Modal open={isOpen} onClose={onClose}>
        <DialogTitle>{modalTitle}</DialogTitle>
        <DialogContent>
          <TextField
            inputRef={amountFieldRef}
            error={isErrorsEnabled && !amountFieldRef?.current?.value}
            margin="dense"
            id="max_limit"
            label="Max limit"
            defaultValue={initialAmount}
            type="text"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            fullWidth
            variant="standard"
          />
          <TextField
            inputRef={animationFieldRef}
            error={isErrorsEnabled && !animationFieldRef?.current?.value}
            id="style"
            select
            label="Style"
            defaultValue={initialAnimation}
            margin="dense"
            fullWidth
            variant="standard"
          >
            {ANIMATION_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <FormControlLabel 
            control={<Checkbox defaultChecked={initialIsEqual} inputRef={isEqualFieldRef} />} 
            label="Is equal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onSave}>{saveButtonText}</Button>
        </DialogActions>
      </Modal>
    </div>
  );
}