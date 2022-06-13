import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { findInstanceDto } from 'src/shared/find-instance.dto';
import { DeepPartial, DeleteResult, UpdateResult } from 'typeorm';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    return await this.coursesService.create(createCourseDto);
  }
  @Get('/calendar/event')
  async getAllForCalender() {
    const courses = await this.coursesService.getCoursesInCalendarEventForm();
    const events = courses.map((element) => {
      return {
        id: element.id,
        start: element.startDate,
        end: element.endDate,
        url: `/dummyUrl/${element.id}`,
        title : element.name,
      };
    });
    return events ;
  }

  @Get()
  async findAll(@Query() findOptions: findInstanceDto) {
    return await this.coursesService.findAllSortedAndPaginated(findOptions);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Course> {
    return await this.coursesService.findOne(id);
  }
  @Get('/:offset/:take')
  async findAllPaginated(
    @Param('offset') offset: number,
    @Param('take') take: number,
  ): Promise<Course[]> {
    return await this.coursesService.findAllPaginated(offset, take);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    return await this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<UpdateResult> {
    return await this.coursesService.delete(id);
  }
  @Delete('hard/:id')
  async hardDelete(@Param('id') id: number): Promise<DeleteResult> {
    return await this.coursesService.hardDelete(id);
  }
}
