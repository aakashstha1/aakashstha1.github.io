import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form, message } from "antd";
import {
  HideLoading,
  ReloadData,
  SetPortfolioData,
  ShowLoading,
} from "../../redux/rootSlice";
import axios from "axios";

function AdminProjects() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const { projects } = portfolioData;

  // State for showing/hiding the modal
  const [showAddEditModal, setShowAddEditModal] = useState(false);

  // State for tracking the selected project for editing
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);

  // State for determining whether to add or edit
  const [type, setType] = useState("add");

  // Function to handle form submission (add/update)
  const onFinish = async (values) => {
    try {
      const tempTechUsed = values.techUsed.split(",");
      values.techUsed = tempTechUsed;
      dispatch(ShowLoading());
      let response;

      // Update project if selected item exists, otherwise add new project
      if (selectedItemForEdit) {
        response = await axios.post(
          "http://localhost:5000/api/portfolio/update-project",
          {
            ...values,
            _id: selectedItemForEdit._id,
          }
        );
      } else {
        response = await axios.post(
          "http://localhost:5000/api/portfolio/add-project",
          values
        );
      }

      dispatch(HideLoading());

      // Handle the response from the server
      if (response.data.success) {
        dispatch(
          SetPortfolioData({ ...portfolioData, projects: response.data.data })
        );
        message.success(response.data.message);
        setShowAddEditModal(false);
        setSelectedItemForEdit(null);
        dispatch(HideLoading());
        dispatch(ReloadData(true));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  // Function to delete a project
  const onDelete = async (item) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "http://localhost:5000/api/portfolio/delete-project",
        {
          _id: item._id,
        }
      );
      dispatch(HideLoading());

      // Handle the response from the server
      if (response.data.success) {
        message.success(response.data.message);
        dispatch(HideLoading());
        dispatch(ReloadData(true));
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
      {/* Button to open the modal for adding a new project */}
      <div className="flex justify-end">
        <button
          className="bg-primary px-5 py-2 text-secondary mb-5 flex items-center gap-4"
          onClick={() => {
            setSelectedItemForEdit(null);
            setShowAddEditModal(true);
          }}
        >
          Add Project<i className="fa-regular fa-square-plus text-xl"></i>
        </button>
      </div>

      {/* List of projects displayed in a grid */}
      <div className="grid grid-cols-3 gap-5">
        {projects.map((project, index) => (
          <div
            key={index}
            className="shadow border-2 p-5 flex flex-col gap-5 border-silver"
          >
            <h1 className="text-secondary text-xl font-bold flex justify-center">
              {project.title}
            </h1>
            <hr />
            <img
              src={project.imgURL}
              alt=""
              className="h-60 w-80 object-cover mx-auto"
            />
            <h1>
              <span className="text-primary font-semibold">Description :</span>{" "}
              {project.description}
            </h1>

            {/* Edit and Delete buttons */}
            <div className="flex justify-end mt-5 gap-5">
              <button
                className="bg-blue-500 text-white px-4 py-2"
                onClick={() => {
                  setSelectedItemForEdit(project);
                  setShowAddEditModal(true);
                  setType("edit");
                }}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2"
                onClick={() => {
                  onDelete(project);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for adding/editing a project */}
      {(type === "add" || selectedItemForEdit) && (
        <Modal
          open={showAddEditModal}
          title={selectedItemForEdit ? "Edit Project" : "Add Project"}
          footer={null}
          onCancel={() => {
            setShowAddEditModal(false);
            setSelectedItemForEdit(null);
          }}
        >
          <Form
            onFinish={onFinish}
            layout="vertical"
            initialValues={
              selectedItemForEdit
                ? {
                    ...selectedItemForEdit,
                    techUsed: selectedItemForEdit.techUsed.join(", "),
                  }
                : {}
            }
          >
            <Form.Item name="title" label="Title">
              <input placeholder="Title" />
            </Form.Item>
            <Form.Item name="imgURL" label="Image URL">
              <input placeholder="Image URL" />
            </Form.Item>
            <Form.Item name="githubURL" label="Github URL">
              <input placeholder="Github URL" />
            </Form.Item>
            <Form.Item name="figmaURL" label="Figma URL">
              <input placeholder="Figma URL" />
            </Form.Item>
            <Form.Item name="websiteURL" label="Website URL">
              <input placeholder="Website URL" />
            </Form.Item>
            <Form.Item name="techUsed" label="Technology Used">
              <input placeholder="Technology Used" />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <textarea placeholder="Description" />
            </Form.Item>

            {/* Close and Add/Update buttons */}
            <div className="flex justify-end">
              <button
                className="border-primary text-primary px-5 py-2"
                onClick={() => setShowAddEditModal(false)}
              >
                CLOSE
              </button>
              <button className="bg-primary text-secondary px-5 py-2">
                {selectedItemForEdit ? "Update" : "Add"}
              </button>
            </div>
          </Form>
        </Modal>
      )}
    </div>
  );
}

export default AdminProjects;
