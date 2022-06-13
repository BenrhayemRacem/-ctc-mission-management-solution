import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { findInstanceDto } from 'src/shared/find-instance.dto';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { Enrollment } from './entities/enrollment.entity';
import {
  convertJsonToString,
  convertStringToJson,
} from '../shared/json-to-string.utility';
import { statesEnum } from './enums/states.enum';
import { CoursesService } from '../courses/courses.service';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
    private courseService: CoursesService,
  ) {}

  async create(id: string, createEnrollmentDto: CreateEnrollmentDto) {
    if (createEnrollmentDto.extraInformations) {
      if (
        createEnrollmentDto.extraInformations.length !==
        createEnrollmentDto.size
      ) {
        throw new ConflictException(
          ` participant list must contain ${createEnrollmentDto.size} person`,
        );
      }
    }
    const { extraInformations, ...others } = createEnrollmentDto;
    const enrollmentToSave = {
      user: +id,
      extraInformations: convertJsonToString(extraInformations),
      ...others,
    };
    const course = await this.courseService.findOne(
      +createEnrollmentDto.course,
    );
    if (course.placesAvailable < createEnrollmentDto.size) {
      throw new BadRequestException('no places available, sorry');
    }

    return await this.enrollmentRepository.save(enrollmentToSave);
    // return await this.enrollmentRepository.save(createEnrollmentDto);
  }

  async findAll(): Promise<Enrollment[]> {
    return await this.enrollmentRepository.find();
  }

  async findAllPaginated(offset: number, take: number): Promise<Enrollment[]> {
    return await this.enrollmentRepository.find({
      take: take,
      skip: offset,
    });
  }

  async findAllSortedAndPaginated(findOptions: findInstanceDto) {
    const queryBuilder =
      this.enrollmentRepository.createQueryBuilder('Enrollment');
    const orderBy = findOptions.orderBy ? findOptions.orderBy : 'createdAt';
    const sort = findOptions.sort
      ? findOptions.sort === 'ASC'
        ? 'ASC'
        : 'DESC'
      : 'ASC';
    const page = findOptions.page ? findOptions.page : 1;
    const perPage = findOptions.perPage ? findOptions.perPage : 10;

    queryBuilder
      .leftJoinAndSelect('Enrollment.user', 'users')
      .orderBy(`Enrollment.${orderBy}`, sort)
      .offset((page - 1) * perPage)
      .limit(perPage);
    const total = await queryBuilder.getCount();
    const tempData = await queryBuilder.getMany();
    const returnedData = tempData.map((element) => {
      delete element.user.password;
      const { extraInformations, ...others } = element;
      return {
        extraInformations: convertStringToJson(extraInformations),
        ...others,
      };
    });
    return {
      data: returnedData,
      total,
      page,
      numberOfPages: Math.ceil(total / perPage),
    };
  }

  async findOne(id: number): Promise<Enrollment> {
    const enrollmentExists = await this.enrollmentRepository.findOne({
      where: { id },
      relations: ['course'],
    });
    if (enrollmentExists) {
      delete enrollmentExists.user.password;
      const { extraInformations, ...others } = enrollmentExists;

      return {
        extraInformations: convertStringToJson(extraInformations),
        ...others,
      };
    }
    throw new NotFoundException(`Enrollment with id ${id} does not exist`);
  }

  async update(
    id: number,
    updateEnrollmentDto: UpdateEnrollmentDto,
  ): Promise<Enrollment> {
    const { extraInformations, ...others } = updateEnrollmentDto;
    const enrollmentPreload = {
      extraInformations: convertJsonToString(extraInformations),
      ...others,
    };
    const enrollmentToUpdate = await this.enrollmentRepository.preload({
      id,
      ...enrollmentPreload,
    });
    if (enrollmentToUpdate) {
      return await this.enrollmentRepository.save(enrollmentToUpdate);
    } else {
      throw new NotFoundException(`Enrollement with id ${id} does not exist.`);
    }
  }

  async delete(id: number): Promise<UpdateResult> {
    const enrollmentToDelete = await this.enrollmentRepository.softDelete(id);
    if (enrollmentToDelete.affected) {
      return enrollmentToDelete;
    }
    throw new NotFoundException(`enrollment with id ${id} does not exist`);
  }

  async hardDelete(id: number): Promise<DeleteResult> {
    const enrollmentToDelete = await this.enrollmentRepository.delete(id);
    if (enrollmentToDelete.affected) {
      return enrollmentToDelete;
    }
    throw new NotFoundException(`enrollment with id ${id} does not exist`);
  }

  async getCancelDetails(id: number) {
    const enrollment = await this.enrollmentRepository.findOne({
      where: { id },
    });

    if (enrollment) {
      if (enrollment.state == statesEnum.canceled) {
        throw new BadRequestException('enrollment already canceled');
      }
      const courseDate = new Date(enrollment.course.startDate);
      const before2weeks = new Date(
        courseDate.setDate(courseDate.getDate() - 7),
      );
      if (
        enrollment.state == statesEnum.inProgress ||
        new Date(Date.now()) < before2weeks
      ) {
        return { msg: 'you can cancel your inscription with 0 DT penalty' };
      }
    } else {
      const courseDate2 = new Date(enrollment.course.startDate);
      const before2days = new Date(
        courseDate2.setDate(courseDate2.getDate() - 2),
      );
      if (new Date(Date.now()) < before2days) {
        const penalty = enrollment.course.price / 4;
        enrollment.penalization = penalty;
        return {
          msg: ` you can cancel your inscription with ${penalty} DT as a penalty`,
        };
      } else {
        return { msg: 'sorry , you cant cancel your enrollment' };
      }
    }

    return { msg: '' };
  }

  async cancelEnrollment(id: number) {
    const enrollment = await this.enrollmentRepository.findOne({
      where: { id },
    });

    if (enrollment) {
      if (enrollment.state == statesEnum.canceled) {
        throw new BadRequestException('enrollment already canceled');
      }
      const courseDate = new Date(enrollment.course.startDate);
      const before2weeks = new Date(
        courseDate.setDate(courseDate.getDate() - 7),
      );
      if (
        enrollment.state == statesEnum.inProgress ||
        new Date(Date.now()) < before2weeks
      ) {
        enrollment.state = statesEnum.canceled;
        const enrollmentToUpdate = await this.enrollmentRepository.preload({
          id,
          ...enrollment,
        });
        if (enrollmentToUpdate) {
          const newPlaces =
            enrollmentToUpdate.course.placesAvailable + enrollmentToUpdate.size;
          await this.courseService.update(enrollmentToUpdate.course.id, {
            ...enrollmentToUpdate.course,
            placesAvailable: newPlaces,
          });
          return await this.enrollmentRepository.save(enrollmentToUpdate);
        } else {
          throw new NotFoundException(
            `Enrollement with id ${id} does not exist.`,
          );
        }
      } else {
        const courseDate2 = new Date(enrollment.course.startDate);
        const before2days = new Date(
          courseDate2.setDate(courseDate2.getDate() - 2),
        );
        if (new Date(Date.now()) < before2days) {
          const penalty = enrollment.course.price / 4;
          enrollment.penalization = penalty;
          enrollment.state = statesEnum.canceled;
          const enrollmentToUpdate = await this.enrollmentRepository.preload({
            id,
            ...enrollment,
          });
          if (enrollmentToUpdate) {
            const newPlaces =
              enrollmentToUpdate.course.placesAvailable +
              enrollmentToUpdate.size;
            await this.courseService.update(enrollmentToUpdate.course.id, {
              ...enrollmentToUpdate.course,
              placesAvailable: newPlaces,
            });
            return await this.enrollmentRepository.save(enrollmentToUpdate);
          } else {
            throw new NotFoundException(
              `Enrollement with id ${id} does not exist.`,
            );
          }
        } else {
          throw new BadRequestException(
            'sorry , you cant cancel your enrollment',
          );
        }
      }
    }
    throw new NotFoundException(` no enrollment found `);
  }

  async confirmEnrollment(id: number) {
    const enrollmentToUpdate = await this.enrollmentRepository.preload({
      id,
      state: statesEnum.confirmed,
    });
    if (enrollmentToUpdate) {
      // return enrollmentToUpdate

      if (enrollmentToUpdate.course.placesAvailable === 0) {
        throw new BadRequestException('no places available');
      }
      if (enrollmentToUpdate.course.placesAvailable < enrollmentToUpdate.size) {
        throw new BadRequestException('no  enough places available');
      }
      const newPlaces =
        enrollmentToUpdate.course.placesAvailable - enrollmentToUpdate.size;
      const course = await this.courseService.update(
        enrollmentToUpdate.course.id,
        {
          ...enrollmentToUpdate.course,
          placesAvailable: newPlaces,
        },
      );
      return await this.enrollmentRepository.save(enrollmentToUpdate);
    } else {
      throw new NotFoundException(`Enrollement with id ${id} does not exist.`);
    }
  }
}
