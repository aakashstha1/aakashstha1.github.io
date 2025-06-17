import { message, Input } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";

const { TextArea } = Input;

function AdminIntro() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    welcomeText: "",
    firstName: "",
    lastName: "",
    caption: "",
    description: "",
  });

  useEffect(() => {
    const fetchIntro = async () => {
      try {
        const res = await axios.get(`${API_URL}/get-intro`, {
          withCredentials: true,
        });
        setFormData(res.data.data);
      } catch (error) {
        console.log(error);
        message.error("Failed to load intro data");
      }
    };
    fetchIntro();
  }, [API_URL]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(`${API_URL}/update-intro`, formData, {
        withCredentials: true,
      });
      message.success(res.data.message);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label>Welcome Text</label>
        <Input
          name="welcomeText"
          placeholder="Intro"
          value={formData.welcomeText}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>First Name</label>
        <Input
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Last Name</label>
        <Input
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Caption</label>
        <Input
          name="caption"
          placeholder="Caption"
          value={formData.caption}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description</label>
        <TextArea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-10 py-2 bg-primary text-white rounded"
          disabled={loading}
        >
          {loading ? <LoadingOutlined /> : "SAVE"}
        </button>
      </div>
    </form>
  );
}

export default AdminIntro;
