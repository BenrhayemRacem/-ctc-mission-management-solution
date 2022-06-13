import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]) ],
  controllers: [UserController],
  providers: [UserService,User],
  exports: [UserService,User]
})
export class UserModule {}
