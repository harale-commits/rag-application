import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import multer, { diskStorage } from 'multer';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { ChatService } from '../chat/chat.service';
import { query } from 'express';

@Controller('upload')
export class UploadController {
  PATH = 'src/uploads/Romeo-and-Juliet-1617917936.pdf';

  constructor(private chatService: ChatService) {}

  @Post('/')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'src/uploads',
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const loader = new PDFLoader(this.PATH);
    const docs = await loader.load();
    const response = await this.chatService.getResponse(docs[0].pageContent);
    console.log(response);
  }
}
