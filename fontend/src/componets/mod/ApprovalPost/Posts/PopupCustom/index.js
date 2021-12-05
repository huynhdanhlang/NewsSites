import React from "react";
import { Modal } from "@material-ui/core";
import { hideMailPopup } from "../../../../../redux/actions/saga/topic";
import { useDispatch, useSelector } from "react-redux";
import { sendMailPopup$ } from "../../../../../redux/selector/index";
import { updatePosts } from "../../../../../redux/actions/saga/posts";

export default function Popup({ post }) {
  const dispatch = useDispatch();
  const { isShowPopup } = useSelector(sendMailPopup$);
  // const postIndex = JSON.parse(localStorage.getItem("postIndex"));

  const [mailerState, setMailerState] = React.useState({
    name: "V/v Phản hồi xét duyệt bài đăng",
    email: "",
    message: "",
  });

  React.useEffect(() => {
    setMailerState((prevState) => ({
      ...prevState,
      ["email"]: post["author"].email,
    }));
  }, []);

  function handleStateChange(e) {
    setMailerState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const onApprovalButtonClick = React.useCallback(() => {
    dispatch(
      updatePosts.updatePostsRequest({
        ...post,
        isChecked: true,
        canceled: false,
        feedback: mailerState.message,
      })
    );
  }, [dispatch, post, mailerState]);

  const onCancelButtonClick = React.useCallback(() => {
    dispatch(
      updatePosts.updatePostsRequest({
        ...post,
        isChecked: false,
        canceled: true,
        feedback: mailerState.message,
      })
    );
  }, [dispatch, post, mailerState]);

  const onClose = React.useCallback(() => {
    dispatch(hideMailPopup());
  }, [dispatch]);

  console.log(["iiiii"], post);

  const approved = JSON.parse(localStorage.getItem("approved"));

  const submitEmail = async (e) => {
    e.preventDefault();
    onClose();
    if (approved === true) {
      onApprovalButtonClick();
    } else {
      onCancelButtonClick();
    }
    console.log({ mailerState });
    const response = await fetch("http://localhost:8080/api/sendmail", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ mailerState }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        const resData = await res;
        console.log(resData);
        if (resData.status === "success") {
          alert("Phản hồi của bạn đã được gửi đến tác giả!");
        } else if (resData.status === "fail") {
          alert("Message failed to send");
        }
      })
      .then(() => {
        setMailerState({
          name: "V/v Phản hồi xét duyệt bài đăng",
          email: post["author"].email,
          message: "",
        });
        window.location.reload();
      });
  };

  return (
    <Modal open={isShowPopup}>
      <form
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <fieldset
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "50%",
          }}
        >
          <legend style={{ textAlign: "center" }}>Phản hồi tác giả </legend>
          <input
            placeholder="Name"
            onChange={handleStateChange}
            name="name"
            value={mailerState.name}
          />
          <input
            placeholder="Email"
            readOnly={true}
            // onChange={handleStateChange}
            name="email"
            value={mailerState.email}
          />
          <textarea
            style={{ minHeight: "200px" }}
            placeholder="Message"
            onChange={handleStateChange}
            name="message"
            value={mailerState.message}
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <a
              onClick={submitEmail}
              className="btn btn-success btn-sm "
              href="#"
              role="button"
            >
              Gửi{" "}
            </a>
            <a
              onClick={onClose}
              className="btn btn-warning btn-sm "
              href="#"
              role="button"
            >
              Đóng{" "}
            </a>
          </div>
        </fieldset>
      </form>
    </Modal>
  );
}
