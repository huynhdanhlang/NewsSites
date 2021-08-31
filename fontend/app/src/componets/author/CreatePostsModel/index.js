import React from "react";
import { Modal } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { modalState$ } from "../../../redux/selector/index";
import useStyles from "./style";
import { TextField, Button } from "@material-ui/core";
import FileBase64 from "react-file-base64";
import { hideModal, createPosts } from "../../../redux/actions/posts";
import { useState, useRef } from "react";
import JoditEditor from "jodit-react";

function CreatePostsModel() {
  const classes = useStyles();
  const dispatch = useDispatch(modalState$);
  const { user: currentUser } = useSelector((state) => state.auth);
  const editor = useRef(null);

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    placeholder: "Nội dung...",
    enableDragAndDropFileToEditor: true,
    uploader: { insertImageAsBase64URI: true },
    editHTMLDocumentMode: true,
    toolbar: true,
  };

  const [data, setData] = useState({
    title: "",
    content: "",
    attachment: "",
    author: currentUser.id,
  });

  const onClose = React.useCallback(() => {
    dispatch(hideModal());
  }, [dispatch]);

  const onSubmit = React.useCallback(() => {
    dispatch(createPosts.createPostsRequest(data));
    setData({
      title: "",
      content: "",
      attachment: "",
    });
  }, [dispatch, data]);

  //   <TextareaAutosize
  //   className={classes.textarea}
  //   minRows={10}
  //   maxRows={15}
  //   placeholder="Nội dung...."
  //   value={data.content}
  //   onChange={(e) => setData({ ...data, content: e.target.value })}
  // />
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
        <JoditEditor
          ref={editor}
          value={data.content}
          config={config}
          tabIndex={1} // tabIndex of textarea
          onBlur={(newContent) => setData({ ...data, content: newContent })} // preferred to use only this option to update the content for performance reasons
          onChange={(newContent) => {}}
        />
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
            Thêm
          </Button>
        </div>
      </form>
    </div>
  );
  const { isShow } = useSelector(modalState$);

  return (
    <div>
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open={isShow}
        onClose={onClose}
      >
        {body}
      </Modal>
    </div>
  );
}

export default CreatePostsModel;
