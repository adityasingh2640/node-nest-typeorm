import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

@Injectable()
export class MessageRepository {
    async findOne(id: string) {
        const content = await readFile('message.json', 'utf8');
        const message = JSON.parse(content);
        return message[id];
    }
    async findAll() {
        const content = await readFile('message.json', 'utf8');
        const message = JSON.parse(content);
        return message;
    }
    async createMessage(content: string) {
        const contents = await readFile('message.json', 'utf8');
        const message = JSON.parse(contents);
        const id = Math.floor(Math.random() * 999);
        message[id] = { id, content };
        await writeFile('message.json', JSON.stringify(message));
        return { [id]: { id, content } };
    }
}