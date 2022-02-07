import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Logger } from "@nestjs/common";
import { Socket, Server } from "socket.io";
import { MessageRepository } from "./message.repository";
import { Message } from "./message.entity";

@WebSocketGateway(8081)
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private messageRepository: MessageRepository) {}
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger("ChatGateway");

  @SubscribeMessage("msgToServer")
  async handleMessage(client: Socket, payload: Message) {
    await this.messageRepository.createMessage(payload);
    const messages = await this.getMessages();
    this.server.emit("init", messages);
  }

  @SubscribeMessage("reload")
  async handleReload() {
    const messages = await this.getMessages();
    this.server.emit("init", messages);
  }

  afterInit(server: Server) {
    this.logger.log("Init");
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  async handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    const messages = await this.getMessages();
    this.server.emit("init", messages);
  }

  async getMessages() {
    return await this.messageRepository.find();
  }
}
