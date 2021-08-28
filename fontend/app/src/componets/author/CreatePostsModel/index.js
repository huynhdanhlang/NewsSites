import React from "react";
import { Modal } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { modalState$ } from "../../../redux/selector/index";
import useStyles from "./style";
import { TextField, TextareaAutosize, Button } from "@material-ui/core";
import FileBase64 from "react-file-base64";
import { hideModal, createPosts } from "../../../redux/actions/posts";

function CreatePostsModel() {
  const classes = useStyles();
  const dispatch = useDispatch(modalState$);

  const [data, setData] = React.useState({
    title: "",
    content: "",
    attachment: "",
  });

  const onClose = React.useCallback(() => {
    dispatch(hideModal());
    setData({
      title: "",
      content: "",
      attachment: "",
    });
  }, [dispatch]);

  const onSubmit = React.useCallback(() => {
    dispatch(createPosts.createPostsRequest(data));
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
        <TextareaAutosize
          className={classes.textarea}
          minRows={10}
          maxRows={15}
          placeholder="Nội dung...."
          value={data.content}
          onChange={(e) => setData({ ...data, content: e.target.value })}
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
      <Modal open={isShow} onClose={onClose}>
        {body}
      </Modal>
    </div>
  );
}

export default CreatePostsModel;
