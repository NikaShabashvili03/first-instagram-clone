'use client';

import { useEffect } from "react";
import socket from "../libs/socket";
import { SafeUser } from "../types/SafeUser";

interface ContainerProps {
  children: React.ReactNode,
  currentUser: SafeUser | null
};


const SocketContext: React.FC<ContainerProps> = ({ children , currentUser}) => {
  useEffect(() => {
    // if(currentUser){
      socketInitializer();
    // }
  })

  const socketInitializer = async () => {
    await fetch('/api/sockets/socket');
    if(!socket.connected){
        socket.on('disconnect', () => {
            console.log("Disconnect")
        })
    }else{
        socket.on('connect', () => {
            console.log("Connected", socket.id)
        })
    }
  }

  return (
    <>
      {children}
    </>
   );
}

export default SocketContext;
