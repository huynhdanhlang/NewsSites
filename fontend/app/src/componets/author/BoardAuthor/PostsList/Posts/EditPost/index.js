import React from "react";
import { Modal } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./style";
import { TextField, Button } from "@material-ui/core";
import FileBase64 from "react-file-base64";
import {
  hideModalEdit,
  updatePosts,
} from "../../../../../../redux/actions/saga/posts";
import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { modalEditState$ } from "../../../../../../redux/selector/index";

function EditPostsModel({ post }) {
  const classes = useStyles();
  const dispatch = useDispatch(modalEditState$);
  //   const { user: currentUser } = useSelector(userState$);
  const editor = useRef(null);

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    placeholder: "Nội dung...",
    enableDragAndDropFileToEditor: true,
    uploader: { insertImageAsBase64URI: true },
    toolbar: true,
    editorCssClass: "jodit-workplace",
    allowTabNavigation: true,
    askBeforePasteHTML: false,
  };

  // const post = JSON.parse(sessionStorage.getItem("postId"));
  console.log(['post', post]);
  const [data, setData] = useState(post);

  console.log(["data"], data);
  const onClose = React.useCallback(() => {
    dispatch(hideModalEdit());
  }, [dispatch]);

  const onSubmit = React.useCallback(async () => {
    await dispatch(updatePosts.updatePostsRequest(data));
    // setTimeout(window.location.reload(true), 2000);
  }, [dispatch, data]);

  const body = (
    <div className={classes.paper} id="simple-modal-title">
      <h2>Thêm tin mới</h2>
      <form noValidate autoComplete="off" className={classes.form}>
        <TextField
          className={classes.title}
          required
          label="Tiêu đề tin"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
        {/* <div className={classes.outer}> */}
        <JoditEditor
          ref={editor}
          value={data.content}
          config={config}
          tabIndex={-1} // tabIndex of textarea
          onBlur={(newContent) => setData({ ...data, content: newContent })} // preferred to use only this option to update the content for performance reasons
          onChange={(newContent) => {}}
        />
        {/* </div> */}
        <FileBase64
          accept="image/*"
          multiple={false}
          type="file"
          value={data.attachment}
          onDone={({ base64 }) => setData({ ...data, attachment: base64 })}
        />

        <div className={classes.footer}>
          <Button
            variant="contained"
            color="primary"
            component="span"
            fullwidth="true"
            onClick={onSubmit}
          >
            Cập nhật
          </Button>
        </div>
      </form>
    </div>
  );
  const { isShowEdit } = useSelector(modalEditState$);

  return (
    <div>
      <Modal disableEnforceFocus open={isShowEdit} onClose={onClose}>
        {body}
      </Modal>
    </div>
  );
}

export default EditPostsModel;
