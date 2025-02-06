import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'Nom d’utilisateur',
    example: 'john_doe',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Adresse email de l’utilisateur',
    example: 'john@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Mot de passe de l’utilisateur (minimum 6 caractères)',
    example: 'strongPassword123',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
