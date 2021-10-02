import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import Grid from "@material-ui/core/Grid";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import PostAddIcon from "@material-ui/icons/PostAdd";
import CategoryIcon from "@material-ui/icons/Category";
import ListTopic from "./ApprovalTopic/index";
import { Link, Switch, Route, Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import { history } from "../../helpers/history";
import { retrieveParentTopic } from "../../redux/actions/thunk/parentTopic";
const useStyles = makeStyles({
  root: {
    width: 500,
  },
  stickToBottom: {
    alignItems: "center",
  },
});

const ModeraterBottomNavigation = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(retrieveParentTopic());
  }, [dispatch]);

  return (
    <Router history={history}>
      <Grid container justifyContent="center">
        <BottomNavigation
          className={classes.stickToBottom}
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction
            // onClick={onClick}
            label="Chủ đề"
            icon={<CategoryIcon />}
            component={Link}
            to={"/mod/topic"}
          />
          <BottomNavigationAction
            label="Tin tức"
            icon={<PostAddIcon />}
            component={Link}
            to={"/mod/posts"}
          />
        </BottomNavigation>
        <Switch>
          {/* {/* <Route path="/author/topic" component={TopicAuthor} /> */}
          <Route exact path="/mod/topic" component={ListTopic} />
        </Switch>
      </Grid>
    </Router>
  );
};
export default ModeraterBottomNavigation;
