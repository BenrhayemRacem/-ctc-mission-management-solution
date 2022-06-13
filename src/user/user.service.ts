import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdateUserDtoAll } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { FindUserDto } from './dto/find-user.dto';
import * as bcrypt from 'bcrypt';
import { hashPassword } from 'src/shared/hash-password';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { MailService } from '../mail/mail.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private mailService: MailService,
  ) {}

  async getOneUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id }  ,relations:['instructor','instructor.courses' ,'enrolled']});
    if (user) {
      return user;
    }
    throw new NotFoundException(`user with id ${id} does not exist`);
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
  async getAllUsersSortedAndPaginated(findOptions: FindUserDto) {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    const orderBy = findOptions.orderBy ? findOptions.orderBy : 'createdAt';
    const sort = findOptions.sort
      ? findOptions.sort === 'ASC'
        ? 'ASC'
        : 'DESC'
      : 'DESC';
    const page = findOptions.page ? findOptions.page : 1;
    const perPage = findOptions.perPage ? findOptions.perPage : 10;

    queryBuilder
      .orderBy(`user.${orderBy}`, sort)
      .offset((page - 1) * perPage)
      .limit(perPage);
    const total = await queryBuilder.getCount();
    return {
      data: await queryBuilder.getMany(),
      total,
      page,
      numberOfPages: Math.ceil(total / perPage),
    };
  }

  async addUser(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const { email, cin, phoneNumber } = createUserDto;

    const user = await this.userRepository.findOne({
      where: [{ email }, { cin }, { phoneNumber }],
    });
    if (user) {
      const errorMsgs = {
        email: '',
        phoneNumber: '',
        cin: '',
      };
      if (user.cin === cin) errorMsgs['cin'] = 'Cin already used';
      if (user.email === email) errorMsgs['email'] = 'Email already used';
      if (user.phoneNumber === phoneNumber)
        errorMsgs['phoneNumber'] = 'Phone number already used';
      throw new ConflictException(errorMsgs);
    }
    const { repeat_password, ...userToSave } = createUserDto;
    const result = await this.userRepository.save(userToSave);
    delete result.password;
    this.mailService.sendUserCreateAccount(
      createUserDto.firstName,
      createUserDto.lastName,
      createUserDto.email,
    );
    return result;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDtoAll): Promise<User> {
    // const user = await this.userRepository.findOne(id);
    const user = await this.userRepository.preload({ id, ...updateUserDto });
    if (!user) {
      throw new NotFoundException(`user with id ${id} does not exist`);
    }
    return await this.userRepository.save(user)
    /* if (updateUserDto.password) {
      updateUserDto.password = await hashPassword(updateUserDto.password);
    }

    */

  }

  async updateUserPassword(
    id: number,
    updateUserPasswordDto: UpdateUserPasswordDto,
  ): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`user with id ${id} does not exist`);
    }
    const isEqualPassword = await bcrypt.compare(
      updateUserPasswordDto.old_password,
      user.password,
    );
    if (!isEqualPassword) {
      throw new BadRequestException(`Passwords do not match`);
    }
    const newHashedPassword = await hashPassword(
      updateUserPasswordDto.password,
    );
    const updatedUser = { ...user, password: newHashedPassword };
    try {
      const result = await this.userRepository.save(updatedUser);
      delete result.password;
      delete result.deletedAt;
      return result;
    } catch (err) {
      throw new ConflictException(err.toString());
    }
  }

  async softDelete(id: number): Promise<UpdateResult> {
    const result = await this.userRepository.softDelete(id);
    if (result.affected) {
      return result;
    }
    throw new NotFoundException(`user with id ${id} does not exist`);
  }

  async hardDelete(id: number): Promise<DeleteResult> {
    const result = await this.userRepository.delete(id);
    if (result.affected) {
      return result;
    }
    throw new NotFoundException(`user with id ${id} does not exist`);
  }
}
