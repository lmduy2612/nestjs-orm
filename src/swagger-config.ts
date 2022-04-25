import { DocumentBuilder } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('Nestjs Swagger')
  .setDescription('The nestjs swagger description')
  .setVersion('1.0')
  .addTag('v1')
  .addBearerAuth(
    {
      description: `[just text field] Please enter token in following format: Bearer <JWT>`,
      name: 'Authorization',
      bearerFormat: 'Bearer',
      scheme: 'Bearer',
      type: 'http',
      in: 'Header',
    },
    'access-token',
  )
  .build();

export default config;
