import React from "react";
import ParentTopicDataService from "../../services/parentTopic.service";

export const NavItem = () => {
  const [data, setData] = React.useState([]);
  const MenuItem = [];

  React.useEffect(async () => {
    await getParentTopic();
  }, []);

  const getParentTopic = async () => {
    await ParentTopicDataService.getAll()
      .then((response) => {
        console.log(["id"], response.data);
        setData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  data.map((item) => {
    item.map((topic) => {
      MenuItem.push({
        title: topic["name_topic_child"].name_topic,
        path: `/${topic["name_topic_child"].name_topic}`,
        cName: "dropdown-link",
      });
    });
  });

  return MenuItem;
};

