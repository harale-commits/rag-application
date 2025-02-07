import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { ChatService } from '../chat/chat.service';
import { EmbeddingService } from './embedding.service';
import { PrismaService } from '../prisma/prisma.service';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { PrismaModule } from '../prisma/prisma.module';
import { ChatModule } from '../chat/chat.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [UploadController],
  providers: [UploadService, EmbeddingService, RecursiveCharacterTextSplitter],
})
export class UploadModule {}
