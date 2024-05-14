import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const OAuth2Callback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (code) {
      axios.post("BACKEND_ENDPOINT", { code, state })
        .then((response) => {
          console.log(response.data);
          navigate("/home");
        })
        .catch((error) => {
          console.error("Error exchanging authorization code:", error);
        });
    }
  }, [location.search, navigate]);

  return <div>Loading...</div>;
};

export default OAuth2Callback;
