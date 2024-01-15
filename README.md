<h1 align="center"></h1>

<div align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="150" alt="Nest Logo" />
  </a>
</div>

<h3 align="center">NestJS OpenAI</h3>

---

# Features

- Configure and inject the OpenAI API client.

# Installation

```
yarn add @atmus/nestjs-openai
```

# Usage

## Settings

### `OpenAIModule.register`

Import the module at your module. Configure the OpenAI API client.

```typescript
import { OpenAIModule } from "@atmus/nestjs-openai";

@Module({
  imports: [
    OpenAIModule.register({
      apiKey: "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### `OpenAIModule.registerAsync`

You can also use `OpenAIModule.registerAsync` to configure it asynchronously.
This way you can hide your api key from the code. It's recommended to use this method.

```typescript
import { OpenAIModule } from "@atmus/nestjs-openai";

@Module({
  imports: [
    OpenAIModule.registerAsync({
      useFactory: (config: ConfigService<EnvVars>) => ({
        apiKey: config.get("OPENAI_API_KEY"),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

## Inject `OpenAIService`

Inject `OpenAIService` anywhere. Injected service is identical to OpenAI API client.

```typescript
@Injectable()
export class TextCompletionService {
  constructor(private readonly openai: OpenAIService) {}

  async completion(
    messages: CreateChatCompletionRequest["messages"],
  ): Promise<string> {
    const { data } = await this.openai.createCompletion({
      model: "davinci",
      prompt: "This is a test",
    });
    return data.choices[0].text;
  }
}
```
