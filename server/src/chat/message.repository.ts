import { Message } from "./message.entity";
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {
  async createMessage(data: Message): Promise<Message> {
    const { author, content } = data;
    const message = this.create();

    message.content = content;
    message.author = author;

    await this.save(message);

    return message;
  }
}
