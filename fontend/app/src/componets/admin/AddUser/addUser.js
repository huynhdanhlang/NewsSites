import React from "react";
import Register from "../../register/Register";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../../../redux/actions/saga/posts";
import { modalState$ } from "../../../redux/selector/index";
import { Modal } from "@material-ui/core";

export default function AddUserPost() {
  const dispatch = useDispatch();

  const onClose = React.useCallback(() => {
    dispatch(hideModal());
  }, [dispatch]);

  const { isShow } = useSelector(modalState$);

  return (
      <Modal disableEnforceFocus={true} open={isShow} onClose={onClose}>
        <Register />
      </Modal>
  );
}
