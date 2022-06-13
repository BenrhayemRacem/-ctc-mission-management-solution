import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';
import { OrganismModule } from './organism/organism.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
//import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstructorModule } from './instructor/instructor.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    InstructorModule,
    CoursesModule,
    UserModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true, ////dont to forget to change this when dev is done
      }),
    }),
    OrganismModule,
    EnrollmentModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
