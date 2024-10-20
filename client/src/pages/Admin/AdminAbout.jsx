import React from "react";
import { Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  ShowLoading,
  HideLoading,
  SetPortfolioData,
} from "../../redux/rootSlice";
import axios from "axios";
import { message } from "antd";

function AdminAbout() {
  const dispatch = useDispatch();

  const { portfolioData } = useSelector((state) => state.root);
  const onFinish = async (values) => {
    try {
      const tempSkills = values.skills.split(",");
      values.skills = tempSkills;
      dispatch(ShowLoading());
      const response = await axios.post(
        "http://localhost:5000/api/portfolio/update-about",
        {
          ...values,
          _id: portfolioData.about._id,
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        dispatch(
          SetPortfolioData({ ...portfolioData, about: response.data.data })
        );
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  return (
    <div>
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          ...portfolioData.about,
          skills: portfolioData.about.skills.join(", "),
        }}
      >
        <Form.Item name="imgURL" label="Image Url">
          <input placeholder="Image URL" required />
        </Form.Item>
        <Form.Item name="description1" label="Description1">
          <textarea placeholder="Description1" required />
        </Form.Item>
        <Form.Item name="description2" label="Description2">
          <textarea placeholder="Description2" required />
        </Form.Item>
        <Form.Item name="skills" label="Skills">
          <textarea placeholder="Skills" required />
        </Form.Item>
        <div className=" flex justify-end w-full">
          <button
            className="px-10 py-2 bg-primary text-secondary"
            type="submit"
          >
            SAVE
          </button>
        </div>
      </Form>
    </div>
  );
}

export default AdminAbout;
