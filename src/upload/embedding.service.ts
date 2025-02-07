import { Injectable } from '@nestjs/common';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { ChatService } from '../chat/chat.service';
import { PrismaService } from '../prisma/prisma.service';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

@Injectable()
export class EmbeddingService {
  constructor(
    private prismaService: PrismaService,
    private textSplitter: RecursiveCharacterTextSplitter,
  ) {}

  async embedding(file: Express.Multer.File) {
    const loader = new PDFLoader(file.path);
    const chunks = await this.textSplitter.splitDocuments(await loader.load());
    const embeddings = await Promise.all(
      chunks.map((doc) => {
        return this.prismaService.documentEmbedding.create({
          data: {
            content: doc.pageContent,
            documentName: file.originalname,
          },
        });
      }),
    );
  }
}
