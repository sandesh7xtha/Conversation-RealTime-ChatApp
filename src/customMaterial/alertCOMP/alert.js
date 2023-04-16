import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
const { forwardRef, useRef, useImperativeHandle } = React;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const customAlert = forwardRef((props, ref) => {
  const [OpenSuccess, setOpenSuccess] = React.useState(false);
  const [OpenError, setOpenError] = React.useState(false);
  const [OpenWarning, setOpenWarning] = React.useState(false);


  
  const [OpenErrorMsg, setOpenErrorMsg] = React.useState("");
  const [OpenSuccessMsg, setOpenSuccessMsg] = React.useState("");
  const [OpenWarningMsg, setOpenWarningMsg] = React.useState("");

  useImperativeHandle(ref, () => ({
    success(msg) {
      setOpenSuccess(true);
      setOpenSuccessMsg(msg);
    },
    error(msg) {
      setOpenError(true);
      setOpenErrorMsg(msg);
    },
    warning(msg) {
      setOpenWarning(true);
      setOpenWarningMsg(msg);
    },
  }));

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
    setOpenError(false);
    setOpenWarning(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      {/* <Button variant="outlined" onClick={success()}>
        Open success snackbar
      </Button> */}
      <Snackbar
        open={OpenSuccess}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }} style={{background:'green',color:'white'}}>
          Success ! {OpenSuccessMsg}
        </Alert>
      </Snackbar>
      <Snackbar open={OpenError} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }} style={{background:'red',color:'white'}}>
          Error ! {OpenErrorMsg}
        </Alert>
      </Snackbar>
      <Snackbar open={OpenWarning} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          Warning ! {OpenWarningMsg}
        </Alert>
      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </Stack>
  );
});

export default customAlert;
