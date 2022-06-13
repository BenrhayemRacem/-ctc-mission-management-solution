import { Module } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { InstructorController } from './instructor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instructor } from './entities/instructor.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[ AuthModule, TypeOrmModule.forFeature([Instructor]) ],
  controllers: [InstructorController],
  providers: [InstructorService, Instructor],
  exports:[InstructorService,Instructor]
})
export class InstructorModule {}
