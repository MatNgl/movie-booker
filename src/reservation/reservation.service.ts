import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';

export interface Reservation {
  id: number;
  userId: string;
  movieId: string;
  startTime: Date;
  endTime: Date; 
  status: 'active' | 'cancelled';
}

@Injectable()
export class ReservationService {
  private reservations: Reservation[] = [];
  private idCounter = 1;

  createReservation(userId: string, createReservationDto: CreateReservationDto): Reservation {
    const { movieId, startTime } = createReservationDto;
    const start = new Date(startTime);
    if (isNaN(start.getTime())) {
      throw new BadRequestException('La date de début est invalide.');
    }
    // Calcul de l'heure de fin (2h après le début)
    const end = new Date(start);
    end.setHours(end.getHours() + 2);

    // Vérification de conflit : chevauchement avec une autre réservation active pour ce même utilisateur
    const conflict = this.reservations.find(res =>
      res.userId === userId &&
      res.status === 'active' &&
      (start < res.endTime && end > res.startTime)
    );
    if (conflict) {
      throw new BadRequestException('Conflit de réservation : vous avez déjà une réservation qui chevauche ce créneau horaire.');
    }

    const newReservation: Reservation = {
      id: this.idCounter++,
      userId,
      movieId,
      startTime: start,
      endTime: end,
      status: 'active',
    };

    this.reservations.push(newReservation);
    return newReservation;
  }

  listReservations(userId: string): Reservation[] {
    return this.reservations.filter(res => res.userId === userId && res.status === 'active');
  }

  cancelReservation(userId: string, reservationId: number): Reservation {
    const reservation = this.reservations.find(res => res.id === reservationId && res.userId === userId);
    if (!reservation) {
      throw new NotFoundException('Réservation introuvable.');
    }
    if (reservation.status === 'cancelled') {
      throw new BadRequestException('La réservation est déjà annulée.');
    }
    reservation.status = 'cancelled';
    return reservation;
  }
}
