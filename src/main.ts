import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
app.setGlobalPrefix('api/v2');

/**Config del class-validator y class-tranform */

/**transform:true, transformOptions:{enableImplicitConversion:true} estan pq el Dto pagination necesita
 * transformar un string en number para los limites,pero conusme mas memoria */
app.useGlobalPipes(
  new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
    transform:true,
    transformOptions:{enableImplicitConversion:true}
  })
);
/**ACa tiene que estar process.env.PORT para que la app de despliegue lo cambie */
  await app.listen(process.env.PORT);
  console.log(`Aplication running on port: ${process.env.PORT}`);
}
bootstrap();
