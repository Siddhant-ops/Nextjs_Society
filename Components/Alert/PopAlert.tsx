import {
  Snackbar,
  SnackbarCloseReason,
  Alert,
  AlertColor,
} from "@mui/material";
import { Dispatch, SetStateAction, SyntheticEvent } from "react";

interface AlertStateType {
  visible: boolean;
  severity: AlertColor;
  message: string;
}

const PopAlert = (
  alertState: AlertStateType,
  setAlertState: Dispatch<SetStateAction<AlertStateType>>
) => {
  function closeToast(
    event: SyntheticEvent<any, Event>,
    reason?: SnackbarCloseReason
  ) {
    setAlertState({
      visible: false,
      severity: "info",
      message: "",
    });
  }

  return (
    <Snackbar
      open={alertState.visible}
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      autoHideDuration={5000}
      onClose={closeToast}
    >
      <Alert onClose={closeToast} severity={alertState.severity}>
        {alertState.message}
      </Alert>
    </Snackbar>
  );
};

export default PopAlert;
export type { AlertStateType };
