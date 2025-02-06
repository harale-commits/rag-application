import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [ChatModule, ConfigModule.forRoot({ envFilePath: '.env' }), UploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
