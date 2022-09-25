/**
 * For Auto generating this file below command can be run
 *  command : nest generate controller messages(folder name)/messages --flat
 */

import { Body, Controller, Get, Param, Post, NotFoundException } from '@nestjs/common';
import { CreateMessageDTO } from './dtos/create-message.dto';
import { MessageService } from './messages.services';

@Controller('messages') // Setting string in this decorator will make API accessble at '/messages/:id'
export class MessagesController {

    constructor(public messageService: MessageService) { }
    @Get()
    listMessage() {
        return this.messageService.findAll();
    }
    @Post()
    createMessage(@Body() body: CreateMessageDTO) {
        return this.messageService.createMessage(body.content);
    }
    @Get('/:id')
    async getMessage(@Param('id') id: string) {
        const message = await this.messageService.findOne(id);
        if (!message) {
            throw new NotFoundException('Meesage not found');
        }
        return message;
    }
}
