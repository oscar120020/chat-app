import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { ChatPage } from "../pages/ChatPage";
import { Authrouter } from "./Authrouter";
import ReactLoading from "react-loading";

export const AppRouter = () => {
  const { auth, verifyToken } = useContext(AuthContext);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  if (auth.checking) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <ReactLoading
          type="spinningBubbles"
          color="#333598"
          height={100}
          width={100}
        />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {
          auth.logged 
          ? <Route path="/" element={<ChatPage />} />
          : <Route path="/auth/*" element={<Authrouter />} />
        }
        <Route
          path="*"
          element={
            auth.logged ? <Navigate to="/" /> : <Navigate to="/auth/login" />
          }
        />
      </Routes>
    </Router>
  );
};