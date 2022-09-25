/**
 * For Auto generating this file below command can be run
 *  command : nest generate module messages
 */
import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessageRepository } from './messages.repository';
import { MessageService } from './messages.services';

@Module({
  controllers: [MessagesController],
  providers: [MessageService, MessageRepository]
})
export class MessagesModule { }
