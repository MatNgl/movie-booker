import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Inscription d’un nouvel utilisateur' })
  async register(@Body() registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Connexion d’un utilisateur' })
  async login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @Get('profile')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obtenir le profil de l’utilisateur connecté' })
  async getProfile(@Request() req) {
    const userId = req.user.userId || req.user.sub;
    return this.userService.getProfile(userId);
  }
}
