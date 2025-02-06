import { CreateReservationDto } from './dto/create-reservation.dto';
export interface Reservation {
    id: number;
    userId: string;
    movieId: string;
    startTime: Date;
    endTime: Date;
    status: 'active' | 'cancelled';
}
export declare class ReservationService {
    private reservations;
    private idCounter;
    createReservation(userId: string, createReservationDto: CreateReservationDto): Reservation;
    listReservations(userId: string): Reservation[];
    cancelReservation(userId: string, reservationId: number): Reservation;
}
