import { useCallback, useEffect, useState } from "react";
import io from "socket.io-client";

export const useSocket = (serverPath) => {

  const [socket, setSocket] = useState(null);
  const [online, setOnline] = useState(false);

  
  const conectSocket = useCallback(() => {
    const token = localStorage.getItem("token")
    const socketTem = io.connect(serverPath, {
      transports: ["websocket"],
      autoConnect: true,
      forceNew: true,
      query: {
        "x-token": token
      } 
    })
    setSocket(socketTem)
  },[serverPath])

  const disconectSocket = useCallback(() => {
    socket?.disconnect()
  },[socket])

  useEffect(() => {
    setOnline(socket?.connected);
  }, [socket]);

  useEffect(() => {
    socket?.on("connect", () => {
      setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket?.on("disconnect", () => {
      setOnline(false);
    });
  }, [socket]);


  return {
      socket,
      online,
      conectSocket,
      disconectSocket
  }
};
