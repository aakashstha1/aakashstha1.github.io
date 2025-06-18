import { useEffect, useState } from "react";
import { Modal, Input, message } from "antd";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";

function AdminExperiences() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const [type, setType] = useState("add");
  const [formData, setFormData] = useState({
    period: "",
    company: "",
    title: "",
    description: "",
  });

  const fetchExperiences = async () => {
    try {
      const res = await axios.get(`${API_URL}/exp/get`);
      if (res.data.success) {
        setExperiences(res.data.data);
      }
    } catch (error) {
      console.log(error);
      message.error("Failed to fetch experiences");
    }
  };

  const handleAddExperience = async () => {
    try {
      setLoading(true);
      const url = `${API_URL}/exp/add`;
      const res = await axios.post(url, formData, { withCredentials: true });

      if (res.data.success) {
        message.success(res.data.message);
        resetForm();
        fetchExperiences();
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      message.error(err.message || "Add failed");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateExperience = async () => {
    try {
      setLoading(true);

      const url = `${API_URL}/exp/update/${selectedItemForEdit._id}`;
      const res = await axios.put(url, formData, { withCredentials: true });

      if (res.data.success) {
        message.success(res.data.message);
        resetForm();
        fetchExperiences();
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      message.error(err.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.period.trim()) {
      message.error("Period is required");
      return;
    }
    if (!formData.company.trim()) {
      message.error("Company is required");
      return;
    }
    if (!formData.title.trim()) {
      message.error("Title is required");
      return;
    }
    if (type === "edit" && selectedItemForEdit) {
      await handleUpdateExperience();
    } else {
      await handleAddExperience();
    }
  };

  const resetForm = () => {
    setShowAddEditModal(false);
    setSelectedItemForEdit(null);
    setFormData({
      period: "",
      company: "",
      title: "",
      description: "",
    });
  };

  const onDelete = (item) => {
    Modal.confirm({
      title: "Are you sure you want to delete this experience?",
      content: `${item.title} at ${item.company}`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          const res = await axios.delete(`${API_URL}/exp/${item._id}`, {
            withCredentials: true,
          });

          if (res.data.success) {
            message.success(res.data.message);
            fetchExperiences();
          } else {
            message.error(res.data.message);
          }
        } catch (err) {
          message.error(err.message || "Delete failed");
        }
      },
    });
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  useEffect(() => {
    if (type === "edit" && selectedItemForEdit) {
      setFormData({
        period: selectedItemForEdit.period,
        company: selectedItemForEdit.company,
        title: selectedItemForEdit.title,
        description: selectedItemForEdit.description,
      });
    } else {
      setFormData({
        period: "",
        company: "",
        title: "",
        description: "",
      });
    }
  }, [selectedItemForEdit, type]);

  return (
    <div>
      {/* Add Button */}
      <div className="flex justify-end">
        <button
          className="bg-primary px-5 py-2 text-secondary mb-5 flex items-center gap-4"
          onClick={() => {
            setSelectedItemForEdit(null);
            setType("add");
            setShowAddEditModal(true);
          }}
        >
          Add Experience<i className="fa-regular fa-square-plus text-xl"></i>
        </button>
      </div>

      {/* Experience Cards */}
      <div className="grid grid-cols-4 gap-5">
        {experiences.map((experience, index) => (
          <div
            key={index}
            className="shadow border-2 p-5 flex flex-col border-silver"
          >
            <h1 className="text-secondary text-xl font-bold">
              {experience.period}
            </h1>
            <hr />
            <h1>
              <span className="text-primary font-semibold">Company :</span>{" "}
              {experience.company}
            </h1>
            <h1>
              <span className="text-primary font-semibold">Title :</span>{" "}
              {experience.title}
            </h1>
            <h1>
              <span className="text-primary font-semibold">Description :</span>{" "}
              {experience.description}
            </h1>
            <div className="flex justify-end mt-5 gap-5">
              <button
                className="bg-blue-500 text-white px-4 py-2"
                onClick={() => {
                  setSelectedItemForEdit(experience);
                  setType("edit");
                  setShowAddEditModal(true);
                }}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2"
                onClick={() => onDelete(experience)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {(type === "add" || selectedItemForEdit) && (
        <Modal
          open={showAddEditModal}
          title={selectedItemForEdit ? "Edit Experience" : "Add Experience"}
          footer={null}
          onCancel={() => {
            setShowAddEditModal(false);
            setSelectedItemForEdit(null);
          }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              placeholder="Period"
              value={formData.period}
              onChange={(e) =>
                setFormData({ ...formData, period: e.target.value })
              }
            />
            <Input
              placeholder="Company"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
            />
            <Input
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <Input.TextArea
              placeholder="Description"
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <div className="flex justify-end gap-3 mt-3">
              <button
                type="button"
                className="border-primary text-primary px-5 py-2"
                onClick={() => setShowAddEditModal(false)}
              >
                CLOSE
              </button>
              <button
                disabled={loading}
                className="bg-primary text-secondary px-5 py-2"
                type="submit"
              >
                {loading ? (
                  <LoadingOutlined />
                ) : selectedItemForEdit ? (
                  "Update"
                ) : (
                  "Add"
                )}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default AdminExperiences;
