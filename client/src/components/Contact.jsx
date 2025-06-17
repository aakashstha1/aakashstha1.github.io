import SectionTitle from "./SectionTitle";
import { Button, Input, message } from "antd";
import Lottie from "lottie-react";
import contactAnimation from "../assets/lottie/contactLottie.json";
import { useState } from "react";
import axios from "axios";
import { MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";

const { TextArea } = Input;

function Contact() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!inputs.name || !inputs.email || !inputs.message) {
      message.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_URL}/sendMsg`, inputs);
      message.success("Message sent successfully!");
      setInputs({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Submission failed:", error);
      message.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="contact">
      <SectionTitle title="Contact" />
      <div className="flex items-center w-full gap-6">
        {/* Lottie Animation */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Lottie
            animationData={contactAnimation}
            loop={true}
          />
        </div>

        {/* Contact Form */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-full space-y-4">
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={inputs.name}
              onChange={handleChange}
              prefix={<UserOutlined />}
              required
            />

            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={inputs.email}
              onChange={handleChange}
              prefix={<MailOutlined />}
              required
            />

            <Input
              type="number"
              name="phone"
              placeholder="Phone Number"
              value={inputs.phone}
              onChange={handleChange}
              prefix={<PhoneOutlined />}
            />

            <TextArea
              name="message"
              placeholder="Your Message"
              value={inputs.message}
              onChange={handleChange}
              rows={4}
              required
            />

            <div className="flex justify-end">
              <Button
                className="w-full md:w-28"
                type="primary"
                loading={loading}
                onClick={handleSubmit}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
