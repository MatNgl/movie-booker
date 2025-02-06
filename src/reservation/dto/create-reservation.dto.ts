import { IsNotEmpty, IsString, IsISO8601 } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
  @ApiProperty({
    description: 'ID du film à réserver',
    example: '12345',
  })
  @IsNotEmpty()
  @IsString()
  movieId: string;

  @ApiProperty({
    description: 'Date et heure de début de la réservation (format ISO 8601)',
    example: '2025-02-07T20:00:00Z',
  })
  @IsNotEmpty()
  @IsISO8601()
  startTime: string;
}
