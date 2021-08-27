//ActionsCreater
import { createActions } from "redux-actions";

const getTypes = (reduxAction) => {
  return reduxAction().type;
};

const getPosts = createActions({
  getPostsRequest: undefined,
  getPostsSuccess: (payload) => payload,
  getPostsFailure: (error) => error,
});

export { getPosts, getTypes };

//Cac ham trong createActions la obj tra ve dang:

/*
  getTypes(getPosts.getPostsSuccess)
  ==>  return 
          {
            type: "getPostsSuccess",
            payload:{
              name:"test"
            }
          }
*/
