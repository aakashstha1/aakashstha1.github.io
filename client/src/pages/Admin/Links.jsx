import { useEffect, useState } from "react";
import { message, Input } from "antd";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";

function Links() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fbURL: "",
    email: "",
    instaURL: "",
    linkedinURL: "",
    githubURL: "",
  });

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await axios.get(`${API_URL}/get-links`, {
          withCredentials: true,
        });
        setFormData(res.data.data);
      } catch (error) {
        console.error(error);
        message.error("Failed to load links data");
      }
    };
    fetchLinks();
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
      const res = await axios.put(`${API_URL}/update-links`, formData, {
        withCredentials: true,
      });
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      message.error("Update failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label>Facebook URL</label>
        <Input
          name="fbURL"
          placeholder="Facebook URL"
          value={formData.fbURL}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email</label>
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Instagram URL</label>
        <Input
          name="instaURL"
          placeholder="Instagram URL"
          value={formData.instaURL}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>LinkedIn URL</label>
        <Input
          name="linkedinURL"
          placeholder="LinkedIn URL"
          value={formData.linkedinURL}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>GitHub URL</label>
        <Input
          name="githubURL"
          placeholder="GitHub URL"
          value={formData.githubURL}
          onChange={handleChange}
          required
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

export default Links;
