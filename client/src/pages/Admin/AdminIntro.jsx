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

function AdminIntro() {
  const dispatch = useDispatch();

  const { portfolioData } = useSelector((state) => state.root);
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "http://localhost:5000/api/portfolio/update-intro",
        {
          ...values,
          _id: portfolioData.intro._id,
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        dispatch(
          SetPortfolioData({ ...portfolioData, intro: response.data.data })
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
        initialValues={portfolioData.intro}
      >
        <Form.Item name="welcomeText" label="Welcome Text">
          <input placeholder="Intro" required />
        </Form.Item>
        <Form.Item name="firstName" label="First Name">
          <input placeholder="First Name" required />
        </Form.Item>
        <Form.Item name="lastName" label="Last Name">
          <input placeholder="Last Name" required />
        </Form.Item>
        <Form.Item name="caption" label="Caption">
          <input placeholder="Caption" required />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <textarea placeholder="Description" required />
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

export default AdminIntro;
