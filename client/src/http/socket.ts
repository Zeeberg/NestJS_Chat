import socketIOClient from "socket.io-client";

export class Socket {
  private static instance: any;

  public static getInstance(): any {
    if (!Socket.instance) {
      Socket.instance = socketIOClient("http://localhost:8081", {
        reconnection: true,
        transports: ["websocket"],
      });
    }

    return Socket.instance;
  }
}

export const WS = Socket.getInstance();
