import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { OrganismService } from 'src/organism/organism.service';
import { CreateOrganismDto } from 'src/organism/dto/create-organism.dto';
import { comparePasswords, hashPassword } from 'src/shared/hash-password';
import { MailService } from '../mail/mail.service';
import { SigninDto } from './dto/singin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private organismService: OrganismService,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<Partial<User>> {
    createUserDto.password = await hashPassword(createUserDto.password);

    return this.userService.addUser(createUserDto);
  }

  async signin(signInDto: SigninDto) {
    const userExists = await this.userService.getUserByEmail(signInDto.email);
    if (!userExists) {
      throw new NotFoundException(
        'no user found , please verify your credentials',
      );
    }
    const isPassowrdEqual = await comparePasswords(
      signInDto.password,
      userExists.password,
    );
    if (!isPassowrdEqual) {
      throw new ConflictException('please verify your password');
    }
    const payload = {
      authEmail: userExists.email,
      authId: userExists.id,
      authRole: userExists.role,
    };

    return {
      role: userExists.role,
      token: this.jwtService.sign(payload),
      expiresIn: 259200,
    };
  }

  async organismSignup(createOrganismDto: CreateOrganismDto) {
    const savedContact = await this.signup(createOrganismDto.contactPerson);
    const organismToSave = {
      ...createOrganismDto,
      contactPerson: savedContact,
    };
    return this.organismService.create(organismToSave);
  }
}
