import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

// Define types for the context value
interface SocketContextType {
  socket: Socket | undefined;
  onlineUsers: any[];
}
const socketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocketContext = () => {
  return useContext(socketContext);
};

const SocketContextProvider: React.FC = ({ children }) => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [onlineUsers, setOnlineUser] = useState([]);

  useEffect(() => {
    const socketInstance = io("http://localhost:3000", {
      query: {
        userId: localStorage.getItem("id"),
      },
    });
    setSocket(socketInstance);
    socket?.on("getOnlineUsers", (users) => {
      setOnlineUser(users);
    });
    return () => {
      socketInstance.close();
    };
  }, []);

  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};

export default SocketContextProvider;
