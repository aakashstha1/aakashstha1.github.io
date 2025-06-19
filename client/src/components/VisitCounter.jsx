import { useEffect } from "react";
import axios from "axios";

function VisitCounter() {
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const trackVisit = async () => {
      try {
        await axios.post(`${API_URL}/visit`);
      } catch (error) {
        // Optionally handle the error silently or log to a monitoring service
      }
    };

    trackVisit();
  }, []);

  return null;
}

export default VisitCounter;
