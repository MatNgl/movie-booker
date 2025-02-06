import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Authentification')
@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ 
    summary: 'Inscription d’un nouvel utilisateur', 
    description: 'Crée un nouvel utilisateur et renvoie un message de confirmation.' 
  })
  @ApiResponse({ status: 201, description: 'Inscription réussie' })
  @ApiResponse({ status: 400, description: 'Utilisateur déjà existant' })
  async register(@Body() registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ 
    summary: 'Connexion d’un utilisateur', 
    description: 'Authentifie un utilisateur et renvoie un token JWT ainsi que l’identifiant de l’utilisateur.' 
  })
  @ApiResponse({ status: 200, description: 'Connexion réussie, token et userId renvoyés' })
  @ApiResponse({ status: 401, description: 'Identifiants invalides' })
  async login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ 
    summary: 'Obtenir le profil de l’utilisateur connecté', 
    description: 'Renvoie les informations de profil de l’utilisateur authentifié. Nécessite un token Bearer valide.' 
  })
  @ApiResponse({ status: 200, description: 'Profil récupéré avec succès' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  async getProfile(@Request() req) {
    const userId = req.user.userId || req.user.sub;
    return this.userService.getProfile(userId);
  }
}
