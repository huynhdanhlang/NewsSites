import { createAction } from "redux-actions";

const getTypes = (reduxAction) => {
  return reduxAction().type;
};

const showMailPopup = createAction("SHOW_MAIL_POPUP");
const hideMailPopup = createAction("HIDE_MAIL_POPUP");

export { showMailPopup, hideMailPopup, getTypes };
