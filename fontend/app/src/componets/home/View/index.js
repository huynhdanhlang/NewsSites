import * as React from "react";
import { Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { postsState$ } from "../../../redux/selector/index";
import * as actions from "../../../redux/actions/saga/posts";
// import PostService from "../../../services/posts.service";
import { Container } from "@material-ui/core";
import { history } from "../../../helpers/history";
import { Router } from "react-router-dom";

export default function ViewPost() {
  // const [postview,setPostView] = React.useState(null);
  const postIndex = JSON.parse(localStorage.getItem("postIndex"));
  const dispatch = useDispatch();
  const preview = useSelector(postsState$);

  React.useEffect(() => {
    dispatch(actions.getPostsId.getPostsIdRequest(postIndex[1]));
  }, []);

  // const getPostView = async (id) => {
  //   // console.log(["id fggfgfgfg"], id);
  //   await PostService.getPostsId(id)
  //     .then((response) => {
  //       console.log(id, response.data);

  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };
  console.log(["preview"], preview);

  return (
    <Router history={history}>
      <Container maxWidth="md" className="container">
        &nbsp;
        <h1>{preview[0].title}</h1>
        <Typography
          style={{ wordWrap: "break-word" }}
          variant="body2"
          component="p"
          color="textSecondary"
          dangerouslySetInnerHTML={{
            __html: `${preview[0].content}`,
          }}
        ></Typography>
        <Typography style={{ textAlign: "end", fontWeight: "bold" }}>
          {preview[0].author.fullname}
        </Typography>
        &nbsp;
      </Container>
    </Router>
  );
}
