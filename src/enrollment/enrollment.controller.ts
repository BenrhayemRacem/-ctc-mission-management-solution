import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { Enrollment } from './entities/enrollment.entity';
import { findInstanceDto } from 'src/shared/find-instance.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post()
  async create(@Body() createEnrollmentDto: CreateEnrollmentDto): Promise<Enrollment> {
    return await this.enrollmentService.create(createEnrollmentDto);
  }

  @Get()
  async findAll(@Query() findOptions: findInstanceDto) {
    return await this.enrollmentService.findAllSortedAndPaginated(findOptions);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Enrollment> {
    return await this.enrollmentService.findOne(id);
  }
  @Get('/:offset/:take')
  async findAllPaginated(
    @Param('offset') offset: number,
    @Param('take') take: number,
  ): Promise<Enrollment[]> {
    return await this.enrollmentService.findAllPaginated(offset, take);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateEnrollmentDto: UpdateEnrollmentDto,
  ): Promise<Enrollment> {
    return await this.enrollmentService.update(id, updateEnrollmentDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<UpdateResult> {
    return await this.enrollmentService.delete(id);
  }
  @Delete('hard/:id')
  async hardDelete(@Param('id') id: number): Promise<DeleteResult> {
    return await this.enrollmentService.hardDelete(id);
  }

  @Post("/report/:id")
  async cancelEnrollment(@Param('id') id:number) {
    return await this.enrollmentService.cancelEnrollment(id)
  }
}
