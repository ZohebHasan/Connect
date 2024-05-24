import React from "react";
import axios from "axios";

const SimpleButton: React.FC = () => {
  const handleClick = async () => {
    try {
      const response = await axios.get("http://localhost:8000/google/auth");
      const data = response.data;
      console.log(data);
      const authUrl = data.url;
      window.location.href = authUrl;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Sign in with Google</button>
    </div>
  );
};

export default SimpleButton;