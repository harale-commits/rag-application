import { Injectable } from '@nestjs/common';
import { AzureChatOpenAI } from '@langchain/openai';
import { AIMessageChunk, MessageContent } from '@langchain/core/messages';

@Injectable()
export class ChatService {
  model = new AzureChatOpenAI({
    model: 'gpt-4o',
    temperature: 0,
    maxTokens: undefined,
    maxRetries: 2,
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY, // In Node.js defaults to process.env.AZURE_OPENAI_API_KEY
    azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME, // In Node.js defaults to process.env.AZURE_OPENAI_API_INSTANCE_NAME
    azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME, // In Node.js defaults to process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME
    azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_VERSION, // In Node.js defaults to process.env.AZURE_OPENAI_API_VERSION
  });

  constructor() {}

  async getResponse(query: string): Promise<MessageContent> {
    const aiMsg = await this.model.invoke([
      [
        'system',
        'You are a helpful assistant that uses the chain of thought. You will have multiples tasks and perform that tasks one by one. First translate the task in french, then translate it to hindi, then English, then Marathi, then Gujarati and give all the answers  in bullet points and also add new line after each bullet point',
      ],
      ['human', query],
    ]);
    return aiMsg.content;
  }
}
