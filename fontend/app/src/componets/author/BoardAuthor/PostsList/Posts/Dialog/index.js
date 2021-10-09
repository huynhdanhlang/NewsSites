import * as React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { showDialogState$ } from "../../../../../../redux/selector/index";
import { useSelector } from "react-redux";
import { hideDialog } from "../../../../../../redux/actions/saga/posts";
import { useDispatch } from "react-redux";
import {
  deletePosts,
} from "../../../../../../redux/actions/saga/posts";

export default function AlertDialog() {
  const { isShowDialog } = useSelector(showDialogState$);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(isShowDialog);
  console.log(["djds"], open);

  const hideDialogClick = React.useCallback(() => {
    dispatch(hideDialog());
  }, [dispatch]);

  const hideDialogClickDelete = React.useCallback(
    (id) => {
      dispatch(deletePosts.deletePostsRequest({ id }));
      dispatch(hideDialog());
      setTimeout(window.location.reload(), 5000);
    },
    [dispatch]
  );

  const postId = JSON.parse(localStorage.getItem("postId"));

  return (
    <div>
      <Dialog
        open={open}
        onClose={hideDialogClick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Xóa bài đăng?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc muốn xóa bài đăng này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={hideDialogClick}>Hủy</Button>
          <Button
            onClick={() => {
              if (postId) {
                hideDialogClickDelete(postId);
              }
              hideDialogClick();
            }}
          >
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
