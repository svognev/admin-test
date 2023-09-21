import { useRef, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";

import { 
  DEFAULT_GOAL_STYLE_VALUE,
  GOAL_STYLE_OPTIONS,
  DEFAULT_GOAL_LIMIT,
} from "components/SettingsBlock/SettingsBlock.constants";

import Modal from "components/Modal";

export default function GoalModal({ isOpen, values, close, submit }) {
  const [ isErrorsEnabled, setIsErrorsEnabled ] = useState(false);
  const nameFieldRef = useRef();
  const maxLimitFieldRef = useRef();
  const styleFieldRef = useRef();

  let isEdit = !!values;
  let initialName = values?.name || "";
  let initialMaxLimit = isEdit ? parseInt(values?.max_limit || 0) : DEFAULT_GOAL_LIMIT;
  let initialStyle = values?.style || DEFAULT_GOAL_STYLE_VALUE;
  let modalTitle = `${isEdit ? "Edit" : "Create"} donation goal`;
  let saveButtonText = isEdit ? "Save" : "Create";
  
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        nameFieldRef?.current?.focus();
      }, 200)
    }
  }, [isOpen])
  
  const onClose = () => {
    setIsErrorsEnabled(false);
    close();
  };

  const onSave = async () => {
    const form = {
      max_limit: parseInt(maxLimitFieldRef?.current?.value || DEFAULT_GOAL_LIMIT),
      name: nameFieldRef?.current?.value,
      style: styleFieldRef?.current?.value,
    };

    if (Object.values(form).some(val => !val && val !== 0)) {
      setIsErrorsEnabled(true);
    } else {
      const result = await submit(form, values?.id || null);

      if (result) {
        onClose();
      }
    }
  };
  
  return (
    <div className="goalModal">
      <Modal open={isOpen} onClose={onClose}>
        <DialogTitle>{modalTitle}</DialogTitle>
        <DialogContent>
          <TextField
            inputRef={nameFieldRef}
            error={isErrorsEnabled && !nameFieldRef?.current?.value}
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            defaultValue={initialName}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            inputRef={maxLimitFieldRef}
            error={isErrorsEnabled && !maxLimitFieldRef?.current?.value}
            margin="dense"
            id="max_limit"
            label="Max limit"
            defaultValue={initialMaxLimit}
            type="text"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            fullWidth
            variant="standard"
          />
          <TextField
            inputRef={styleFieldRef}
            error={isErrorsEnabled && !styleFieldRef?.current?.value}
            id="style"
            select
            label="Style"
            defaultValue={initialStyle}
            margin="dense"
            fullWidth
            variant="standard"
          >
            {GOAL_STYLE_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onSave}>{saveButtonText}</Button>
        </DialogActions>
      </Modal>
    </div>
  );
}