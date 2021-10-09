import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { parentTopic$ } from "../../../../../redux/selector/index";
import {
  retrieveParentTopicAuthor,
  findByNameParentTopic,
  deleteAllParenttopic,
} from "../../../../../redux/actions/thunk/parentTopic";
import { Link, Router } from "react-router-dom";
import { history } from "../../../../../helpers/history";
import ParentTopicDataService from "../../../../../services/parentTopic.service";
import { userState$ } from "../../../../../redux/selector/index";

export default function ListTopic() {
  const [currnentParentTopic, setCurrentParentTopic] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");
  const { user: currentUser } = useSelector(userState$);
  const parentTopic = useSelector(parentTopic$);
  const dispatch = useDispatch();

  console.log(["parentTopic"], parentTopic);
  React.useEffect(() => {
    dispatch(retrieveParentTopicAuthor(currentUser.id));
  }, []);

  const onChangeSearchName = (e) => {
    const SearchName = e.target.value;
    setSearchName(SearchName);
  };

  const refreshData = () => {
    setCurrentParentTopic(null);
    setCurrentIndex(-1);
  };

  const setActiveParentTopic = async (parent, index) => {
    console.log(["lllll"], parent, index);
    setCurrentParentTopic(parent);
    setCurrentIndex(index);
    await getParentTopic(parent._id);
  };

  const getParentTopic = async (id) => {
    // console.log(["id fggfgfgfg"], id);
    await ParentTopicDataService.get(id)
      .then((response) => {
        console.log(id, response.data);
        localStorage.setItem("name_topic", JSON.stringify(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // React.useEffect(() => {
  //   getParentTopic(currnentParentTopic._id);
  // }, [currnentParentTopic._id]);

  // const removeAllParenttopic = () => {
  //   dispatch(deleteAllParenttopic())
  //     .then((response) => {
  //       // console.log(response);
  //       refreshData();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  console.log(["currnentParentTopic"], currnentParentTopic);

  const findByName = () => {
    refreshData();
    dispatch(findByNameParentTopic(searchName));
  };

  return (
    <Router history={history}>
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm theo tên"
              value={searchName}
              onChange={onChangeSearchName}
            />

            <div className="input-group-append">
              <a
                onClick={findByName}
                className="btn btn-outline-secondary"
                href="#"
                role="button"
              >
                Tìm kiếm{" "}
              </a>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <h4>Danh sách chủ đề</h4>
          <ul className="list-group">
            {parentTopic &&
              parentTopic.map((parent, index) => (
                <li
                  className={
                    "list-group-item" +
                    (index === currentIndex ? " active" : "")
                  }
                  onClick={() => setActiveParentTopic(parent, index)}
                  key={index}
                >
                  {parent["name_topic"].name_topic_child}
                </li>
              ))}
            &nbsp;
          </ul>
          {/* <a
            onClick={removeAllParenttopic}
            className="btn btn-danger btn-sm "
            href="#"
            role="button"
          >
            Xoá tất cả{" "}
          </a> */}
        </div>

        <div className="col-md-6">
          {currnentParentTopic ? (
            <div>
              <h4>Chủ đề</h4>
              <div>
                <label>
                  <strong>Tên :</strong>
                </label>
                {currnentParentTopic["name_topic"].name_topic_child}
              </div>
              <Link
                to={"/author/topic/topicParent/" + currnentParentTopic._id}
                className="bage bage-warning"
              >
                Chỉnh sửa
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Xin nhấn vào một chủ đề</p>
            </div>
          )}
        </div>
      </div>
    </Router>
  );
}
