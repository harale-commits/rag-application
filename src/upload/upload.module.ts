import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { ChatService } from '../chat/chat.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService, ChatService],
})
export class UploadModule {}
