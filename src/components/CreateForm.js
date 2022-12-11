import React, { useState } from "react";
import { message } from "antd";
import { createDemo } from "../action/crudDemo";
import { useDispatch } from "react-redux";
const CreateForm = (props) => {
  const initialTutorialState = {
    id: null,
    title: "",
    description: "",
  };
  const [initData, setInitData] = useState(initialTutorialState);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInitData({ ...initData, [name]: value });
  };

  const saveTutorial = () => {
    const { title, description } = initData;
    setLoading(true);
    dispatch(createDemo(title, description))
      .then((data) => {
        setInitData({
          id: data.id,
          title: data.title,
          description: data.description,
        });
        setLoading(false);
        props.setToggleModel(false);
        setInitData(initialTutorialState)
        message.success("Post added successfully!");
        console.log(data);
      })
      .catch((e) => {
        message.error("internal server error!!!");
      });
  };
  return (
    <div>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          required
          value={initData.title}
          onChange={handleInputChange}
          name="title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          className="form-control"
          id="description"
          required
          value={initData.description}
          onChange={handleInputChange}
          name="description"
        />
      </div>
      {loading ? (
        <button className="btn btn-success">loading...</button>
      ) : (
        <button onClick={saveTutorial} className="btn btn-success">
          create post
        </button>
      )}
    </div>
  );
};
export default CreateForm;
