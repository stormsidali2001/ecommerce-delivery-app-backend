import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session'
import * as passport from 'passport';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const sessionMid = session({
    name:'NESTJS_SESSION_ID',
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:6*60*60*1000,
        secure:false,
        httpOnly:true,
    }
});


// app.use(cookieParser())
app.use(sessionMid)
//for session with passport
app.use(passport.initialize())
app.use(passport.session())
//for session with passport ---x
app.useGlobalPipes(new ValidationPipe({transform:true}))
  await app.listen(8080);
}
bootstrap();
