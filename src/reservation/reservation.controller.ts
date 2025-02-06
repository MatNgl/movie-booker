import { Controller, Post, Body, Get, Delete, Param, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('reservation')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @ApiOperation({
    summary: 'Créer une réservation',
    description: 'Crée une réservation pour un film avec une durée fixe de 2 heures. Vérifie les conflits de créneau pour éviter des chevauchements.',
  })
  @ApiResponse({ status: 201, description: 'Réservation créée avec succès.' })
  @ApiResponse({ status: 400, description: 'Conflit de réservation ou données invalides.' })
  createReservation(@Request() req, @Body() createReservationDto: CreateReservationDto) {
    const userId = req.user.userId || req.user.sub;
    return this.reservationService.createReservation(userId, createReservationDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Lister les réservations',
    description: 'Récupère la liste des réservations actives de l’utilisateur connecté.',
  })
  @ApiResponse({ status: 200, description: 'Liste des réservations renvoyée avec succès.' })
  listReservations(@Request() req) {
    const userId = req.user.userId || req.user.sub;
    return this.reservationService.listReservations(userId);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Annuler une réservation',
    description: 'Annule une réservation donnée par son ID pour l’utilisateur connecté.',
  })
  @ApiResponse({ status: 200, description: 'Réservation annulée avec succès.' })
  @ApiResponse({ status: 404, description: 'Réservation introuvable.' })
  cancelReservation(@Request() req, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.userId || req.user.sub;
    return this.reservationService.cancelReservation(userId, id);
  }
}
