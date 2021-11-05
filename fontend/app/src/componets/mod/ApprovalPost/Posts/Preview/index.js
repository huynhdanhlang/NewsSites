import * as React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { showDialogState$ } from "../../../../../redux/selector/index";
import { useSelector } from "react-redux";
import { hideDialog } from "../../../../../redux/actions/saga/posts";
import { useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import "./style.css"

export default function AlertDialog({ preview }) {
  console.log(["preview"], preview);

  const { isShowDialog } = useSelector(showDialogState$);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(isShowDialog);
  console.log(["djds"], open);

  const hideDialogClick = React.useCallback(() => {
    dispatch(hideDialog());
  }, [dispatch]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={hideDialogClick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <h1>{preview.title}</h1>
        </DialogTitle>
        <DialogContent>
          <Typography
            style={{ wordWrap: "break-word" }}
            variant="body2"
            component="p"
            color="textSecondary"
            dangerouslySetInnerHTML={{
              __html: `${preview.content}`,
            }}
          ></Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={hideDialogClick}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
