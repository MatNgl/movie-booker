import { Injectable, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { username, email, password } = registerDto;
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('Utilisateur déjà existant');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return { message: 'Inscription réussie' };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    const payload = { sub: user._id, email: user.email };
    const token = this.jwtService.sign(payload);
    return { token, userId: user._id };
  }

  async getProfile(userId: string) {
    const user = await this.userModel.findById(userId).select('-password'); // Exclure le mot de passe
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
    return user;
  }
}
