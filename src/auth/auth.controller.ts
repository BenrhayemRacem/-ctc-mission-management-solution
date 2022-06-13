import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateOrganismDto } from 'src/organism/dto/create-organism.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/singin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto): any {
    return this.authService.signup(createUserDto);
  }

  @Post('signin')
  singin( @Body()signinDto: SigninDto): any {
    return this.authService.signin(signinDto)
  }

  @Post('/organism/signup')
  organismSignup(@Body() createOrganismDto: CreateOrganismDto) {
    return this.authService.organismSignup(createOrganismDto);
  }
}
