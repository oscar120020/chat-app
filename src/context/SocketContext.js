import { createContext, useContext, useEffect } from "react";
import { AuthContext } from "../auth/AuthContext";
import { scrollToBottonAnimated } from "../helpers/scroll";
import { useSocket } from "../hooks/useSocket";
import { types } from "../types/types";
import { ChatContext } from "./chat/ChatContext";

export const SocketContext = createContext();

const baseUrl = process.env.REACT_APP_API_URL;

export const SocketProvider = ({ children }) => {
  const { socket, online, conectSocket, disconectSocket } = useSocket(
    `${baseUrl}`
  );
  const { auth } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    if (auth.logged) {
      conectSocket();
    }
  }, [auth, conectSocket]);

  useEffect(() => {
    if (!auth.logged) {
      disconectSocket();
    }
  }, [auth, disconectSocket]);

  useEffect(() => {
    socket?.on("user-list", (users) => {
      dispatch({
        type: types.loadUsers,
        payload: users,
      });
    });
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on("inbox-message", (message) => {
      dispatch({
          type: types.saveMessage,
          payload: message
      })
      scrollToBottonAnimated("box_scroll")
    });
  }, [socket, dispatch]);

  return (
    <SocketContext.Provider value={{ socket, online }}>
      {children}
    </SocketContext.Provider>
  );
};
