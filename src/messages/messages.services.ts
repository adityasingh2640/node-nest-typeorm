import { Injectable } from "@nestjs/common";
import { MessageRepository } from "./messages.repository";

@Injectable()
export class MessageService {
    constructor(public messageRepo: MessageRepository) { }
    findOne(id: string) {
        return this.messageRepo.findOne(id);
    }
    findAll() {
        return this.messageRepo.findAll();
    }
    createMessage(content: string) {
        return this.messageRepo.createMessage(content);
    }
}