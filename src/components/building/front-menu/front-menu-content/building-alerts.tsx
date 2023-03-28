import React, { useState, forwardRef, Ref } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface Props {
  message: string;
}

const BuildingAlert: React.FC<Props> = ({ message }) => {
  const [open, setOpen] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  const handleClose = (event?: any, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default BuildingAlert;
