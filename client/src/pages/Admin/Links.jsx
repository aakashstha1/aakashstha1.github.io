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

function Links() {
  const dispatch = useDispatch();

  const { portfolioData } = useSelector((state) => state.root);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "http://localhost:5000/api/portfolio/update-url",
        {
          ...values,
          _id: portfolioData.link._id,
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        dispatch(
          SetPortfolioData({ ...portfolioData, link: response.data.data })
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
        initialValues={portfolioData.link}
      >
        <Form.Item name="fbURL" label="Facebook URL">
          <input placeholder="Facebook URL" required />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <input placeholder="Email" required />
        </Form.Item>
        <Form.Item name="instaURL" label="Instagram URL">
          <input placeholder="Instagram URL" required />
        </Form.Item>
        <Form.Item name="linkedinURL" label="LinkedIn URL">
          <input placeholder="LinkedIn URL" required />
        </Form.Item>
        <Form.Item name="githubURL" label="GitHub URL">
          <input placeholder="GitHub URL" required />
        </Form.Item>
        <div className="flex justify-end w-full">
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

export default Links;
